import { defineStore } from 'pinia'
import { useSoftGateStore } from './softGate'

export const useArchivedUserStore = defineStore({
  id: 'archivedUser',
  state: () => ({
    showOverlay: false,
    email: null,
  }),
  getters: {},
  actions: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay
    },
    hideOverlay() {
      this.showOverlay = false
    },
  },
})
