import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VTooltip from 'v-tooltip'
import PortalVue from 'portal-vue'
import VScrollLock from 'v-scroll-lock'
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(vClickOutside)
Vue.use(PortalVue)
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
