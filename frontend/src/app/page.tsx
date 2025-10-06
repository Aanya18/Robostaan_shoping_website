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
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Electronics Components Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-100">
              Your trusted source for Arduino, Raspberry Pi, sensors, ICs, and electronic components. 
              From hobbyist projects to industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Browse Categories
              </Link>
              <Link href="/products" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Shop All Components
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Components</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Makers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Tech Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">Same Day</div>
              <div className="text-gray-600">Shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-primary-600" />
              </div>
                <h3 className="text-lg font-semibold mb-2">Quality Components</h3>
                <p className="text-gray-600">Genuine components from trusted manufacturers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Technical Support</h3>
                <p className="text-gray-600">Expert technical assistance and datasheets</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CurrencyDollarIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bulk Pricing</h3>
                <p className="text-gray-600">Volume discounts for educational and commercial projects</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Engineering Support</h3>
                <p className="text-gray-600">Design consultation and component selection help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-center text-primary-600 group-hover:text-primary-700">
                    <span className="text-sm font-medium">Shop now</span>
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📂</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Available</h3>
              <p className="text-gray-600 mb-4">
                Categories will appear here once the backend is populated with data.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Components
            </h2>
            <p className="text-lg text-gray-600">
              Essential components for your next project
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Components Available</h3>
              <p className="text-gray-600 mb-4">
                We're loading our electronics components inventory. Check back soon!
              </p>
              <p className="text-sm text-gray-500">
                Backend API might not be running or electronics data not loaded yet.
              </p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary">
              View All Components
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Electronics Engineer",
                content: "Excellent quality components and fast delivery. Perfect for our R&D projects and prototyping needs.",
                rating: 5
              },
              {
                name: "Alex Rodriguez",
                role: "Maker & Educator", 
                content: "Great selection of development boards and sensors. Technical documentation is always accurate.",
                rating: 5
              },
              {
                name: "Prof. James Wilson",
                role: "University Lab Manager",
                content: "Reliable supplier for our electronics labs. Bulk pricing makes it perfect for educational institutions.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with New Components
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get notified about new product arrivals, technical guides, and special offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Flow Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore ElectroShop
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our electronics components store
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* About */}
            <Link href="/about" className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <span className="text-4xl">🏢</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600">About Us</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Learn about our mission to provide quality electronics components to makers, engineers, and innovators worldwide.
              </p>
              <div className="text-blue-600 font-medium group-hover:underline text-lg">
                Learn More →
              </div>
            </Link>

            {/* Categories */}
            <Link href="/categories" className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <span className="text-4xl">📂</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600">Categories</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse our organized component categories: microcontrollers, sensors, power supplies, development boards, and more.
              </p>
              <div className="text-purple-600 font-medium group-hover:underline text-lg">
                Browse Categories →
              </div>
            </Link>

            {/* Contact */}
            <Link href="/contact" className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                <span className="text-4xl">📞</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-orange-600">Contact Us</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Need help? Our technical support team is ready to assist with your electronics projects, orders, and component selection.
              </p>
              <div className="text-orange-600 font-medium group-hover:underline text-lg">
                Contact Support →
              </div>
            </Link>
          </div>

          {/* Additional Services Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Need more help? Check out our support resources:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/faq" className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-primary-300">
                📚 FAQ
              </Link>
              <Link href="/shipping" className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-primary-300">
                🚚 Shipping Info
              </Link>
              <Link href="/returns" className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-primary-300">
                📦 Returns & Warranty
              </Link>
              <Link href="/deals" className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-primary-300">
                🔥 Special Deals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
