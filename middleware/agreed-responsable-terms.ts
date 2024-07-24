import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const storeAuth = useAuthStore()

  if (
    storeAuth.isLogged &&
    storeAuth.contextRole === 'responsable' &&
    storeAuth.contextableId &&
    storeAuth.user &&
    !storeAuth.user.has_agreed_responsable_terms_at
  ) {
    return navigateTo({
      path: '/inscription/responsable/step/charte-bon-fonctionnement',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
