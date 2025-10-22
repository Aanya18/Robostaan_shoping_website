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
import type { FC } from 'react';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/logo.webp" 
                alt="Robostaan Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold text-[#1A1A1A]">
                Robostaan Shop
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/categories" className="text-gray-800 hover:text-orange-600 font-medium">
                Categories
              </Link>
              <Link href="/products" className="text-gray-800 hover:text-orange-600 font-medium">
                All Products
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-orange-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-orange-600 font-medium">
                Contact
              </Link>
              {user?.is_admin && (
                <Link href="/admin" className="text-orange-600 hover:text-orange-700 font-medium">
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>

          {/* Right side: Cart and User */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center text-gray-800 hover:text-orange-600">
              <ShoppingBagIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-800 hover:text-orange-600">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden md:block font-medium">{user.first_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-800 hover:text-orange-600 font-medium">
                  Login
                </Link>
                <Link href="/register" 
                  className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800 hover:text-orange-600"
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
              <Link href="/categories" className="text-gray-800 hover:text-orange-600 font-medium">
                Categories
              </Link>
              <Link href="/products" className="text-gray-800 hover:text-orange-600 font-medium">
                All Products
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-orange-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-orange-600 font-medium">
                Contact
              </Link>
              {user?.is_admin && (
                <Link href="/admin" className="text-orange-600 hover:text-orange-700 font-medium">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;