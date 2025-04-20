/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#3b82f6', // The lighter blue from image 1
        'primary': '#2980b9', // Medium blue (closer to image 1)
        'primary-dark': '#1e3c5a', // The darker blue from image 2
        'secondary': '#19345d', // Dark blue for text 
        'accent': '#f2f2f2',  // Light gray backgrounds
      },
    },
  },
  plugins: [],
}
