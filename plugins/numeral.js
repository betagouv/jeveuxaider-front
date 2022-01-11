import Vue from 'vue'
import numeral from 'numeral'

// load a locale
numeral.register('locale', 'fr', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal (number) {
    return number === 1 ? 'er' : 'ème'
  },
  currency: {
    symbol: '€'
  }
})

// // switch between locales
numeral.locale('fr')

Vue.filter('formatNumber', function (number, format = null) {
  return numeral(number).format(format)
})
