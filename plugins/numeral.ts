import numeral from 'numeral'

export default defineNuxtPlugin((nuxtApp) => {
  if (numeral.locales['fr'] === undefined) {
    numeral.register('locale', 'fr', {
      delimiters: {
        thousands: ' ',
        decimal: '.',
      },
      abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
      },
      ordinal(number) {
        return number === 1 ? 'er' : 'ème'
      },
      currency: {
        symbol: '€',
      },
    })
  }

  numeral.locale('fr')

  const formatNumeral = (number: any, format: any) => {
    return numeral(number).format(format)
  }

  return {
    provide: {
      numeral: formatNumeral,
    },
  }
})
