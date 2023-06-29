export default {
  computed: {
    currentUserInConversation () {
      return this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    },
    contactInConversation () {
      return this.conversation.users.find((user) => {
        return user.id != this.$store.getters.profile.user_id
      })
    },
    hasUnreadMessage () {
      if (this.conversation.is_read === true) {
        return false // Simulate click on concersation teaser
      }
      if (this.$dayjs(this.currentUserInConversation?.pivot.read_at).isSame(this.$dayjs(this.conversation.updated_at))) {
        return false
      }
      if (this.$dayjs(this.currentUserInConversation?.pivot.read_at).isAfter(this.$dayjs(this.conversation.updated_at))) {
        return false
      }
      return true
    }
  },
  methods: {
    getPlaceMission (conversation) {
      const model = conversation.conversable_type == 'App\\Models\\Participation' ? conversation.conversable.mission : conversation.conversable
      if (!model) {
        return
      }

      if (model.is_autonomy && model.autonomy_zips.length) {
        return model.autonomy_zips.map((item) => {
          return item.city.includes(' Arrondissement') ? `${item.city.replace(' Arrondissement', '')}` : `${item.city} (${item.zip})`
        }).sort((a, b) => a.localeCompare(b, 'fr', { numeric: true })).join(', ')
      }

      if (model.type === 'Mission en présentiel' && model.city) {
        let cityLabel = this.getCity(this.conversation)
        if (model.zip) {
          cityLabel = `${cityLabel} (${model.zip})`
        } else if (model.department) {
          cityLabel = `${cityLabel} (${model.department})`
        }
        return cityLabel
      }

      return 'Mission à distance'
    },
    getCity (conversation) {
      const model = conversation.conversable_type == 'App\\Models\\Participation' ? conversation.conversable.mission : conversation.conversable
      if (!model) {
        return
      }
      if (model.city?.startsWith('Paris ')) {
        return 'Paris'
      } else if (model.city?.startsWith('Lyon ')) {
        return 'Lyon'
      } else if (model.city?.startsWith('Marseille ')) {
        return 'Marseille'
      } else {
        return model.city?.replace(' Arrondissement', '')
      }
    }
  }
}
