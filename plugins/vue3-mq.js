import { defineNuxtPlugin } from '#app'
import { Vue3Mq, useMq } from 'vue3-mq'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Mq, {
    breakpoints: {
      xxxs: 0,
      xxs: 375,
      xs: 425,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1348,
    },
    // defaultBreakpoint: 'xl', // customize this for SSR
  })

  return {
    provide: {
      mq: useMq(),
    },
  }
})
