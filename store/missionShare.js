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
    state.selectedMission = null
  },
  setSelectedMission: (state, mission) => {
    state.selectedMission = mission
  },
  resetSelectedMission: (state) => {
    state.selectedMission = null
  }
}

export const actions = {

}
