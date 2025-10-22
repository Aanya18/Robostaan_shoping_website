export default function ReturnsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Returns & Warranty Policy
        </h1>
        <p className="text-xl text-gray-600">
          Hassle-free returns and comprehensive warranty coverage for all components
        </p>
      </div>

      {/* Return Policy Overview */}
      <section className="mb-16">
        <div className="bg-primary-50 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white">↩️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">30-Day Return Policy</h2>
            <p className="text-lg text-gray-700">
              We offer a 30-day return window for most items in original, unused condition. 
              Your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </section>

      {/* What Can Be Returned */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Return Eligibility</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-700 text-sm">✓</span>
              Items We Accept for Return
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Unused electronic components in original packaging</li>
              <li>• Development boards and modules (unopened)</li>
              <li>• Test equipment and tools (unused condition)</li>
              <li>• Sensors and breakout boards (original packaging)</li>
              <li>• Power supplies and adapters (unused)</li>
              <li>• Books, documentation, and educational materials</li>
              <li>• Defective items (any condition, with proof of defect)</li>
              <li>• Wrong items shipped (our error)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-red-700 text-sm">✗</span>
              Items We Cannot Accept
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Custom-programmed microcontrollers or FPGAs</li>
              <li>• Cut-to-length cables or wires</li>
              <li>• Modified or altered components</li>
              <li>• Components damaged by ESD or misuse</li>
              <li>• Items purchased more than 30 days ago</li>
              <li>• Consumables (solder, flux, chemicals)</li>
              <li>• Special order or non-stock items</li>
              <li>• Items without original packaging or labels</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">How to Return an Item</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Login & Request</h3>
            <p className="text-sm text-gray-600">
              Log into your account, go to "My Orders" and click "Return Item" next to the product you want to return.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Authorization</h3>
            <p className="text-sm text-gray-600">
              Receive your Return Merchandise Authorization (RMA) number and return shipping label via email.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Package & Ship</h3>
            <p className="text-sm text-gray-600">
              Pack the item securely in original packaging, attach the return label, and drop off at designated carrier.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">4️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Refund</h3>
            <p className="text-sm text-gray-600">
              Once we receive and inspect your return, we'll process your refund within 5-7 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Return Shipping */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Return Shipping Information</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🆓 Free Return Shipping</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Defective or damaged items</li>
                <li>• Wrong items sent (our error)</li>
                <li>• Items not as described</li>
                <li>• DOA (Dead on Arrival) components</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                We'll email you a prepaid return label for eligible returns. Contact: ananya_maheshwari_08@gmail.com | +91 8439781538
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibent text-gray-900 mb-4">📦 Customer Pays Shipping</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Change of mind returns</li>
                <li>• Ordered wrong specification</li>
                <li>• No longer needed for project</li>
                <li>• Compatibility issues (not our fault)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Return shipping cost will be deducted from your refund. Contact: ananya_maheshwari_08@gmail.com | +91 8439781538
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Information */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Warranty Coverage</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Active Components</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Microcontrollers, ICs</span>
                <span className="font-medium">2 Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Development Boards</span>
                <span className="font-medium">1 Year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sensor Modules</span>
                <span className="font-medium">1 Year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Power Modules</span>
                <span className="font-medium">1 Year</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Test Equipment</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Digital Multimeters</span>
                <span className="font-medium">3 Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Oscilloscopes</span>
                <span className="font-medium">3 Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Power Supplies</span>
                <span className="font-medium">2 Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Soldering Equipment</span>
                <span className="font-medium">1 Year</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Passive Components</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Resistors, Capacitors</span>
                <span className="font-medium">6 Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Connectors, Switches</span>
                <span className="font-medium">1 Year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cables, Wires</span>
                <span className="font-medium">6 Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mechanical Parts</span>
                <span className="font-medium">1 Year</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Warranty Exclusions</h3>
          <p className="text-sm text-yellow-700 mb-2">Warranty does not cover damage from:</p>
          <ul className="text-sm text-yellow-700 grid md:grid-cols-2 gap-x-4">
            <li>• Electrostatic discharge (ESD)</li>
            <li>• Overvoltage or reverse polarity</li>
            <li>• Physical damage or abuse</li>
            <li>• Liquid damage</li>
            <li>• Modification or tampering</li>
            <li>• Normal wear and tear</li>
          </ul>
        </div>
      </section>

      {/* Extended Warranty */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Extended Warranty Options</h2>
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🛡️ Extended Coverage Available</h3>
              <p className="text-gray-700 mb-4">
                Protect your investment with extended warranty coverage for critical components and expensive equipment.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Extend warranty up to 5 years</li>
                <li>• Coverage for accidental damage</li>
                <li>• Priority repair/replacement service</li>
                <li>• Advanced exchange program</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 Affordable Protection</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Orders ₹8,300–₹41,500</span>
                  <span className="font-semibold text-primary-600">₹1,245/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Orders ₹41,500–₹83,000</span>
                  <span className="font-semibold text-primary-600">₹2,075/year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Orders ₹83,000+</span>
                  <span className="font-semibold text-primary-600">₹3,320/year</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Add extended warranty at checkout or contact us within 30 days of purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Returns */}
      <section className="bg-primary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Need Help with a Return?
        </h2>
        <p className="text-gray-700 mb-6">
          Our customer service team is here to make your return process as smooth as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn-primary">
            Start Return Process
          </a>
          <a href="mailto:ananya_maheshwari_08@gmail.com" className="btn-outline">
            Email Returns Team
          </a>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Returns Department: +91 8439781538 | Monday-Friday, 10 AM-6 PM IST
        </p>
      </section>
    </div>
  );
}
