from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Optional
from datetime import datetime, timedelta
from app.core.database import get_db
from app.models import models, schemas
from app.api.auth import get_current_admin_user
import json

router = APIRouter()

# Dashboard & Analytics
@router.get("/dashboard")
def get_admin_dashboard(
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get admin dashboard statistics"""
    
    # Basic counts
    total_users = db.query(models.User).count()
    total_products = db.query(models.Product).count()
    active_products = db.query(models.Product).filter(models.Product.is_active == True).count()
    total_categories = db.query(models.Category).count()
    total_orders = db.query(models.Order).count()
    
    # Revenue calculations
    total_revenue = db.query(func.sum(models.Order.total_amount)).scalar() or 0
    
    # Recent orders
    recent_orders = db.query(models.Order).order_by(desc(models.Order.created_at)).limit(5).all()
    
    # Low stock products
    low_stock_products = db.query(models.Product).filter(
        models.Product.stock_quantity < 10,
        models.Product.is_active == True
    ).limit(10).all()
    
    # Order status distribution
    order_status_stats = db.query(
        models.Order.status,
        func.count(models.Order.id).label('count')
    ).group_by(models.Order.status).all()
    
    return {
        "statistics": {
            "total_users": total_users,
            "total_products": total_products,
            "active_products": active_products,
            "inactive_products": total_products - active_products,
            "total_categories": total_categories,
            "total_orders": total_orders,
            "total_revenue": float(total_revenue)
        },
        "recent_orders": [
            {
                "id": order.id,
                "order_number": order.order_number,
                "user_id": order.user_id,
                "total_amount": order.total_amount,
                "status": order.status,
                "created_at": order.created_at
            } for order in recent_orders
        ],
        "low_stock_products": [
            {
                "id": product.id,
                "name": product.name,
                "stock_quantity": product.stock_quantity,
                "price": product.price
            } for product in low_stock_products
        ],
        "order_status_distribution": [
            {
                "status": status,
                "count": count
            } for status, count in order_status_stats
        ]
    }

@router.get("/public-stats")
def get_public_stats(db: Session = Depends(get_db)):
    """Get public statistics without authentication"""
    
    # Basic counts only
    total_users = db.query(models.User).count()
    total_products = db.query(models.Product).filter(models.Product.is_active == True).count()
    total_categories = db.query(models.Category).count()
    total_orders = db.query(models.Order).count()
    
    # Recent users (last 5)
    recent_users = db.query(models.User).order_by(desc(models.User.created_at)).limit(5).all()
    
    return {
        "statistics": {
            "total_users": total_users,
            "total_products": total_products,
            "total_categories": total_categories,
            "total_orders": total_orders,
            "total_revenue": 0  # Hide revenue for public
        },
        "recent_users": [
            {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "created_at": user.created_at,
                "is_admin": user.is_admin
            } for user in recent_users
        ],
        "recent_orders": [],  # Hide orders for public
        "low_stock_products": [],  # Hide stock info for public
        "order_status_distribution": []  # Hide order distribution for public
    }

# User Management
@router.get("/users", response_model=List[schemas.User])
def get_all_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    search: Optional[str] = None,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all users with pagination and search"""
    
    query = db.query(models.User)
    
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.User.email.ilike(search_filter)) |
            (models.User.first_name.ilike(search_filter)) |
            (models.User.last_name.ilike(search_filter))
        )
    
    users = query.order_by(desc(models.User.created_at)).offset(skip).limit(limit).all()
    return users

