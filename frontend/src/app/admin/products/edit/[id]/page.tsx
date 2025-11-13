"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminAPI, productsAPI, type Product } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function EditProductPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    brand: '',
    model: '',
    category_id: undefined
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !user.is_admin) {
      router.push('/');
      return;
    }
    if (!id) return;
    
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          productsAPI.getProduct(parseInt(id)),
          productsAPI.getCategories()
        ]);
        setProduct(productRes.data);
        setCategories(categoriesRes.data?.data || categoriesRes.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load product');
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, [id, user, router]);

  const handleSave = async () => {
    if (!product.name || !product.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      await adminAPI.updateProduct(parseInt(id), product);
      toast.success('Product updated successfully!');
      router.push('/admin/products');
    } catch (err) { 
      toast.error('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (!user || !user.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <Link href="/" className="btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/admin/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin/products" 
            className="inline-flex items-center text-secondary-700 hover:text-orange-600 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
          <h1 className="text-4xl font-bold text-secondary-800 mb-2">Edit Product</h1>
          <p className="text-gray-600">Update product information and inventory</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-600">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                className="input"
                value={product.name || ''}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="input"
                value={product.description || ''}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                placeholder="Enter product description"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-bold text-gray-900 mb-2">
                  Price (₹) *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  className="input"
                  value={product.price || 0}
                  onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-bold text-gray-900 mb-2">
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  type="number"
                  className="input"
                  value={product.stock_quantity || 0}
                  onChange={(e) => setProduct({ ...product, stock_quantity: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Brand and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-bold text-gray-900 mb-2">
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  className="input"
                  value={product.brand || ''}
                  onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-bold text-gray-900 mb-2">
                  Model
                </label>
                <input
                  id="model"
                  type="text"
                  className="input"
                  value={product.model || ''}
                  onChange={(e) => setProduct({ ...product, model: e.target.value })}
                  placeholder="Enter model number"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-900 mb-2">
                Category
              </label>
              <select
                id="category"
                className="input"
                value={product.category_id || ''}
                onChange={(e) => setProduct({ ...product, category_id: parseInt(e.target.value) })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
            <Link
              href="/admin/products"
              className="flex-1 btn-outline-blue text-lg py-3 text-center"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          * Required fields
        </div>
      </div>
    </div>
  );
}