/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#17E668',
        'brand-600': '#12c85a',
        'brand-700': '#0ea14a',
        accent: '#4ae3c1',
        warning: '#ffd166',
        danger: '#ff6b6b',
        success: '#17E668',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['Sora', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '28px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '48px',
        '8': '64px',
      },
      boxShadow: {
        '1': '0 2px 8px rgba(16, 24, 40, 0.06)',
        '2': '0 8px 24px rgba(16, 24, 40, 0.10)',
        'glow': '0 0 24px rgba(23,230,104,0.28), 0 0 64px rgba(23,230,104,0.18)',
        'glow-dark': '0 0 24px rgba(23,230,104,0.35), 0 0 80px rgba(23,230,104,0.22)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}
