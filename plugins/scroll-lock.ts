import {
  enableBodyScroll,
  disableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock-upgrade'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-lock', {
    mounted(el, binding) {
      if (binding.value) {
        const storedScrollY = window.scrollY
        disableBodyScroll(el, { reserveScrollBarGap: true })
        el.setAttribute('stored-scroll-Y', storedScrollY)
      }
    },

    updated(el, binding) {
      if (binding.value) {
        const storedScrollY = window.scrollY
        disableBodyScroll(el, { reserveScrollBarGap: true })
        el.setAttribute('stored-scroll-Y', storedScrollY)
      } else {
        if (binding.value === undefined) {
          return
        }

        enableBodyScroll(el)

        const storedScrollY = el.getAttribute('stored-scroll-Y')
        if (storedScrollY) {
          window.scrollTo(0, storedScrollY)
        }
      }
    },

    unmounted(el, binding) {
      if (binding.value === undefined) {
        return
      }

      enableBodyScroll(el)

      const storedScrollY = el.getAttribute('stored-scroll-Y')
      if (storedScrollY) {
        window.scrollTo(0, storedScrollY)
      }
    },
  })
})
