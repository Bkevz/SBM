#!/usr/bin/env python3
"""
Python script to seed the database with sample data
Alternative to running the SQL script directly
"""

import os
import sys
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Import your models
from models import *
from database import Base

load_dotenv()

def create_sample_data():
    """Create comprehensive sample data for testing"""
    
    # Get database URL
    database_url = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL")
    if not database_url:
        print("❌ No DATABASE_URL found in environment variables")
        return False
    
    # Create engine and session
    engine = create_engine(database_url)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    try:
        print("🌱 Starting database seeding...")
        
        # Create businesses
        businesses = [
            Business(
                name="Kamau General Store",
                business_type="retail",
                description="A family-owned general store serving the local community",
                address="123 Kenyatta Avenue, Nairobi",
                phone="+254712345678",
                email="info@kamaustore.co.ke",
                tax_pin="P051234567A",
                business_license="BL/2023/001234"
            ),
            Business(
                name="Mama Njeri Grocery",
                business_type="retail", 
                description="Fresh groceries and household items",
                address="45 Tom Mboya Street, Nakuru",
                phone="+254723456789",
                email="info@mamanjeri.co.ke",
                tax_pin="P051234568B",
                business_license="BL/2023/001235"
            )
        ]
        
        for business in businesses:
            existing = db.query(Business).filter(Business.email == business.email).first()
            if not existing:
                db.add(business)
        
        db.commit()
        print("✅ Businesses created")
        
        # Get business IDs
        kamau_store = db.query(Business).filter(Business.name == "Kamau General Store").first()
        mama_njeri = db.query(Business).filter(Business.name == "Mama Njeri Grocery").first()
        
        # Create users (password is 'password123' hashed)
        users = [
            User(
                name="John Kamau",
                email="john@kamaustore.co.ke",
                hashed_password="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2",
                role=UserRole.ADMIN,
                business_id=kamau_store.id
            ),
            User(
                name="Mary Wanjiku", 
                email="mary@kamaustore.co.ke",
                hashed_password="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2",
                role=UserRole.MANAGER,
                business_id=kamau_store.id
            ),
            User(
                name="Grace Njeri",
                email="grace@mamanjeri.co.ke", 
                hashed_password="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2",
                role=UserRole.ADMIN,
                business_id=mama_njeri.id
            )
        ]
        
        for user in users:
            existing = db.query(User).filter(User.email == user.email).first()
            if not existing:
                db.add(user)
        
        db.commit()
        print("✅ Users created")
        
        # Create products
        products = [
            # Kamau General Store products
            Product(name="Maize Flour 2kg", category="food", price=150.00, stock=45, low_stock_threshold=10, business_id=kamau_store.id),
            Product(name="Cooking Oil 1L", category="food", price=280.00, stock=8, low_stock_threshold=15, business_id=kamau_store.id),
            Product(name="Sugar 1kg", category="food", price=120.00, stock=25, low_stock_threshold=10, business_id=kamau_store.id),
            Product(name="Rice 2kg", category="food", price=200.00, stock=30, low_stock_threshold=12, business_id=kamau_store.id),
            Product(name="Tea Leaves 500g", category="beverages", price=150.00, stock=20, low_stock_threshold=5, business_id=kamau_store.id),
            Product(name="Milk 500ml", category="beverages", price=60.00, stock=50, low_stock_threshold=20, business_id=kamau_store.id),
            Product(name="Bread 400g", category="food", price=55.00, stock=30, low_stock_threshold=10, business_id=kamau_store.id),
            Product(name="Soap Bar", category="household", price=25.00, stock=100, low_stock_threshold=20, business_id=kamau_store.id),
            
            # Mama Njeri products
            Product(name="Maize Flour 2kg", category="food", price=145.00, stock=60, low_stock_threshold=15, business_id=mama_njeri.id),
            Product(name="Cooking Oil 2L", category="food", price=520.00, stock=12, low_stock_threshold=5, business_id=mama_njeri.id),
            Product(name="Sugar 2kg", category="food", price=230.00, stock=40, low_stock_threshold=10, business_id=mama_njeri.id),
            Product(name="Coffee 100g", category="beverages", price=180.00, stock=25, low_stock_threshold=8, business_id=mama_njeri.id),
        ]
        
        for product in products:
            existing = db.query(Product).filter(
                Product.name == product.name, 
                Product.business_id == product.business_id
            ).first()
            if not existing:
                db.add(product)
        
        db.commit()
        print("✅ Products created")
        
        # Create customers
        customers = [
            Customer(name="Alice Wanjiru", phone="+254701234567", email="alice@gmail.com", total_purchases=15420.00, business_id=kamau_store.id),
            Customer(name="James Kiprotich", phone="+254712345678", email="james@gmail.com", total_purchases=8750.00, business_id=kamau_store.id),
            Customer(name="Rose Achieng", phone="+254723456789", email="rose@gmail.com", total_purchases=12300.00, business_id=kamau_store.id),
            Customer(name="Margaret Wanjiku", phone="+254701111111", email="margaret@gmail.com", total_purchases=8900.00, business_id=mama_njeri.id),
            Customer(name="Paul Kimani", phone="+254712222222", email="paul@gmail.com", total_purchases=5400.00, business_id=mama_njeri.id),
        ]
        
        for customer in customers:
            existing = db.query(Customer).filter(
                Customer.phone == customer.phone,
                Customer.business_id == customer.business_id
            ).first()
            if not existing:
                db.add(customer)
        
        db.commit()
        print("✅ Customers created")
        
        # Create sample payments
        alice = db.query(Customer).filter(Customer.name == "Alice Wanjiru").first()
        james = db.query(Customer).filter(Customer.name == "James Kiprotich").first()
        
        if alice and james:
            payments = [
                Payment(
                    customer_id=alice.id,
                    business_id=kamau_store.id,
                    amount=1250.00,
                    status=PaymentStatus.COMPLETED,
                    method=PaymentMethod.MPESA,
                    transaction_id="TXN001",
                    mpesa_receipt_number="QA12B3C4D5"
                ),
                Payment(
                    customer_id=james.id,
                    business_id=kamau_store.id,
                    amount=850.00,
                    status=PaymentStatus.COMPLETED,
                    method=PaymentMethod.CASH,
                    transaction_id="TXN002"
                )
            ]
            
            for payment in payments:
                existing = db.query(Payment).filter(Payment.transaction_id == payment.transaction_id).first()
                if not existing:
                    db.add(payment)
            
            db.commit()
            print("✅ Payments created")
        
        # Create notifications
        john = db.query(User).filter(User.email == "john@kamaustore.co.ke").first()
        if john:
            notifications = [
                Notification(
                    user_id=john.id,
                    type=NotificationType.LOW_STOCK,
                    title="Low Stock Alert",
                    message="Cooking Oil 1L is running low (8 units remaining)",
                    priority=NotificationPriority.HIGH
                ),
                Notification(
                    user_id=john.id,
                    type=NotificationType.PAYMENT,
                    title="Payment Received",
                    message="M-Pesa payment of KSh 1,250 received from Alice Wanjiru",
                    priority=NotificationPriority.MEDIUM,
                    read=True
                )
            ]
            
            for notification in notifications:
                db.add(notification)
            
            db.commit()
            print("✅ Notifications created")
        
        # Print summary
        print("\n📊 Database Seeding Summary:")
        print(f"   Businesses: {db.query(Business).count()}")
        print(f"   Users: {db.query(User).count()}")
        print(f"   Products: {db.query(Product).count()}")
        print(f"   Customers: {db.query(Customer).count()}")
        print(f"   Payments: {db.query(Payment).count()}")
        print(f"   Notifications: {db.query(Notification).count()}")
        
        print("\n✅ Database seeding completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error during seeding: {str(e)}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    success = create_sample_data()
    if not success:
        sys.exit(1)
