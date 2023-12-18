<template>
  <ConversationTeaser :conversation="conversation">
    <template #badge>
      <DsfrBadge size="sm" :type="badgeType" :no-icon="true">
        {{ conversation.conversable.state }}
      </DsfrBadge>
    </template>

    <p :class="['line-clamp-2', { 'font-bold': hasUnreadMessage }]">
      {{ conversation.conversable.mission.name }}
    </p>
    <div class="flex space-x-1 items-center truncate text-sm mt-2 text-cool-gray-500">
      <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
      <p class="truncate leading-none">
        {{ getPlaceMission(conversation) }}
      </p>
    </div>
    <div
      v-if="canSeeTags && conversation.conversable?.tags?.length > 0"
      class="flex-none flex space-x-4 items-center mt-4"
    >
      <div class="flex flex-wrap gap-2 max-w-full">
        <DsfrTag
          v-for="(tag, index) in conversation.conversable?.tags"
          :key="tag.id"
          size="sm"
          as="button"
        >
          {{ tag.name }}
        </DsfrTag>
      </div>
    </div>
  </ConversationTeaser>
</template>

<script>
import ConversationTeaser from '@/components/messaging/ConversationTeaser.vue'
import MixinConversation from '@/mixins/conversation.js'

export default defineNuxtComponent({
  components: {
    ConversationTeaser,
  },
  mixins: [MixinConversation],
  props: {
    conversation: { type: Object, required: true },
  },
  computed: {
    canSeeTags() {
      return ['admin', 'referent', 'tete_de_reseau', 'responsable'].includes(
        this.$stores.auth.contextRole
      )
    },
    badgeType() {
      switch (this.conversation.conversable?.state) {
        case 'Validée':
          return 'success'
        case 'Signalée':
        case 'Annulée':
        case 'Refusée':
          return 'error'
        case 'En attente de validation':
        case 'En cours de traitement':
          return 'warning'
        default:
          return 'info'
      }
    },
  },
})
</script>
