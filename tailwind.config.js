module.exports = {
  mode: 'jit',
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        'slide-in': {
          '0%': {
            transform: 'translateY(200%)',
          },
          '50%':{
            transform: 'translateY(150%)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
      },
      animation:{
        'slide-in': 'slide-in 0.5s ease-in-out',
      },
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
      maxWidth:{
        'addressBox' : '560px',
      },
      fontFamily:{
        'Suit': ['Suit'],
      }

    },
    screens:{
      'sm': '460px',
      'xsm':'330px',
      'lg':'1024px',
      'xl':'1280px',
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