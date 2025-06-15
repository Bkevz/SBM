from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import uvicorn
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

from database import get_db, engine, Base, test_connection
from routers import auth, business, products, customers, payments, sales, team, notifications
from models import *  # Import all models to ensure they're created

load_dotenv()

# Test database connection on startup
print("Testing Neon database connection...")
if not test_connection():
    print("⚠️  Warning: Database connection failed. Please check your DATABASE_URL.")

# Create tables
try:
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created/verified successfully!")
except Exception as e:
    print(f"❌ Error creating database tables: {e}")

app = FastAPI(
    title="Biashara Pro API",
    description="Business management API for Kenyan entrepreneurs",
    version="1.0.0"
)

# CORS middleware - Updated to include your frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://your-frontend-domain.com",
        "https://*.vercel.app"  # For Vercel deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(business.router, prefix="/api/business", tags=["Business"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(customers.router, prefix="/api/customers", tags=["Customers"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])
app.include_router(sales.router, prefix="/api/sales", tags=["Sales"])
app.include_router(team.router, prefix="/api/team", tags=["Team"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])

@app.get("/")
async def root():
    return {
        "message": "Biashara Pro API - Empowering Kenyan Businesses",
        "status": "running",
        "database": "connected" if test_connection() else "disconnected"
    }

@app.get("/health")
async def health_check():
    db_status = test_connection()
    return {
        "status": "healthy" if db_status else "unhealthy",
        "database": "connected" if db_status else "disconnected",
        "timestamp": datetime.utcnow()
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
