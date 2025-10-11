export default function ShippingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shipping Information
        </h1>
        <p className="text-xl text-gray-600">
          Fast, reliable shipping for all your electronics component needs
        </p>
      </div>

      {/* Shipping Methods */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Shipping Methods & Rates</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Standard Shipping</h3>
              <div className="text-3xl font-bold text-primary-600 mb-2">$9.99</div>
              <p className="text-gray-600 mb-4">3-5 Business Days</p>
              <div className="text-sm text-gray-500">
                <p>• Ground shipping via UPS/FedEx</p>
                <p>• Tracking included</p>
                <p>• Signature required for orders &gt;$500</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-primary-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                POPULAR
              </span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Express Shipping</h3>
              <div className="text-3xl font-bold text-primary-600 mb-2">$19.99</div>
              <p className="text-gray-600 mb-4">1-2 Business Days</p>
              <div className="text-sm text-gray-500">
                <p>• Priority overnight/2-day</p>
                <p>• Full tracking & insurance</p>
                <p>• Signature required</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏃‍♂️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Same Day Delivery</h3>
              <div className="text-3xl font-bold text-primary-600 mb-2">$29.99</div>
              <p className="text-gray-600 mb-4">Same Day</p>
              <div className="text-sm text-gray-500">
                <p>• Available in select cities</p>
                <p>• Order by 2 PM for same day</p>
                <p>• Real-time tracking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Free Shipping Banner */}
        <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">🎉 FREE SHIPPING</h3>
          <p className="text-lg">On all orders over $50 within the continental US</p>
          <p className="text-sm opacity-90 mt-2">Upgrade to Express shipping for just $10 more on qualified orders</p>
        </div>
      </section>

      {/* International Shipping */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">International Shipping</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Countries</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Americas:</strong> Canada, Mexico, Brazil, Argentina</p>
                <p><strong>Europe:</strong> UK, Germany, France, Italy, Netherlands, Sweden, etc.</p>
                <p><strong>Asia-Pacific:</strong> Japan, Australia, Singapore, South Korea, India</p>
                <p><strong>Middle East:</strong> UAE, Israel, Saudi Arabia</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Don't see your country? Contact us for availability.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">International Rates & Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Canada/Mexico</span>
                  <span className="font-medium">$15.99 (5-7 days)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Europe</span>
                  <span className="font-medium">$24.99 (7-10 days)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Asia-Pacific</span>
                  <span className="font-medium">$29.99 (10-15 days)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Other Countries</span>
                  <span className="font-medium">$34.99 (10-20 days)</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> International customers are responsible for customs duties, taxes, and import fees. 
                  Some electronic components may require special import licenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Processing */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Order Processing & Tracking</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📦 Processing Times</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">In-stock items</span>
                <span className="font-medium">Same day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Custom programming</span>
                <span className="font-medium">1-2 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Special orders</span>
                <span className="font-medium">3-7 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bulk orders (&gt;1000 pcs)</span>
                <span className="font-medium">5-10 business days</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-sm text-blue-800">
                Orders placed before 3 PM EST ship the same day (business days only).
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📍 Order Tracking</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">1</div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmation</p>
                  <p className="text-sm text-gray-600">Immediate email confirmation with order details</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">2</div>
                <div>
                  <p className="font-medium text-gray-900">Processing Update</p>
                  <p className="text-sm text-gray-600">Notification when your order is being prepared</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">3</div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Notification</p>
                  <p className="text-sm text-gray-600">Tracking number and carrier information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">4</div>
                <div>
                  <p className="font-medium text-gray-900">Delivery Confirmation</p>
                  <p className="text-sm text-gray-600">Email confirmation when package is delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Shipping Services */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Special Shipping Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Institutional Delivery</h3>
              <p className="text-gray-600 text-sm mb-4">
                Special handling for universities, research labs, and corporate customers
              </p>
              <ul className="text-xs text-gray-500 text-left space-y-1">
                <li>• Scheduled delivery appointments</li>
                <li>• Dock-to-dock service</li>
                <li>• Department-specific routing</li>
                <li>• Purchase order integration</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Shipping</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ultra-fast delivery for critical production needs
              </p>
              <ul className="text-xs text-gray-500 text-left space-y-1">
                <li>• 2-4 hour delivery in major cities</li>
                <li>• Direct courier service</li>
                <li>• Weekend/holiday delivery</li>
                <li>• Real-time GPS tracking</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Packaging</h3>
              <p className="text-gray-600 text-sm mb-4">
                Specialized packaging for sensitive components
              </p>
              <ul className="text-xs text-gray-500 text-left space-y-1">
                <li>• ESD-safe packaging</li>
                <li>• Temperature-controlled shipping</li>
                <li>• Custom labeling</li>
                <li>• Moisture barrier bags</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Shipping Questions */}
      <section className="bg-primary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Questions About Shipping?
        </h2>
        <p className="text-gray-700 mb-6">
          Our logistics team is here to help with any shipping questions or special requirements.
        </p>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Shipping Team
            </a>
            <a href="tel:+15551234567" className="btn-outline">
              Call: +1 (555) 123-4567
            </a>
          </div>
          <p className="text-sm text-gray-600">
            For urgent shipping questions: ext. 3 (Logistics Department)
          </p>
        </div>
      </section>
    </div>
  );
}
