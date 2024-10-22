import { defineNuxtPlugin } from '#app'
import { Vue3Mq, useMq } from 'vue3-mq'

export default defineNuxtPlugin((nuxtApp) => {
  // Define your breakpoints in Vue3Mq setup
  nuxtApp.vueApp.use(Vue3Mq, {
    breakpoints: {
      xxxs: 0,
      xxs: 375,
      xs: 425,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1348,
    },
    // defaultBreakpoint: 'xl', // customize this for SSR if needed
  })

  // Define the array for breakpoint order
  const breakpointsOrder = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl']

  // The isSmallerThan function to compare breakpoints
  const isSmallerThan = (breakpoint) => {
    const { current } = useMq() // Correctly getting the current breakpoint
    const targetBreakpoint = breakpoint

    // Compare indices in the breakpointsOrder array
    return breakpointsOrder.indexOf(current) < breakpointsOrder.indexOf(targetBreakpoint)
  }

  // Provide both $mq and isSmallerThan function to the app
  return {
    provide: {
      mq: {
        ...useMq(), // Use Vue3Mq's composable to get $mq
        isSmallerThan, // Provide the custom function
      },
    },
  }
})
