export default function ({ redirect, route, store }) {
  if (store.getters.isLogged && store.getters.contextRole === 'responsable' && store.getters.contextableId && !store.state.auth.user.has_agreed_responsable_terms_at) {
    return redirect({
      path: '/inscription/responsable/step/charte-bon-fonctionnement',
      query: {
        redirect: route.fullPath
      }
    })
  }
}
