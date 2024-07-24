<template>
  <ConversationRecipient :title="structure?.name">
    <div
      v-dragscroll.x
      class="px-4 lg:px-6 flex gap-4 items-center overflow-hidden whitespace-nowrap"
    >
      <div class="flex gap-1 items-center text-sm text-cool-gray-500">
        <RiChatHistoryFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p>
          {{
            $dayjs($stores.messaging.activeConversation.created_at).format('D MMM YYYY • HH[h]mm')
          }}
        </p>
      </div>
      <div class="flex gap-1 items-center text-sm text-cool-gray-500">
        <RiGroupFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p>{{ otherUsers.map((r) => r.profile.first_name).join(', ') }} et vous</p>
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
    structure: {
      type: Object,
      required: true,
    },
    users: {
      type: Object,
      required: true,
    },
  },
  computed: {
    otherUsers() {
      return this.users.filter((user) => user.id != this.$stores.auth.profile?.user_id)
    },
  },
})
</script>
