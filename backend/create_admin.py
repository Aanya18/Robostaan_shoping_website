#!/usr/bin/env python3
"""
Single Admin User Setup Script
Creates ONLY ONE admin user for  with fixed credentials.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import sessionmaker
from app.core.database import engine
from app.core.security import get_password_hash
from app.models import models

# Create database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# FIXED ADMIN CREDENTIALS - 
ADMIN_USERNAME = "admin@robostaan.com"
ADMIN_PASSWORD = "ROBOSTAAN2024"
ADMIN_DETAILS = {
    "first_name": "Super",
    "last_name": "Admin", 
    "phone": "+91 8439781538",
    "address": "Sector 63, Noida",
    "city": "Delhi",
    "postal_code": "110001",
    "country": "India"
}

def create_single_admin():
    """Create only one admin user with fixed credentials"""
    db = SessionLocal()
    
    try:
        # First, remove admin privileges from all existing users
        existing_admins = db.query(models.User).filter(models.User.is_admin == True).all()
        for admin in existing_admins:
            admin.is_admin = False
            print(f" Removed admin privileges from: {admin.email}")
        
        # Check if our specific admin already exists
        main_admin = db.query(models.User).filter(models.User.email == ADMIN_USERNAME).first()
        
        if main_admin:
            # Update existing user to be the only admin
            main_admin.is_admin = True
            main_admin.is_active = True
            main_admin.first_name = ADMIN_DETAILS["first_name"]
            main_admin.last_name = ADMIN_DETAILS["last_name"]
            main_admin.phone = ADMIN_DETAILS["phone"]
            main_admin.address = ADMIN_DETAILS["address"]
            main_admin.city = ADMIN_DETAILS["city"]
            main_admin.postal_code = ADMIN_DETAILS["postal_code"]
            main_admin.country = ADMIN_DETAILS["country"]
            
            # Update password
            main_admin.hashed_password = get_password_hash(ADMIN_PASSWORD)
            
            db.commit()
            print(" Updated existing user to be the single admin!")
        else:
            # Create new admin user
            hashed_password = get_password_hash(ADMIN_PASSWORD)
            
            admin_user = models.User(
                email=ADMIN_USERNAME,
                hashed_password=hashed_password,
                first_name=ADMIN_DETAILS["first_name"],
                last_name=ADMIN_DETAILS["last_name"],
                phone=ADMIN_DETAILS["phone"],
                address=ADMIN_DETAILS["address"],
                city=ADMIN_DETAILS["city"],
                postal_code=ADMIN_DETAILS["postal_code"],
                country=ADMIN_DETAILS["country"],
                is_active=True,
                is_admin=True
            )
            
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
            print(" Created new single admin user!")
        
        # Verify only one admin exists
        total_admins = db.query(models.User).filter(models.User.is_admin == True).count()
        
        print("\n" + "="*50)
        print(" SINGLE ADMIN SETUP COMPLETE!")
        print("="*50)
        print(f"👤 Username: {ADMIN_USERNAME}")
        print(f"🔐 Password: {ADMIN_PASSWORD}")
        print(f"🔢 Total Admins: {total_admins} (Should be 1)")
        print(f"📍 Location: {ADMIN_DETAILS['city']}, {ADMIN_DETAILS['country']}")
        print("="*50)
        print("🚀 Ready to login at: http://localhost:3000/admin")
        print("="*50)
        
        # Save credentials to file for reference
        with open("admin_credentials.txt", "w", encoding="utf-8") as f:
            f.write("ROBOSTAAN!! - ADMIN CREDENTIALS\n")
            f.write("=====================================\n")
            f.write(f"Username: {ADMIN_USERNAME}\n")
            f.write(f"Password: {ADMIN_PASSWORD}\n")
            f.write(f"Admin Panel: http://localhost:3000/admin\n")
            f.write(f"Created: {ADMIN_DETAILS['first_name']} {ADMIN_DETAILS['last_name']}\n")
            f.write(f"Location: {ADMIN_DETAILS['city']}, {ADMIN_DETAILS['country']}\n")
            f.write("=====================================\n")
        
        print(" Credentials saved to: admin_credentials.txt")
        
    except Exception as e:
        db.rollback()
        print(f" Error creating single admin: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    print("🔧 Setting up SINGLE ADMIN for ROBOSTAAN! Please wait....")
    create_single_admin()
