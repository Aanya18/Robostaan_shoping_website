'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      // In real app, fetch from API: /api/support/faq
      const mockFAQs: FAQ[] = [
        {
          id: 1,
          category: "Ordering & Payment",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and purchase orders for institutional customers. For bulk orders over $500, we also offer net-30 payment terms for verified businesses."
        },
        {
          id: 2,
          category: "Ordering & Payment", 
          question: "How do I place a bulk order for my institution?",
          answer: "For bulk orders or institutional purchases, please contact our sales team at sales@electroshop.com or call +1 (555) 123-4567. We offer volume discounts starting at 50 pieces and can provide custom quotations, purchase order processing, and educational discounts."
        },
        {
          id: 3,
          category: "Shipping & Delivery",
          question: "What are your shipping options and costs?",
          answer: "We offer Standard Shipping (3-5 business days, $9.99), Express Shipping (1-2 business days, $19.99), and Same Day Delivery in select cities ($29.99). Free shipping is available on orders over $50. International shipping is available to most countries."
        },
        {
          id: 4,
          category: "Shipping & Delivery",
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 100 countries worldwide. International shipping costs vary by destination and weight. Delivery times range from 5-15 business days depending on location. Customers are responsible for any applicable customs duties and taxes."
        },
        {
          id: 5,
          category: "Shipping & Delivery",
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can track your package on our website under 'My Orders' or directly on the carrier's website (UPS, FedEx, DHL). Tracking information is usually available within 24 hours of shipment."
        },
        {
          id: 6,
          category: "Products & Technical",
          question: "Are all your components genuine and authentic?",
          answer: "Yes, we source all components directly from authorized distributors and manufacturers. Every product comes with authenticity certification and full manufacturer warranty. We never sell counterfeit or grey-market components."
        },
        {
          id: 7,
          category: "Products & Technical",
          question: "Do you provide technical datasheets and documentation?",
          answer: "Absolutely! Every product listing includes links to official datasheets, application notes, and technical documentation. Our engineering team can also provide design consultation and component selection assistance for complex projects."
        },
        {
          id: 8,
          category: "Products & Technical",
          question: "What if I need help selecting the right components?",
          answer: "Our technical support team includes experienced electronics engineers who can help with component selection, circuit design advice, and troubleshooting. Contact us at support@electroshop.com or use our live chat for technical assistance."
        },
        {
          id: 9,
          category: "Returns & Warranty",
          question: "What is your return policy?",
          answer: "We offer 30-day returns for most items in original, unused condition with original packaging. Custom-programmed items and cut-to-length cables are non-returnable. Return shipping is free for defective items; customer pays return shipping for other returns."
        },
        {
          id: 10,
          category: "Returns & Warranty",
          question: "How do I process a return or exchange?",
          answer: "Log into your account, go to 'My Orders', and select 'Return Item' next to the product. Print the prepaid return label (for defective items) and ship back the item. Refunds are processed within 5-7 business days after we receive the return."
        },
        {
          id: 11,
          category: "Returns & Warranty",
          question: "What warranty do you provide on products?",
          answer: "All products come with full manufacturer warranty. Warranty periods vary by product type: ICs and modules (1-2 years), development boards (1 year), passive components (6 months). We also offer extended warranty options for critical applications."
        },
        {
          id: 12,
          category: "Account & Support",
          question: "Do I need an account to place an order?",
          answer: "While you can browse products without an account, you'll need to create one to place orders. Having an account allows you to track orders, access order history, save favorites, and receive technical updates and new product notifications."
        },
        {
          id: 13,
          category: "Account & Support", 
          question: "How can I contact technical support?",
          answer: "Our technical support team is available Monday-Friday, 9 AM-6 PM EST. Contact us via email at support@electroshop.com, live chat on our website, or phone at +1 (555) 123-4567 ext. 2. For urgent technical issues, use our priority support line."
        },
        {
          id: 14,
          category: "Educational & Volume",
          question: "Do you offer educational discounts?",
          answer: "Yes! We provide special pricing for educational institutions, students, and non-profit organizations. Contact our education team with your .edu email or institutional documentation for verification and discount codes."
        },
        {
          id: 15,
          category: "Educational & Volume",
          question: "Can you support large-scale production requirements?",
          answer: "Yes, we work with manufacturers and production houses for volume requirements. We can provide component forecasting, scheduled deliveries, custom packaging, and dedicated account management for production customers."
        }
      ];
      
      setFaqs(mockFAQs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about our products and services
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-sm text-primary-600 font-medium mb-1">
                      {faq.category}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {openItems.has(faq.id) ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </button>
              
              {openItems.has(faq.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Still Need Help Section */}
      <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Still Need Help?
        </h2>
        <p className="text-gray-700 mb-6">
          Can't find the answer you're looking for? Our technical support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="btn-primary"
          >
            Contact Support
          </a>
          <a
            href="mailto:support@electroshop.com"
            className="btn-outline"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
