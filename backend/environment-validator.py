#!/usr/bin/env python3
"""
Environment Variables Validator
Checks if all required environment variables are properly set
"""

import os
import sys
from dotenv import load_dotenv
from urllib.parse import urlparse

load_dotenv()

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'

def check_required_vars():
    """Check all required environment variables"""
    
    print(f"{Colors.BOLD}🔍 Biashara Pro Environment Variables Validation{Colors.END}")
    print("=" * 60)
    
    # Required variables with descriptions
    required_vars = {
        'DATABASE_URL': 'Neon PostgreSQL database connection string',
        'SECRET_KEY': 'JWT secret key for authentication',
    }
    
    # M-Pesa variables (required for payments)
    mpesa_vars = {
        'MPESA_CONSUMER_KEY': 'Safaricom M-Pesa consumer key',
        'MPESA_CONSUMER_SECRET': 'Safaricom M-Pesa consumer secret',
        'MPESA_BUSINESS_SHORT_CODE': 'M-Pesa business short code',
        'MPESA_PASSKEY': 'M-Pesa passkey for STK push',
    }
    
    # Email variables (required for notifications)
    email_vars = {
        'SMTP_SERVER': 'SMTP server for sending emails',
        'SMTP_PORT': 'SMTP port (usually 587)',
        'SMTP_USERNAME': 'SMTP username/email',
        'SMTP_PASSWORD': 'SMTP password/app password',
        'FROM_EMAIL': 'From email address',
    }
    
    # Optional variables
    optional_vars = {
        'FRONTEND_URL': 'Frontend application URL',
        'MPESA_CALLBACK_URL': 'M-Pesa callback URL',
        'CLOUDINARY_CLOUD_NAME': 'Cloudinary cloud name for file uploads',
        'REDIS_URL': 'Redis URL for caching',
    }
    
    all_good = True
    
    # Check required variables
    print(f"\n{Colors.BOLD}📋 Required Variables:{Colors.END}")
    for var, description in required_vars.items():
        value = os.getenv(var)
        if value:
            # Mask sensitive values
            display_value = value[:20] + "..." if len(value) > 20 else value
            if 'password' in var.lower() or 'secret' in var.lower() or 'key' in var.lower():
                display_value = "*" * min(len(value), 10)
            print(f"  ✅ {var}: {Colors.GREEN}{display_value}{Colors.END}")
        else:
            print(f"  ❌ {var}: {Colors.RED}Missing{Colors.END} - {description}")
            all_good = False
    
    # Check M-Pesa variables
    print(f"\n{Colors.BOLD}💳 M-Pesa Payment Variables:{Colors.END}")
    mpesa_count = 0
    for var, description in mpesa_vars.items():
        value = os.getenv(var)
        if value:
            display_value = "*" * min(len(value), 10) if 'secret' in var.lower() or 'key' in var.lower() else value
            print(f"  ✅ {var}: {Colors.GREEN}{display_value}{Colors.END}")
            mpesa_count += 1
        else:
            print(f"  ⚠️  {var}: {Colors.YELLOW}Missing{Colors.END} - {description}")
    
    if mpesa_count == 0:
        print(f"  {Colors.YELLOW}⚠️  No M-Pesa variables set - Payment features will be disabled{Colors.END}")
    elif mpesa_count < len(mpesa_vars):
        print(f"  {Colors.YELLOW}⚠️  Incomplete M-Pesa setup - Some payment features may not work{Colors.END}")
    
    # Check email variables
    print(f"\n{Colors.BOLD}📧 Email Notification Variables:{Colors.END}")
    email_count = 0
    for var, description in email_vars.items():
        value = os.getenv(var)
        if value:
            display_value = "*" * min(len(value), 10) if 'password' in var.lower() else value
            print(f"  ✅ {var}: {Colors.GREEN}{display_value}{Colors.END}")
            email_count += 1
        else:
            print(f"  ⚠️  {var}: {Colors.YELLOW}Missing{Colors.END} - {description}")
    
    if email_count == 0:
        print(f"  {Colors.YELLOW}⚠️  No email variables set - Email notifications will be disabled{Colors.END}")
    elif email_count < len(email_vars):
        print(f"  {Colors.YELLOW}⚠️  Incomplete email setup - Some notifications may not work{Colors.END}")
    
    # Check optional variables
    print(f"\n{Colors.BOLD}🔧 Optional Variables:{Colors.END}")
    for var, description in optional_vars.items():
        value = os.getenv(var)
        if value:
            display_value = value[:30] + "..." if len(value) > 30 else value
            print(f"  ✅ {var}: {Colors.GREEN}{display_value}{Colors.END}")
        else:
            print(f"  ➖ {var}: {Colors.BLUE}Not set{Colors.END} - {description}")
    
    # Validate specific formats
    print(f"\n{Colors.BOLD}🔍 Validation Checks:{Colors.END}")
    
    # Database URL validation
    db_url = os.getenv('DATABASE_URL')
    if db_url:
        try:
            parsed = urlparse(db_url)
            if parsed.scheme in ['postgresql', 'postgres']:
                print(f"  ✅ Database URL format: {Colors.GREEN}Valid PostgreSQL URL{Colors.END}")
            else:
                print(f"  ⚠️  Database URL format: {Colors.YELLOW}Unexpected scheme: {parsed.scheme}{Colors.END}")
        except Exception as e:
            print(f"  ❌ Database URL format: {Colors.RED}Invalid URL format{Colors.END}")
    
    # Secret key validation
    secret_key = os.getenv('SECRET_KEY')
    if secret_key:
        if len(secret_key) >= 32:
            print(f"  ✅ Secret key length: {Colors.GREEN}Sufficient ({len(secret_key)} chars){Colors.END}")
        else:
            print(f"  ⚠️  Secret key length: {Colors.YELLOW}Too short ({len(secret_key)} chars, recommend 32+){Colors.END}")
    
    # SMTP port validation
    smtp_port = os.getenv('SMTP_PORT')
    if smtp_port:
        try:
            port = int(smtp_port)
            if port in [25, 465, 587, 2525]:
                print(f"  ✅ SMTP port: {Colors.GREEN}Standard port ({port}){Colors.END}")
            else:
                print(f"  ⚠️  SMTP port: {Colors.YELLOW}Non-standard port ({port}){Colors.END}")
        except ValueError:
            print(f"  ❌ SMTP port: {Colors.RED}Invalid port number{Colors.END}")
    
    # Summary
    print(f"\n{Colors.BOLD}📊 Summary:{Colors.END}")
    if all_good:
        print(f"  🎉 {Colors.GREEN}All required variables are set!{Colors.END}")
        print(f"  🚀 {Colors.GREEN}Ready to start the application{Colors.END}")
    else:
        print(f"  ⚠️  {Colors.YELLOW}Some required variables are missing{Colors.END}")
        print(f"  📝 {Colors.YELLOW}Please check the .env.example file for guidance{Colors.END}")
    
    return all_good

