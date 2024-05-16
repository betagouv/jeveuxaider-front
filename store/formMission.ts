import { defineStore } from 'pinia'
import { useSoftGateStore } from './softGate'

export const useFormMissionStore = defineStore({
  id: 'formMission',
  state: () => ({
    mission: null,
  }),
  getters: {},
  actions: {
    setMission(mission: any) {
      this.mission = mission
    },
    reset() {
      this.mission = null
    },
  },
})
