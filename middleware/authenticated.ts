import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const storeAuth = useAuthStore()

  if (!storeAuth.isLogged) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
