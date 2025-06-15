-- Create database
CREATE DATABASE biashara_pro;

-- Connect to the database
\c biashara_pro;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'staff');
CREATE TYPE user_status AS ENUM ('active', 'pending', 'inactive');
CREATE TYPE payment_status AS ENUM ('completed', 'pending', 'failed');
CREATE TYPE payment_method AS ENUM ('mpesa', 'cash');
CREATE TYPE notification_type AS ENUM ('low_stock', 'payment', 'system', 'role_invite');
CREATE TYPE notification_priority AS ENUM ('high', 'medium', 'low');

-- Create tables (these will be created by SQLAlchemy, but this shows the structure)

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    business_type VARCHAR,
    description TEXT,
    address TEXT,
    phone VARCHAR,
    email VARCHAR,
    currency VARCHAR DEFAULT 'KES',
    tax_pin VARCHAR,
    business_license VARCHAR,
    logo_url VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    role user_role DEFAULT 'staff',
    status user_status DEFAULT 'active',
    business_id INTEGER REFERENCES businesses(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    business_id INTEGER REFERENCES businesses(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR,
    total_purchases DECIMAL(10,2) DEFAULT 0.0,
    last_purchase TIMESTAMP WITH TIME ZONE,
    status user_status DEFAULT 'active',
    business_id INTEGER REFERENCES businesses(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    business_id INTEGER REFERENCES businesses(id),
    amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending',
    method payment_method NOT NULL,
    transaction_id VARCHAR UNIQUE,
    mpesa_receipt_number VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Payment items table
CREATE TABLE IF NOT EXISTS payment_items (
    id SERIAL PRIMARY KEY,
    payment_id INTEGER REFERENCES payments(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type notification_type NOT NULL,
    title VARCHAR NOT NULL,
    message TEXT NOT NULL,
    priority notification_priority DEFAULT 'medium',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team invitations table
CREATE TABLE IF NOT EXISTS team_invitations (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    email VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    role user_role NOT NULL,
    invitation_token VARCHAR UNIQUE NOT NULL,
    message TEXT,
    status user_status DEFAULT 'pending',
    invited_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_business_id ON users(business_id);
CREATE INDEX IF NOT EXISTS idx_products_business_id ON products(business_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_customers_business_id ON customers(business_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_payments_business_id ON payments(business_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON team_invitations(invitation_token);

-- Insert sample data
INSERT INTO businesses (name, business_type, description, address, phone, email) VALUES
('Kamau General Store', 'retail', 'A family-owned general store serving the local community', '123 Kenyatta Avenue, Nairobi', '+254712345678', 'info@kamaustore.co.ke');

INSERT INTO users (name, email, hashed_password, role, business_id) VALUES
('John Kamau', 'john@kamaustore.co.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2', 'admin', 1);

INSERT INTO products (name, category, price, stock, low_stock_threshold, business_id) VALUES
('Maize Flour 2kg', 'food', 150.00, 45, 10, 1),
('Cooking Oil 1L', 'food', 280.00, 8, 15, 1),
('Sugar 1kg', 'food', 120.00, 25, 10, 1),
('Rice 2kg', 'food', 200.00, 30, 12, 1),
('Tea Leaves 500g', 'beverages', 150.00, 20, 5, 1);

INSERT INTO customers (name, phone, email, total_purchases, business_id) VALUES
('Mary Wanjiku', '+254723456789', 'mary@example.com', 8750.00, 1),
('Peter Ochieng', '+254734567890', 'peter@example.com', 12300.00, 1),
('Grace Akinyi', '+254745678901', 'grace@example.com', 6890.00, 1);
