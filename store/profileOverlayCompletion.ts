import { defineStore } from 'pinia'

export const useProfileOverlayCompletionStore = defineStore({
  id: 'profileOverlayCompletion',
  state: () => ({
    avatar: null as {
      id?: number
      file?: File
      urls?: Object
      name?: string
      manipulation?: { manualCrop: string }
    } | null,
    scrollContainer: null as HTMLElement | null,
  }),
  getters: {
    cropCoordinates: (state) => state.avatar?.manipulation?.manualCrop,
  },
  actions: {
    setCrop(coordinates: string) {
      this.avatar = { ...this.avatar, manipulation: { manualCrop: coordinates } }
    },
  },
})
