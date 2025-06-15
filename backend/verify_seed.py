#!/usr/bin/env python3
"""
Script to verify the seeded data and show sample queries
"""

import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def verify_seeded_data():
    """Verify that the database has been properly seeded"""
    
    database_url = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL")
    if not database_url:
        print("❌ No DATABASE_URL found")
        return False
    
    engine = create_engine(database_url)
    
    try:
        with engine.connect() as conn:
            print("🔍 Verifying seeded data...\n")
            
            # Check table counts
            tables = ['businesses', 'users', 'products', 'customers', 'payments', 'notifications']
            
            for table in tables:
                result = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
                count = result.fetchone()[0]
                print(f"📊 {table.capitalize()}: {count} records")
            
            print("\n" + "="*50)
            
            # Show sample business data
            print("\n🏪 Sample Businesses:")
            result = conn.execute(text("""
                SELECT name, business_type, phone, email 
                FROM businesses 
                LIMIT 3
            """))
            
            for row in result:
                print(f"   • {row[0]} ({row[1]}) - {row[2]}")
            
            # Show sample products with low stock
            print("\n📦 Low Stock Products:")
            result = conn.execute(text("""
                SELECT p.name, p.stock, p.low_stock_threshold, b.name as business_name
                FROM products p
                JOIN businesses b ON p.business_id = b.id
                WHERE p.stock <= p.low_stock_threshold
                ORDER BY p.stock ASC
                LIMIT 5
            """))
            
            for row in result:
                print(f"   ⚠️  {row[0]} - {row[1]} units (threshold: {row[2]}) at {row[3]}")
            
            # Show recent payments
            print("\n💰 Recent Payments:")
            result = conn.execute(text("""
                SELECT c.name, p.amount, p.method, p.status, p.created_at::date
                FROM payments p
                JOIN customers c ON p.customer_id = c.id
                ORDER BY p.created_at DESC
                LIMIT 5
            """))
            
            for row in result:
                print(f"   💳 {row[0]} - KSh {row[1]:,.2f} via {row[2]} ({row[3]}) on {row[4]}")
            
            # Show unread notifications
            print("\n🔔 Recent Notifications:")
            result = conn.execute(text("""
                SELECT n.title, n.message, n.priority, u.name as user_name
                FROM notifications n
                JOIN users u ON n.user_id = u.id
                WHERE n.read = false
                ORDER BY n.created_at DESC
                LIMIT 5
            """))
            
            for row in result:
                priority_emoji = "🔴" if row[2] == "high" else "🟡" if row[2] == "medium" else "🟢"
                print(f"   {priority_emoji} {row[0]} - {row[1]} (for {row[3]})")
            
            # Show business summary
            print("\n📈 Business Summary:")
            result = conn.execute(text("""
                SELECT 
                    b.name,
                    COUNT(DISTINCT u.id) as users,
                    COUNT(DISTINCT p.id) as products,
                    COUNT(DISTINCT c.id) as customers,
                    COALESCE(SUM(CASE WHEN pay.status = 'completed' THEN pay.amount ELSE 0 END), 0) as revenue
                FROM businesses b
                LEFT JOIN users u ON b.id = u.business_id
                LEFT JOIN products p ON b.id = p.business_id  
                LEFT JOIN customers c ON b.id = c.business_id
                LEFT JOIN payments pay ON b.id = pay.business_id
                GROUP BY b.id, b.name
            """))
            
            for row in result:
                print(f"   🏪 {row[0]}:")
                print(f"      👥 {row[1]} users, 📦 {row[2]} products, 👤 {row[3]} customers")
                print(f"      💰 KSh {row[4]:,.2f} total revenue")
            
            print("\n✅ Data verification completed!")
            return True
            
    except Exception as e:
        print(f"❌ Verification failed: {str(e)}")
        return False

if __name__ == "__main__":
    verify_seeded_data()
