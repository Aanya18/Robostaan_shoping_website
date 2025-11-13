'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, Category, productsAPI } from '@/lib/types';
import { 
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getProducts({ limit: 8 }),
        productsAPI.getCategories(),
      ]);
      
      setFeaturedProducts(productsResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set empty arrays if API fails
      setFeaturedProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="Robostaan Logo" 
                className="h-20 md:h-28 w-auto drop-shadow-2xl"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              Robostaan
            </h1>
            <p className="text-2xl md:text-3xl mb-6 text-orange-300 font-semibold">
              An Ageless Adventure
            </p>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Your trusted source for Arduino, Raspberry Pi, sensors, ICs, and electronic components. 
              From hobbyist projects to industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105">
                Browse Products
              </Link>
              <Link href="/services" className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-secondary-800 transition-all transform hover:scale-105">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-orange-100 font-medium">Components</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-blue-100 font-medium">Happy Makers</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-orange-100 font-medium">Tech Support</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                <div className="text-4xl font-bold mb-2">Same Day</div>
                <div className="text-blue-100 font-medium">Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-orange-600" />
              </div>
                <h3 className="text-lg font-semibold mb-2">Quality Components</h3>
                <p className="text-gray-600">Genuine components from trusted manufacturers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Technical Support</h3>
                <p className="text-gray-600">Expert technical assistance and datasheets</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CurrencyDollarIcon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bulk Pricing</h3>
                <p className="text-gray-600">Volume discounts for educational and commercial projects</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Engineering Support</h3>
                <p className="text-gray-600">Design consultation and component selection help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most popular electronic components
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600 mb-4">
                Products will appear here once the backend is populated with data.
              </p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link 
              href="/products" 
              className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              View All Products
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated with New Components
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get notified about new product arrivals, promotions, and special offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white shadow-lg text-gray-900"
            />
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>


    </div>
  );
}
