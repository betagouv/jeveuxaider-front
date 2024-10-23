import type { TypeVocabulary } from './labels'
import { marked } from 'marked'
import activities from '@/assets/activities.json'

export default defineNuxtPlugin(() => {
  const { $labels } = useNuxtApp()

  const filters = {
    activities: (key: string, labelKey: keyof (typeof activities)[0] = 'label') => {
      return activities.find((item: any) => item.key === key)?.[labelKey] ?? key
    },
    label: (key: string, vocabulary: TypeVocabulary, labelKey = 'label') => {
      return $labels[vocabulary]?.find((item) => item.key === key)?.[labelKey] ?? key
    },
    labelFromKey: (options: any, key: string, labelKey = 'label') => {
      return options?.find((item: any) => item.key === key)?.[labelKey] ?? key
    },
    prefix: (word: string) => {
      return word.match('^[aieouAIEOU].*') ? `l'${word}` : `la ${word}`
    },
    stripHTML: (value: string) => {
      return value.replace(/(<([^>]+)>)/gi, ' ')
    },
    decodeHTMLEntities: (value: string) => {
      const entities: { [key: string]: string } = {
        amp: '&',
        apos: "'",
        lt: '<',
        gt: '>',
        quot: '"',
        nbsp: '\xA0',
        rsquo: "'",
      }
      const entityPattern = /&([a-z]+);/gi

      return value.replace(entityPattern, function (match, entity) {
        entity = entity.toLowerCase()
        if (Object.prototype.hasOwnProperty.call(entities, entity)) {
          return entities[entity]
        }
        return match
      })
    },
    pluralize: (count: number, singular: string, plural?: string, showCount: boolean = true) => {
      let output = singular
      if (count > 1) {
        output = plural || `${singular}s`
      }
      return showCount ? `${count} ${output}` : output
    },
    marked: (text: string) => {
      return marked(text)
    },
    nl2br(text: string, replaceMode: boolean, isXhtml: boolean) {
      var breakTag = isXhtml ? '<br />' : '<br>'
      var replaceStr = replaceMode ? '$1' + breakTag : '$1' + breakTag + '$2'
      return (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
    },
    clamp(text?: string) {
      if (!text) {
        return ''
      }
      if (text.length > 120) {
        let trimmedTextBegin = text.substr(0, 70)
        trimmedTextBegin = trimmedTextBegin.substr(
          0,
          Math.min(trimmedTextBegin.length, trimmedTextBegin.lastIndexOf(' '))
        )
        let trimmedTextEnd = text.substr(text.length - 20)
        trimmedTextEnd = trimmedTextEnd.substr(
          Math.min(trimmedTextEnd.length, trimmedTextEnd.lastIndexOf(' ')),
          text.length
        )
        return trimmedTextBegin + ' […] ' + trimmedTextEnd
      }
      return text
    },
  }

  return {
    provide: {
      filters,
    },
  }
})
