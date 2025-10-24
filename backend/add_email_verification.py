from sqlalchemy import create_engine, Column, Boolean, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
import os
from datetime import datetime

# Get database URL from environment or use default
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./electronics_store.db")
print(f"Using database: {DATABASE_URL}")

# Create engine
engine = create_engine(DATABASE_URL)

# Add the missing columns
with engine.connect() as connection:
    try:
        # Check if columns already exist
        result = connection.execute(text("PRAGMA table_info(users)"))
        columns = [row[1] for row in result]
        
        # Add email_verified column if it doesn't exist
        if "email_verified" not in columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT 0"))
            print("Added email_verified column")
        
        # Add email_verification_token column if it doesn't exist
        if "email_verification_token" not in columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN email_verification_token VARCHAR"))
            print("Added email_verification_token column")
        
        # Add verification_token_expires column if it doesn't exist
        if "verification_token_expires" not in columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN verification_token_expires TIMESTAMP"))
            print("Added verification_token_expires column")
        
        # Add last_login column if it doesn't exist
        if "last_login" not in columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN last_login TIMESTAMP"))
            print("Added last_login column")
        
        # Add login_attempts column if it doesn't exist
        if "login_attempts" not in columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN login_attempts INTEGER DEFAULT 0"))
            print("Added login_attempts column")
        
        # Add account_locked_until column if it doesn't exist
        if "account_locked_until" not in columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN account_locked_until TIMESTAMP"))
            print("Added account_locked_until column")
        
        print("Database migration completed successfully!")
        
    except Exception as e:
        print(f"Error during migration: {e}")