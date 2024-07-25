import {
  enableBodyScroll,
  disableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock-upgrade'

function _disable(el: HTMLElement) {
  const isAlreadyLocked = el.getAttribute('is-scroll-locked')
  if (isAlreadyLocked === 'true') {
    return
  }

  el.setAttribute('is-scroll-locked', 'true')
  const storedScrollY = window?.scrollY
  disableBodyScroll(el, { reserveScrollBarGap: true })

  if (storedScrollY) {
    el.setAttribute('stored-scroll-Y', String(storedScrollY))
  }
}

function _restoreScrollPosition(el: HTMLElement) {
  const storedScrollY = el.getAttribute('stored-scroll-Y')
  if (storedScrollY) {
    window?.scrollTo(0, Number(storedScrollY))
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-lock', {
    mounted(el, binding) {
      if (binding.value) {
        _disable(el)
      }
    },

    updated(el, binding) {
      if (binding.value) {
        _disable(el)
      } else {
        if (binding.value === undefined) {
          return
        }
        enableBodyScroll(el)
        _restoreScrollPosition(el)
        el.removeAttribute('is-scroll-locked')
      }
    },

    unmounted(el, binding) {
      if (binding.value === undefined) {
        return
      }
      clearAllBodyScrollLocks()
      _restoreScrollPosition(el)
      el.removeAttribute('is-scroll-locked')
    },
  })
})
