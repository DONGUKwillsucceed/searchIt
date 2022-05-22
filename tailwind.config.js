module.exports = {
  content: [
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
        'primary': '#ED3317',
        'primary-light':'#FFF1F0',
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
  plugins: [ ],
}
