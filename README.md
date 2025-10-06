# Electronics Shopping Website

A modern, scalable e-commerce platform built with Next.js and FastAPI.

## Architecture

- **Frontend**: Next.js (React) - Fast, SEO-friendly UI
- **Backend**: FastAPI (Python) - High-performance APIs
- **Database**: SQLite (migration-ready for PostgreSQL)
- **File Storage**: SQLite BLOB (migration-ready for cloud storage)

## Features

- 🛍️ Product catalog with categories and search
- 🛒 Shopping cart functionality
- 💳 Secure checkout flow
- 👤 User authentication (register/login)
- 📦 Order history and tracking
- 📱 Responsive design
- 🔍 SEO optimized

## Project Structure

```
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── core/           # Configuration & utilities
│   ├── requirements.txt
│   └── run.py
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utilities & API client
│   │   └── styles/       # Global styles
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python run.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Migration Path

The codebase is structured for easy migration:
- Database: SQLite → PostgreSQL/MySQL (change connection string)
- File Storage: BLOB → Firebase/Cloudinary/AWS S3 (swap storage service)
- Deployment: Local → Docker → Cloud platforms

## Development Notes

- Backend runs on http://localhost:8000
- Frontend runs on http://localhost:3000
- API documentation available at http://localhost:8000/docs
