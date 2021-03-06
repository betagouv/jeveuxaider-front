import Vue from 'vue'
import { marked } from 'marked'

const renderer = {
  heading (text, level) {
    let className = ''
    if (level === 2) {
      className = 'text-xl font-extrabold mb-2'
    }
    if (level === 3) {
      className = 'text-lg font-bold mb-2'
    }
    return `<h${level} class="${className}">${text}</h${level}>`
  },
  paragraph (text) {
    return `<p class="mb-6 text-gray-600">${text}</p>`
  },
  strong (text) {
    return `<span class="font-medium text-gray-900">${text}</span>`
  },
  list (body, ordered, start) {
    return `<ul class="ml-4 text-gray-600">${body}</ul>`
  },
  listitem (text, task, checked) {
    return `<li class="">${text}</li>`
  }
}

marked.use({
  renderer
})

export default function ({ app, ...props }) {
  Vue.filter('marked', function (text) {
    return marked(text)
  })
}
