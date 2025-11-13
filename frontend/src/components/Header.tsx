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
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Robostaan - An Ageless Adventure" 
                  className="h-14 w-auto transition-transform group-hover:scale-105"
                />
              </div>
              <div className="hidden lg:block">
                <div className="text-2xl font-bold text-secondary-800 leading-tight">
                  Robostaan
                </div>
                <p className="text-xs text-orange-600 font-medium tracking-wide uppercase">An Ageless Adventure</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-secondary-700 hover:text-orange-600 text-sm font-medium transition-colors">
              About
            </Link>
            <Link href="/services" className="text-secondary-700 hover:text-orange-600 text-sm font-medium transition-colors">
              Services
            </Link>
            <Link href="/products" className="text-secondary-700 hover:text-orange-600 text-sm font-medium transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-secondary-700 hover:text-orange-600 text-sm font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side: Cart and User */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center text-secondary-700 hover:text-orange-600 transition-colors">
              <ShoppingBagIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-secondary-700 hover:text-orange-600 transition-colors">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden md:block text-sm font-medium">{user.first_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    Orders
                  </Link>
                  {user.is_admin && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 font-medium transition-colors">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm text-secondary-700 hover:text-orange-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" 
                  className="bg-orange-600 text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-orange-700 shadow-sm hover:shadow-md transition-all">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-secondary-700 hover:text-orange-600 transition-colors"
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
          <div className="md:hidden border-t border-gray-200 py-3">
            <div className="flex flex-col space-y-3">
              <Link href="/about" className="text-sm text-secondary-700 hover:text-orange-600 font-medium px-2 transition-colors">
                About
              </Link>
              <Link href="/services" className="text-sm text-secondary-700 hover:text-orange-600 font-medium px-2 transition-colors">
                Services
              </Link>
              <Link href="/products" className="text-sm text-secondary-700 hover:text-orange-600 font-medium px-2 transition-colors">
                Products
              </Link>
              <Link href="/contact" className="text-sm text-secondary-700 hover:text-orange-600 font-medium px-2 transition-colors">
                Contact
              </Link>
              {user?.is_admin && (
                <Link href="/admin" className="text-sm text-orange-600 hover:text-orange-700 font-medium px-2 transition-colors">
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