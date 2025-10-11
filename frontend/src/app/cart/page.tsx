'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, refreshCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      refreshCart();
    }
  }, [user, refreshCart]);

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Please login to view your cart.</p>
        <Link href="/login" className="btn-primary">
          Login
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 1.8M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link href="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Cart Items */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="py-6 flex">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  {item.product.has_image ? (
                    <Image
                      src={`http://localhost:8000/api/products/${item.product.id}/image`}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link href={`/products/${item.product.id}`} className="hover:text-orange-600">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    {item.product.brand && (
                      <p className="text-sm text-gray-500">{item.product.brand}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">${item.product.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex flex-1 items-end justify-between text-sm">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Qty:</span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="font-medium text-red-600 hover:text-red-500 flex items-center space-x-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 mt-8 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${total.toFixed(2)}</dd>
              </div>
              
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {total >= 50 ? 'Free' : '$9.99'}
                </dd>
              </div>
              
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tax</dt>
                <dd className="text-sm font-medium text-gray-900">${(total * 0.08).toFixed(2)}</dd>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${(total + (total >= 50 ? 0 : 9.99) + (total * 0.08)).toFixed(2)}
                </dd>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/checkout" className="w-full btn-primary text-center block">
                Checkout
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/products" className="text-sm font-medium text-orange-600 hover:text-primary-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>

            {/* Security Badge */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
