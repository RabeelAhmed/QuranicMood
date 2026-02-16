/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via class strategy
  theme: {
    extend: {
      colors: {
        // Light Mode Palette
        primary: {
          light: '#ffffff', // Soft white
          DEFAULT: '#f8fafc', // Slate 50
          dark: '#e2e8f0', // Slate 200
        },
        text: {
          light: '#1e293b', // Slate 800
          dark: '#f1f5f9', // Slate 100
        },
        accent: {
          gold: '#D4AF37', // Gold
          teal: '#14b8a6', // Teal 500
        },
        // Dark Mode Palette
        dark: {
          bg: '#0f172a', // Slate 900
          card: '#1e293b', // Slate 800
          text: '#f8fafc', // Slate 50
        },
        // Mood Gradients (Examples, will be used in CSS variables)
        mood: {
          sad: '#3b82f6', // Blue
          happy: '#fbbf24', // Amber
          anxious: '#10b981', // Emerald
          grateful: '#D4AF37', // Gold
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}