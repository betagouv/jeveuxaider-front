export default function ({ redirect, route, store }) {
  const isMaintenance = store.state.settings.general.maintenance_mode_active

  if (!['/maintenance/admin', '/maintenance'].includes(route.path)) {
    if (isMaintenance && store.getters.contextRole !== 'admin') {
      if (!['login'].includes(route.path)) {
        return redirect('/maintenance')
      }
    }
  }

  if (isMaintenance === false && route.path === '/maintenance') {
    return redirect('/')
  }
}
