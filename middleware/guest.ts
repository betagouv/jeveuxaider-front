import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const storeAuth = useAuthStore()

  if (storeAuth.isLogged) {
    if (to.path !== '/') {
      return navigateTo('/')
    }
  }
})
