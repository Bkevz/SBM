from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import uuid

from database import get_db
from models import Payment, PaymentItem, Customer, Product, User, Notification
from schemas import (
    Payment as PaymentSchema, 
    PaymentCreate, 
    PaymentUpdate,
    MpesaPaymentRequest
)
from auth import get_current_active_user, get_manager_or_admin_user
from services.mpesa import MpesaService

router = APIRouter()
mpesa_service = MpesaService()

@router.get("/", response_model=List[PaymentSchema])
async def get_payments(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[str] = None,
    method_filter: Optional[str] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all payments for the business"""
    query = db.query(Payment).filter(Payment.business_id == current_user.business_id)
    
    if status_filter:
        query = query.filter(Payment.status == status_filter)
    
    if method_filter:
        query = query.filter(Payment.method == method_filter)
    
    payments = query.order_by(Payment.created_at.desc()).offset(skip).limit(limit).all()
    return payments

@router.post("/", response_model=PaymentSchema)
async def create_payment(
    payment_data: PaymentCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new payment"""
    # Verify customer exists
    customer = db.query(Customer).filter(
        Customer.id == payment_data.customer_id,
        Customer.business_id == current_user.business_id
    ).first()
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Create payment
    payment = Payment(
        customer_id=payment_data.customer_id,
        business_id=current_user.business_id,
        amount=payment_data.amount,
        method=payment_data.method,
        transaction_id=str(uuid.uuid4())
    )
    
    db.add(payment)
    db.commit()
    db.refresh(payment)
    
    # Create payment items
    for item_data in payment_data.items:
        # Verify product exists
        product = db.query(Product).filter(
            Product.id == item_data.product_id,
            Product.business_id == current_user.business_id
        ).first()
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id {item_data.product_id} not found"
            )
        
        # Check stock availability
        if product.stock < item_data.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for {product.name}"
            )
        
        # Create payment item
        payment_item = PaymentItem(
            payment_id=payment.id,
            product_id=item_data.product_id,
            quantity=item_data.quantity,
            unit_price=item_data.unit_price,
            total_price=item_data.unit_price * item_data.quantity
        )
        
        db.add(payment_item)
        
        # Update product stock
        product.stock -= item_data.quantity
        
        # Check for low stock
        if product.stock <= product.low_stock_threshold:
            background_tasks.add_task(
                create_low_stock_notification, 
                product, current_user, db
            )
    
    # If M-Pesa payment, initiate STK push
    if payment_data.method == "mpesa":
        background_tasks.add_task(
            initiate_mpesa_payment,
            payment, customer, db
        )
    else:
        # Cash payment - mark as completed
        payment.status = "completed"
        
        # Update customer totals
        customer.total_purchases += payment.amount
        customer.last_purchase = datetime.utcnow()
    
    db.commit()
    db.refresh(payment)
    
    return payment

@router.get("/{payment_id}", response_model=PaymentSchema)
async def get_payment(
    payment_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific payment"""
    payment = db.query(Payment).filter(
        Payment.id == payment_id,
        Payment.business_id == current_user.business_id
    ).first()
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    return payment

@router.put("/{payment_id}", response_model=PaymentSchema)
async def update_payment(
    payment_id: int,
    payment_data: PaymentUpdate,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Update a payment"""
    payment = db.query(Payment).filter(
        Payment.id == payment_id,
        Payment.business_id == current_user.business_id
    ).first()
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    # Update payment fields
    for field, value in payment_data.dict(exclude_unset=True).items():
        setattr(payment, field, value)
    
    # If payment is now completed, update customer totals
    if payment.status == "completed" and payment_data.status == "completed":
        customer = db.query(Customer).filter(Customer.id == payment.customer_id).first()
        if customer:
            customer.total_purchases += payment.amount
            customer.last_purchase = datetime.utcnow()
    
    db.commit()
    db.refresh(payment)
    
    return payment

@router.post("/mpesa/initiate")
async def initiate_mpesa_payment_endpoint(
    mpesa_data: MpesaPaymentRequest,
    current_user: User = Depends(get_manager_or_admin_user)
):
    """Initiate M-Pesa STK Push payment"""
    try:
        response = await mpesa_service.stk_push(
            phone_number=mpesa_data.phone_number,
            amount=mpesa_data.amount,
            account_reference=mpesa_data.account_reference,
            transaction_desc=mpesa_data.transaction_desc
        )
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"M-Pesa payment initiation failed: {str(e)}"
        )

