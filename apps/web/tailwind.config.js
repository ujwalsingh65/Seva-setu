/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0B8F68',
          'green-dark': '#087A5A',
          teal: '#06343B',
          mint: '#DDF5EA',
          'light-green': '#EAF8F2',
          'soft-blue': '#EAF4FB',
          'soft-orange': '#FFF1D8',
          'soft-red': '#FDECEC',
          background: '#F8FAF9',
          surface: '#FFFFFF',
          border: '#DDE4E1',
          text: '#122326',
          'text-secondary': '#526467',
          'text-muted': '#7C8B8D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(6, 52, 59, 0.06)',
        'card-hover': '0 6px 20px rgba(6, 52, 59, 0.10)',
      },
      borderRadius: {
        small: '8px',
        medium: '12px',
        large: '16px',
        xl: '24px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
