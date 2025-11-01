'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ordersAPI } from '@/lib/types';
import { toast } from 'react-hot-toast';
import TrustIndicators from '@/components/TrustIndicators';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shipping_address: '',
    billing_address: '',
    payment_method: 'credit_card',
    notes: '',
  });
  
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const shippingCost = total >= 50 ? 0 : 9.99;
  const taxAmount = total * 0.08;
  const finalTotal = total + shippingCost + taxAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    // Email verification check removed

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        ...formData,
        billing_address: formData.billing_address || formData.shipping_address,
      };
      
      const response = await ordersAPI.createOrder(orderData);
      
      await clearCart();
      toast.success('Order placed successfully!');
      router.push(`/orders/${response.data.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
        <p className="text-gray-600 mb-8">Please login to continue with checkout.</p>
        <button
          onClick={() => router.push('/login')}
          className="btn-primary"
        >
          Login
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
        <p className="text-gray-600 mb-8">Your cart is empty.</p>
        <button
          onClick={() => router.push('/products')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Logged in as:</p>
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                <p className="text-sm text-gray-900">{user.first_name} {user.last_name}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <div>
                <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700">
                  Address *
                </label>
                <textarea
                  id="shipping_address"
                  name="shipping_address"
                  rows={3}
                  required
                  value={formData.shipping_address}
                  onChange={handleChange}
                  className="input mt-1"
                  placeholder="Enter your complete shipping address"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, billing_address: '' });
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Same as shipping address
                  </span>
                </label>
              </div>
              
              <div>
                <label htmlFor="billing_address" className="block text-sm font-medium text-gray-700">
                  Billing Address
                </label>
                <textarea
                  id="billing_address"
                  name="billing_address"
                  rows={3}
                  value={formData.billing_address}
                  onChange={handleChange}
                  className="input mt-1"
                  placeholder="Leave empty to use shipping address"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment_method"
                    value="credit_card"
                    checked={formData.payment_method === 'credit_card'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Credit Card</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment_method"
                    value="paypal"
                    checked={formData.payment_method === 'paypal'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">PayPal</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment_method"
                    value="bank_transfer"
                    checked={formData.payment_method === 'bank_transfer'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bank Transfer</span>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Notes (Optional)</h2>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Special Instructions
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="input mt-1"
                  placeholder="Any special instructions for your order"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 mt-8 lg:mt-0 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-xs text-gray-500">IMG</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${total.toFixed(2)}</dd>
              </div>
              
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </dd>
              </div>
              
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tax</dt>
                <dd className="text-sm font-medium text-gray-900">${taxAmount.toFixed(2)}</dd>
              </div>
              
              <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">${finalTotal.toFixed(2)}</dd>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : `Place Order - $${finalTotal.toFixed(2)}`}
            </button>

            {/* Trust Indicators */}
            <div className="mt-6">
              <TrustIndicators variant="checkout" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
