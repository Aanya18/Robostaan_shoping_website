# Electronics Store Backend Initialization

import sqlite3
import json
from datetime import datetime

def init_database():
    """Initialize the database with sample data"""
    print("Initializing database with sample data...")
    
    # Sample categories
    categories = [
        {"name": "Smartphones", "description": "Latest smartphones and mobile devices"},
        {"name": "Laptops", "description": "High-performance laptops and notebooks"},
        {"name": "Audio", "description": "Headphones, speakers, and audio equipment"},
        {"name": "Gaming", "description": "Gaming consoles, accessories, and peripherals"},
        {"name": "Smart Home", "description": "IoT devices and smart home automation"},
        {"name": "Accessories", "description": "Cables, chargers, and other accessories"}
    ]
    
    # Sample products
    products = [
        {
            "name": "iPhone 15 Pro",
            "description": "Latest flagship smartphone with advanced camera system",
            "price": 999.99,
            "stock_quantity": 50,
            "category_id": 1,
            "brand": "Apple",
            "model": "A2848",
            "specifications": json.dumps({
                "display": "6.1-inch Super Retina XDR",
                "processor": "A17 Pro chip",
                "storage": "128GB",
                "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
            })
        },
        {
            "name": "MacBook Pro 14-inch",
            "description": "Professional laptop with M3 Pro chip",
            "price": 1999.99,
            "stock_quantity": 25,
            "category_id": 2,
            "brand": "Apple",
            "model": "MBA14-M3",
            "specifications": json.dumps({
                "processor": "Apple M3 Pro",
                "memory": "18GB unified memory",
                "storage": "512GB SSD",
                "display": "14.2-inch Liquid Retina XDR"
            })
        },
        {
            "name": "Sony WH-1000XM5",
            "description": "Premium noise-canceling headphones",
            "price": 399.99,
            "stock_quantity": 100,
            "category_id": 3,
            "brand": "Sony",
            "model": "WH-1000XM5",
            "specifications": json.dumps({
                "type": "Over-ear",
                "battery": "30 hours",
                "noise_cancellation": "Industry-leading",
                "connectivity": "Bluetooth 5.2"
            })
        },
        {
            "name": "PlayStation 5",
            "description": "Next-generation gaming console",
            "price": 499.99,
            "stock_quantity": 30,
            "category_id": 4,
            "brand": "Sony",
            "model": "CFI-1200A",
            "specifications": json.dumps({
                "processor": "AMD Zen 2",
                "graphics": "AMD RDNA 2",
                "storage": "825GB SSD",
                "memory": "16GB GDDR6"
            })
        },
        {
            "name": "Amazon Echo Dot (5th Gen)",
            "description": "Smart speaker with Alexa",
            "price": 49.99,
            "stock_quantity": 200,
            "category_id": 5,
            "brand": "Amazon",
            "model": "B09B8V1LZ3",
            "specifications": json.dumps({
                "voice_assistant": "Alexa",
                "connectivity": "Wi-Fi, Bluetooth",
                "audio": "1.6-inch front-firing speaker",
                "smart_home": "Compatible with thousands of devices"
            })
        },
        {
            "name": "USB-C to Lightning Cable",
            "description": "Fast charging cable for iPhone",
            "price": 19.99,
            "stock_quantity": 500,
            "category_id": 6,
            "brand": "Apple",
            "model": "MQGH2AM/A",
            "specifications": json.dumps({
                "length": "1 meter",
                "compatibility": "iPhone, iPad",
                "charging": "Fast charging up to 20W",
                "data_transfer": "USB 2.0"
            })
        }
    ]
    
    return categories, products

if __name__ == "__main__":
    print("Sample data prepared for electronics store!")
    categories, products = init_database()
    print(f"Created {len(categories)} categories and {len(products)} products")
    
    # You can run this script after starting the FastAPI server
    # to populate the database with sample data via API calls


def create_tables():
    """Create all tables defined in SQLAlchemy models.

    This helper is intended for development with the bundled SQLite DB.
    It will run SQLAlchemy metadata.create_all to ensure new tables (like
    `support_tickets`) are created after changing models.
    """
    from app.core.database import engine
    from app.models import models

    models.Base.metadata.create_all(bind=engine)
    print("All tables created/updated.")


if __name__ == "__main__":
    # Default action: create tables and optionally print sample counts
    create_tables()