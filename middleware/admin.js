export default function ({ redirect, route, store, error }) {
  console.log('middleware admin')
  if (!store.getters.isLogged || store.getters.contextRole !== 'admin') {
    return error({ statusCode: 403 })
  }
}
