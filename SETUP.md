# Electronics Store Setup Guide

This guide will help you set up and run the Electronics Store application locally.

## Prerequisites

- Python 3.8+ (for backend)
- Node.js 18+ (for frontend)
- Git

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MAXBOT
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Copy environment file:
```bash
cp env.example .env
```

Edit `.env` file and update the `SECRET_KEY`:
```env
SECRET_KEY=your-super-secret-key-change-in-production-with-at-least-32-characters
```

Start the backend server:
```bash
python run.py
```

The backend will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Database Initialization

The SQLite database will be created automatically when you first run the backend.

To populate it with sample data, you can use the provided script:
```bash
cd backend
python init_db.py
```

Or manually add products through the API documentation interface at `http://localhost:8000/docs`

## Features

### ✅ Completed Features

- **User Authentication**: Register, login, JWT tokens
- **Product Catalog**: Browse products, categories, search
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout Flow**: Address input, payment method selection
- **Order Management**: View order history, order details
- **Responsive Design**: Mobile-friendly interface
- **Admin Features**: Product management via API

### 🎯 Core Functionality

1. **Homepage**: Professional electronics store design with featured products
2. **Product Listing**: Filter by category, search functionality
3. **Shopping Cart**: Real-time cart updates, quantity controls
4. **User Account**: Registration, login, profile management
5. **Order Processing**: Complete checkout flow with order tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - List products (with filtering)
- `GET /api/products/{id}` - Get single product
- `GET /api/products/categories` - List categories
- `GET /api/products/{id}/image` - Get product image

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item quantity
- `DELETE /api/cart/{id}` - Remove cart item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get single order

## Project Structure

```
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── auth.py     # Authentication endpoints
│   │   │   ├── products.py # Product endpoints
│   │   │   ├── cart.py     # Cart endpoints
│   │   │   └── orders.py   # Order endpoints
│   │   ├── models/         # Database models
│   │   │   ├── models.py   # SQLAlchemy models
│   │   │   └── schemas.py  # Pydantic schemas
│   │   ├── core/           # Core functionality
│   │   │   ├── database.py # Database connection
│   │   │   └── security.py # Authentication logic
│   │   └── main.py         # FastAPI app
│   ├── requirements.txt    # Python dependencies
│   ├── run.py             # Server startup script
│   └── init_db.py         # Database initialization
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── page.tsx   # Homepage
│   │   │   ├── login/     # Login page
│   │   │   ├── register/  # Registration page
│   │   │   ├── products/  # Product listing
│   │   │   ├── cart/      # Shopping cart
│   │   │   ├── checkout/  # Checkout page
│   │   │   └── orders/    # Order history
│   │   ├── components/    # Reusable components
│   │   │   ├── Header.tsx # Navigation header
│   │   │   ├── Footer.tsx # Site footer
│   │   │   └── ProductCard.tsx # Product display
│   │   ├── contexts/      # React contexts
│   │   │   ├── AuthContext.tsx # Authentication state
│   │   │   └── CartContext.tsx # Cart state
│   │   ├── lib/          # Utilities
│   │   │   ├── api.ts    # API client
│   │   │   └── types.ts  # TypeScript types
│   │   └── styles/       # Global styles
│   ├── package.json      # Node.js dependencies
│   └── next.config.js    # Next.js configuration
└── README.md
```

## Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-super-secret-key-change-in-production
DATABASE_URL=sqlite:///./electronics_store.db
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local) - Optional
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure both frontend and backend are running on the correct ports
2. **Database Errors**: Delete the SQLite file and restart the backend to recreate tables
3. **Import Errors**: Make sure all dependencies are installed correctly

### Port Configuration

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

If you need to change ports, update:
- Backend: `run.py` and `app/main.py`
- Frontend: `next.config.js` and package.json scripts

## Next Steps

1. Start both servers
2. Visit `http://localhost:3000`
3. Register a new account
4. Add some products (via API docs at `http://localhost:8000/docs`)
5. Test the complete shopping flow

## Support

For issues or questions:
1. Check the API documentation at `http://localhost:8000/docs`
2. Review the console logs for error messages
3. Ensure all dependencies are correctly installed
