from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.api import auth, products, cart, orders, support, admin
from app.core.database import engine
from app.models import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Electronics Store API",
    description="A modern e-commerce API for electronics components",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(cart.router, prefix="/api/cart", tags=["Cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(support.router, prefix="/api/support", tags=["Customer Support"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def read_root():
    """Root endpoint - redirect to API documentation"""
    return {
        "message": "MaxBot Electronics Store API", 
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "redoc": "/redoc",
        "endpoints": {
            "authentication": "/api/auth",
            "products": "/api/products", 
            "categories": "/api/products/categories",
            "cart": "/api/cart",
            "orders": "/api/orders",
            "support": "/api/support",
            "admin": "/api/admin"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "MaxBot Electronics API",
        "version": "1.0.0"
    }

@app.get("/api")
def api_info():
    """API information endpoint"""
    return {
        "name": "MaxBot Electronics Store API",
        "version": "1.0.0",
        "description": "Professional electronics components e-commerce API",
        "documentation": "/docs"
    }
