/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // Glow effects for light background (like gray-200)
        'glow-yellow': '0 0 10px rgba(255, 223, 0, 0.8), 0 0 20px rgba(255, 223, 0, 0.8)',
        'glow-blue': '0 0 10px rgba(0, 150, 255, 0.8), 0 0 20px rgba(0, 150, 255, 0.8)',
        'glow-green': '0 0 10px rgba(0, 255, 100, 0.8), 0 0 20px rgba(0, 255, 100, 0.8)',
        
        // Glow effects for dark background (like black)
        'glow-white': '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.8)',
        'glow-aqua': '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.8)',
        'glow-pink': '0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.8)',
        'glow-red': '0 0 10px rgba(255, 69, 0, 0.8), 0 0 20px rgba(255, 69, 0, 0.8)',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables dark mode with class
}
