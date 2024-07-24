import VueSnip from 'vue-snip'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSnip)
})
