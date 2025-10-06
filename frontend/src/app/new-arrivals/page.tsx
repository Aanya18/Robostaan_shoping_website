'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SparklesIcon, CalendarIcon, TruckIcon, StarIcon } from '@heroicons/react/24/outline';

interface NewProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  arrivalDate: string;
  isHot: boolean;
  rating: number;
  reviews: number;
  brand: string;
  inStock: boolean;
}

export default function NewArrivalsPage() {
  const [newProducts, setNewProducts] = useState<NewProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      // In real app, fetch from API: /api/products/new-arrivals
      const mockNewProducts: NewProduct[] = [
        {
          id: 1,
          name: "Arduino Nano 33 IoT",
          description: "Compact Arduino board with WiFi and Bluetooth connectivity for IoT projects",
          price: 32.99,
          category: "Development Boards",
          image: "🔧",
          arrivalDate: "2024-10-01",
          isHot: true,
          rating: 4.8,
          reviews: 156,
          brand: "Arduino",
          inStock: true
        },
        {
          id: 2,
          name: "ESP32-S3 DevKit",
          description: "Latest ESP32-S3 with AI acceleration and advanced security features",
          price: 18.99,
          category: "Development Boards",
          image: "📡",
          arrivalDate: "2024-09-28",
          isHot: true,
          rating: 4.9,
          reviews: 89,
          brand: "Espressif",
          inStock: true
        },
        {
          id: 3,
          name: "OLED Display 1.3\" I2C",
          description: "High contrast OLED display module with I2C interface, 128x64 resolution",
          price: 12.99,
          category: "Displays",
          image: "💡",
          arrivalDate: "2024-09-25",
          isHot: false,
          rating: 4.7,
          reviews: 234,
          brand: "Adafruit",
          inStock: true
        },
        {
          id: 4,
          name: "BME680 Environmental Sensor",
          description: "4-in-1 sensor: temperature, humidity, pressure, and gas resistance",
          price: 24.99,
          category: "Sensors",
          image: "🌡️",
          arrivalDate: "2024-09-22",
          isHot: false,
          rating: 4.6,
          reviews: 67,
          brand: "Bosch",
          inStock: true
        },
        {
          id: 5,
          name: "Raspberry Pi Pico W",
          description: "Microcontroller board with wireless connectivity and dual-core ARM Cortex-M0+",
          price: 6.99,
          category: "Development Boards",
          image: "🍓",
          arrivalDate: "2024-09-20",
          isHot: true,
          rating: 4.8,
          reviews: 445,
          brand: "Raspberry Pi",
          inStock: true
        },
        {
          id: 6,
          name: "USB-C Power Delivery Module",
          description: "USB-C PD trigger module supporting 5V-20V output with current monitoring",
          price: 15.99,
          category: "Power Supply",
          image: "🔋",
          arrivalDate: "2024-09-18",
          isHot: false,
          rating: 4.5,
          reviews: 123,
          brand: "SparkFun",
          inStock: true
        },
        {
          id: 7,
          name: "LoRa E32 Module 915MHz",
          description: "Long-range wireless communication module with 3km range",
          price: 8.99,
          category: "Communication",
          image: "📶",
          arrivalDate: "2024-09-15",
          isHot: false,
          rating: 4.4,
          reviews: 78,
          brand: "EBYTE",
          inStock: false
        },
        {
          id: 8,
          name: "Digital Logic Analyzer 8CH",
          description: "8-channel logic analyzer with 24MHz sampling rate and PC software",
          price: 45.99,
          category: "Test Equipment",
          image: "📊",
          arrivalDate: "2024-09-12",
          isHot: false,
          rating: 4.7,
          reviews: 92,
          brand: "Saleae Compatible",
          inStock: true
        }
      ];
      
      setNewProducts(mockNewProducts);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(newProducts.map(product => product.category)))];
  
  let filteredProducts = selectedCategory === 'All' 
    ? newProducts 
    : newProducts.filter(product => product.category === selectedCategory);

  // Sort products
  if (sortBy === 'newest') {
    filteredProducts = filteredProducts.sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime());
  } else if (sortBy === 'price-low') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const hotProducts = newProducts.filter(product => product.isHot);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ✨ New Arrivals
        </h1>
        <p className="text-xl text-gray-600">
          Discover the latest electronics components and development boards
        </p>
      </div>

      {/* New Arrival Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 mb-1">{newProducts.length}</div>
            <div className="text-sm text-gray-600">New Products</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 mb-1">{hotProducts.length}</div>
            <div className="text-sm text-gray-600">Hot Items</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 mb-1">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 mb-1">This Week</div>
            <div className="text-sm text-gray-600">Latest Batch</div>
          </div>
        </div>
      </div>

      {/* Hot New Products */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
          <SparklesIcon className="w-6 h-6 mr-2 text-orange-500" />
          🔥 Hot New Arrivals
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {hotProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-orange-200">
              <div className="relative">
                <div className="bg-orange-500 text-white px-3 py-1 absolute top-4 left-4 rounded-full text-sm font-bold flex items-center">
                  <SparklesIcon className="w-4 h-4 mr-1" />
                  HOT
                </div>
                <div className="p-6 text-center">
                  <div className="text-5xl mb-4">{product.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-primary-600 mb-4">${product.price}</div>
                  
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>Arrived: {formatDate(product.arrivalDate)}</span>
                  </div>
                  
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* All New Products */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">All New Arrivals</h2>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="relative">
                  <div className="bg-green-500 text-white px-2 py-1 absolute top-0 right-0 rounded-bl-lg text-xs font-bold">
                    NEW
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-3">{product.image}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="text-xl font-bold text-primary-600 mb-2">${product.price}</div>
                    
                    <div className="text-xs text-gray-600 mb-2">
                      Brand: {product.brand}
                    </div>
                    
                    <div className="flex items-center justify-center text-xs text-gray-600 mb-4">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      <span>{formatDate(product.arrivalDate)}</span>
                    </div>
                    
                    <button 
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        product.inStock 
                          ? 'bg-primary-600 text-white hover:bg-primary-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Stay Updated on New Arrivals!
        </h3>
        <p className="text-gray-700 mb-6">
          Be the first to know when new electronics components arrive in our store
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
