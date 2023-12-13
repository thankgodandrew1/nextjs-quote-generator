/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    'tailwind.config.{js,cjs,mjs,ts}'
  ],
  theme: {
    screens: {
      sm: '560px',
      md: '900px',
      xmd: '1100px',
      lg: '1280px',
      xl: '1440px'
    },
    extend: {}
  },
  plugins: []
}
