import Vue from 'vue'

export default function ({ app, ...props }) {
  Vue.filter('label', function (key, vocabulary, labelKey = 'label') {
    if (vocabulary && app.$labels[vocabulary]) {
      const element = app.$labels[vocabulary].find(item => item.key === key)
      if (element) {
        return element[labelKey]
      }
    }

    return app.$labels[key] || key
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

  Vue.filter('pluralize', function (count, singular, plural, showCount = true) {
    let output = singular
    if (count > 1) {
      output = plural || `${singular}s`
    }
    return showCount ? `${count} ${output}` : output
  })
}
