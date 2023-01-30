export const state = () => ({
  showOverlay: false,
  selectedMission: null
})

export const mutations = {
  toggleOverlay: (state) => {
    state.showOverlay = !state.showOverlay
  },
  showOverlay: (state) => {
    state.showOverlay = true
  },
  hideOverlay: (state) => {
    state.showOverlay = false
  },
  setSelectedMission: (state, mission) => {
    state.selectedMission = mission
  },
  resetSelectedMission: (state) => {
    state.selectedMission = null
  }
}

export const actions = {
  async closeOverlay ({ commit }) {
    commit('hideOverlay')
    // Wait for fade
    await new Promise(resolve => setTimeout(resolve, 500))
    commit('resetSelectedMission')
  }
}
