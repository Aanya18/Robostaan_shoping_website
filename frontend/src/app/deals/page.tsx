"use client";

export default function DealsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Deals & Offers</h1>
      <p className="text-lg text-gray-600 mb-8">We currently have no active deals. Check back soon!</p>

      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <div className="text-2xl font-semibold text-gray-900 mb-2">Coming soon</div>
        <p className="text-sm text-gray-600">We're preparing special offers for you — subscribe to our newsletter to be notified when deals go live.</p>
        {/* notify form removed per request */}
      </div>
    </div>
  );
}
