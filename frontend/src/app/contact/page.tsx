'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { supportAPI } from '@/lib/types';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supportAPI.submitContact(formData);
      alert('Thank you — your message was submitted. We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission failed', err);
      alert('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary-800 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Our Engineering Team</h1>
          <p className="text-xl text-blue-100">
            Get expert technical support and component selection assistance
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

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
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <PhoneIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Technical Support</h3>
                <p className="text-gray-600">+91 8439781538</p>
                <p className="text-sm text-gray-500">Monday - Saturday, 9AM - 9PM </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <EnvelopeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                <p className="text-gray-600">ananya_maheshwari_08@gmail.com</p>
                <p className="text-sm text-gray-500">Response within 4 hours (business days)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPinIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Office</h3>
                <p className="text-gray-600">
                  Uttar Pradesh, India
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Support Hours</h3>
                <div className="text-gray-600 space-y-1">
                  <p>Monday - Saturday: 9:00 AM - 9:00 PM </p>
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
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
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
                className="w-full btn-primary text-lg py-3"
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
    </div>
  );
}
