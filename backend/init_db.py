# Robostaan Store Backend Initialization

import sqlite3
import json
from datetime import datetime

def init_database():
    """Initialize the database with sample data"""
    print("Initializing database with sample data...")
    
    # Connect to SQLite database
    conn = sqlite3.connect('electronics_store.db')
    cursor = conn.cursor()
    
    # Create tables if they don't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        stock_quantity INTEGER NOT NULL,
        category_id INTEGER,
        brand TEXT,
        model TEXT,
        specifications TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    )
    ''')
    
    # Sample categories
    categories = [
        {"name": "Robotics", "description": "Educational and DIY robotics kits"},
        {"name": "Microcontrollers", "description": "Arduino, ESP32, and other development boards"},
        {"name": "Sensors", "description": "Various sensors for robotics and IoT projects"},
        {"name": "Components", "description": "Electronic components for DIY projects"},
        {"name": "Tools", "description": "Tools for electronics and robotics enthusiasts"},
        {"name": "Learning Kits", "description": "Educational kits for beginners and advanced users"}
    ]
    
    # Insert categories
    cursor.execute("DELETE FROM categories")
    for category in categories:
        cursor.execute(
            "INSERT INTO categories (name, description) VALUES (?, ?)",
            (category["name"], category["description"])
        )
    
    # Sample products
    products = [
        {
            "name": "Arduino Uno R3",
            "description": "Popular microcontroller board for beginners and advanced projects",
            "price": 23.99,
            "stock_quantity": 100,
            "category_id": 2,
            "brand": "Arduino",
            "model": "A000066",
            "specifications": json.dumps({
                "microcontroller": "ATmega328P",
                "operating_voltage": "5V",
                "digital_pins": "14 (6 PWM)",
                "analog_pins": "6"
            })
        },
        {
            "name": "Raspberry Pi 4 Model B",
            "description": "Powerful single-board computer for robotics and IoT projects",
            "price": 45.99,
            "stock_quantity": 50,
            "category_id": 2,
            "brand": "Raspberry Pi Foundation",
            "model": "RP4-4GB",
            "specifications": json.dumps({
                "processor": "Broadcom BCM2711 (1.5GHz)",
                "memory": "4GB LPDDR4",
                "connectivity": "2.4/5GHz WiFi, Bluetooth 5.0, Gigabit Ethernet",
                "ports": "2x USB 3.0, 2x USB 2.0, 2x micro-HDMI"
            })
        },
        {
            "name": "ESP32 Development Board",
            "description": "WiFi & Bluetooth enabled microcontroller for IoT applications",
            "price": 12.99,
            "stock_quantity": 150,
            "category_id": 2,
            "brand": "Espressif Systems",
            "model": "ESP32-WROOM-32",
            "specifications": json.dumps({
                "processor": "Dual-core Xtensa LX6",
                "connectivity": "WiFi 802.11 b/g/n, Bluetooth 4.2",
                "gpio": "36 pins",
                "flash": "4MB"
            })
        },
        {
            "name": "Robot Car Kit",
            "description": "DIY robot car kit with motors, chassis, and wheels",
            "price": 29.99,
            "stock_quantity": 75,
            "category_id": 1,
            "brand": "ELEGOO",
            "model": "RBT-001",
            "specifications": json.dumps({
                "components": "Chassis, 4 DC motors, wheels, battery holder",
                "compatibility": "Arduino, Raspberry Pi",
                "difficulty": "Beginner to Intermediate",
                "assembly_time": "1-2 hours"
            })
        },
        {
            "name": "Breadboard Kit",
            "description": "Solderless breadboard with jumper wires for prototyping",
            "price": 9.99,
            "stock_quantity": 200,
            "category_id": 4,
            "brand": "MCIGICM",
            "model": "BB-830",
            "specifications": json.dumps({
                "size": "830 tie points",
                "includes": "65pcs jumper wires",
                "material": "ABS plastic",
                "power_rails": "2 on each side"
            })
        },
        {
            "name": "DHT22 Temperature & Humidity Sensor",
            "description": "Digital temperature and humidity sensor for environmental monitoring",
            "price": 4.99,
            "stock_quantity": 120,
            "category_id": 3,
            "brand": "Aosong Electronics",
            "model": "AM2302",
            "specifications": json.dumps({
                "temperature_range": "-40 to 80°C",
                "humidity_range": "0-100% RH",
                "accuracy": "±0.5°C, ±2% RH",
                "interface": "Single-wire digital"
            })
        },
        {
            "name": "MPU6050 Accelerometer & Gyroscope",
            "description": "6-axis motion tracking sensor for robotics and IoT",
            "price": 5.99,
            "stock_quantity": 100,
            "category_id": 3,
            "brand": "InvenSense",
            "model": "MPU-6050",
            "specifications": json.dumps({
                "accelerometer": "±2g, ±4g, ±8g, ±16g",
                "gyroscope": "±250, ±500, ±1000, ±2000°/s",
                "interface": "I2C",
                "voltage": "3-5V"
            })
        },
        {
            "name": "Digital Multimeter",
            "description": "Essential tool for measuring voltage, current, and resistance",
            "price": 19.99,
            "stock_quantity": 50,
            "category_id": 5,
            "brand": "ANENG",
            "model": "AN8008",
            "specifications": json.dumps({
                "display": "LCD 6000 counts",
                "measurements": "AC/DC voltage, current, resistance, capacitance",
                "features": "Auto-ranging, continuity test, diode test",
                "safety": "CAT III 600V"
            })
        },
        {
            "name": "Beginner Electronics Kit",
            "description": "Complete starter kit for learning electronics",
            "price": 39.99,
            "stock_quantity": 30,
            "category_id": 6,
            "brand": "Texas Instruments",
            "model": "STEM-KIT-01",
            "specifications": json.dumps({
                "components": "Resistors, capacitors, LEDs, transistors, ICs",
                "tools": "Mini breadboard, jumper wires, wire stripper",
                "projects": "15 beginner-friendly projects",
                "guide": "200-page illustrated guide"
            })
        }
    ]
    
    # Insert products
    cursor.execute("DELETE FROM products")
    for product in products:
        cursor.execute(
            "INSERT INTO products (name, description, price, stock_quantity, category_id, brand, model, specifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (product["name"], product["description"], product["price"], product["stock_quantity"], product["category_id"], product["brand"], product["model"], product["specifications"])
        )
    
    # Create users table if it doesn't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        hashed_password TEXT NOT NULL,
        full_name TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        email_verified BOOLEAN DEFAULT FALSE,
        email_verification_token TEXT,
        verification_token_expires TIMESTAMP,
        last_login TIMESTAMP,
        login_attempts INTEGER DEFAULT 0,
        account_locked_until TIMESTAMP
    )
    ''')
    
    # Commit changes and close connection
    conn.commit()
    conn.close()
    
    return categories, products

if __name__ == "__main__":
    print("Seeding database for Robostaan Store...")
    categories, products = init_database()
    print(f"Successfully created {len(categories)} categories and {len(products)} products")
    print("Database initialization complete!")