from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, extract, desc
from typing import List, Optional
from datetime import datetime, timedelta

from database import get_db
from models import Payment, PaymentItem, Product, Customer, User
from schemas import SalesAnalytics
from auth import get_current_active_user

router = APIRouter()

@router.get("/analytics", response_model=SalesAnalytics)
async def get_sales_analytics(
    days: int = 30,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get comprehensive sales analytics"""
    business_id = current_user.business_id
    start_date = datetime.utcnow() - timedelta(days=days)
    
    # Total revenue
    total_revenue = db.query(func.sum(Payment.amount)).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        Payment.created_at >= start_date
    ).scalar() or 0
    
    # Total orders
    total_orders = db.query(Payment).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        Payment.created_at >= start_date
    ).count()
    
    # Average order value
    average_order_value = total_revenue / total_orders if total_orders > 0 else 0
    
    # Active customers (customers who made purchases in the period)
    active_customers = db.query(func.count(func.distinct(Payment.customer_id))).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        Payment.created_at >= start_date
    ).scalar() or 0
    
    # Growth rate (compare with previous period)
    previous_start = start_date - timedelta(days=days)
    previous_revenue = db.query(func.sum(Payment.amount)).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        Payment.created_at >= previous_start,
        Payment.created_at < start_date
    ).scalar() or 0
    
    growth_rate = ((total_revenue - previous_revenue) / previous_revenue * 100) if previous_revenue > 0 else 0
    
    # Daily sales
    daily_sales = db.query(
        func.date(Payment.created_at).label('date'),
        func.sum(Payment.amount).label('sales'),
        func.count(Payment.id).label('orders')
    ).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        Payment.created_at >= start_date
    ).group_by(func.date(Payment.created_at)).order_by('date').all()
    
    # Top products
    top_products = db.query(
        Product.name,
        Product.category,
        func.sum(PaymentItem.quantity).label('quantity_sold'),
        func.sum(PaymentItem.total_price).label('revenue')
    ).join(PaymentItem).join(Payment).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        Payment.created_at >= start_date
    ).group_by(Product.id, Product.name, Product.category).order_by(
        desc('revenue')
    ).limit(10).all()
    
    # Sales by category
    sales_by_category = db.query(
        Product.category,
        func.sum(PaymentItem.total_price).label('revenue'),
        func.sum(PaymentItem.quantity).label('quantity')
    ).join(PaymentItem).join(Payment).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        Payment.created_at >= start_date
    ).group_by(Product.category).order_by(desc('revenue')).all()
    
    return SalesAnalytics(
        total_revenue=total_revenue,
        total_orders=total_orders,
        average_order_value=average_order_value,
        active_customers=active_customers,
        growth_rate=growth_rate,
        daily_sales=[
            {
                "date": sale.date.isoformat(),
                "sales": sale.sales,
                "orders": sale.orders
            } for sale in daily_sales
        ],
        top_products=[
            {
                "name": product.name,
                "category": product.category,
                "quantity_sold": product.quantity_sold,
                "revenue": product.revenue
            } for product in top_products
        ],
        sales_by_category=[
            {
                "category": category.category,
                "revenue": category.revenue,
                "quantity": category.quantity
            } for category in sales_by_category
        ]
    )

@router.get("/dashboard")
async def get_sales_dashboard(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get sales dashboard data"""
    business_id = current_user.business_id
    today = datetime.utcnow().date()
    
    # Today's sales
    today_sales = db.query(func.sum(Payment.amount)).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        func.date(Payment.created_at) == today
    ).scalar() or 0
    
    # This week's sales
    week_start = today - timedelta(days=today.weekday())
    week_sales = db.query(func.sum(Payment.amount)).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        func.date(Payment.created_at) >= week_start
    ).scalar() or 0
    
    # This month's sales
    month_start = today.replace(day=1)
    month_sales = db.query(func.sum(Payment.amount)).filter(
        Payment.business_id == business_id,
        Payment.status == "completed",
        func.date(Payment.created_at) >= month_start
    ).scalar() or 0
    
    # Recent transactions
    recent_transactions = db.query(Payment).filter(
        Payment.business_id == business_id
    ).order_by(desc(Payment.created_at)).limit(5).all()
    
    return {
        "today_sales": today_sales,
        "week_sales": week_sales,
        "month_sales": month_sales,
        "recent_transactions": recent_transactions
    }

@router.get("/reports/export")
async def export_sales_report(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    format: str = "csv",
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Export sales report"""
    # This would generate and return a CSV/PDF report
    # For now, return the data that would be in the report
    
    business_id = current_user.business_id
    
    query = db.query(Payment).filter(
        Payment.business_id == business_id,
        Payment.status == "completed"
    )
    
    if start_date:
        query = query.filter(Payment.created_at >= datetime.fromisoformat(start_date))
    
    if end_date:
        query = query.filter(Payment.created_at <= datetime.fromisoformat(end_date))
    
    payments = query.order_by(desc(Payment.created_at)).all()
    
    return {
        "format": format,
        "total_records": len(payments),
        "data": payments,
        "summary": {
            "total_revenue": sum([p.amount for p in payments]),
            "total_transactions": len(payments),
            "average_transaction": sum([p.amount for p in payments]) / len(payments) if payments else 0
        }
    }