@router.put("/users/{user_id}/toggle-admin")
def toggle_user_admin_status(
    user_id: int,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Toggle admin status of a user - ONLY ONE ADMIN ALLOWED"""
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == admin_user.id:
        raise HTTPException(status_code=400, detail="Cannot modify your own admin status")
    
    # If trying to make someone admin, first remove all other admin privileges
    if not user.is_admin:  # Making user admin
        # Remove admin from all other users first
        other_admins = db.query(models.User).filter(
            models.User.is_admin == True,
            models.User.id != user_id
        ).all()
        
        for other_admin in other_admins:
            other_admin.is_admin = False
        
        user.is_admin = True
        message = f"User is now the ONLY admin (removed admin privileges from {len(other_admins)} other users)"
    else:  # Removing admin
        user.is_admin = False
        message = "Admin privileges revoked"
    
    db.commit()
    
    return {
        "message": message,
        "user_id": user_id,
        "is_admin": user.is_admin,
        "total_admins": db.query(models.User).filter(models.User.is_admin == True).count()
    }

@router.put("/users/{user_id}/toggle-active")
def toggle_user_active_status(
    user_id: int,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Toggle active status of a user"""
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == admin_user.id:
        raise HTTPException(status_code=400, detail="Cannot deactivate your own account")
    
    user.is_active = not user.is_active
    db.commit()
    
    return {
        "message": f"User {'activated' if user.is_active else 'deactivated'}",
        "user_id": user_id,
        "is_active": user.is_active
    }

# Product Management
@router.get("/products")
def get_all_products_admin(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    include_inactive: bool = Query(False),
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all products for admin with advanced filtering"""
    
    query = db.query(models.Product)
    
    if not include_inactive:
        query = query.filter(models.Product.is_active == True)
    
    if category_id:
        query = query.filter(models.Product.category_id == category_id)
    
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.Product.name.ilike(search_filter)) |
            (models.Product.description.ilike(search_filter)) |
            (models.Product.brand.ilike(search_filter)) |
            (models.Product.model.ilike(search_filter))
        )
    
    products = query.order_by(desc(models.Product.created_at)).offset(skip).limit(limit).all()
    
    # Format products with additional admin info
    result = []
    for product in products:
        product_dict = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "stock_quantity": product.stock_quantity,
            "category_id": product.category_id,
            "brand": product.brand,
            "model": product.model,
            "specifications": product.specifications,
            "is_active": product.is_active,
            "created_at": product.created_at,
            "updated_at": product.updated_at,
            "has_image": product.image_data is not None
        }
        
        # Parse specifications if it's a JSON string
        if product.specifications:
            try:
                product_dict["specifications"] = json.loads(product.specifications)
            except:
                product_dict["specifications"] = product.specifications
        
        result.append(product_dict)
    
    return {
        "products": result,
        "total": query.count()
    }

@router.post("/products", response_model=schemas.Product)
def create_product_admin(
    product: schemas.ProductCreate,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new product (admin only)"""
    
    # Check if category exists
    category = db.query(models.Category).filter(models.Category.id == product.category_id).first()
    if not category:
        raise HTTPException(status_code=400, detail="Category not found")
    
    # Convert specifications to JSON string if it's a dict
    product_data = product.dict()
    if isinstance(product_data.get("specifications"), dict):
        product_data["specifications"] = json.dumps(product_data["specifications"])
    
    db_product = models.Product(**product_data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    return schemas.Product(**{**db_product.__dict__, "has_image": False})

@router.put("/products/{product_id}")
def update_product_admin(
    product_id: int,
    product: schemas.ProductCreate,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update a product (admin only)"""
    
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if category exists
    category = db.query(models.Category).filter(models.Category.id == product.category_id).first()
    if not category:
        raise HTTPException(status_code=400, detail="Category not found")
    
    # Update product fields
    product_data = product.dict()
    if isinstance(product_data.get("specifications"), dict):
        product_data["specifications"] = json.dumps(product_data["specifications"])
    
    for field, value in product_data.items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    
    return {
        "message": "Product updated successfully",
        "product_id": product_id
    }

@router.put("/products/{product_id}/toggle-active")
def toggle_product_active_status(
    product_id: int,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Toggle active status of a product"""
    
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.is_active = not product.is_active
    db.commit()
    
    return {
        "message": f"Product {'activated' if product.is_active else 'deactivated'}",
        "product_id": product_id,
        "is_active": product.is_active
    }

@router.delete("/products/{product_id}")
def delete_product_admin(
    product_id: int,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a product (admin only)"""
    
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if product is in any orders
    order_items = db.query(models.OrderItem).filter(models.OrderItem.product_id == product_id).first()
    if order_items:
        raise HTTPException(
            status_code=400, 
            detail="Cannot delete product that exists in orders. Deactivate instead."
        )
    
    # Delete cart items first
    db.query(models.CartItem).filter(models.CartItem.product_id == product_id).delete()
    
    # Delete product
    db.delete(product)
    db.commit()
    
    return {"message": "Product deleted successfully", "product_id": product_id}

# Category Management
@router.post("/categories", response_model=schemas.Category)
def create_category_admin(
    category: schemas.CategoryCreate,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new category (admin only)"""
    
    # Check if category name already exists
    existing_category = db.query(models.Category).filter(models.Category.name == category.name).first()
    if existing_category:
        raise HTTPException(status_code=400, detail="Category name already exists")
    
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    
    return db_category

@router.put("/categories/{category_id}")
def update_category_admin(
    category_id: int,
    category: schemas.CategoryCreate,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update a category (admin only)"""
    
    db_category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if category name already exists (excluding current category)
    existing_category = db.query(models.Category).filter(
        models.Category.name == category.name,
        models.Category.id != category_id
    ).first()
    if existing_category:
        raise HTTPException(status_code=400, detail="Category name already exists")
    
    # Update category fields
    for field, value in category.dict().items():
        setattr(db_category, field, value)
    
    db.commit()
    db.refresh(db_category)
    
    return {
        "message": "Category updated successfully",
        "category_id": category_id
    }

@router.delete("/categories/{category_id}")
def delete_category_admin(
    category_id: int,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a category (admin only)"""
    
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if category has products
    products_count = db.query(models.Product).filter(models.Product.category_id == category_id).count()
    if products_count > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete category with {products_count} products. Move products first."
        )
    
    db.delete(category)
    db.commit()
    
    return {"message": "Category deleted successfully", "category_id": category_id}

# Order Management
@router.get("/orders")
def get_all_orders_admin(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status_filter: Optional[str] = None,
    search: Optional[str] = None,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all orders for admin with filtering"""
    
    query = db.query(models.Order)
    
    if status_filter:
        query = query.filter(models.Order.status == status_filter)
    
    if search:
        # Search by order number or user email
        query = query.join(models.User).filter(
            (models.Order.order_number.ilike(f"%{search}%")) |
            (models.User.email.ilike(f"%{search}%")) |
            (models.User.first_name.ilike(f"%{search}%")) |
            (models.User.last_name.ilike(f"%{search}%"))
        )
    
    orders = query.order_by(desc(models.Order.created_at)).offset(skip).limit(limit).all()
    
    # Format orders with user info
    result = []
    for order in orders:
        user = db.query(models.User).filter(models.User.id == order.user_id).first()
        order_dict = {
            "id": order.id,
            "order_number": order.order_number,
            "user_id": order.user_id,
            "user_email": user.email if user else "Unknown",
            "user_name": f"{user.first_name} {user.last_name}" if user else "Unknown",
            "total_amount": order.total_amount,
            "status": order.status,
            "payment_status": order.payment_status,
            "payment_method": order.payment_method,
            "shipping_address": order.shipping_address,
            "created_at": order.created_at,
            "updated_at": order.updated_at
        }
        result.append(order_dict)
    
    return {
        "orders": result,
        "total": query.count()
    }

@router.put("/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str = Query(..., regex="^(pending|confirmed|processing|shipped|delivered|cancelled)$"),
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update order status (admin only)"""
    
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    old_status = order.status
    order.status = status
    db.commit()
    
    return {
        "message": f"Order status updated from '{old_status}' to '{status}'",
        "order_id": order_id,
        "old_status": old_status,
        "new_status": status
    }

@router.get("/orders/{order_id}")
def get_order_details_admin(
    order_id: int,
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get detailed order information (admin only)"""
    
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Get user info
    user = db.query(models.User).filter(models.User.id == order.user_id).first()
    
    # Get order items with product details
    order_items = db.query(models.OrderItem).filter(models.OrderItem.order_id == order_id).all()
    items_details = []
    
    for item in order_items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        items_details.append({
            "id": item.id,
            "product_id": item.product_id,
            "product_name": product.name if product else "Product not found",
            "quantity": item.quantity,
            "unit_price": item.unit_price,
            "total_price": item.total_price
        })
    
    return {
        "order": {
            "id": order.id,
            "order_number": order.order_number,
            "total_amount": order.total_amount,
            "status": order.status,
            "payment_status": order.payment_status,
            "payment_method": order.payment_method,
            "shipping_address": order.shipping_address,
            "billing_address": order.billing_address,
            "notes": order.notes,
            "created_at": order.created_at,
            "updated_at": order.updated_at
        },
        "user": {
            "id": user.id,
            "email": user.email,
            "name": f"{user.first_name} {user.last_name}",
            "phone": user.phone
        } if user else None,
        "items": items_details
    }

# Inventory Management Functions (existing)
@router.post("/populate-electronics-inventory")
def populate_electronics_inventory(
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Populate database with professional electronics components inventory"""
    
    # Check if data already exists
    existing_categories = db.query(models.Category).count()
    if existing_categories > 0:
        return {"message": "Electronics inventory already exists", "status": "already_populated"}
    
    # Professional Electronics Categories
    categories_data = [
        {"name": "Microcontrollers & Development Boards", "description": "Arduino, Raspberry Pi, ESP32, STM32 and professional development platforms"},
        {"name": "Electronic Components", "description": "Resistors, Capacitors, Inductors, Transistors, Diodes, Integrated Circuits"},
        {"name": "Sensors & Modules", "description": "Temperature, Humidity, Motion, GPS, WiFi, Bluetooth sensor modules"},
        {"name": "Power Supply & Batteries", "description": "DC-DC converters, Battery packs, Solar panels, Voltage regulators"},
        {"name": "Test & Measurement Equipment", "description": "Digital Multimeters, Oscilloscopes, Function generators, Logic analyzers"},
        {"name": "Tools & Soldering Equipment", "description": "Soldering stations, Wire strippers, PCB tools, Electronic workbench tools"},
        {"name": "Displays & LED Modules", "description": "LCD, OLED, LED strips, Seven segment displays, Matrix displays"},
        {"name": "Communication & RF Modules", "description": "WiFi, Bluetooth, LoRa, Zigbee, RF transceiver modules"}
    ]
    
    # Create categories
    created_categories = []
    for cat_data in categories_data:
        category = models.Category(**cat_data)
        db.add(category)
        db.commit()
        db.refresh(category)
        created_categories.append(category)
    
    # Professional Electronics Components
    products_data = [
        # Microcontrollers & Development Boards
        {
            "name": "Arduino Uno R3 Original",
            "description": "Official Arduino Uno R3 with ATmega328P microcontroller, 14 digital I/O pins, 6 analog inputs",
            "price": 25.99,
            "stock_quantity": 150,
            "category_id": created_categories[0].id,
            "brand": "Arduino",
            "model": "A000066",
            "specifications": json.dumps({
                "microcontroller": "ATmega328P",
                "operating_voltage": "5V",
                "input_voltage": "7-12V",
                "digital_io_pins": "14 (6 PWM outputs)",
                "analog_input_pins": "6",
                "dc_current_per_io": "20mA",
                "flash_memory": "32KB (0.5KB bootloader)",
                "sram": "2KB",
                "eeprom": "1KB",
                "clock_speed": "16MHz",
                "usb_connector": "Type B",
                "power_jack": "2.1mm center-positive"
            })
        },
        {
            "name": "Raspberry Pi 4 Model B (8GB RAM)",
            "description": "High-performance ARM-based single-board computer with 8GB LPDDR4 RAM, dual 4K HDMI output",
            "price": 89.99,
            "stock_quantity": 75,
            "category_id": created_categories[0].id,
            "brand": "Raspberry Pi Foundation",
            "model": "RPI4-MODBP-8GB",
            "specifications": json.dumps({
                "processor": "Broadcom BCM2711 Quad-core Cortex-A72 64-bit SoC @ 1.5GHz",
                "ram": "8GB LPDDR4-3200 SDRAM",
                "connectivity": "2.4 GHz and 5.0 GHz IEEE 802.11ac wireless, Bluetooth 5.0, BLE",
                "gpio": "40-pin GPIO header (fully backwards compatible)",
                "video": "2 × micro-HDMI ports (up to 4Kp60 supported)",
                "multimedia": "H.265 (4Kp60 decode), H.264 (1080p60 decode, 1080p30 encode)",
                "usb": "2 × USB 3.0 ports, 2 × USB 2.0 ports",
                "ethernet": "Gigabit Ethernet",
                "camera": "2-lane MIPI CSI camera port",
                "display": "2-lane MIPI DSI display port",
                "storage": "microSD card slot for OS and data storage",
                "power": "5V DC via USB-C connector (minimum 3A)"
            })
        },
        {
            "name": "ESP32-WROOM-32 DevKit V1",
            "description": "ESP32 WiFi + Bluetooth development board with CP2102 USB-to-UART bridge, 30 GPIO pins",
            "price": 12.99,
            "stock_quantity": 200,
            "category_id": created_categories[0].id,
            "brand": "Espressif Systems",
            "model": "ESP32-DEVKITV1",
            "specifications": json.dumps({
                "processor": "Dual-core Tensilica LX6 microprocessor, up to 240MHz",
                "flash_memory": "4MB",
                "sram": "520KB",
                "wifi": "802.11 b/g/n Wi-Fi (2.4 GHz)",
                "bluetooth": "Bluetooth v4.2 BR/EDR and BLE",
                "gpio": "30 GPIO pins",
                "adc": "12-bit ADC with up to 18 channels",
                "dac": "2 × 8-bit DACs",
                "pwm": "16 PWM channels",
                "interfaces": "3 × UART, 3 × SPI, 2 × I2C, 2 × I2S",
                "operating_voltage": "3.3V",
                "input_voltage": "5V (via USB) or 3.3V-5V (via VIN pin)",
                "operating_temperature": "-40°C to +85°C"
            })
        },
        
        # Electronic Components
        {
            "name": "Resistor Assortment Kit (1/4W, 1%, 600 pieces)",
            "description": "High-precision metal film resistors kit with 30 different values from 1Ω to 10MΩ",
            "price": 15.99,
            "stock_quantity": 50,
            "category_id": created_categories[1].id,
            "brand": "ELEGOO",
            "model": "EL-CK-002",
            "specifications": json.dumps({
                "power_rating": "1/4W (0.25W)",
                "tolerance": "±1%",
                "type": "Metal Film",
                "quantity": "600 pieces (20 of each value)",
                "values": "30 different values",
                "resistance_range": "1Ω to 10MΩ",
                "temperature_coefficient": "±100ppm/°C",
                "operating_temperature": "-55°C to +155°C",
                "values_included": "1, 2.2, 4.7, 10, 22, 47, 100, 220, 470, 1K, 2.2K, 4.7K, 10K, 22K, 47K, 100K, 220K, 470K, 1M, 2.2M, 4.7M, 10M (Ohms)"
            })
        },
        {
            "name": "Ceramic & Electrolytic Capacitor Kit (1000 pieces)",
            "description": "Comprehensive capacitor assortment for analog and digital circuits, decoupling applications",
            "price": 22.99,
            "stock_quantity": 40,
            "category_id": created_categories[1].id,
            "brand": "MCIGICM",
            "model": "CAP-KIT-1000",
            "specifications": json.dumps({
                "types": "Ceramic Disc and Electrolytic Aluminum",
                "quantity": "1000 pieces total",
                "ceramic_capacitors": {
                    "type": "Ceramic disc (50V)",
                    "values": "10pF, 22pF, 47pF, 100pF, 220pF, 470pF, 1nF, 2.2nF, 4.7nF, 10nF, 22nF, 47nF, 100nF",
                    "tolerance": "±20%"
                },
                "electrolytic_capacitors": {
                    "type": "Aluminum electrolytic", 
                    "values": "0.1µF to 1000µF",
                    "voltage_ratings": "16V, 25V, 50V",
                    "tolerance": "±20%",
                    "temperature_range": "-40°C to +105°C"
                }
            })
        },
        
        # Sensors & Modules
        {
            "name": "DHT22 Temperature & Humidity Sensor Module",
            "description": "High-precision digital temperature and humidity sensor with single-wire digital interface",
            "price": 8.99,
            "stock_quantity": 120,
            "category_id": created_categories[2].id,
            "brand": "Aosong Electronics",
            "model": "DHT22/AM2302",
            "specifications": json.dumps({
                "temperature_range": "-40°C to +80°C",
                "temperature_accuracy": "±0.5°C",
                "temperature_resolution": "0.1°C",
                "humidity_range": "0% to 100% RH",
                "humidity_accuracy": "±2% RH (at 25°C)",
                "humidity_resolution": "0.1% RH",
                "operating_voltage": "3.3V to 6V",
                "supply_current": "1-1.5mA (during measurement)",
                "output": "Single-wire digital",
                "sampling_period": "2 seconds",
                "dimensions": "15.1mm x 25mm x 7.7mm",
                "operating_temperature": "-40°C to +80°C"
            })
        },
        {
            "name": "MPU6050 6-Axis IMU Gyroscope Accelerometer Module",
            "description": "6-axis motion tracking device combining 3-axis gyroscope and 3-axis accelerometer with I2C interface",
            "price": 6.99,
            "stock_quantity": 80,
            "category_id": created_categories[2].id,
            "brand": "InvenSense",
            "model": "MPU-6050",
            "specifications": json.dumps({
                "gyroscope": {
                    "range": "±250, ±500, ±1000, ±2000°/sec",
                    "sensitivity": "131, 65.5, 32.8, 16.4 LSB/(°/sec)"
                },
                "accelerometer": {
                    "range": "±2g, ±4g, ±8g, ±16g",
                    "sensitivity": "16384, 8192, 4096, 2048 LSB/g"
                },
                "adc": "16-bit ADC",
                "interface": "I2C (up to 400kHz)",
                "operating_voltage": "3.3V",
                "supply_current": "3.9mA (typical)",
                "temperature_sensor": "Built-in with ±1°C accuracy",
                "package": "QFN 4x4x0.9mm (24-pin)",
                "operating_temperature": "-40°C to +85°C"
            })
        },
        
        # Test & Measurement
        {
            "name": "ANENG AN8008 True RMS Digital Multimeter",
            "description": "Professional auto-ranging digital multimeter with True RMS AC measurement and 9999 count display",
            "price": 35.99,
            "stock_quantity": 25,
            "category_id": created_categories[4].id,
            "brand": "ANENG",
            "model": "AN8008",
            "specifications": json.dumps({
                "display": "9999 counts LCD with backlight",
                "dc_voltage": "600mV~1000V ±(0.5%+3)",
                "ac_voltage": "600mV~750V ±(0.8%+3) (True RMS)",
                "dc_current": "60mA~10A ±(0.8%+3)",
                "ac_current": "60mA~10A ±(1.0%+3) (True RMS)",
                "resistance": "600Ω~60MΩ ±(0.8%+3)",
                "frequency": "10Hz~10MHz ±(0.1%+3)",
                "capacitance": "6nF~60mF ±(4%+5)",
                "temperature": "-40°C~1000°C ±(1%+3)",
                "features": "True RMS, Auto-ranging, Data hold, Backlight, Auto power off",
                "safety_rating": "CAT III 1000V, CAT IV 600V",
                "power": "3 × AAA batteries"
            })
        },
        
        # Power Supply
        {
            "name": "LM2596 Adjustable DC-DC Step Down Module",
            "description": "High-efficiency switching voltage regulator module with adjustable output voltage",
            "price": 4.99,
            "stock_quantity": 100,
            "category_id": created_categories[3].id,
            "brand": "Texas Instruments",
            "model": "LM2596S-ADJ",
            "specifications": json.dumps({
                "input_voltage": "4V to 40V DC",
                "output_voltage": "1.25V to 37V DC (adjustable)",
                "output_current": "3A maximum",
                "efficiency": "92% (typical)",
                "switching_frequency": "150KHz",
                "load_regulation": "±0.5%",
                "line_regulation": "±0.2%",
                "ripple": "<30mV",
                "protection": "Over-current protection, Thermal shutdown",
                "operating_temperature": "-40°C to +125°C",
                "dimensions": "43mm x 21mm x 14mm",
                "weight": "8g"
            })
        }
    ]
    
    # Create products
    created_products = []
    for prod_data in products_data:
        product = models.Product(**prod_data)
        db.add(product)
        db.commit()
        db.refresh(product)
        created_products.append(product)
    
    return {
        "message": "Professional electronics inventory populated successfully",
        "categories_created": len(created_categories),
        "products_created": len(created_products),
        "inventory_type": "Professional Electronics Components",
        "status": "success"
    }

@router.delete("/clear-inventory")
def clear_inventory(
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Clear all existing inventory data from database"""
    
    try:
        # Delete all data in correct order (respect foreign key constraints)
        deleted_order_items = db.query(models.OrderItem).delete()
        deleted_orders = db.query(models.Order).delete()
        deleted_cart_items = db.query(models.CartItem).delete()
        deleted_products = db.query(models.Product).delete()
        deleted_categories = db.query(models.Category).delete()
        
        db.commit()
        
        return {
            "message": "All inventory data cleared successfully",
            "deleted": {
                "categories": deleted_categories,
                "products": deleted_products,
                "cart_items": deleted_cart_items,
                "orders": deleted_orders,
                "order_items": deleted_order_items
            },
            "status": "success"
        }
    except Exception as e:
        db.rollback()
        return {
            "message": "Error clearing inventory data",
            "error": str(e),
            "status": "error"
        }

@router.get("/inventory-status")
def get_inventory_status(
    admin_user: models.User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get current inventory status and statistics"""
    
    categories_count = db.query(models.Category).count()
    products_count = db.query(models.Product).count()
    active_products = db.query(models.Product).filter(models.Product.is_active == True).count()
    
    return {
        "inventory_status": "populated" if categories_count > 0 else "empty",
        "statistics": {
            "categories": categories_count,
            "total_products": products_count,
            "active_products": active_products,
            "inactive_products": products_count - active_products
        }
    }
