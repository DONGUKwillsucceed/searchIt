module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#68c9cb',
        'primary-light':'#F0FFFF',
      },
      width:{
        'advertisement':'448px',
        'image': '120px',
        '10/21': '47%'
      },
      height:{
        'image': '120px',
      },
      fontFamily:{
        'Suit': ['Suit'],
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