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

function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/logo.webp" 
                alt="Robostaan Logo" 
                className="w-8 h-8"
              />
              <span className="text-lg font-medium text-gray-900">
                Robostaan Shop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-700 hover:text-orange-600 text-sm font-medium">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-orange-600 text-sm font-medium">
              Services
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-orange-600 text-sm font-medium">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Right side: Cart and User */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-orange-600">
              <ShoppingBagIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-600">
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden md:block text-sm font-medium">{user.first_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Orders
                  </Link>
                  {user.is_admin && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 font-medium">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm text-gray-700 hover:text-orange-600 font-medium">
                  Login
                </Link>
                <Link href="/register" 
                  className="bg-orange-600 text-white text-sm px-4 py-1.5 rounded font-medium hover:bg-orange-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-orange-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <div className="flex flex-col space-y-3">
              <Link href="/about" className="text-sm text-gray-700 hover:text-orange-600 font-medium px-2">
                About
              </Link>
              <Link href="/services" className="text-sm text-gray-700 hover:text-orange-600 font-medium px-2">
                Services
              </Link>
              <Link href="/products" className="text-sm text-gray-700 hover:text-orange-600 font-medium px-2">
                Products
              </Link>
              <Link href="/contact" className="text-sm text-gray-700 hover:text-orange-600 font-medium px-2">
                Contact
              </Link>
              {user?.is_admin && (
                <Link href="/admin" className="text-sm text-orange-600 hover:text-orange-700 font-medium px-2">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;