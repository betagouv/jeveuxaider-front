import { defineStore } from 'pinia'

export const useMissionShareStore = defineStore({
  id: 'missionShare',
  state: () => ({
    showOverlay: false,
    selectedMission: null,
  }),
  getters: {},
  actions: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay
    },
    hideOverlay() {
      this.showOverlay = false
      this.selectedMission = null
    },
    resetSelectedMission() {
      this.selectedMission = null
    },
  },
})
