const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    content:
      process.env.NODE_ENV === 'development'
        ? []
        : [
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
    container: {
      center: true,
      padding: '1rem'
    },
    fontSize: {
      xxs: ['0.60rem', { lineHeight: '1rem', letterSpacing: '-0.025em' }],
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.025em' }],
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.025em' }],
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.025em' }],
      lg: ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.025em' }],
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
      '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em' }],
      '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }]
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
          400: '#5B71B9',
          500: '#070191',
          600: '#0A04A7'
        },
        'jva-green': {
          400: '#C9F2EA',
          500: '#09AC8C',
          600: '#0BBF9C'
        },
        'jva-red': {
          400: '#FFF0EF',
          500: '#FC7069',
          600: '#EA6861'
        },
        'jva-orange': {
          500: '#DA7600'
        },
        gray: {
          900: '#11142D',
          800: '#23262F',
          700: '#383838',
          600: '#525252',
          500: '#818181',
          400: '#B3B3B3',
          300: '#D4D4D4',
          200: '#E8E8E8',
          100: '#F5F5F5',
          50: '#FAFAFA'
        },
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
        },
        'cool-gray': { ...colors.coolGray, 500: '#777E90' },
        blue: colors.blue,
        orange: colors.amber,
        red: colors.red,
        green: colors.green
      },
      borderRadius: {
        xl: '10px'
      }
    }
  },
  variants: {
    extend: {

    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ]
}
