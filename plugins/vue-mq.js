import Vue from 'vue'
import VueMq from 'vue-mq'

// export default ({ app }, inject) => {
//   // Inject $labels in Vue, context and store.
//   inject('mq', VueMq)
// }

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    xxs: 375,
    xs: 425,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: Infinity
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})
