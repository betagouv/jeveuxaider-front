export const state = () => ({
  showSearchOverlay: false
})

export const mutations = {
  toggleSearchOverlay: (state) => {
    state.showSearchOverlay = !state.showSearchOverlay
  }
}
