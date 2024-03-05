import { defineStore } from 'pinia'

export const useSoftGateStore = defineStore({
  id: 'softGate',
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
    },
    resetSelectedMission() {
      this.selectedMission = null
    },
    async closeOverlay() {
      this.hideOverlay()
      // Wait for fade
      await new Promise((resolve) => setTimeout(resolve, 500))
      this.resetSelectedMission
    },
  },
})
