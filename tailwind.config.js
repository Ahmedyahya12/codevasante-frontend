/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#030303',
          light: '#F5F6F8',
          primary: '#2E37A4',
          primaryDark: '#6068C3',
          secondary: '#00D3C7',
          secondaryDark: '#39E9DF',
          white: '#FFFFFF',
          text: '#1C1F25',
          muted: '#6C7688',
          border: '#E7ECF3',
        },
        cyan: {
          100: '#ECF7FB',
          200: '#D9EFF7',
          300: '#C6E7F3',
          400: '#B3DFEF',
          500: '#9ED7EA',
          600: '#8BCFE6',
          700: '#75C7E2',
          800: '#5DBFDD',
          900: '#3FB6D9',
          950: '#39A4C3',
        },
        indigoCustom: {
          100: '#E7ECFC',
          200: '#D0DAF9',
          300: '#BAC7F5',
          400: '#A4B4F1',
          500: '#8EA2EC',
          600: '#7A8FE7',
          700: '#667BE1',
          800: '#5467DB',
          900: '#4351D4',
          950: '#3C49BF',
        },
        successCustom: {
          100: '#E9F7EF',
          500: '#92D7B0',
          700: '#68C690',
          900: '#3DB670',
        },
        errorCustom: {
          100: '#FDE9E9',
          500: '#F78F8F',
          700: '#F46262',
          900: '#F13535',
      },
        warningCustom: '#E2B938',
        orangeCustom: '#E04F16',
        infoCustom: '#2F80ED',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
};
