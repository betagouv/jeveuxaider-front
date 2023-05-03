import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VTooltip from 'v-tooltip'
import VScrollLock from 'v-scroll-lock'
import TextareaAutosize from 'vue-textarea-autosize'
import VueStarRating from 'vue-star-rating'
import VueDragscroll from 'vue-dragscroll'
import VCalendar from 'v-calendar'
import Nl2br from 'vue-nl2br'
import VueObserveVisibility from 'vue-observe-visibility'
import VueTyperPlugin from 'vue-typer'

Vue.component('StarRating', VueStarRating)

Vue.use(vClickOutside)
Vue.use(VueTyperPlugin)

Vue.use(VScrollLock, {
  bodyScrollOptions: {
    reserveScrollBarGap: true
  }
})

Vue.use(VTooltip, {
  defaultPlacement: 'bottom',
  defaultClass: 'theme-black'
  // defaultDelay: { show: 200, hide: 9999999 }
})

Vue.use(TextareaAutosize)

Vue.use(VueDragscroll)
Vue.use(VCalendar)
Vue.component('Nl2br', Nl2br)

Vue.use(VueObserveVisibility)
