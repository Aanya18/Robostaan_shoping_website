from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List, Optional
import io
import json
from app.core.database import get_db
from app.models import models, schemas
from app.api.auth import get_current_user

router = APIRouter()

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    """Get all product categories"""
    try:
        categories = db.query(models.Category).all()
        return {
            "data": categories,
            "count": len(categories),
            "status": "success"
        }
    except Exception as e:
        return {
            "data": [],
            "count": 0,
            "status": "error",
            "message": str(e)
        }

@router.post("/categories", response_model=schemas.Category)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("", response_model=List[schemas.Product])
def get_products(
    skip: int = 0,
    limit: int = 50,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Product).filter(models.Product.is_active == True)
    
    if category_id:
        query = query.filter(models.Product.category_id == category_id)
    
    if search:
        query = query.filter(
            models.Product.name.contains(search) |
            models.Product.description.contains(search) |
            models.Product.brand.contains(search)
        )
    
    products = query.offset(skip).limit(limit).all()
    
    # Convert to response model with image check
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
        
        # Handle specifications - keep as string for Pydantic validation
        if product.specifications:
            if isinstance(product.specifications, dict):
                product_dict["specifications"] = json.dumps(product.specifications)
            else:
                product_dict["specifications"] = product.specifications
        
        result.append(schemas.Product(**product_dict))
    
    return result

@router.get("/{product_id}", response_model=schemas.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.is_active == True
    ).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Convert to response model
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
    
    return schemas.Product(**product_dict)

@router.post("", response_model=schemas.Product)
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Convert specifications to JSON string if it's a dict
    product_data = product.dict()
    if isinstance(product_data.get("specifications"), dict):
        product_data["specifications"] = json.dumps(product_data["specifications"])
    
    db_product = models.Product(**product_data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    return schemas.Product(
        **{**db_product.__dict__, "has_image": False}
    )

@router.post("/{product_id}/image")
def upload_product_image(
    product_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Validate image type
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read image data
    image_data = image.file.read()
    
    # Store image in database (for MVP - migrate to cloud storage later)
    product.image_data = image_data
    product.image_filename = image.filename
    product.image_content_type = image.content_type
    
    db.commit()
    
    return {"message": "Image uploaded successfully"}

@router.get("/{product_id}/image")
def get_product_image(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if not product or not product.image_data:
        raise HTTPException(status_code=404, detail="Image not found")
    
    return StreamingResponse(
        io.BytesIO(product.image_data),
        media_type=product.image_content_type,
        headers={"Content-Disposition": f"inline; filename={product.image_filename}"}
    )
