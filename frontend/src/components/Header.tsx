'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon as MenuIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                MaxBot Electronics
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/categories" className="text-gray-700 hover:text-orange-600 font-medium">
              Categories
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-orange-600 font-medium">
              All Products
            </Link>
            {user && user.is_admin && (
              <Link href="/admin" className="text-orange-600 hover:text-orange-800 font-medium">
                Admin Panel
              </Link>
            )}
            <Link href="/about" className="text-gray-700 hover:text-orange-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 font-medium">
              Contact
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-orange-600">
              <ShoppingBagIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-600">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden md:block">{user.first_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-gray-700 hover:text-orange-600 font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-orange-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/categories" className="text-gray-700 hover:text-orange-600 font-medium">
                Categories
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-orange-600 font-medium">
                All Products
              </Link>
              {user && user.is_admin && (
                <Link href="/admin" className="text-orange-600 hover:text-orange-800 font-medium">
                  Admin Panel
                </Link>
              )}
              <Link href="/about" className="text-gray-700 hover:text-orange-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600 font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
