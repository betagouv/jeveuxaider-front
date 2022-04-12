import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VTooltip from 'v-tooltip'
import VScrollLock from 'v-scroll-lock'
import TextareaAutosize from 'vue-textarea-autosize'
import VueStarRating from 'vue-star-rating'
import VueDragscroll from 'vue-dragscroll'
import VCalendar from 'v-calendar'
import Nl2br from 'vue-nl2br'

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

Vue.use(VueDragscroll)
Vue.use(VCalendar)
Vue.component('Nl2br', Nl2br)
