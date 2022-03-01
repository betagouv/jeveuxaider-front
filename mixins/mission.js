export default {
  computed: {
    domaine () {
      return (
        this.mission?.domaine ??
        this.mission?.template?.domaine
      )
    },
    domainId () {
      return (
        this.mission?.domaine_id ??
        this.mission?.template?.domaine_id
      )
    },
    thumbnail () {
      return this.mission.template?.photo?.urls.card ??
        this.mission.illustrations?.[0]?.urls.card ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    hasPageOnline () {
      return this.mission.structure.state === 'Validée' && ['Validée', 'Terminée'].includes(this.mission.state)
    },
    canEditStatut () {
      const rolesWhoCanEdit = this.$options.filters.label(this.mission.state, 'mission_workflow_states', 'roles')
      return !!rolesWhoCanEdit.includes(this.$store.getters.contextRole)
    },
    missionCity () {
      if (this.mission.city?.startsWith('Paris ')) {
        return 'Paris'
      } else if (this.mission.city?.startsWith('Lyon ')) {
        return 'Lyon'
      } else if (this.mission.city?.startsWith('Marseille ')) {
        return 'Marseille'
      } else {
        return this.mission.city?.replace(' Arrondissement', '')
      }
    },
    canRegister () {
      if (!this.mission.has_places_left || !this.hasPageOnline) {
        return false
      }

      return true
    },
    formattedDates () {
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date
      if (!startDate) {
        return
      }
      if (startDate && endDate) {
        return `Du ${this.$dayjs(startDate).format('D MMMM')} au ${this.$dayjs(endDate).format('D MMMM')}`
      }

      return `À partir du ${this.$dayjs(startDate).format('D MMMM')}`
    },
    hasExpired () {
      const now = this.$dayjs()
      const endDate = this.mission.end_date
      if (!endDate) {
        return false
      }

      const endDateObject =
        Number.isInteger(endDate) && this.$dayjs.unix(endDate).isValid()
          ? this.$dayjs.unix(endDate)
          : this.$dayjs(endDate, 'YYYY-MM-DD HH:mm:ss', 'fr', true).isValid()
            ? this.$dayjs(endDate, 'YYYY-MM-DD HH:mm:ss')
            : this.$dayjs(endDate).isValid()
              ? this.$dayjs(endDate)
              : null

      return endDateObject && endDateObject.isBefore(now)
    },
    formattedCommitment () {
      if (this.mission.commitment__time_period) {
        return `${this.$options.filters.label(this.mission.commitment__duration, 'duration')} par ${this.$options.filters.label(this.mission.commitment__time_period, 'time_period')}`
      }
      return this.$options.filters.label(this.mission.commitment__duration, 'duration')
    }
  }
}
