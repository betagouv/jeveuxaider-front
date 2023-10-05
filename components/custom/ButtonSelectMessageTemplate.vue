<template>
  <BaseDropdown
    ref="dropdownMessageTemplates"
    class="flex-none"
    position-class="origin-top-right bottom-14 right-0"
  >
    <template #button>
      <DsfrButton
        type="transparent"
        icon="RiArrowUpSLine"
        icon-position="right"
        class="hidden lg:flex"
      >
        Modèle
      </DsfrButton>
      <DsfrButton
        type="transparent"
        size="md"
        icon="RiMore2Line"
        icon-only
        class="flex lg:hidden"
      />
    </template>

    <template #items>
      <div class="w-[350px] p-4">
        <template v-if="$stores.messaging.messageTemplates.length > 0">
          <div class="text-gray-500 text-xs font-bold uppercase mb-3">
            Utiliser un modèle de message
          </div>
          <div class="space-y-2 border-b pb-3 mb-3">
            <div
              class="text-[#161616] text-sm cursor-pointer hover:text-jva-blue-500"
              v-for="messageTemplate in $stores.messaging.messageTemplates"
              :key="messageTemplate.id"
              @click="onClick(messageTemplate)"
            >
              {{ messageTemplate.name }}
            </div>
          </div>
        </template>
        <div class="">
          <NuxtLink
            to="/messages/modeles"
            class="text-[#161616] text-sm cursor-pointer hover:text-jva-blue-500"
            >Gestion des modèles</NuxtLink
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
    tokens() {
      return {
        '[benevole_prenom]': this.conversation.conversable.profile.first_name,
        '[benevole_nom]': this.conversation.conversable.profile.last_name,
        '[mission_nom]': this.conversation.conversable.mission.name,
        '[mission_ville]': this.conversation.conversable.mission.city,
        '[mission_date_debut]': this.$dayjs(
          this.conversation.conversable.mission.start_date
        ).format('D MMMM YYYY'),
        '[mission_date_fin]': this.$dayjs(this.conversation.conversable.mission.end_date).format(
          'D MMMM YYYY'
        ),
        '[organisation_nom]': this.conversation.conversable.mission.structure.name,
        '[responsable_prenom]': this.conversation.conversable.mission.responsable.first_name,
        '[responsable_nom]': this.conversation.conversable.mission.responsable.last_name,
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
