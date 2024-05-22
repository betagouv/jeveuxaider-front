import { defineStore } from 'pinia'
import { useSoftGateStore } from './softGate'

export const useFormMissionStore = defineStore({
  id: 'formMission',
  state: () => ({
    mission: null,
    statistics: null,
  }),
  getters: {},
  actions: {
    setMission(mission) {
      this.mission = mission
    },
    updateFields(mission, fields) {
      for (const field of fields) {
        this.mission[field] = mission[field]
      }
    },
    reset() {
      this.mission = null
      this.statistics = statistics
    },
    setStatisctics(statistics) {
      this.statistics = statistics
    },
  },
})
