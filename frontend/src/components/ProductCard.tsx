'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    setLoading(true);
    try {
      await addToCart(product.id);
      toast.success('Product added to cart!');
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        {product.has_image ? (
          <Image
            src={`http://localhost:8000/api/products/${product.id}/image`}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">No image</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          {product.brand && (
            <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            {product.stock_quantity > 0 ? (
              <span className="text-sm text-green-600">
                {product.stock_quantity} in stock
              </span>
            ) : (
              <span className="text-sm text-red-600">Out of stock</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock_quantity === 0}
            className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
          </button>
          
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <HeartIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Model info if available */}
        {product.model && (
          <div className="mt-2 text-xs text-gray-500">
            Model: {product.model}
          </div>
        )}
      </div>
    </div>
  );
}
