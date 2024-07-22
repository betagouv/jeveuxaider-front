import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'

import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`,
  ],
  theme: {
    screens: {
      xxs: '375px',
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1348px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        xl: '2rem',
      },
    },
    containers: {
      xs: '20rem' /* 320px */,
      sm: '24rem' /* 384px */,
      md: '28rem' /* 448px */,
      lg: '32rem' /* 512px */,
      xl: '36rem' /* 576px */,
      '2xl': '42rem' /* 672px */,
      '3xl': '48rem' /* 714px */,
      '4xl': '56rem' /* 908px */,
      '5xl': '64rem' /* 1024px */,
      '6xl': '72rem' /* 1152px */,
      '7xl': '80rem' /* 1280px */,
    },
    fontSize: {
      xxs: ['0.60rem', { lineHeight: '1rem' }],
      xs: ['0.75rem', { lineHeight: '1.25rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
      '5xl': ['3rem', { lineHeight: '1.3' }],
      '6xl': ['3.75rem', { lineHeight: '1.3' }],
    },
    extend: {
      borderRadius: {
        xl: '10px',
      },
      colors: {
        'jva-blue': {
          50: '#E9EFFF',
          100: '#F5F5FE',
          300: '#0F15F6',
          400: '#5B71B9',
          500: '#000091',
          600: '#0A04A7',
          800: '#1212ff',
          900: '#2323ff',
        },
        'jva-green': {
          300: '#639F6A',
          400: '#C9F2EA',
          500: '#09AC8C',
          600: '#0BBF9C',
        },
        'jva-red': {
          400: '#FFF0EF',
          500: '#FC7069',
          600: '#EA6861',
        },
        'jva-orange': {
          300: '#FFA48B',
          500: '#DA7600',
        },
        'cool-gray': { ...colors.gray, 500: '#777E90' },
        gray: {
          900: '#11142D',
          800: '#23262F',
          700: '#383838',
          600: '#696974',
          500: '#A7A7B0',
          400: '#B3B3B3',
          300: '#D4D4D4',
          200: '#E8E8E8',
          100: '#F5F5F5',
          50: '#FAFAFA',
        },
        domaine: {
          solidarite: '#FC5554',
          nature: '#1FAB8D',
          education: '#D47A65',
          sante: '#0063CB',
          covid: '#070191',
          prevention: '#03D3AB',
          sport: '#F9702B',
          culture: '#C3992A',
          memoire: '#000091',
          cooperation: '#5B8397',
          'benevolat-competences': '#006A6F',
        },
      },
      fontFamily: {
        sans: [
          'Marianne',
          '-apple-system',
          // 'BlinkMacSystemFont', // Fait sauter des emojis ⚠️
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        emoji: [
          'Marianne',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      gridTemplateColumns: {
        18: 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    function ({ addVariant }: { addVariant: PluginAPI['addVariant'] }) {
      addVariant('initial', 'html :where(&)')
    },
  ],
}
