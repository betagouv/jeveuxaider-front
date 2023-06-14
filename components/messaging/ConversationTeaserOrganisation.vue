<template>
  <ConversationTeaser :conversation="conversation">
    <template #badge>
      <div class="flex space-x-1 items-center truncate text-xs text-[#272747]">
        <div class="truncate leading-none uppercase font-bold">
          {{ contactInConversation.context_role | label('roles') }}
        </div>
        <RiShieldUserLine class="w-5 flex-none" />
      </div>
    </template>

    <p :class="['line-clamp-2', {'font-bold': hasUnreadMessage}]">
      {{ conversation.conversable.name }}
    </p>

    <div class="flex space-x-1 items-center truncate text-sm mt-2 text-cool-gray-500">
      <RiBuildingFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
      <p class="truncate leading-none">
        {{ conversation.conversable.statut_juridique | label('structure_legal_status') }}
      </p>
    </div>
  </ConversationTeaser>
</template>

<script>
import ConversationTeaser from '@/components/messaging/ConversationTeaser.vue'
import ConversationTeaserMixin from '@/mixins/conversation-teaser.js'

export default {
  components: {
    ConversationTeaser
  },
  mixins: [ConversationTeaserMixin],
  props: {
    conversation: { type: Object, required: true }
  },
  computed: {},
  methods: {}
}
</script>