def generate_env_template():
    """Generate a personalized .env template"""
    print(f"\n{Colors.BOLD}📝 Generating .env template...{Colors.END}")
    
    template = """# Biashara Pro Environment Variables
# Copy these values and fill in your actual credentials

# Database (REQUIRED) - You already have this from Neon
DATABASE_URL=your-neon-database-url-here

# Security (REQUIRED) - Generate with: openssl rand -base64 32
SECRET_KEY=your-secret-key-here

# M-Pesa Integration (REQUIRED for payments)
MPESA_CONSUMER_KEY=your-mpesa-consumer-key
MPESA_CONSUMER_SECRET=your-mpesa-consumer-secret
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your-mpesa-passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/payments/mpesa/callback

# Email Configuration (REQUIRED for notifications)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Biashara Pro

# Application URLs
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional integrations
# CLOUDINARY_CLOUD_NAME=your-cloudinary-name
# REDIS_URL=redis://localhost:6379
"""
    
    with open('.env.template', 'w') as f:
        f.write(template)
    
    print(f"  ✅ Template saved as {Colors.GREEN}.env.template{Colors.END}")
    print(f"  📋 Copy this file to {Colors.BLUE}.env{Colors.END} and fill in your values")

if __name__ == "__main__":
    print(f"{Colors.BLUE}Biashara Pro Environment Validator{Colors.END}")
    
    success = check_required_vars()
    
    if not success:
        print(f"\n{Colors.YELLOW}Would you like to generate a .env template? (y/n):{Colors.END}", end=" ")
        if input().lower().startswith('y'):
            generate_env_template()
    
    print(f"\n{Colors.BOLD}Next Steps:{Colors.END}")
    print(f"1. Set up missing environment variables")
    print(f"2. Run: {Colors.BLUE}python neon_test.py{Colors.END} to test database")
    print(f"3. Run: {Colors.BLUE}python main.py{Colors.END} to start the backend")
    
    if not success:
        sys.exit(1)
