import smtplib
import secrets
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from typing import Optional
import os
from jinja2 import Template

class EmailService:
    def __init__(self):
        # Email configuration - should be moved to environment variables
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.email = os.getenv("EMAIL_USERNAME", "robostaan@gmail.com")
        self.password = os.getenv("EMAIL_PASSWORD", "hgmg dpgi lttr lxhp")
        self.from_name = os.getenv("EMAIL_FROM_NAME","Robostaan")
        
    def _send_email(self, to_email: str, subject: str, html_content: str, text_content: str = None):
        """Send email using SMTP"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{self.from_name} <{self.email}>"
            msg['To'] = to_email
            
            # Add text and HTML parts
            if text_content:
                text_part = MIMEText(text_content, 'plain')
                msg.attach(text_part)
            
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.email, self.password)
                server.send_message(msg)
            
            return True
        except Exception as e:
            print(f"Email sending failed: {e}")
            return False
    
    def generate_verification_token(self) -> str:
        """Generate a secure verification token"""
        return secrets.token_urlsafe(32)
    
    def send_verification_email(self, user_email: str, user_name: str, verification_token: str) -> bool:
        """Send email verification email"""
        verification_link = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/verify-email?token={verification_token}"
        
        subject = "Verify Your Email - Maxbot Electronics"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Verify Your Email - Maxbot Electronics</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #f97316; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }}
                .button {{ background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔧 Maxbot Electronics</h1>
                    <p>Welcome to our platform!</p>
                </div>
                <div class="content">
                    <h2>Hello {user_name}!</h2>
                    <p>Thank you for registering with Maxbot Electronics. To complete your registration and start shopping for electronics and manufacturing services, please verify your email address.</p>
                    
                    <p>Click the button below to verify your email:</p>
                    <a href="{verification_link}" class="button">Verify Email Address</a>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; background: #e5e5e5; padding: 10px; border-radius: 4px;">{verification_link}</p>
                    
                    <p><strong>Important:</strong> This verification link will expire in 24 hours for security reasons.</p>
                    
                    <p>If you didn't create an account with us, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>© 2024 Maxbot Electronics. All rights reserved.</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Welcome to Maxbot Electronics!
        
        Hello {user_name},
        
        Thank you for registering with Maxbot Electronics. To complete your registration, please verify your email address by clicking the link below:
        
        {verification_link}
        
        This link will expire in 24 hours.
        
        If you didn't create an account with us, please ignore this email.
        
        Best regards,
        Maxbot Electronics Team
        """
        
        return self._send_email(user_email, subject, html_content, text_content)
    
    def send_order_confirmation(self, user_email: str, user_name: str, order) -> bool:
        """Send order confirmation email"""
        subject = f"Order Confirmation - {order.order_number}"
        
        # Format order items
        items_html = ""
        items_text = ""
        for item in order.order_items:
            items_html += f"""
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{item.product.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.unit_price:.2f}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.total_price:.2f}</td>
            </tr>
            """
            items_text += f"- {item.product.name} (Qty: {item.quantity}) - ${item.total_price:.2f}\n"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Order Confirmation - Maxbot Electronics</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #f97316; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }}
                .order-details {{ background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }}
                .items-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
                .items-table th {{ background: #f97316; color: white; padding: 10px; text-align: left; }}
                .items-table td {{ padding: 10px; border-bottom: 1px solid #ddd; }}
                .total {{ font-size: 18px; font-weight: bold; color: #f97316; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔧 Maxbot Electronics</h1>
                    <p>Order Confirmation</p>
                </div>
                <div class="content">
                    <h2>Hello {user_name}!</h2>
                    <p>Thank you for your order! We've received your order and are processing it.</p>
                    
                    <div class="order-details">
                        <h3>Order Details</h3>
                        <p><strong>Order Number:</strong> {order.order_number}</p>
                        <p><strong>Order Date:</strong> {order.created_at.strftime('%B %d, %Y at %I:%M %p')}</p>
                        <p><strong>Status:</strong> {order.status.title()}</p>
                        <p><strong>Payment Method:</strong> {order.payment_method}</p>
                    </div>
                    
                    <h3>Order Items</h3>
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items_html}
                        </tbody>
                    </table>
                    
                    <div class="total">
                        <p>Total Amount: ${order.total_amount:.2f}</p>
                    </div>
                    
                    <div class="order-details">
                        <h3>Shipping Address</h3>
                        <p>{order.shipping_address}</p>
                    </div>
                    
                    <p>We'll send you another email when your order ships with tracking information.</p>
                    <p>If you have any questions, please contact our support team.</p>
                </div>
                <div class="footer">
                    <p>© 2024 Maxbot Electronics. All rights reserved.</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Order Confirmation - Maxbot Electronics
        
        Hello {user_name},
        
        Thank you for your order! We've received your order and are processing it.
        
        Order Details:
        - Order Number: {order.order_number}
        - Order Date: {order.created_at.strftime('%B %d, %Y at %I:%M %p')}
        - Status: {order.status.title()}
        - Payment Method: {order.payment_method}
        
        Order Items:
        {items_text}
        
        Total Amount: ${order.total_amount:.2f}
        
        Shipping Address:
        {order.shipping_address}
        
        We'll send you another email when your order ships with tracking information.
        
        Best regards,
        Maxbot Electronics Team
        """
        
        return self._send_email(user_email, subject, html_content, text_content)
    
    def send_order_status_update(self, user_email: str, user_name: str, order, new_status: str, notes: str = None) -> bool:
        """Send order status update email"""
        status_messages = {
            "confirmed": "Your order has been confirmed and is being prepared for shipment.",
            "processing": "Your order is being processed and prepared for shipment.",
            "shipped": "Great news! Your order has been shipped and is on its way to you.",
            "delivered": "Your order has been delivered successfully!",
            "cancelled": "Your order has been cancelled as requested."
        }
        
        subject = f"Order Update - {order.order_number} - {new_status.title()}"
        message = status_messages.get(new_status, f"Your order status has been updated to {new_status}.")
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Order Update - Maxbot Electronics</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #f97316; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }}
                .status-badge {{ background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; }}
                .order-details {{ background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔧 Maxbot Electronics</h1>
                    <p>Order Status Update</p>
                </div>
                <div class="content">
                    <h2>Hello {user_name}!</h2>
                    <p>{message}</p>
                    
                    <div class="order-details">
                        <h3>Order Information</h3>
                        <p><strong>Order Number:</strong> {order.order_number}</p>
                        <p><strong>Status:</strong> <span class="status-badge">{new_status.title()}</span></p>
                        <p><strong>Updated:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                        {f'<p><strong>Tracking Number:</strong> {order.tracking_number}</p>' if order.tracking_number else ''}
                        {f'<p><strong>Estimated Delivery:</strong> {order.estimated_delivery.strftime("%B %d, %Y") if order.estimated_delivery else "TBD"}</p>' if order.estimated_delivery else ''}
                        {f'<p><strong>Notes:</strong> {notes}</p>' if notes else ''}
                    </div>
                    
                    <p>You can track your order status anytime by logging into your account.</p>
                    <p>If you have any questions, please contact our support team.</p>
                </div>
                <div class="footer">
                    <p>© 2024 Maxbot Electronics. All rights reserved.</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Order Update - Maxbot Electronics
        
        Hello {user_name},
        
        {message}
        
        Order Information:
        - Order Number: {order.order_number}
        - Status: {new_status.title()}
        - Updated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
        {f'- Tracking Number: {order.tracking_number}' if order.tracking_number else ''}
        {f'- Estimated Delivery: {order.estimated_delivery.strftime("%B %d, %Y") if order.estimated_delivery else "TBD"}' if order.estimated_delivery else ''}
        {f'- Notes: {notes}' if notes else ''}
        
        You can track your order status anytime by logging into your account.
        
        Best regards,
        Maxbot Electronics Team
        """
        
        return self._send_email(user_email, subject, html_content, text_content)

# Global email service instance
email_service = EmailService()
