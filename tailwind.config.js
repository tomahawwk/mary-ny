/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');
const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function({addUtilities}) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    }
  })
});

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '500px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontSize: {
      h1: [
        '54px',
        {
          lineHeight: '120%',
          letterSpacing: '-0.02em',
          fontWeight: '400',
        },
      ],
    },
    backgroundSize: {
      contain: 'contain',
      cover: 'cover',
    },
    extend: {
      spacing: {
        xs: '12px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px',
      },
      colors: {
        primary: {main: '#A66457', light: '#d5c8c5', lighter: '#F5E8E1'},
        black: '#202021',
        grey: '#858080',
      },
      fontFamily: {
        marlin: ['MarlinSans', 'sans-serif'],
        text: ['text', 'sans-serif'],
      },
      transitionTimingFunction: {
        cubic: 'cubic-bezier(.77,0,.175,1)',
      },
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
      },
      backgroundImage: {
        'no-photo': 'url("/public/images/no-photo.jpg")',
      },
    },
  },
  plugins: [backfaceVisibility, require("@xpd/tailwind-3dtransforms")]
});
