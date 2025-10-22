import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">MaxBot</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Your trusted destination for the latest electronics and gadgets. 
              We offer quality products with excellent customer service and fast shipping.
            </p>
            {/* Social icons removed per content policy */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="text-secondary-300 hover:text-white">All Categories</Link></li>
              <li><Link href="/products" className="text-secondary-300 hover:text-white">All Products</Link></li>
              <li><Link href="/deals" className="text-secondary-300 hover:text-white">Special Deals</Link></li>
              <li><Link href="/new-arrivals" className="text-secondary-300 hover:text-white">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
            <li><Link href="/contact" className="text-secondary-300 hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="text-secondary-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/shipping" className="text-secondary-300 hover:text-white">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-secondary-300 hover:text-white">Returns & Warranty</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © 2025 MaxBot. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-secondary-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-secondary-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
