#!/usr/bin/env python3
"""
Test script to verify Neon database connection and setup
Run this to test your database connection before starting the main application
"""

import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables
load_dotenv()

def test_neon_connection():
    """Test connection to Neon database"""
    
    # Get database URL from environment
    database_url = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL")
    
    if not database_url:
        print("❌ No DATABASE_URL or POSTGRES_URL found in environment variables")
        print("Available environment variables:")
        for key in os.environ:
            if 'POSTGRES' in key or 'DATABASE' in key:
                print(f"  {key}={os.environ[key][:50]}...")
        return False
    
    print(f"🔗 Connecting to Neon database...")
    print(f"   URL: {database_url[:50]}...")
    
    try:
        # Create engine
        engine = create_engine(database_url, pool_pre_ping=True)
        
        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"✅ Connected successfully!")
            print(f"   PostgreSQL version: {version}")
            
            # Test if our tables exist
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name IN ('businesses', 'users', 'products', 'customers')
            """))
            
            tables = [row[0] for row in result.fetchall()]
            
            if tables:
                print(f"✅ Found existing tables: {', '.join(tables)}")
            else:
                print("ℹ️  No application tables found yet (this is normal for first setup)")
            
            # Test basic query
            result = conn.execute(text("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public'"))
            table_count = result.fetchone()[0]
            print(f"📊 Total tables in database: {table_count}")
            
        return True
        
    except Exception as e:
        print(f"❌ Connection failed: {str(e)}")
        return False

def main():
    """Main test function"""
    print("🧪 Testing Neon Database Connection")
    print("=" * 50)
    
    success = test_neon_connection()
    
    if success:
        print("\n✅ Database connection test passed!")
        print("You can now run the FastAPI application with: python main.py")
    else:
        print("\n❌ Database connection test failed!")
        print("Please check your environment variables and database configuration.")
        sys.exit(1)

if __name__ == "__main__":
    main()
