import activitiesJson from '@/assets/activities.json'

export default {
  computed: {
    domaine() {
      return this.mission?.domaine ?? this.mission?.template?.domaine
    },
    domainId() {
      return this.mission?.domaine_id ?? this.mission?.template?.domaine_id
    },
    activity() {
      const activity = this.mission?.activity ?? this.mission?.template?.activity
      return activitiesJson.find((activityJson) => activityJson.id === activity?.id)
    },
    activitySecondary() {
      const activity =
        this.mission?.activity_secondary ?? this.mission?.template?.activity_secondary
      return activitiesJson.find((activityJson) => activityJson.id === activity?.id)
    },
    activities() {
      return [this.activity, this.activitySecondary].filter(Boolean)
    },
    thumbnail() {
      return this.mission.provider == 'api_engagement'
        ? this.thumbnailApi
        : this.mission.template?.photo?.urls?.card ??
            this.mission.illustrations?.[0]?.urls?.card ??
            '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    thumbnailApi() {
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
    hasPageOnline() {
      if (!this.mission?.structure) {
        return false
      }
      return (
        this.mission.structure.state === 'Validée' &&
        ['Validée', 'Terminée'].includes(this.mission.state)
      )
    },
    canEditStatut() {
      const rolesWhoCanEdit = this.$filters.label(
        this.mission.state,
        'mission_workflow_states',
        'roles'
      )
      switch (this.$stores.auth.contextRole) {
        case 'admin':
        case 'referent':
          return true
        case 'responsable':
          if (this.mission.state === 'Brouillon' && this.mission.template_id) {
            return false
          }
          return !!rolesWhoCanEdit?.includes(this.$stores.auth.contextRole)
        default:
          return !!rolesWhoCanEdit?.includes(this.$stores.auth.contextRole)
      }
    },
    missionCity() {
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
    canRegister() {
      if (!this.mission.has_places_left) {
        return false
      }
      if (!this.mission.is_registration_open) {
        return false
      }
      if (!this.mission.is_active) {
        return false
      }

      if (
        this.mission.end_date &&
        this.$dayjs(this.mission.end_date).endOf('day').isBefore(this.$dayjs())
      ) {
        return false
      }

      if (this.mission.state === 'Validée' && this.mission.structure.state === 'Validée') {
        return true
      }

      return false
    },
    formattedDates() {
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date
      if (!startDate) {
        return
      }
      if (startDate && endDate) {
        if (this.$dayjs(startDate).isSame(this.$dayjs(endDate))) {
          return `Le ${this.$dayjs(startDate).format('D MMMM YYYY')}`
        }
        return `Du ${this.$dayjs(startDate).format('D MMMM YYYY')} au ${this.$dayjs(endDate).format(
          'D MMMM YYYY'
        )}`
      }

      return `À partir du ${this.$dayjs(startDate).format('D MMMM YYYY')}`
    },
    hasExpired() {
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

      if (!endDateObject) {
        return false
      }

      return this.mission.provider == 'api_engagement'
        ? endDateObject.isBefore(now)
        : endDateObject.endOf('day').isBefore(now)
    },
    formattedCommitment() {
      if (this.mission.commitment__time_period) {
        return `${this.$filters.label(
          this.mission.commitment__duration,
          'duration'
        )} par ${this.$filters.label(this.mission.commitment__time_period, 'time_period')}`
      }
      return this.mission.commitment__duration
        ? this.$filters.label(this.mission.commitment__duration, 'duration')
        : null
    },
    nextDates() {
      if (this.mission.dates) {
        return this.mission.dates.filter(
          (date) =>
            this.$dayjs(date.id).isAfter(this.$dayjs()) ||
            this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
        )
      }
    },
    missionStructureResponseTimeInDays() {
      if (!this.structureScore) {
        return null
      }
      if (!this.structureScore?.response_time) {
        return null
      }
      return Math.round(this.structureScore.response_time / (60 * 60 * 24))
    },
    missionStructureResponseTimeFormatted() {
      if (!this.structureScore) {
        return null
      }
      if (!this.structureScore?.response_time) {
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
        return "en moins d'un jour"
      }
    },
    hasSecondaryDomain() {
      return (
        (this.mission.template && this.mission.template.domaine_secondary_id) ||
        this.mission.domaine_secondary_id
      )
    },
    isIdealPourDebuter() {
      return (
        (!this.$stores.auth.isLogged ||
          this.$stores.auth.user?.statistics?.participations_count === 0) &&
        this.mission.structure?.score >= 80
      )
    },
    isMissionCourte() {
      return this.mission.commitment__total <= 4
    },
    placesOccupied() {
      return this.mission.participations_max - this.mission.places_left
    },
    placesLeftText() {
      if (!this.mission.is_registration_open) {
        return 'Inscription fermée'
      } else if (
        this.mission.publisher_name &&
        this.mission.publisher_name !== 'JeVeuxAider.gouv.fr' &&
        this.mission.places_left > 99
      ) {
        return 'Plusieurs bénévoles recherchés'
      } else if (this.mission.places_left && this.mission.places_left > 0) {
        return this.$filters.pluralize(
          this.mission.places_left,
          'bénévole recherché',
          'bénévoles recherchés'
        )
      } else {
        return this.mission.has_places_left === false || this.mission.places_left === 0
          ? 'Complet'
          : 'Plusieurs bénévoles recherchés'
      }
    },
    formattedBenevoleCount() {
      const count = this.participationsCount - 3
      return count < 1000 ? `+${count}` : '+1k'
    },
    participationsCount() {
      return this.mission?.participations_max - this.mission?.places_left
    },
    portraits() {
      const portraits = []
      const randomNumbers = []
      const portraitsCount = 74 // The total number of portraits existing
      const portraitsToGetCount = Math.min(this.participationsCount, 3)

      while (randomNumbers.length < portraitsToGetCount) {
        const result = Math.floor(Math.random() * portraitsCount) + 1
        if (!randomNumbers.includes(result)) {
          randomNumbers.push(result)
        }
      }

      randomNumbers.forEach((i) => {
        portraits.push(`/images/portraits/${i}.png`)
      })

      return portraits
    },
  },
  methods: {
    onClickGoToSimilarMissions() {
      this.$plausible.trackEvent('Click Voir les missions similaires', {
        props: {
          isRegistrationOpen: this.mission.is_registration_open,
          hasPlacesLeft: this.mission.has_places_left,
          isOutdated: this.hasExpired,
        },
      })
    },
    onClickSimilarMission() {
      this.$plausible.trackEvent('Click Card Mission Similaire', {
        props: {
          isFromApi: this.mission.isFromApi ?? false,
          isRegistrationOpen: this.mission.is_registration_open,
          hasPlacesLeft: this.mission.has_places_left,
          isOutdated: this.hasExpired,
        },
      })
    },
    onClickMoreMissions() {
      this.$plausible.trackEvent('Click Plus de missions', {
        props: {
          isFromApi: this.mission.isFromApi ?? false,
          isRegistrationOpen: this.mission.is_registration_open,
          hasPlacesLeft: this.mission.has_places_left,
          isOutdated: this.hasExpired,
        },
      })

      const url = this.activity
        ? `/missions-benevolat?activities.name=${encodeURIComponent(this.activity.name)}`
        : `/missions-benevolat?domaines=${encodeURIComponent(this.domaine.name)}`
      this.$router.push(url)
    },
  },
}
