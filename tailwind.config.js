module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#68c9cb',
        'primary-light':'#F0FFFF',
        'Location-text' :'#595959',
        'secondary': '#FAFAFA',
      },
      width:{
        'advertisement':'338px',
        '3xl':'768px',
        'image': '120px',
        '49p': '49%'
      },
      height:{
        'advertisment':'80px',
        'image': '120px',
        'printerList':'576px',
      },
      maxHeight:{
        'printerList':'666px',
      },
      fontFamily:{
        'Suit': ['Suit'],
      }

    },
    screens:{
      'sm': '460px',
      'xsm':'330px',
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tw-elements/dist/plugin'),
  ],
  variants:{
    scrollbar:['rounded']
  },
}