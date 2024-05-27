import { defineStore } from 'pinia'
import { useSoftGateStore } from './softGate'

export const useFormMissionStore = defineStore({
  id: 'formMission',
  state: () => ({
    mission: null,
    statistics: null,
  }),
  getters: {
    canBePublished: (state, getters) => {
      return (
        state.mission &&
        state.mission.state === 'Brouillon' &&
        getters.isStepTitleCompleted &&
        getters.isStepVisuelCompleted &&
        getters.isStepInformationsCompleted &&
        getters.isStepDatesCompleted &&
        getters.isStepLieuxCompleted &&
        getters.isStepBenevolesCompleted &&
        getters.isStepBenevolesInformationsCompleted &&
        getters.isStepResponsablesCompleted
      )
    },
    isStepTitleCompleted: (state) => {
      return !!state.mission.name
    },
    isStepVisuelCompleted: (state) => {
      return !!state.mission.picture
    },
    isStepInformationsCompleted: (state) => {
      return (
        !!state.mission.description &&
        !!state.mission.objectif &&
        !!state.mission.publics_beneficiaires
      )
    },
    isStepDatesCompleted: (state) => {
      return !!state.mission.date_type && !!state.mission.commitment__duration
    },
    isStepLieuxCompleted: (state) => {
      return !!state.mission.type
    },
    isStepBenevolesCompleted: (state) => {
      return !!state.mission.participations_max
    },
    isStepBenevolesInformationsCompleted: (state) => {
      return (
        state.mission.prerequisites?.length > 0 ||
        state.mission.publics_volontaires?.length > 0 ||
        state.mission.skills?.length > 0 ||
        state.mission.is_snu_mig_compatible ||
        state.mission.is_motivation_required
      )
    },
    isStepResponsablesCompleted: (state) => {
      return !!state.mission.responsable_id
    },
  },
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
    setStatistics(statistics) {
      this.statistics = statistics
    },
  },
})
