/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff4f7', 100: '#fbe4ea', 200: '#f6cbd8', 300: '#eb9db7',
          400: '#d96991', 500: '#c74a78', 600: '#b83266', 700: '#972752',
          800: '#76203f', 900: '#57182f', 950: '#39101e',
        },
        surface: {
          50: '#fff8f5', 100: '#f8efec', 200: '#eadfdb', 300: '#d8c9c5',
          400: '#aa9999', 500: '#7d6c70', 600: '#5e4d54', 700: '#493940',
          800: '#382a35', 900: '#2b1b2e', 950: '#20121f',
        },
        lavender: { 50: '#faf8fc', 100: '#f4f0f8', 200: '#ede4f5', 300: '#ddd0e9', 500: '#8a6fa0', 700: '#5e476e' },
        sage: { 50: '#f1f6f2', 100: '#e1ece4', 200: '#c7dacd', 500: '#6b8f7b', 700: '#456653' },
        peach: { 50: '#fff7f3', 100: '#fce9e2', 200: '#f6d4c9', 400: '#f6b8a8', 600: '#b96857' },
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 4px rgb(66 35 47 / 0.03), 0 14px 36px rgb(66 35 47 / 0.08)',
        float: '0 20px 55px rgb(84 35 58 / 0.14)',
      },
    },
  },
  plugins: [],
}
