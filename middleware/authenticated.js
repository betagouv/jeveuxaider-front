export default function ({ redirect, route, store }) {
  console.log('middleware authenticated')
  if (!store.getters.isLogged) {
    return redirect({
      name: 'login',
      query: {
        redirect: route.fullPath
      }
    })
  }
}
