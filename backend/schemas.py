from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class UserRole(str, Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    STAFF = "staff"

class UserStatus(str, Enum):
    ACTIVE = "active"
    PENDING = "pending"
    INACTIVE = "inactive"

class PaymentStatus(str, Enum):
    COMPLETED = "completed"
    PENDING = "pending"
    FAILED = "failed"

class PaymentMethod(str, Enum):
    MPESA = "mpesa"
    CASH = "cash"

class NotificationType(str, Enum):
    LOW_STOCK = "low_stock"
    PAYMENT = "payment"
    SYSTEM = "system"
    ROLE_INVITE = "role_invite"

class NotificationPriority(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

# Base schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: UserRole = UserRole.STAFF

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[UserRole] = None
    status: Optional[UserStatus] = None

class User(UserBase):
    id: int
    status: UserStatus
    business_id: Optional[int]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Business schemas
class BusinessBase(BaseModel):
    name: str
    business_type: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    currency: str = "KES"
    tax_pin: Optional[str] = None
    business_license: Optional[str] = None

class BusinessCreate(BusinessBase):
    pass

class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    business_type: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    currency: Optional[str] = None
    tax_pin: Optional[str] = None
    business_license: Optional[str] = None
    logo_url: Optional[str] = None

class Business(BusinessBase):
    id: int
    logo_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Product schemas
class ProductBase(BaseModel):
    name: str
    category: str
    price: float
    stock: int = 0
    low_stock_threshold: int = 10

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    low_stock_threshold: Optional[int] = None

class Product(ProductBase):
    id: int
    business_id: int
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Customer schemas
class CustomerBase(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    status: Optional[UserStatus] = None

class Customer(CustomerBase):
    id: int
    total_purchases: float
    last_purchase: Optional[datetime]
    status: UserStatus
    business_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Payment schemas
class PaymentItemCreate(BaseModel):
    product_id: int
    quantity: int = 1
    unit_price: float

class PaymentItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: float
    total_price: float
    product: Optional[Product] = None
    
    class Config:
        from_attributes = True

class PaymentCreate(BaseModel):
    customer_id: int
    amount: float
    method: PaymentMethod
    items: List[PaymentItemCreate]

class PaymentUpdate(BaseModel):
    status: Optional[PaymentStatus] = None
    transaction_id: Optional[str] = None
    mpesa_receipt_number: Optional[str] = None

class Payment(BaseModel):
    id: int
    customer_id: int
    business_id: int
    amount: float
    status: PaymentStatus
    method: PaymentMethod
    transaction_id: Optional[str]
    mpesa_receipt_number: Optional[str]
    created_at: datetime
    customer: Optional[Customer] = None
    items: List[PaymentItemResponse] = []
    
    class Config:
        from_attributes = True

# Notification schemas
class NotificationCreate(BaseModel):
    user_id: int
    type: NotificationType
    title: str
    message: str
    priority: NotificationPriority = NotificationPriority.MEDIUM

class NotificationUpdate(BaseModel):
    read: bool

class Notification(BaseModel):
    id: int
    user_id: int
    type: NotificationType
    title: str
    message: str
    priority: NotificationPriority
    read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Team invitation schemas
class TeamInvitationCreate(BaseModel):
    email: EmailStr
    name: str
    role: UserRole
    message: Optional[str] = None

class TeamInvitation(BaseModel):
    id: int
    business_id: int
    email: str
    name: str
    role: UserRole
    status: UserStatus
    invited_by: int
    created_at: datetime
    expires_at: datetime
    
    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    business_name: Optional[str] = None

# Analytics schemas
class SalesAnalytics(BaseModel):
    total_revenue: float
    total_orders: int
    average_order_value: float
    active_customers: int
    growth_rate: float
    daily_sales: List[dict]
    top_products: List[dict]
    sales_by_category: List[dict]

# M-Pesa schemas
class MpesaPaymentRequest(BaseModel):
    phone_number: str
    amount: float
    account_reference: str
    transaction_desc: str

class MpesaCallbackData(BaseModel):
    merchant_request_id: str
    checkout_request_id: str
    result_code: int
    result_desc: str
    amount: Optional[float] = None
    mpesa_receipt_number: Optional[str] = None
    transaction_date: Optional[str] = None
    phone_number: Optional[str] = None
