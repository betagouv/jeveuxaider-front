import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VTooltip from 'v-tooltip'

Vue.use(vClickOutside)

Vue.use(VTooltip, {
  themes: {
    tooltip: {
      placement: 'right',
      delay: { show: 700, hide: 100 }
    }
  }
})
