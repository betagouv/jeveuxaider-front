<template>
  <ConversationTeaser :conversation="conversation">
    <template #badge>
      <Badge
        size="sm"
        :type="badgeType"
        :no-icon="true"
      >
        {{ conversation.conversable.state }}
      </Badge>
    </template>

    <p :class="['line-clamp-2', {'font-bold': hasUnreadMessage}]">
      {{ conversation.conversable.mission.name }}
    </p>
    <div class="flex space-x-1 items-center truncate text-sm mt-2 text-cool-gray-500">
      <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
      <p class="truncate leading-none">
        {{ getPlaceMission(conversation) }}
      </p>
    </div>
  </ConversationTeaser>
</template>

<script>
import ConversationTeaser from '@/components/messaging/ConversationTeaser.vue'
import ConversationTeaserMixin from '@/mixins/conversation-teaser.js'
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    ConversationTeaser,
    Badge
  },
  mixins: [ConversationTeaserMixin],
  props: {
    conversation: { type: Object, required: true }
  },
  computed: {
    badgeType () {
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
    }
  }
}
</script>
