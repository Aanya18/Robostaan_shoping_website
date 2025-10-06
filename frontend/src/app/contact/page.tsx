'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Our Engineering Team</h1>
        <p className="text-xl text-gray-600">
          Get expert technical support and component selection assistance
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Our team of electronics engineers and technical specialists is ready to help 
            with component selection, circuit design advice, and project consultation.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <PhoneIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Technical Support</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Monday - Friday, 9AM - 6PM EST</p>
                <p className="text-sm text-gray-500">Press 2 for Technical Support</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <EnvelopeIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                <p className="text-gray-600">support@electroshop.com</p>
                <p className="text-sm text-gray-500">Response within 4 hours (business days)</p>
                <p className="text-sm text-gray-500">For urgent issues: priority@electroshop.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Engineering Office</h3>
                <p className="text-gray-600">
                  123 Electronics Way<br />
                  Tech Park, Suite 456<br />
                  San Jose, CA 95110
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClockIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Support Hours</h3>
                <div className="text-gray-600 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 2:00 PM EST</p>
                  <p>Sunday: Closed</p>
                  <p className="text-sm text-primary-600">24/7 Emergency Support Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Service Types */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How Can We Help?</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🛒</div>
                <h4 className="font-medium text-gray-900">Order Support</h4>
                <p className="text-sm text-gray-600">Track orders, returns, exchanges</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🔧</div>
                <h4 className="font-medium text-gray-900">Technical Help</h4>
                <p className="text-sm text-gray-600">Component selection, circuit design</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">💡</div>
                <h4 className="font-medium text-gray-900">Product Info</h4>
                <p className="text-sm text-gray-600">Datasheets, specifications, compatibility</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <h4 className="font-medium text-gray-900">Educational Support</h4>
                <p className="text-sm text-gray-600">Bulk orders, institutional pricing</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-medium text-gray-900">Emergency Orders</h4>
                <p className="text-sm text-gray-600">Urgent production requirements</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-medium text-gray-900">General Inquiry</h4>
                <p className="text-sm text-gray-600">Any other questions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select a subject</option>
                  <option value="order_support">Order Support & Tracking</option>
                  <option value="technical_help">Technical Support & Design Help</option>
                  <option value="product_info">Product Information & Datasheets</option>
                  <option value="educational_pricing">Educational & Bulk Pricing</option>
                  <option value="return_exchange">Return/Exchange Request</option>
                  <option value="billing">Billing & Payment Questions</option>
                  <option value="emergency_order">Emergency/Urgent Order</option>
                  <option value="partnership">Partnership & Distribution</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                  placeholder="Please describe your question, include component part numbers, quantities, or technical specifications..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-500 text-center">
              🔒 Your information is secure and will only be used to respond to your inquiry.
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <a href="/faq" className="btn-outline text-center">
              📚 Browse FAQ
            </a>
            <a href="/returns" className="btn-outline text-center">
              📦 Returns Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
