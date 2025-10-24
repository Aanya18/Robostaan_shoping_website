'use client';

import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  TruckIcon, 
  StarIcon,
  CreditCardIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface TrustIndicatorsProps {
  variant?: 'default' | 'checkout' | 'footer';
  className?: string;
}

export default function TrustIndicators({ variant = 'default', className = '' }: TrustIndicatorsProps) {
  const indicators = [
    {
      icon: ShieldCheckIcon,
      text: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: LockClosedIcon,
      text: 'Secure Payment',
      description: 'PCI DSS compliant'
    },
    {
      icon: TruckIcon,
      text: 'Fast Shipping',
      description: '2-5 business days'
    },
    {
      icon: StarIcon,
      text: '4.8/5 Rating',
      description: 'Customer satisfaction'
    },
    {
      icon: CreditCardIcon,
      text: 'Money Back',
      description: '30-day guarantee'
    },
    {
      icon: ClockIcon,
      text: '24/7 Support',
      description: 'Always here to help'
    }
  ];

  if (variant === 'checkout') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-center space-x-6">
          {indicators.slice(0, 4).map((indicator, index) => (
            <div key={index} className="flex items-center space-x-2">
              <indicator.icon className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
        {indicators.map((indicator, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <indicator.icon className="h-8 w-8 text-orange-600" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900">{indicator.text}</h4>
            <p className="text-xs text-gray-600">{indicator.description}</p>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center space-x-2">
          <indicator.icon className="h-5 w-5 text-green-600" />
          <div>
            <span className="text-sm font-medium text-gray-900">{indicator.text}</span>
            <p className="text-xs text-gray-600">{indicator.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
