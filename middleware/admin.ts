import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const storeAuth = useAuthStore()
  if (!storeAuth.isLogged || storeAuth.contextRole !== 'admin') {
    return showError({ statusCode: 403 })
  }
})
