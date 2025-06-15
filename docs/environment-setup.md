# Environment Variables Setup Guide

## 🔧 Required Environment Variables

### 1. **Database (REQUIRED)**
You already have these from your Neon setup:
\`\`\`bash
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
\`\`\`

### 2. **Security (REQUIRED)**
Generate a strong secret key:
\`\`\`bash
# Generate a secure secret key
SECRET_KEY=$(openssl rand -base64 32)
\`\`\`

### 3. **M-Pesa Integration (REQUIRED for Payments)**

#### How to get M-Pesa credentials:
1. **Visit**: [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. **Create Account** and login
3. **Create a new app** for M-Pesa STK Push
4. **Get credentials**:
   - Consumer Key
   - Consumer Secret
   - Business Short Code (use 174379 for sandbox)
   - Passkey

\`\`\`bash
MPESA_CONSUMER_KEY=your-key-here
MPESA_CONSUMER_SECRET=your-secret-here
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your-passkey-here
\`\`\`

### 4. **Email Configuration (REQUIRED for Notifications)**

#### For Gmail:
1. **Enable 2FA** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"

\`\`\`bash
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
\`\`\`

## 🚀 Quick Setup Commands

### Backend Setup:
\`\`\`bash
cd backend
cp .env.example .env
# Edit .env with your values
\`\`\`

### Frontend Setup:
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your values
\`\`\`

## 🔍 Environment Variable Validation

### Check if variables are loaded:
\`\`\`bash
# Backend
cd backend
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('DATABASE_URL:', bool(os.getenv('DATABASE_URL')))"

# Frontend
npm run build
\`\`\`

## 🌍 Production Deployment

### Vercel (Frontend):
Add these in Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_SECRET` (if using NextAuth)

### Railway/Heroku (Backend):
Add these in your deployment platform:
- `DATABASE_URL`
- `SECRET_KEY`
- `MPESA_*` variables
- `SMTP_*` variables

## 🔒 Security Best Practices

1. **Never commit .env files** to version control
2. **Use different keys** for development and production
3. **Rotate secrets regularly**
4. **Use environment-specific values**

## 📱 M-Pesa Testing

### Sandbox Test Numbers:
- **Test Phone**: 254708374149
- **Test Amount**: Any amount between 1-70000
- **PIN**: 1234 (for sandbox)

## 🆘 Troubleshooting

### Common Issues:

1. **Database Connection Failed**:
   - Check DATABASE_URL format
   - Verify Neon database is running
   - Check firewall/network settings

2. **M-Pesa Integration Failed**:
   - Verify credentials are correct
   - Check if using sandbox environment
   - Ensure callback URL is accessible

3. **Email Not Sending**:
   - Verify Gmail app password
   - Check SMTP settings
   - Ensure 2FA is enabled

### Debug Commands:
\`\`\`bash
# Test database connection
cd backend
python neon_test.py

# Test environment variables
python -c "import os; print([k for k in os.environ.keys() if 'MPESA' in k])"
