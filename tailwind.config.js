module.exports = {
  mode: 'jit',
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
        'advertisement':'416px',
        'image': '120px',
        '49p': '49%'
      },
      height:{
        'advertisment':'70px',
        'image': '120px',
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