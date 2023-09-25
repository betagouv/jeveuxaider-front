export default defineNuxtRouteMiddleware((to, from) => {
  const { $stores } = useNuxtApp()

  const isMaintenance = $stores.settings.general?.maintenance_mode_active

  if (!['/maintenance/admin', '/maintenance'].includes(to.path)) {
    if (isMaintenance && $stores.auth.contextRole !== 'admin') {
      if (!['login'].includes(to.path)) {
        return navigateTo('/maintenance')
      }
    }
  }

  if (isMaintenance === false && to.path === '/maintenance') {
    return navigateTo('/')
  }
})
