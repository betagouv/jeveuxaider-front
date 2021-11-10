import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VClamp from 'vue-clamp'
import Vue2Filters from 'vue2-filters'
import VTooltip from 'v-tooltip'

Vue.use(VClamp)
Vue.use(vClickOutside)
Vue.use(Vue2Filters)

Vue.use(VTooltip, {
  defaultPopperOptions: {
    modifiers: {
      preventOverflow: {
        boundariesElement: 'offsetParent'
      }
    }
  },
  defaultDelay: 250,
  popover: {
    defaultPlacement: 'right',
    defaultDelay: 250,
    defaultTrigger: 'hover',
    defaultBoundariesElement: 'offsetParent',
    defaultClass: 'popover-theme-1'
  }
})
