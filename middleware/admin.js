export default function ({ redirect, route, store, error }) {
  if (!store.getters.isLogged || store.getters.contextRole !== 'admin') {
    return error({ statusCode: 403 })
  }
}
