/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropFilter: { // Enable backdrop blur
        'none': 'none',
        'blur': 'blur(20px)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        'full': '9999px',
      },
      spacing: {
        '6': '24px',
        '8': '32px',
      },
    },
  },
  plugins: [],
}
