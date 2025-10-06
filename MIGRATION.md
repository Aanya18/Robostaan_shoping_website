# Migration Guide - Electronics Store

This guide explains how to migrate from the current MVP setup to production-ready infrastructure.

## Database Migration: SQLite → PostgreSQL

### 1. Install PostgreSQL Dependencies

Backend:
```bash
pip install psycopg2-binary
```

### 2. Update Database Configuration

In `backend/app/core/database.py`:
```python
# Change from:
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./electronics_store.db")

# To:
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/electronics_store")
```

### 3. Environment Variables

Update `.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/electronics_store
```

### 4. Database Setup

```sql
-- Create database
CREATE DATABASE electronics_store;

-- Create user (optional)
CREATE USER ecommerce_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE electronics_store TO ecommerce_user;
```

### 5. Migration Script

```python
# backend/migrate_to_postgres.py
import sqlite3
import psycopg2
from psycopg2.extras import RealDictCursor

def migrate_data():
    # Connect to SQLite
    sqlite_conn = sqlite3.connect('electronics_store.db')
    sqlite_conn.row_factory = sqlite3.Row
    
    # Connect to PostgreSQL
    postgres_conn = psycopg2.connect(
        host='localhost',
        database='electronics_store',
        user='username',
        password='password'
    )
    
    # Migration logic here...
```

## File Storage Migration: SQLite BLOB → Cloud Storage

### Option 1: AWS S3

Install dependencies:
```bash
pip install boto3
```

Create storage service:
```python
# backend/app/services/storage.py
import boto3
from botocore.exceptions import ClientError
import os

class S3StorageService:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION', 'us-east-1')
        )
        self.bucket_name = os.getenv('AWS_BUCKET_NAME')
    
    def upload_file(self, file_data, file_name, content_type):
        try:
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=file_name,
                Body=file_data,
                ContentType=content_type
            )
            return f"https://{self.bucket_name}.s3.amazonaws.com/{file_name}"
        except ClientError as e:
            raise Exception(f"Failed to upload file: {e}")
    
    def get_file_url(self, file_name):
        return f"https://{self.bucket_name}.s3.amazonaws.com/{file_name}"
```

Update product endpoints:
```python
# In app/api/products.py
from app.services.storage import S3StorageService

storage_service = S3StorageService()

@router.post("/{product_id}/image")
def upload_product_image(product_id: int, image: UploadFile = File(...)):
    # Upload to S3 instead of storing in database
    image_url = storage_service.upload_file(
        image.file.read(),
        f"products/{product_id}/{image.filename}",
        image.content_type
    )
    
    # Store URL in database instead of BLOB
    product.image_url = image_url
    product.image_filename = image.filename
    product.image_content_type = image.content_type
```

### Option 2: Cloudinary

Install dependencies:
```bash
pip install cloudinary
```

Setup:
```python
# backend/app/services/cloudinary_storage.py
import cloudinary
import cloudinary.uploader
import os

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

class CloudinaryStorageService:
    def upload_file(self, file_data, public_id):
        result = cloudinary.uploader.upload(
            file_data,
            public_id=public_id,
            folder="electronics_store"
        )
        return result['secure_url']
```

## Deployment Options

### Option 1: Docker Deployment

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/electronics_store
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: electronics_store
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Option 2: Vercel + Railway

Frontend (Vercel):
1. Connect GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/.next`

Backend (Railway):
1. Connect GitHub repository to Railway
2. Set root directory: `backend`
3. Configure environment variables

### Option 3: AWS ECS + RDS

Use AWS services:
- ECS for container orchestration
- RDS for PostgreSQL database
- S3 for file storage
- CloudFront for CDN

## Environment Variables for Production

### Backend
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Security
SECRET_KEY=your-super-secure-production-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# File Storage (choose one)
# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_BUCKET_NAME=your-bucket
AWS_REGION=us-east-1

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# CORS
ALLOWED_ORIGINS=https://your-domain.com
```

### Frontend
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## Performance Optimizations

### Backend Optimizations

1. **Database Indexing**:
```sql
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_orders_user ON orders(user_id);
```

2. **Caching with Redis**:
```python
import redis
from functools import wraps

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def cache_result(expiration=300):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{hash(str(args) + str(kwargs))}"
            cached_result = redis_client.get(cache_key)
            
            if cached_result:
                return json.loads(cached_result)
            
            result = func(*args, **kwargs)
            redis_client.setex(cache_key, expiration, json.dumps(result))
            return result
        return wrapper
    return decorator
```

### Frontend Optimizations

1. **Image Optimization**:
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

2. **Bundle Analysis**:
```bash
npm install --save-dev @next/bundle-analyzer
```

## Security Enhancements

### Backend Security

1. **Rate Limiting**:
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/api/auth/login")
@limiter.limit("5/minute")
def login(request: Request):
    # Login logic
```

2. **Input Validation**:
```python
from pydantic import validator

class ProductCreate(BaseModel):
    name: str
    price: float
    
    @validator('price')
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Price must be positive')
        return v
```

### Frontend Security

1. **Content Security Policy**:
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'"
  }
]
```

## Monitoring & Analytics

### Backend Monitoring

```python
import logging
from datetime import datetime

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Add request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = datetime.utcnow()
    response = await call_next(request)
    process_time = (datetime.utcnow() - start_time).total_seconds()
    
    logging.info(
        f"{request.method} {request.url} - {response.status_code} - {process_time:.3f}s"
    )
    return response
```

### Frontend Analytics

```javascript
// Google Analytics 4
import { gtag } from 'ga-gtag'

export const trackPurchase = (transactionId, value, items) => {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'USD',
    items: items
  })
}
```

This migration guide provides a comprehensive path from MVP to production-ready e-commerce platform while maintaining the existing codebase structure.
