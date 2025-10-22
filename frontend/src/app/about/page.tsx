export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About Robostaan_Shop
        </h1>
        
        <div className="prose prose-lg mx-auto mb-12">
          <p className="text-xl text-gray-600 mb-6 text-center">
            Your trusted supplier of Arduino, breadboards, sensors, and electronic components for makers and engineers
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Robostaan_Shop Electronics was founded by passionate makers and electronics engineers with a mission to provide 
              high-quality Arduino boards, sensors, and prototyping components to the maker community. We understand 
              the excitement of building projects and the frustration of not finding the right components.
            </p>
            <p className="text-gray-700">
              From Arduino Uno and breadboards to temperature sensors and servo motors, 
              we stock genuine components from trusted manufacturers, backed by technical 
              support and detailed project guides to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To empower makers, students, and engineers with reliable access to Arduino boards, 
                sensors, and prototyping components, along with comprehensive project guides and support.
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To be the go-to destination for the maker community, enabling 
                innovation through quality components, detailed tutorials, and expert guidance.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Robostaan_Shop Electronics?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Genuine Components</h4>
                  <p className="text-gray-600 text-sm">All components sourced directly from manufacturers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Technical Documentation</h4>
                  <p className="text-gray-600 text-sm">Complete datasheets and application notes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Engineering Support</h4>
                  <p className="text-gray-600 text-sm">Expert advice for design and component selection</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Volume Pricing</h4>
                  <p className="text-gray-600 text-sm">Competitive rates for bulk orders and institutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
