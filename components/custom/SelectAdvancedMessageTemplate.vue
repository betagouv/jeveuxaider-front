<template>
  <BaseSelectAdvanced
    name="message-template"
    v-model="selectedOption"
    placeholder="Sélectionner un modèle de message"
    :options="$stores.messaging.messageTemplates"
    attributeKey="id"
    attributeLabel="name"
    clearable
    @changed="onClick"
  />
</template>

<script>
export default defineNuxtComponent({
  emits: ['selected', 'clear'],
  props: {
    recipientUser: {
      type: Object,
      required: true,
    },
    conversableType: {
      type: String,
      required: true,
    },
    conversable: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: null,
    }
  },
  computed: {
    tokens() {
      return {
        '[destinataire_prenom]': this.tokenDestinatairePrenomResolver,
        '[destinataire_nom]': this.tokenDestinataireNomResolver,
        '[destinataire_zip]': this.tokenDestinataireZipResolver,
        '[destinataire_ville]': this.tokenDestinataireVilleResolver,
        '[mission_nom]': this.tokenMissionNomResolver,
        '[mission_ville]': this.tokenMissionVilleResolver,
        '[mission_date_debut]': this.tokenMissionDateDebutResolver,
        '[mission_date_fin]': this.tokenMissionDateFinResolver,
        '[organisation_nom]': this.tokenOrganisationNomResolver,
        '[expediteur_prenom]': this.$stores.auth.user?.profile?.first_name,
        '[expediteur_nom]': this.$stores.auth.user?.profile?.last_name,
      }
    },
    tokenDestinatairePrenomResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.conversable.profile.first_name
        case 'App\\Models\\Mission':
          return this.recipientUser.first_name
        case 'App\\Models\\Structure':
          return this.recipientUser.first_name
        default:
          return ''
      }
    },
    tokenDestinataireNomResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.conversable.profile.last_name
        case 'App\\Models\\Mission':
          return this.recipientUser.last_name
        case 'App\\Models\\Structure':
          return this.recipientUser.last_name
        default:
          return ''
      }
    },
    tokenDestinataireZipResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.conversable.profile?.zip
        case 'App\\Models\\Mission':
          return this.recipientUser?.zip
        case 'App\\Models\\Structure':
          return this.recipientUser?.zip
        default:
          return ''
      }
    },
    tokenDestinataireVilleResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.conversable.profile?.ville
        case 'App\\Models\\Mission':
          return this.recipientUser?.ville
        case 'App\\Models\\Structure':
          return this.recipientUser?.ville
        default:
          return ''
      }
    },
    tokenOrganisationNomResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.conversable.mission.structure.name
        case 'App\\Models\\Mission':
          return this.conversable.structure.name
        case 'App\\Models\\Structure':
          return this.conversable.name
        default:
          return ''
      }
    },
    tokenMissionNomResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.conversable.mission.name ?? ''
        case 'App\\Models\\Mission':
          return this.conversable.name ?? ''
        default:
          return ''
      }
    },
    tokenMissionVilleResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.conversable.mission.type === 'Mission en présentiel'
            ? this.conversable.mission?.addresses[0]?.city
            : ''
        case 'App\\Models\\Mission':
          return this.conversable?.type === 'Mission en présentiel'
            ? this.conversable?.addresses[0]?.city
            : ''
        default:
          return ''
      }
    },
    tokenMissionDateDebutResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.$dayjs(this.conversable.mission.start_date).format('D MMMM YYYY')
        case 'App\\Models\\Mission':
          return this.$dayjs(this.conversable.start_date).format('D MMMM YYYY')
        default:
          return ''
      }
    },
    tokenMissionDateFinResolver() {
      switch (this.conversableType) {
        case 'App\\Models\\Participation':
          return this.$dayjs(this.conversable.mission.end_date).format('D MMMM YYYY')
        case 'App\\Models\\Mission':
          return this.$dayjs(this.conversable.end_date).format('D MMMM YYYY')
        default:
          return ''
      }
    },
  },
  methods: {
    onClick(messageTemplate) {
      if (!messageTemplate) {
        this.$emit('clear')
        return
      }
      const formattedMessage = this.replaceTokens(messageTemplate.message)
      this.$emit('selected', formattedMessage)
    },
    replaceTokens(message) {
      for (const [key, value] of Object.entries(this.tokens)) {
        message = message.replace(key, value)
      }
      return message
    },
  },
})
</script>
