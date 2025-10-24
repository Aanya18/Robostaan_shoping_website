from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from datetime import datetime
from app.core.database import get_db
from app.models import models, schemas
from app.api.auth import get_current_user
from app.services.email import email_service

router = APIRouter()

@router.post("", response_model=schemas.Order)
def create_order(
    order_data: schemas.OrderCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get cart items
    cart_items = db.query(models.CartItem).filter(
        models.CartItem.user_id == current_user.id
    ).all()
    
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Calculate total
    total_amount = 0.0
    order_items_data = []
    
    for cart_item in cart_items:
        if cart_item.product.stock_quantity < cart_item.quantity:
            raise HTTPException(
                status_code=400, 
                detail=f"Insufficient stock for {cart_item.product.name}"
            )
        
        item_total = cart_item.product.price * cart_item.quantity
        total_amount += item_total
        
        order_items_data.append({
            "product_id": cart_item.product_id,
            "quantity": cart_item.quantity,
            "unit_price": cart_item.product.price,
            "total_price": item_total
        })
    
    # Generate order number
    order_number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
    
    # Create order
    db_order = models.Order(
        user_id=current_user.id,
        order_number=order_number,
        total_amount=total_amount,
        shipping_address=order_data.shipping_address,
        billing_address=order_data.billing_address or order_data.shipping_address,
        payment_method=order_data.payment_method,
        notes=order_data.notes
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Create order items
    for item_data in order_items_data:
        db_order_item = models.OrderItem(
            order_id=db_order.id,
            **item_data
        )
        db.add(db_order_item)
        
        # Update product stock
        product = db.query(models.Product).filter(
            models.Product.id == item_data["product_id"]
        ).first()
        product.stock_quantity -= item_data["quantity"]
    
    # Clear cart
    db.query(models.CartItem).filter(
        models.CartItem.user_id == current_user.id
    ).delete()
    
    # Create initial order status record
    initial_status = models.OrderStatus(
        order_id=db_order.id,
        status="pending",
        updated_by="system"
    )
    db.add(initial_status)
    
    db.commit()
    db.refresh(db_order)
    
    # Send order confirmation email
    try:
        email_service.send_order_confirmation(
            user_email=current_user.email,
            user_name=f"{current_user.first_name} {current_user.last_name}",
            order=db_order
        )
        db_order.confirmation_sent = True
        db.commit()
    except Exception as e:
        print(f"Failed to send order confirmation email: {e}")
        # Don't fail order creation if email sending fails
    
    return db_order

@router.get("", response_model=List[schemas.Order])
def get_user_orders(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    orders = db.query(models.Order).filter(
        models.Order.user_id == current_user.id
    ).order_by(models.Order.created_at.desc()).all()
    
    return orders

@router.get("/{order_id}", response_model=schemas.Order)
def get_order(
    order_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(models.Order).filter(
        models.Order.id == order_id,
        models.Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return order

@router.put("/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # This would typically be admin-only, but for MVP we'll allow users to cancel
    valid_statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
    
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    order = db.query(models.Order).filter(
        models.Order.id == order_id,
        models.Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Only allow cancellation if order is still pending
    if status == "cancelled" and order.status != "pending":
        raise HTTPException(
            status_code=400, 
            detail="Can only cancel pending orders"
        )
    
    order.status = status
    db.commit()
    
    return {"message": f"Order status updated to {status}"}
