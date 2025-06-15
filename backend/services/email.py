import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_username = os.getenv("SMTP_USERNAME")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.from_email = os.getenv("FROM_EMAIL", self.smtp_username)
        self.from_name = os.getenv("FROM_NAME", "Biashara Pro")
    
    async def send_email(self, to_email: str, subject: str, html_content: str, text_content: str = None):
        """Send email"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = to_email
            
            # Add text part
            if text_content:
                text_part = MIMEText(text_content, 'plain')
                msg.attach(text_part)
            
            # Add HTML part
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
                
        except Exception as e:
            raise Exception(f"Failed to send email: {str(e)}")
    
    async def send_team_invitation(
        self, 
        to_email: str, 
        to_name: str, 
        business_name: str, 
        invited_by_name: str,
        role: str,
        invitation_token: str,
        custom_message: str = None
    ):
        """Send team invitation email"""
        subject = f"You're invited to join {business_name} on Biashara Pro"
        
        # Create invitation URL (you'd replace this with your actual frontend URL)
        invitation_url = f"https://your-frontend-domain.com/invite/accept?token={invitation_token}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Team Invitation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #16a34a;">Biashara Pro</h1>
                </div>
                
                <h2>You're invited to join {business_name}!</h2>
                
                <p>Hi {to_name},</p>
                
                <p>{invited_by_name} has invited you to join <strong>{business_name}</strong> as a <strong>{role}</strong> on Biashara Pro.</p>
                
                {f'<p><em>"{custom_message}"</em></p>' if custom_message else ''}
                
                <p>Biashara Pro is a comprehensive business management platform designed specifically for Kenyan entrepreneurs. You'll be able to:</p>
                
                <ul>
                    <li>Manage inventory and track stock levels</li>
                    <li>Process M-Pesa payments</li>
                    <li>Track sales and analytics</li>
                    <li>Manage customer relationships</li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{invitation_url}" 
                       style="background-color: #16a34a; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Accept Invitation
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #666;">
                    This invitation will expire in 7 days. If you have any questions, 
                    please contact {invited_by_name} directly.
                </p>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                
                <p style="font-size: 12px; color: #999; text-align: center;">
                    © 2024 Biashara Pro. Made with ❤️ for Kenyan businesses.
                </p>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        You're invited to join {business_name}!
        
        Hi {to_name},
        
        {invited_by_name} has invited you to join {business_name} as a {role} on Biashara Pro.
        
        {custom_message if custom_message else ''}
        
        To accept this invitation, please visit: {invitation_url}
        
        This invitation will expire in 7 days.
        
        © 2024 Biashara Pro
        """
        
        await self.send_email(to_email, subject, html_content, text_content)
