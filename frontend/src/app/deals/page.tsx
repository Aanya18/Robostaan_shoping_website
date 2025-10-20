'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClockIcon, FireIcon, TagIcon, TruckIcon } from '@heroicons/react/24/outline';

interface Deal {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  category: string;
  image: string;
  endDate: string;
  featured: boolean;
  stock: number;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      // In real app, fetch from API: /api/deals
      const mockDeals: Deal[] = [
        {
          id: 1,
          title: "Arduino Uno R3 Starter Kit",
          description: "Complete Arduino starter kit with sensors, LEDs, resistors, and project guide",
          originalPrice: 49.99,
          salePrice: 34.99,
          discount: 30,
          category: "Development Boards",
          image: "🔧",
          endDate: "2024-12-31",
          featured: true,
          stock: 25
        },
        {
          id: 2,
          title: "ESP32 WiFi Development Board (5-Pack)",
          description: "ESP32-WROOM-32 development boards with built-in WiFi and Bluetooth",
          originalPrice: 79.99,
          salePrice: 59.99,
          discount: 25,
          category: "Development Boards",
          image: "📡",
          endDate: "2024-12-25",
          featured: true,
          stock: 15
        },
        {
          id: 3,
          title: "Electronic Components Mega Kit",
          description: "1000+ pieces including resistors, capacitors, LEDs, transistors, and ICs",
          originalPrice: 89.99,
          salePrice: 64.99,
          discount: 28,
          category: "Component Kits",
          image: "⚡",
          endDate: "2024-12-30",
          featured: true,
          stock: 12
        },
        {
          id: 4,
          title: "Digital Multimeter Professional",
          description: "True RMS digital multimeter with auto-ranging and data logging",
          originalPrice: 129.99,
          salePrice: 89.99,
          discount: 31,
          category: "Test Equipment",
          image: "📊",
          endDate: "2024-12-28",
          featured: false,
          stock: 8
        },
        {
          id: 5,
          title: "Raspberry Pi 4 Model B (4GB) Bundle",
          description: "Raspberry Pi 4 with case, power supply, micro HDMI cable, and 32GB SD card",
          originalPrice: 149.99,
          salePrice: 119.99,
          discount: 20,
          category: "Development Boards",
          image: "🍓",
          endDate: "2024-12-29",
          featured: false,
          stock: 18
        },
        {
          id: 6,
          title: "Sensor Module Collection (20 Modules)",
          description: "Temperature, humidity, motion, light, sound, and gas sensor modules",
          originalPrice: 99.99,
          salePrice: 74.99,
          discount: 25,
          category: "Sensors",
          image: "📡",
          endDate: "2024-12-27",
          featured: false,
          stock: 22
        }
      ];
      
      setDeals(mockDeals);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(deals.map(deal => deal.category)))];
  const filteredDeals = selectedCategory === 'All' 
    ? deals 
    : deals.filter(deal => deal.category === selectedCategory);
  const featuredDeals = deals.filter(deal => deal.featured);

  const calculateTimeLeft = (endDate: string) => {
    const difference = +new Date(endDate) - +new Date();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      return `${days}d ${hours}h`;
    }
    return 'Expired';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🔥 Special Deals & Offers
        </h1>
        <p className="text-xl text-gray-600">
          Save big on electronics components, development boards, and maker kits
        </p>
      </div>

      {/* Deal Alert Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6 mb-12 text-center">
        <div className="flex items-center justify-center mb-2">
          <FireIcon className="w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold">Flash Sale Alert!</h2>
        </div>
        <p className="text-lg">Up to 35% OFF on selected electronics components - Limited time only!</p>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <TruckIcon className="w-4 h-4 mr-1" />
            <span>Free Shipping on orders over ₹3,500</span>
          </div>
          <div className="flex items-center">
            <TagIcon className="w-4 h-4 mr-1" />
            <span>No Code Required</span>
          </div>
        </div>
      </div>

      {/* Featured Deals */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">🌟 Featured Deals</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-red-200">
              <div className="relative">
                <div className="bg-red-500 text-white px-3 py-1 absolute top-4 left-4 rounded-full text-sm font-bold">
                  -{deal.discount}%
                </div>
                <div className="p-6 text-center">
                  <div className="text-6xl mb-4">{deal.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-red-600">₹{(deal.salePrice * 83).toFixed(2)}</span>
                    <span className="text-lg text-gray-500 line-through">₹{(deal.originalPrice * 83).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>Ends in: {calculateTimeLeft(deal.endDate)}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    Only {deal.stock} left in stock!
                  </div>
                  
                  <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Grab This Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
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
      </div>

      {/* All Deals */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">All Deals</h2>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="relative">
                  <div className="bg-green-500 text-white px-2 py-1 absolute top-0 right-0 rounded-bl-lg text-xs font-bold">
                    SAVE ₹{((deal.originalPrice - deal.salePrice) * 83).toFixed(2)}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-3">{deal.image}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{deal.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{deal.description}</p>
                    
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="text-xl font-bold text-green-600">₹{(deal.salePrice * 83).toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">₹{(deal.originalPrice * 83).toFixed(2)}</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        -{deal.discount}%
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-3">
                      Category: {deal.category}
                    </div>
                    
                    <div className="flex items-center justify-center text-xs text-gray-600 mb-4">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      <span>{calculateTimeLeft(deal.endDate)}</span>
                    </div>
                    
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Add to Cart
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
          Never Miss a Deal!
        </h3>
        <p className="text-gray-700 mb-6">
          Subscribe to our newsletter and be the first to know about exclusive deals and new arrivals
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
