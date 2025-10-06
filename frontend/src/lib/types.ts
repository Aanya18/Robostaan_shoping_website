import api from './api';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  brand?: string;
  model?: string;
  specifications?: any;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  has_image: boolean;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product: Product;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  shipping_address: string;
  billing_address?: string;
  payment_method: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product: Product;
}

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/api/auth/register', userData),
  login: (credentials: { email: string; password: string }) => 
    api.post('/api/auth/login', credentials),
  getProfile: () => api.get('/api/auth/me'),
  updateProfile: (userData: any) => api.put('/api/auth/me', userData),
};

// Products API
export const productsAPI = {
  getProducts: (params?: any) => api.get('/api/products', { params }),
  getProduct: (id: number) => api.get(`/api/products/${id}`),
  getCategories: () => api.get('/api/products/categories'),
  getProductImage: (id: number) => `${api.defaults.baseURL}/api/products/${id}/image`,
};

// Cart API
export const cartAPI = {
  getCartItems: () => api.get('/api/cart'),
  addToCart: (item: { product_id: number; quantity: number }) => 
    api.post('/api/cart', item),
  updateCartItem: (itemId: number, quantity: number) => 
    api.put(`/api/cart/${itemId}`, null, { params: { quantity } }),
  removeFromCart: (itemId: number) => api.delete(`/api/cart/${itemId}`),
  clearCart: () => api.delete('/api/cart'),
  getCartTotal: () => api.get('/api/cart/total'),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData: any) => api.post('/api/orders', orderData),
  getOrders: () => api.get('/api/orders'),
  getOrder: (id: number) => api.get(`/api/orders/${id}`),
  updateOrderStatus: (id: number, status: string) => 
    api.put(`/api/orders/${id}/status`, null, { params: { status } }),
};
