'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsAPI } from '@/lib/types';

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      const categoriesData = response.data?.data || response.data || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Category icons mapping
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('arduino') || name.includes('microcontroller')) return '🔧';
    if (name.includes('breadboard') || name.includes('prototyping')) return '🔌';
    if (name.includes('sensor')) return '📡';
    if (name.includes('ic') || name.includes('component')) return '⚡';
    if (name.includes('motor') || name.includes('actuator')) return '⚙️';
    if (name.includes('power') || name.includes('battery')) return '🔋';
    return '📦';
  };

  const displayCategories = categories.length > 0 ? categories : [];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Electronics Component Categories</h1>
        <p className="text-xl text-gray-600">
          Browse our comprehensive selection of electronic components organized by category
        </p>
      </div>

      {/* All Categories */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Electronics Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products?category=${category.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer border border-gray-200 hover:border-primary-300"
            >
              <div className="text-center">
                <div className="text-3xl mb-3 group-hover:scale-105 transition-transform duration-200">
                  {getCategoryIcon(category.name)}
                </div>
                <h3 className="text-md font-medium text-gray-900 mb-2 group-hover:text-primary-600 line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                <div className="text-primary-600 text-xs font-medium group-hover:underline">
                  View Components →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Benefits */}
      <section className="mt-16 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Why Browse by Category?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🎯</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Find Components Fast</h3>
            <p className="text-gray-700">
              Quickly locate the exact electronic components you need for your project.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">⚖️</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Compare Specifications</h3>
            <p className="text-gray-700">
              Easily compare technical specs, ratings, and prices within component categories.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Discover Alternatives</h3>
            <p className="text-gray-700">
              Explore similar components and find better alternatives for your designs.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Support CTA */}
      <section className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Need Help Selecting Components?
        </h3>
        <p className="text-gray-600 mb-6">
          Our engineering team can help you choose the right components for your project
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary">
            Get Technical Support
          </Link>
          <Link href="/faq" className="btn-outline">
            Browse FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}