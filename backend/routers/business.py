from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Business, User
from schemas import Business as BusinessSchema, BusinessUpdate
from auth import get_current_active_user, get_admin_user

router = APIRouter()

@router.get("/profile", response_model=BusinessSchema)
async def get_business_profile(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get business profile"""
    business = db.query(Business).filter(Business.id == current_user.business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found"
        )
    return business

@router.put("/profile", response_model=BusinessSchema)
async def update_business_profile(
    business_data: BusinessUpdate,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Update business profile (admin only)"""
    business = db.query(Business).filter(Business.id == current_user.business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found"
        )
    
    # Update business fields
    for field, value in business_data.dict(exclude_unset=True).items():
        setattr(business, field, value)
    
    db.commit()
    db.refresh(business)
    return business

@router.get("/stats")
async def get_business_stats(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get business statistics"""
    from models import Product, Customer, Payment
    
    business_id = current_user.business_id
    
    # Get counts
    total_products = db.query(Product).filter(Product.business_id == business_id).count()
    total_customers = db.query(Customer).filter(Customer.business_id == business_id).count()
    total_payments = db.query(Payment).filter(Payment.business_id == business_id).count()
    
    # Get revenue
    total_revenue = db.query(Payment).filter(
        Payment.business_id == business_id,
        Payment.status == "completed"
    ).with_entities(Payment.amount).all()
    
    revenue_sum = sum([payment.amount for payment in total_revenue]) if total_revenue else 0
    
    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_payments,
        "total_revenue": revenue_sum,
        "average_order_value": revenue_sum / total_payments if total_payments > 0 else 0
    }
