import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-lock', {
    // On mount (inserted)
    mounted(el, binding) {
      if (binding.value) {
        disableBodyScroll(el, { reserveScrollBarGap: true })
      }
    },

    updated(el, binding) {
      if (binding.value) {
        disableBodyScroll(el, { reserveScrollBarGap: true })
      } else {
        enableBodyScroll(el)
      }
    },

    // On unmount (removed)
    unmounted(el) {
      enableBodyScroll(el)
    },
  })
})
