/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'korean-pink': 'var(--color-primary)',
        'korean-peach': 'var(--color-secondary)',
        'korean-cream': 'var(--color-accent)',
        'korean-brown': 'var(--color-text)',
      },
      fontFamily: {
        'display': ['Quicksand', 'sans-serif'],
        'body': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
