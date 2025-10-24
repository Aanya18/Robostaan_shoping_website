'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { CheckCircleIcon, ExclamationTriangleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'expired'>('verifying');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus('error');
      setMessage('No verification token provided');
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        toast.success('Email verified successfully!');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        if (data.detail?.includes('expired')) {
          setStatus('expired');
          setMessage('Verification link has expired. Please request a new one.');
        } else {
          setStatus('error');
          setMessage(data.detail || 'Verification failed');
        }
        toast.error(data.detail || 'Verification failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    // This would need the user's email, which we don't have on this page
    // For now, redirect to login page where they can request resend
    router.push('/login?resend=true');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Email Verification
          </h2>
          <p className="text-gray-600">
            {status === 'verifying' && 'Verifying your email address...'}
            {status === 'success' && 'Verification Complete'}
            {status === 'error' && 'Verification Failed'}
            {status === 'expired' && 'Link Expired'}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {status === 'verifying' && (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-gray-600">Please wait while we verify your email...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900">Email Verified!</h3>
                <p className="text-gray-600">{message}</p>
                <p className="text-sm text-gray-500">
                  Redirecting to login page in 3 seconds...
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Go to Login
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <ExclamationTriangleIcon className="h-16 w-16 text-red-600 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900">Verification Failed</h3>
                <p className="text-gray-600">{message}</p>
                <div className="space-y-2">
                  <button
                    onClick={resendVerification}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Request New Verification Email
                  </button>
                  <Link
                    href="/login"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            )}

            {status === 'expired' && (
              <div className="space-y-4">
                <ExclamationTriangleIcon className="h-16 w-16 text-yellow-600 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900">Link Expired</h3>
                <p className="text-gray-600">{message}</p>
                <div className="space-y-2">
                  <button
                    onClick={resendVerification}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Request New Verification Email
                  </button>
                  <Link
                    href="/login"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Need help?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                If you're having trouble verifying your email, please{' '}
                <Link href="/contact" className="font-medium text-orange-600 hover:text-orange-500">
                  contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
