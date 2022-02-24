import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VTooltip from 'v-tooltip'
import VScrollLock from 'v-scroll-lock'
import TextareaAutosize from 'vue-textarea-autosize'
import VueStarRating from 'vue-star-rating'

Vue.component('StarRating', VueStarRating)

Vue.use(vClickOutside)

Vue.use(VScrollLock, {
  bodyScrollOptions: {
    reserveScrollBarGap: true
  }
})

Vue.use(VTooltip, {
  themes: {
    tooltip: {
      placement: 'right',
      delay: { show: 700, hide: 100 }
    }
  }
})
Vue.use(TextareaAutosize)
