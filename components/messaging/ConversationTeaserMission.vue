<template>
  <ConversationTeaser :conversation="conversation">
    <template #badge>
      <div class="flex space-x-1 items-center truncate text-xs text-[#272747]">
        <div class="truncate leading-none uppercase font-bold">
          {{ $filters.label(contactInConversation.context_role, 'roles') }}
        </div>
        <RiShieldUserLine class="w-5 flex-none" />
      </div>
    </template>

    <p :class="['line-clamp-2', { 'font-bold': hasUnreadMessage }]">
      {{ conversation.conversable.name }}
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
import MixinConversation from '@/mixins/conversation.js'

export default defineNuxtComponent({
  components: {
    ConversationTeaser,
  },
  mixins: [MixinConversation],
  props: {
    conversation: { type: Object, required: true },
  },
})
</script>
