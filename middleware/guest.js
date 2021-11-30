export default function ({ redirect, store }) {
  if (store.getters.isLogged) {
    return redirect('/')
  }
}
