import Vue from 'vue'
import labels from '~/utils/labels.json'

Vue.filter('label', function (key, vocabulary) {
  if (vocabulary && labels[vocabulary]) {
    const element = labels[vocabulary].find(item => item.key === key)
    if (element) {
      return element.label
    }
  }

  return labels[key] || key
})

Vue.filter('prefix', function (word) {
  return word.match('^[aieouAIEOU].*') ? `l'${word}` : `la ${word}`
})
