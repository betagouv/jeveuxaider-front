import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    // hideProgressBar : true
  })

  const toast = useToast()

  return {
    provide: {
      toast: toast,
    },
  }
})
