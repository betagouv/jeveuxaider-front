<template>
  <BaseDropdown
    ref="dropdownMessageTemplates"
    class="flex-none"
    position-class="origin-top-right bottom-14 right-0"
  >
    <template #button>
      <DsfrButton type="transparent" icon="RiTodoLine" icon-position="left" class="hidden lg:flex">
        Modèles
      </DsfrButton>
      <DsfrButton type="transparent" icon="RiTodoLine" icon-only class="flex lg:hidden" />
    </template>

    <template #items>
      <div class="w-[350px] p-4">
        <div
          v-if="$stores.messaging.messageTemplates.length > 0"
          class="border-b border-[#DDDDDD] pb-3 mb-3"
        >
          <div class="text-gray-500 text-xs font-bold uppercase mb-3">
            Utiliser un modèle de message
          </div>
          <BaseContainerScrollable class="h-[200px]">
            <div class="">
              <div
                class="text-[#161616] text-sm cursor-pointer py-[5px] hover:text-jva-blue-500 hover:font-semibold"
                v-for="messageTemplate in $stores.messaging.messageTemplates"
                :key="messageTemplate.id"
                @click="onClick(messageTemplate)"
              >
                {{ messageTemplate.name }}
              </div>
            </div>
          </BaseContainerScrollable>
        </div>
        <div class="">
          <NuxtLink
            to="/messages/modeles"
            class="text-[#161616] text-sm cursor-pointer hover:text-jva-blue-500 flex items-center space-x-3 hover:font-semibold"
            ><RiTodoLine class="h-4 w-4 fill-current" /> <span>Gestion des modèles</span></NuxtLink
          >
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script>
export default defineNuxtComponent({
  emits: ['selected'],
  data() {
    return {}
  },
  computed: {
    conversation() {
      return this.$stores.messaging.activeConversation
    },
    recipientUser() {
      return this.conversation.users.filter(
        (user) => user.id != this.$stores.auth.profile.user_id
      )[0]
    },
    tokens() {
      return {
        '[destinataire_prenom]': this.tokenDestinatairePrenomResolver,
        '[destinataire_nom]': this.tokenDestinataireNomResolver,
        '[mission_nom]': this.tokenMissionNomResolver,
        '[mission_ville]': this.tokenMissionVilleResolver,
        '[mission_date_debut]': this.tokenMissionDateDebutResolver,
        '[mission_date_fin]': this.tokenMissionDateFinResolver,
        '[organisation_nom]': this.tokenOrganisationNomResolver,
        '[expediteur_prenom]': this.$stores.auth.user.profile.first_name,
        '[expediteur_nom]': this.$stores.auth.user.profile.last_name,
      }
    },
    tokenDestinatairePrenomResolver() {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.conversation.conversable.profile.first_name
        case 'App\\Models\\Mission':
          return this.recipientUser.profile.first_name
        case 'App\\Models\\Structure':
          return this.recipientUser.profile.first_name
        default:
          return ''
      }
    },
    tokenDestinataireNomResolver() {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.conversation.conversable.profile.last_name
        case 'App\\Models\\Mission':
          return this.recipientUser.profile.last_name
        case 'App\\Models\\Structure':
          return this.recipientUser.profile.last_name
        default:
          return ''
      }
    },
    tokenOrganisationNomResolver() {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.conversation.conversable.mission.structure.name
        case 'App\\Models\\Mission':
          return this.conversation.conversable.structure.name
        case 'App\\Models\\Structure':
          return this.conversation.conversable.name
        default:
          return ''
      }
    },
    tokenMissionNomResolver() {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.conversation.conversable.mission.name ?? ''
        case 'App\\Models\\Mission':
          return this.conversation.conversable.name ?? ''
        default:
          return ''
      }
    },
    tokenMissionVilleResolver() {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.conversation.conversable.mission.type === 'Mission en présentiel'
            ? this.conversation.conversable?.mission?.addresses[0]?.city
            : ''
        case 'App\\Models\\Mission':
          return this.conversation.conversable.type === 'Mission en présentiel'
            ? this.conversation.conversable?.addresses[0]?.city
            : ''
        default:
          return ''
      }
    },
    tokenMissionDateDebutResolver() {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.$dayjs(this.conversation.conversable.mission.start_date).format('D MMMM YYYY')
        case 'App\\Models\\Mission':
          return this.$dayjs(this.conversation.conversable.start_date).format('D MMMM YYYY')
        default:
          return ''
      }
    },
    tokenMissionDateFinResolver() {
      switch (this.conversation.conversable_type) {
        case 'App\\Models\\Participation':
          return this.$dayjs(this.conversation.conversable.mission.end_date).format('D MMMM YYYY')
        case 'App\\Models\\Mission':
          return this.$dayjs(this.conversation.conversable.end_date).format('D MMMM YYYY')
        default:
          return ''
      }
    },
  },
  methods: {
    onClick(messageTemplate) {
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
