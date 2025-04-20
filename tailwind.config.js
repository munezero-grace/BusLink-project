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
        'primary': '#0098db', // The blue color from the bus in image
        'secondary': '#19345d', // Dark blue for text
        'accent': '#f2f2f2',  // Light gray backgrounds
      },
    },
  },
  plugins: [],
}
