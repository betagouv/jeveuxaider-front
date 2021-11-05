module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
          DEFAULT: '#070191',
          hover: '#070191'
        },
        'jva-green': {
          DEFAULT: '#0AAC8C',
          hover: '#0AAC8C'
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