@router.post("/mpesa/callback")
async def mpesa_callback(
    callback_data: dict,
    db: Session = Depends(get_db)
):
    """Handle M-Pesa callback"""
    try:
        # Process M-Pesa callback
        result_code = callback_data.get("Body", {}).get("stkCallback", {}).get("ResultCode")
        checkout_request_id = callback_data.get("Body", {}).get("stkCallback", {}).get("CheckoutRequestID")
        
        # Find payment by checkout request ID (you'd store this when initiating)
        # For now, we'll update based on transaction ID
        
        if result_code == 0:  # Success
            # Extract payment details from callback
            callback_metadata = callback_data.get("Body", {}).get("stkCallback", {}).get("CallbackMetadata", {}).get("Item", [])
            
            amount = None
            mpesa_receipt = None
            phone_number = None
            
            for item in callback_metadata:
                if item.get("Name") == "Amount":
                    amount = item.get("Value")
                elif item.get("Name") == "MpesaReceiptNumber":
                    mpesa_receipt = item.get("Value")
                elif item.get("Name") == "PhoneNumber":
                    phone_number = item.get("Value")
            
            # Update payment status (you'd need to match by checkout_request_id)
            # This is a simplified version
            return {"status": "success", "message": "Payment processed successfully"}
        else:
            # Payment failed
            return {"status": "failed", "message": "Payment failed"}
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Callback processing failed: {str(e)}"
        )

@router.get("/analytics/revenue")
async def get_revenue_analytics(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get revenue analytics"""
    from sqlalchemy import func, extract
    
    # Total revenue
    total_revenue = db.query(func.sum(Payment.amount)).filter(
        Payment.business_id == current_user.business_id,
        Payment.status == "completed"
    ).scalar() or 0
    
    # Monthly revenue
    monthly_revenue = db.query(
        extract('month', Payment.created_at).label('month'),
        func.sum(Payment.amount).label('revenue')
    ).filter(
        Payment.business_id == current_user.business_id,
        Payment.status == "completed"
    ).group_by(extract('month', Payment.created_at)).all()
    
    # Payment method breakdown
    method_breakdown = db.query(
        Payment.method,
        func.count(Payment.id).label('count'),
        func.sum(Payment.amount).label('total')
    ).filter(
        Payment.business_id == current_user.business_id,
        Payment.status == "completed"
    ).group_by(Payment.method).all()
    
    return {
        "total_revenue": total_revenue,
        "monthly_revenue": [{"month": r.month, "revenue": r.revenue} for r in monthly_revenue],
        "payment_methods": [{"method": r.method, "count": r.count, "total": r.total} for r in method_breakdown]
    }

async def initiate_mpesa_payment(payment: Payment, customer: Customer, db: Session):
    """Background task to initiate M-Pesa payment"""
    try:
        response = await mpesa_service.stk_push(
            phone_number=customer.phone,
            amount=payment.amount,
            account_reference=f"PAY-{payment.id}",
            transaction_desc=f"Payment for order #{payment.id}"
        )
        
        # Update payment with M-Pesa details
        payment.transaction_id = response.get("CheckoutRequestID")
        db.commit()
        
    except Exception as e:
        # Mark payment as failed
        payment.status = "failed"
        db.commit()

async def create_low_stock_notification(product: Product, user: User, db: Session):
    """Create low stock notification"""
    notification = Notification(
        user_id=user.id,
        type="low_stock",
        title="Low Stock Alert",
        message=f"{product.name} is running low ({product.stock} units remaining)",
        priority="high" if product.stock == 0 else "medium"
    )
    
    db.add(notification)
    db.commit()
