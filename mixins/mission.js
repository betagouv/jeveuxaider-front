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
      return this.mission.provider == 'api_engagement'
        ? this.thumbnailApi
        : this.mission.template?.photo?.urls?.card ??
        this.mission.illustrations?.[0]?.urls?.card ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    thumbnailApi () {
      let filename
      switch (this.mission.domaine.id) {
        case 1:
          filename = 'api__sante_pour_tous'
          break
        case 2:
          filename = 'api__prevention_protection'
          break
        case 3:
          filename = 'api__art_culture'
          break
        case 4:
          filename = 'api__sport_pour_tous'
          break
        case 5:
          filename = 'api__covid19'
          break
        case 6:
          filename = 'api__cooperation_internationale'
          break
        case 7:
          filename = 'api__solidarite_insertion'
          break
        case 8:
          filename = 'api__memoire_citoyennete'
          break
        case 9:
          filename = 'api__education_pour_tous'
          break
        case 10:
          filename = 'api__protection_nature'
          break

        default:
          return '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
      }

      const filepath = `/images/missions/api_engagement/${filename}`
      return `${filepath}.webp, ${filepath}@2x.webp 2x, ${filepath}.jpg, ${filepath}@2x.jpg 2x`
    },
    hasPageOnline () {
      if (!this.mission.structure) {
        return false
      }
      return this.mission.structure.state === 'Validée' && ['Validée', 'Terminée'].includes(this.mission.state)
    },
    canEditStatut () {
      const rolesWhoCanEdit = this.$options.filters.label(this.mission.state, 'mission_workflow_states', 'roles')
      return !!rolesWhoCanEdit?.includes(this.$store.getters.contextRole)
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
      if (!this.mission.has_places_left) {
        return false
      }
      if (!this.mission.is_registration_open) {
        return false
      }

      if (this.mission.end_date && this.$dayjs(this.mission.end_date).isBefore(this.$dayjs())) {
        return false
      }

      if (this.mission.state === 'Validée' && this.mission.structure.state === 'Validée') {
        return true
      }

      return false
    },
    formattedDates () {
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date
      if (!startDate) {
        return
      }
      if (startDate && endDate) {
        if (this.$dayjs(startDate).isSame(this.$dayjs(endDate))) {
          return `Le ${this.$dayjs(startDate).format('D MMMM YYYY')}`
        }
        return `Du ${this.$dayjs(startDate).format('D MMMM YYYY')} au ${this.$dayjs(endDate).format('D MMMM YYYY')}`
      }

      return `À partir du ${this.$dayjs(startDate).format('D MMMM YYYY')}`
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
      return this.mission.commitment__duration ? this.$options.filters.label(this.mission.commitment__duration, 'duration') : null
    },
    nextDates () {
      if (this.mission.dates) {
        return this.mission.dates.filter(date =>
          this.$dayjs(date.id).isAfter(this.$dayjs()) || this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
        )
      }
    },
    missionStructureResponseTimeInDays () {
      if (!this.mission.structure) {
        return null
      }
      if (!this.mission.structure?.response_time) {
        return null
      }
      return Math.round(this.mission.structure?.response_time / (60 * 60 * 24))
    },
    missionStructureResponseTimeFormatted () {
      if (!this.mission.structure) {
        return null
      }
      if (!this.mission.structure?.response_time) {
        return null
      }
      if (this.missionStructureResponseTimeInDays > 10) {
        return 'en plus de 10 jours'
      } else if (this.missionStructureResponseTimeInDays > 5) {
        return 'en moins de 10 jours'
      } else if (this.missionStructureResponseTimeInDays > 3) {
        return 'en moins de 5 jours'
      } else if (this.missionStructureResponseTimeInDays > 2) {
        return 'en moins de 3 jours'
      } else if (this.missionStructureResponseTimeInDays > 1) {
        return 'en moins de 2 jours'
      } else {
        return 'en moins d\'un jour'
      }
    }
  }
}
