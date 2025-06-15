from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional

from database import get_db
from models import Customer, User, Payment
from schemas import Customer as CustomerSchema, CustomerCreate, CustomerUpdate
from auth import get_current_active_user, get_manager_or_admin_user

router = APIRouter()

@router.get("/", response_model=List[CustomerSchema])
async def get_customers(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all customers for the business"""
    query = db.query(Customer).filter(Customer.business_id == current_user.business_id)
    
    if search:
        query = query.filter(
            Customer.name.ilike(f"%{search}%") |
            Customer.phone.ilike(f"%{search}%") |
            Customer.email.ilike(f"%{search}%")
        )
    
    customers = query.offset(skip).limit(limit).all()
    return customers

@router.post("/", response_model=CustomerSchema)
async def create_customer(
    customer_data: CustomerCreate,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new customer"""
    # Check if customer with same email already exists
    if customer_data.email:
        existing_customer = db.query(Customer).filter(
            Customer.email == customer_data.email,
            Customer.business_id == current_user.business_id
        ).first()
        
        if existing_customer:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Customer with this email already exists"
            )
    
    customer = Customer(
        **customer_data.dict(),
        business_id=current_user.business_id
    )
    
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

@router.get("/{customer_id}", response_model=CustomerSchema)
async def get_customer(
    customer_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific customer"""
    customer = db.query(Customer).filter(
        Customer.id == customer_id,
        Customer.business_id == current_user.business_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    return customer

@router.put("/{customer_id}", response_model=CustomerSchema)
async def update_customer(
    customer_id: int,
    customer_data: CustomerUpdate,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Update a customer"""
    customer = db.query(Customer).filter(
        Customer.id == customer_id,
        Customer.business_id == current_user.business_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Update customer fields
    for field, value in customer_data.dict(exclude_unset=True).items():
        setattr(customer, field, value)
    
    db.commit()
    db.refresh(customer)
    return customer

@router.delete("/{customer_id}")
async def delete_customer(
    customer_id: int,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a customer"""
    customer = db.query(Customer).filter(
        Customer.id == customer_id,
        Customer.business_id == current_user.business_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    db.delete(customer)
    db.commit()
    
    return {"message": "Customer deleted successfully"}

@router.get("/{customer_id}/history")
async def get_customer_purchase_history(
    customer_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get customer's purchase history"""
    customer = db.query(Customer).filter(
        Customer.id == customer_id,
        Customer.business_id == current_user.business_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Get customer's payments with items
    payments = db.query(Payment).filter(
        Payment.customer_id == customer_id,
        Payment.business_id == current_user.business_id
    ).order_by(Payment.created_at.desc()).all()
    
    # Calculate statistics
    total_orders = len(payments)
    total_spent = sum([p.amount for p in payments if p.status == "completed"])
    average_order = total_spent / total_orders if total_orders > 0 else 0
    
    return {
        "customer": customer,
        "payments": payments,
        "statistics": {
            "total_orders": total_orders,
            "total_spent": total_spent,
            "average_order_value": average_order
        }
    }

@router.get("/analytics/top")
async def get_top_customers(
    limit: int = 10,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get top customers by total purchases"""
    customers = db.query(Customer).filter(
        Customer.business_id == current_user.business_id
    ).order_by(Customer.total_purchases.desc()).limit(limit).all()
    
    return customers
