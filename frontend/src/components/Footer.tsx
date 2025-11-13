import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Robostaan Logo" 
                className="h-12 w-auto"
              />
              <div>
                <span className="text-xl font-bold">Robostaan</span>
                <p className="text-xs text-gray-400">An Ageless Adventure</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted destination for innovative technology solutions. 
              We offer quality products with excellent customer service and fast shipping.
            </p>
            {/* Social icons removed per content policy */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="text-gray-300 hover:text-orange-400 transition-colors">All Categories</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-orange-400 transition-colors">All Products</Link></li>
              <li><Link href="/deals" className="text-gray-300 hover:text-orange-400 transition-colors">Special Deals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Customer Service</h3>
            <ul className="space-y-2">
            <li><Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-orange-400 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-orange-400 transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-orange-400 transition-colors">Returns & Warranty</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Robostaan. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
