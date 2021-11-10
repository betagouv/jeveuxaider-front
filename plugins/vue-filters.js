import Vue from 'vue'
import labels from '@/utils/labels.json'

export default function ({ $dayjs }) {
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

  Vue.filter('stripHTML', function (value) {
    return value.replace(/(<([^>]+)>)/gi, '')
  })

  Vue.filter('decodeHTMLEntities', function (value) {
    const entities = {
      amp: '&',
      apos: "'",
      lt: '<',
      gt: '>',
      quot: '"',
      nbsp: '\xA0',
      rsquo: "'"
    }
    const entityPattern = /&([a-z]+);/gi

    return value.replace(entityPattern, function (match, entity) {
      entity = entity.toLowerCase()
      if (Object.prototype.hasOwnProperty.call(entities, entity)) {
        return entities[entity]
      }
      return match
    })
  })

  Vue.filter('fromNow', function (date) {
    return $dayjs(date).fromNow()
  })

  Vue.filter('formatCustom', function (date, custom) {
    return $dayjs(date).format(custom)
  })
}
