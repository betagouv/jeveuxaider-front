export default function ({ redirect, route, store }) {
  if (!store.getters.isLogged) {
    return redirect({
      name: 'login',
      query: {
        redirect: route.fullPath
      }
    })
  }
}
