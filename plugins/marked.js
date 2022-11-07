import Vue from 'vue'
import { marked } from 'marked'

Vue.filter('marked', function (text) {
  return marked(text)
})
