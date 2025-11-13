/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Robostaan Orange - Primary Brand Color
        orange: {
          50: '#FFF4ED',
          100: '#FFE6D5',
          200: '#FFC9AA',
          300: '#FFA574',
          400: '#FF7A3C',
          500: '#C45215',
          600: '#B8470F',
          700: '#9A3A0C',
          800: '#7D2F0A',
          900: '#662708',
        },
        // Robostaan Blue - Secondary Brand Color
        blue: {
          50: '#EFF6FB',
          100: '#DBEAF6',
          200: '#B8D5ED',
          300: '#8FBDE3',
          400: '#5A95C2',
          500: '#4A7A9E',
          600: '#3B5F7A',
          700: '#2C4A5C',
          800: '#1E2A32',
          900: '#1A252B',
        },
        // Gray scale for UI elements
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Primary color mapping (Orange)
        primary: {
          50: '#FFF4ED',
          100: '#FFE6D5',
          200: '#FFC9AA',
          300: '#FFA574',
          400: '#FF7A3C',
          500: '#C45215',
          600: '#B8470F',
          700: '#9A3A0C',
          800: '#7D2F0A',
          900: '#662708',
        },
        // Secondary color mapping (Blue)
        secondary: {
          50: '#EFF6FB',
          100: '#DBEAF6',
          200: '#B8D5ED',
          300: '#8FBDE3',
          400: '#5A95C2',
          500: '#4A7A9E',
          600: '#3B5F7A',
          700: '#2C4A5C',
          800: '#1E2A32',
          900: '#1A252B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}