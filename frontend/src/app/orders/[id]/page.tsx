"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ordersAPI, type Order } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { 
  CheckCircleIcon, 
  TruckIcon, 
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

export default function OrderDetail() {
  const { user } = useAuth();
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;
    const fetchOrder = async () => {
      try {
        const res = await ordersAPI.getOrder(parseInt(id));
        setOrder(res.data);
      } catch (err) { 
        console.error(err); 
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon className="w-6 h-6" />;
      case 'shipped':
        return <TruckIcon className="w-6 h-6" />;
      default:
        return <ClockIcon className="w-6 h-6" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <Link href="/login" className="btn-primary">
            Go to Login
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
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Link href="/orders" className="btn-primary">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-16 h-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Order Confirmed!
          </h1>
          <p className="text-center text-green-100 text-lg">
            Thank you for your order. We'll send you shipping confirmation when your items are on the way.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary-800 to-blue-700 px-8 py-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Order #{order.order_number}</h2>
                <p className="text-blue-100">
                  Placed on {format(new Date(order.created_at), 'MMMM d, yyyy')} at {format(new Date(order.created_at), 'h:mm a')}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <MapPinIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Shipping Address</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {order.shipping_address}
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCardIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Payment Method</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  {order.payment_method.replace('_', ' ').toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Status: <span className="font-medium">{order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}</span>
                </p>
              </div>

              {/* Order Total */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="font-bold text-gray-900 mb-4">Order Total</h3>
                <p className="text-4xl font-bold text-orange-600">
                  ${order.total_amount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items</h3>
              <div className="space-y-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-20 h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                      <span className="text-gray-400 text-xs">IMG</span>
                    </div>
                    <div className="flex-1 ml-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quantity: <span className="font-medium">{item.quantity}</span> × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      ${item.total_price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary flex items-center justify-center">
            <span>Continue Shopping</span>
          </Link>
          <Link href="/orders" className="btn-outline-blue flex items-center justify-center">
            <span>View All Orders</span>
          </Link>
          <button className="btn-secondary flex items-center justify-center">
            <PrinterIcon className="w-5 h-5 mr-2" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is here to assist you with any questions about your order.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}