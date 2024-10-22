import { defineStore } from 'pinia'

export const useUserAlertStore = defineStore({
  id: 'userAlert',
  state: () => ({
    showOverlay: false,
    selectedAlert: null,
  }),
  getters: {},
  actions: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay
    },
    hideOverlay() {
      this.showOverlay = false
    },
    resetOverlay() {
      this.selectedAlert = null
    },
    async closeOverlay() {
      this.hideOverlay()
      // Wait for fade
      await new Promise((resolve) => setTimeout(resolve, 500))
      this.resetOverlay()
    },
  },
})
