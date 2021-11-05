const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './components/**/*.{vue,js,ts}',
      './mixins/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.00em' }],
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.00em' }],
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.00em' }],
      lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.00em' }],
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.00em' }],
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.00em' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.00em' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.00em' }],
      '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.00em' }],
      '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.00em' }]
    },
    extend: {
      fontFamily: {
        sans: [
          'Marianne',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },
      colors: {
        'jva-blue': {
          light: '#5B71B9',
          primary: '#070191',
          hover: '#0A04A7'
        },
        'jva-green': {
          light: '#C9F2EA',
          primary: '#09AC8C',
          hover: '#0BBF9C'
        },
        'jva-red': {
          light: '#FFF0EF',
          primary: '#FC7069',
          hover: '#EA6861'
        },
        'jva-black': {
          primary: '#111111',
          hover: '#111111'
        },
        'jva-orange': {
          primary: '#DA7600',
          hover: '#DA7600'
        },
        'jva-gray': {
          'text-darkest': '#11142D',
          'text-darker': '#23262F',
          'text-dark': '#383838',
          'text-light': '#818181',
          'text-lighter': '#9C9C9C',
          'text-lightest': '#B3B3B3',
          border: '#E8E8E8'
        },
        'cool-gray': colors.coolGray,
        'true-gray': colors.trueGray,
        domaine: {
          solidarite: '#F46D66',
          nature: '#0B9B6B',
          education: '#D42EB0',
          sante: '#61198D',
          covid: '#070191',
          prevention: '#05D3AB',
          sport: '#EE6018',
          culture: '#F99E2D',
          memoire: '#175AB6',
          cooperation: '#5B8397'
        }
      }
    }
  },
  variants: {
    extend: {

    }
  },
  plugins: []
}
