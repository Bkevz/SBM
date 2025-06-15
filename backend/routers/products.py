from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Product, User, Notification
from schemas import Product as ProductSchema, ProductCreate, ProductUpdate
from auth import get_current_active_user, get_manager_or_admin_user

router = APIRouter()

@router.get("/", response_model=List[ProductSchema])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all products for the business"""
    query = db.query(Product).filter(Product.business_id == current_user.business_id)
    
    if category:
        query = query.filter(Product.category == category)
    
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    
    products = query.offset(skip).limit(limit).all()
    return products

@router.post("/", response_model=ProductSchema)
async def create_product(
    product_data: ProductCreate,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new product"""
    product = Product(
        **product_data.dict(),
        business_id=current_user.business_id
    )
    
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.get("/{product_id}", response_model=ProductSchema)
async def get_product(
    product_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific product"""
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.business_id == current_user.business_id
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return product

@router.put("/{product_id}", response_model=ProductSchema)
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Update a product"""
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.business_id == current_user.business_id
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Update product fields
    for field, value in product_data.dict(exclude_unset=True).items():
        setattr(product, field, value)
    
    db.commit()
    db.refresh(product)
    
    # Check for low stock and create notification
    if product.stock <= product.low_stock_threshold:
        await create_low_stock_notification(product, current_user, db)
    
    return product

@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    current_user: User = Depends(get_manager_or_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a product"""
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.business_id == current_user.business_id
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    db.delete(product)
    db.commit()
    
    return {"message": "Product deleted successfully"}

@router.get("/low-stock/alerts")
async def get_low_stock_products(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get products with low stock"""
    products = db.query(Product).filter(
        Product.business_id == current_user.business_id,
        Product.stock <= Product.low_stock_threshold
    ).all()
    
    return products

async def create_low_stock_notification(product: Product, user: User, db: Session):
    """Create a low stock notification"""
    notification = Notification(
        user_id=user.id,
        type="low_stock",
        title="Low Stock Alert",
        message=f"{product.name} is running low ({product.stock} units remaining)",
        priority="high" if product.stock == 0 else "medium"
    )
    
    db.add(notification)
    db.commit()
