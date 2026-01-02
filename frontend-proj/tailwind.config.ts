import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Blue Theme (like Zoho/Monday)
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9deff',
          300: '#7cc4ff',
          400: '#36a5ff',
          500: '#0c88ff',
          600: '#0069e0',
          700: '#0053b4',
          800: '#044794',
          900: '#0a3d7a',
          950: '#06274d',
        },
        // Accent colors for status
        status: {
          pending: '#f59e0b',      // Orange
          'in-progress': '#3b82f6', // Blue
          completed: '#10b981',     // Green
          stuck: '#ef4444',         // Red
        },
        // Priority colors
        priority: {
          low: '#10b981',    // Green
          medium: '#f59e0b', // Orange
          high: '#ef4444',   // Red
        },
        // Neutral grays
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
