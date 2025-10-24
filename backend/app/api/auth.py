from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, verify_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models import models, schemas
from app.services.email import email_service

router = APIRouter()
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    email = verify_token(token)
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_current_admin_user(current_user: models.User = Depends(get_current_user)):
    """Get current user and verify admin privileges"""
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Admin privileges required."
        )
    return current_user

@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Generate verification token
    verification_token = email_service.generate_verification_token()
    verification_expires = datetime.utcnow() + timedelta(hours=24)
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        address=user.address,
        city=user.city,
        postal_code=user.postal_code,
        country=user.country,
        email_verified=False,
        email_verification_token=verification_token,
        verification_token_expires=verification_expires
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send verification email
    try:
        email_service.send_verification_email(
            user_email=user.email,
            user_name=f"{user.first_name} {user.last_name}",
            verification_token=verification_token
        )
    except Exception as e:
        print(f"Failed to send verification email: {e}")
        # Don't fail registration if email sending fails
    
    return db_user

@router.post("/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.post("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    """Verify user email with token"""
    user = db.query(models.User).filter(
        models.User.email_verification_token == token,
        models.User.verification_token_expires > datetime.utcnow()
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=400, 
            detail="Invalid or expired verification token"
        )
    
    user.email_verified = True
    user.email_verification_token = None
    user.verification_token_expires = None
    db.commit()
    
    return {"message": "Email verified successfully"}

@router.post("/resend-verification")
def resend_verification(email: str, db: Session = Depends(get_db)):
    """Resend verification email"""
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.email_verified:
        raise HTTPException(status_code=400, detail="Email already verified")
    
    # Generate new verification token
    verification_token = email_service.generate_verification_token()
    verification_expires = datetime.utcnow() + timedelta(hours=24)
    
    user.email_verification_token = verification_token
    user.verification_token_expires = verification_expires
    db.commit()
    
    # Send verification email
    try:
        email_service.send_verification_email(
            user_email=user.email,
            user_name=f"{user.first_name} {user.last_name}",
            verification_token=verification_token
        )
        return {"message": "Verification email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send verification email")

@router.put("/me", response_model=schemas.User)
def update_user_me(
    user_update: schemas.UserBase,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user
