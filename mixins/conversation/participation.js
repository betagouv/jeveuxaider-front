export default {
  data () {
    return {
      showArchiveConversationModal: false,
      showUnarchiveConversationModal: false
    }
  },
  computed: {
    isCurrentUserBenevole () {
      return this.conversation.conversable.profile_id == this.$store.getters.profile.id
    },
    isCurrentUserResponsable () {
      return this.conversation.conversable.profile_id !== this.$store.getters.profile.id
    },
    conversation () {
      return this.$store.getters['messaging/activeConversation']
    },
    participation () {
      return this.conversation.conversable
    },
    mission () {
      return this.participation.mission
    },
    hasCreneaux () {
      return this.participation.slots?.length > 0
    },
    isMissionRecurrent () {
      return this.participation.mission.date_type === 'recurring'
    },
    isMissionPonctual () {
      return this.participation.mission.date_type === 'ponctual'
    },
    participationShouldBeDone () {
      if (!['En attente de validation', 'En cours de traitement'].includes(this.participation.state)) {
        return false
      }

      // Si créneaux avec une date passée
      if (this.hasCreneaux && this.participation.slots.filter(slot => this.$dayjs().startOf('day').isAfter(slot.date)).length > 0) {
        return true
      }

      // Si date de fin passée et mission ponctuel
      if (this.isMissionPonctual && this.mission.end_date && this.$dayjs().startOf('day').isAfter(this.mission.end_date)) {
        return true
      }

      // Si pas date de fin et date de début passée et mission ponctuel
      if (this.isMissionPonctual && !this.mission.end_date && this.$dayjs().startOf('day').isAfter(this.mission.start_date)) {
        return true
      }

      // Si date de participation créée depuis plus de 2 mois et mission recurrente
      if (this.isMissionRecurrent && this.mission.start_date && this.$dayjs().startOf('day').subtract(1, 'month').isAfter(this.participation.created_at)) {
        return true
      }

      return false
    },
    needTestimonial () {
      return this.participation.state === 'Validée' && this.mission.state === 'Terminée' && !this.participation.temoignage && !this.isTestimonialSubmitted
    },
    canArchive () {
      return this.$store.getters['messaging/isCurrentUserInConversation'] && !this.$store.getters['messaging/isConversationArchivedForCurrentUser']
    },
    canUnarchive () {
      return this.$store.getters['messaging/isCurrentUserInConversation'] && this.$store.getters['messaging/isConversationArchivedForCurrentUser']
    }
  },
  methods: {
    async handleArchive () {
      await this.$axios.post(`/conversations/${this.conversation.id}/archive`)
      this.$store.dispatch('messaging/selectNextActiveConversation')
    },
    async handleUnarchive () {
      await this.$axios.post(`/conversations/${this.conversation.id}/unarchive`)
      this.$store.dispatch('messaging/selectNextActiveConversation')
    }
  }
}
