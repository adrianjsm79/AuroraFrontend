/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#01D9F6',
        secondary: '#CA01F6',
        'dark-background': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-secondary-surface': '#334155',
        'dark-text-primary': '#F1F5F9',
        'dark-text-secondary': '#94A3B8',
        'light-background': '#FFFFFF',
        'light-surface': '#F8FAFC',
        'light-secondary-surface': '#E2E8F0',
        'light-text-primary': '#1E293B',
        'light-text-secondary': '#64748B',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}