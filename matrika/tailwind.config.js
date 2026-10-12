/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2F6FB5', dark: '#245A96', soft: '#E8F0F9', ink: '#14263D' },
        teal: { DEFAULT: '#1FA39A', soft: '#E3F5F3' },
        sun: { DEFAULT: '#F08A24', soft: '#FEF1E3' },
        paper: '#F6F9FC',
      },
      fontFamily: {
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
}
