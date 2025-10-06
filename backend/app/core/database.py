import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# SQLite database URL (explicitly set for MVP)
DATABASE_URL = "sqlite:///./electronics_store.db"

# Override only if explicitly set in environment
env_db_url = os.getenv("DATABASE_URL")
if env_db_url and env_db_url.startswith("sqlite://"):
    DATABASE_URL = env_db_url

print(f"Using database: {DATABASE_URL}")  # Debug print

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=False  # Set to True for debugging SQL queries
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
