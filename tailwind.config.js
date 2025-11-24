/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#01D9F6',
        secondary: '#CA01F6',
        
        // Light Mode Colors
        'light-background': '#F8FAFB',
        'light-surface': '#FFFFFF',
        'light-secondary-surface': '#EDF4F7',
        'light-text-primary': '#1A2B3C',
        'light-text-secondary': '#5A6C7D',
        'light-text-tertiary': '#8A9BA8',
        
        // Dark Mode Colors
        'dark-background': '#0A1525',
        'dark-surface': '#1A2B3C',
        'dark-secondary-surface': '#243447',
        'dark-text-primary': '#F8FAFB',
        'dark-text-secondary': '#B8C5D0',
        'dark-text-tertiary': '#7A8B9A',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}