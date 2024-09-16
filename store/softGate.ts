import { defineStore } from 'pinia'

export const useSoftGateStore = defineStore({
  id: 'softGate',
  state: () => ({
    showOverlay: false,
    selectedMission: null,
    waitingList: false,
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
      this.waitingList = false
    },
    setWaitingList(value: boolean) {
      this.waitingList = value
    },
    async closeOverlay() {
      this.hideOverlay()
      // Wait for fade
      await new Promise((resolve) => setTimeout(resolve, 500))
      this.resetSelectedMission
    },
  },
})
