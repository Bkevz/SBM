from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import uuid

from database import get_db
from models import User, TeamInvitation, Notification
from schemas import (
    User as UserSchema, 
    UserUpdate, 
    TeamInvitationCreate, 
    TeamInvitation as TeamInvitationSchema
)
from auth import get_current_active_user, get_admin_user, get_password_hash
from services.email import EmailService

router = APIRouter()
email_service = EmailService()

@router.get("/members", response_model=List[UserSchema])
async def get_team_members(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all team members for the business"""
    members = db.query(User).filter(
        User.business_id == current_user.business_id
    ).all()
    
    return members

@router.post("/invite", response_model=TeamInvitationSchema)
async def invite_team_member(
    invitation_data: TeamInvitationCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Invite a new team member (admin only)"""
    
    # Check if user with email already exists
    existing_user = db.query(User).filter(
        User.email == invitation_data.email,
        User.business_id == current_user.business_id
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists in your team"
        )
    
    # Check if invitation already exists
    existing_invitation = db.query(TeamInvitation).filter(
        TeamInvitation.email == invitation_data.email,
        TeamInvitation.business_id == current_user.business_id,
        TeamInvitation.status == "pending"
    ).first()
    
    if existing_invitation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invitation already sent to this email"
        )
    
    # Create invitation
    invitation = TeamInvitation(
        business_id=current_user.business_id,
        email=invitation_data.email,
        name=invitation_data.name,
        role=invitation_data.role,
        message=invitation_data.message,
        invitation_token=str(uuid.uuid4()),
        invited_by=current_user.id,
        expires_at=datetime.utcnow() + timedelta(days=7)  # 7 days to accept
    )
    
    db.add(invitation)
    db.commit()
    db.refresh(invitation)
    
    # Send invitation email
    background_tasks.add_task(
        send_invitation_email,
        invitation, current_user
    )
    
    # Create notification for admin
    notification = Notification(
        user_id=current_user.id,
        type="role_invite",
        title="Team Invitation Sent",
        message=f"Invitation sent to {invitation_data.name} ({invitation_data.email})",
        priority="medium"
    )
    
    db.add(notification)
    db.commit()
    
    return invitation

@router.get("/invitations", response_model=List[TeamInvitationSchema])
async def get_team_invitations(
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get all team invitations (admin only)"""
    invitations = db.query(TeamInvitation).filter(
        TeamInvitation.business_id == current_user.business_id
    ).order_by(TeamInvitation.created_at.desc()).all()
    
    return invitations

@router.post("/invitations/{token}/accept")
async def accept_invitation(
    token: str,
    password: str,
    db: Session = Depends(get_db)
):
    """Accept a team invitation"""
    invitation = db.query(TeamInvitation).filter(
        TeamInvitation.invitation_token == token,
        TeamInvitation.status == "pending",
        TeamInvitation.expires_at > datetime.utcnow()
    ).first()
    
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid or expired invitation"
        )
    
    # Create user account
    hashed_password = get_password_hash(password)
    user = User(
        name=invitation.name,
        email=invitation.email,
        hashed_password=hashed_password,
        role=invitation.role,
        business_id=invitation.business_id,
        status="active"
    )
    
    db.add(user)
    
    # Update invitation status
    invitation.status = "active"
    
    db.commit()
    db.refresh(user)
    
    return {"message": "Invitation accepted successfully", "user": user}

@router.put("/members/{user_id}", response_model=UserSchema)
async def update_team_member(
    user_id: int,
    user_data: UserUpdate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Update a team member (admin only)"""
    user = db.query(User).filter(
        User.id == user_id,
        User.business_id == current_user.business_id
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )
    
    # Prevent admin from changing their own role
    if user.id == current_user.id and user_data.role and user_data.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot change your own admin role"
        )
    
    # Update user fields
    for field, value in user_data.dict(exclude_unset=True).items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    
    return user

@router.delete("/members/{user_id}")
async def remove_team_member(
    user_id: int,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Remove a team member (admin only)"""
    user = db.query(User).filter(
        User.id == user_id,
        User.business_id == current_user.business_id
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found"
        )
    
    # Prevent admin from removing themselves
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot remove yourself from the team"
        )
    
    db.delete(user)
    db.commit()
    
    return {"message": "Team member removed successfully"}

@router.post("/invitations/{invitation_id}/resend")
async def resend_invitation(
    invitation_id: int,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Resend a team invitation (admin only)"""
    invitation = db.query(TeamInvitation).filter(
        TeamInvitation.id == invitation_id,
        TeamInvitation.business_id == current_user.business_id
    ).first()
    
    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invitation not found"
        )
    
    # Update invitation token and expiry
    invitation.invitation_token = str(uuid.uuid4())
    invitation.expires_at = datetime.utcnow() + timedelta(days=7)
    invitation.status = "pending"
    
    db.commit()
    
    # Resend invitation email
    background_tasks.add_task(
        send_invitation_email,
        invitation, current_user
    )
    
    return {"message": "Invitation resent successfully"}

async def send_invitation_email(invitation: TeamInvitation, invited_by: User):
    """Send invitation email"""
    try:
        await email_service.send_team_invitation(
            to_email=invitation.email,
            to_name=invitation.name,
            business_name=invited_by.business.name,
            invited_by_name=invited_by.name,
            role=invitation.role.value,
            invitation_token=invitation.invitation_token,
            custom_message=invitation.message
        )
    except Exception as e:
        # Log error but don't fail the invitation creation
        print(f"Failed to send invitation email: {str(e)}")
