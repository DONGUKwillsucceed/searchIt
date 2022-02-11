module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#59c5c8',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants:{
    scrollbar:['rounded']
  },
}