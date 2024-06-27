import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useFormMissionStore = defineStore('formMission', {
  id: 'formMission',
  state: () => ({
    mission: null,
    loading: false,
    showPublishModal: false,
  }),
  getters: {
    progress() {
      const steps = [
        'isStepTitleCompleted',
        'isStepVisuelCompleted',
        'isStepInformationsCompleted',
        'isStepDatesCompleted',
        'isStepLieuxCompleted',
        'isStepBenevolesCompleted',
        'isStepBenevolesInformationsCompleted',
        'isStepResponsablesCompleted',
      ]
      const completedSteps = steps.filter((step) => this[step])
      return Math.round((completedSteps.length / steps.length) * 100)
    },
    isDraft: (state) => {
      return state.mission && state.mission?.state === 'Brouillon'
    },
    isStepTitleCompleted: (state) => {
      return !!state.mission?.name
    },
    isStepVisuelCompleted: (state) => {
      return !!state.mission?.picture
    },
    isStepInformationsCompleted: (state) => {
      return (
        !!state.mission?.description &&
        !!state.mission?.objectif &&
        !!state.mission?.publics_beneficiaires
      )
    },
    isStepDatesCompleted: (state) => {
      return !!state.mission?.date_type && !!state.mission?.commitment__duration
    },
    isStepLieuxCompleted: (state) => {
      return !!state.mission?.type
    },
    isStepBenevolesCompleted: (state) => {
      return !!state.mission?.participations_max
    },
    isStepBenevolesInformationsCompleted: (state) => {
      return (
        state.mission?.prerequisites?.length > 0 ||
        state.mission?.publics_volontaires?.length > 0 ||
        state.mission?.skills?.length > 0 ||
        state.mission?.is_snu_mig_compatible ||
        state.mission?.is_motivation_required
      )
    },
    isStepResponsablesCompleted: (state) => {
      return state.mission?.responsables?.length > 0
    },
    canBePublished() {
      return (
        this.isDraft &&
        this.isStepTitleCompleted &&
        this.isStepVisuelCompleted &&
        this.isStepInformationsCompleted &&
        this.isStepDatesCompleted &&
        this.isStepLieuxCompleted &&
        this.isStepBenevolesCompleted &&
        this.isStepBenevolesInformationsCompleted &&
        this.isStepResponsablesCompleted
      )
    },
    isStepDatesWarning() {
      return this.isStepDatesCompleted && dayjs().startOf('day').isAfter(this.mission?.end_date)
    },
    isStepBenevolesWarning() {
      return this.isStepBenevolesCompleted && this.mission?.places_left < 1
    },
  },
  actions: {
    setMission(mission) {
      mission.domaine_id = mission.template?.domaine_id || mission.domaine_id
      mission.domaine_secondary_id =
        mission.template?.domaine_secondary_id || mission.domaine_secondary_id
      mission.activity_id = mission.template?.activity_id || mission.activity_id
      mission.activity_secondary_id =
        mission.template?.activity_secondary_id || mission.activity_secondary_id
      if (mission.start_date) {
        mission.with_dates = mission.dates?.length > 0 ? 'yes' : 'no'
      }
      if (!mission.prerequisites) {
        mission.prerequisites = [null, null, null]
      }
      if (mission.publics_volontaires === null) {
        mission.publics_volontaires = ['Mineurs']
      }
      if (!mission.participations_max) {
        mission.participations_max = 1
      }
      if (mission.addresses === null) {
        mission.addresses = []
      }
      if (mission.publics_beneficiaires === null) {
        mission.publics_beneficiaires = []
      }

      this.mission = mission

      this.loading = false
    },
    setLoading(value) {
      this.loading = value
    },
    updateFields(mission, fields) {
      for (const field of fields) {
        this.mission[field] = mission[field]
      }
    },
    reset() {
      this.mission = null
    },
  },
})
