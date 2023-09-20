<template>
  <ConversationRecipient :title="`${user.profile.first_name} ${user.profile.last_name[0]}.`">
    <template #badges>
      <DsfrBadge size="sm" no-icon class="hidden lg:flex">
        {{ $filters.label(user.context_role, 'roles') }}
      </DsfrBadge>
    </template>
    <div
      v-dragscroll.x
      class="px-4 lg:px-8 flex gap-4 items-center overflow-hidden whitespace-nowrap"
    >
      <div class="flex gap-1 items-center text-sm text-cool-gray-500">
        <RiChatHistoryFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p>
          {{
            $dayjs($stores.messaging.activeConversation.created_at).format('D MMM YYYY • HH[h]mm')
          }}
        </p>
      </div>
    </div>
  </ConversationRecipient>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import ConversationRecipient from '@/components/messaging/ConversationRecipient.vue'

export default defineNuxtComponent({
  directives: {
    dragscroll,
  },
  components: {
    ConversationRecipient,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
})
</script>
