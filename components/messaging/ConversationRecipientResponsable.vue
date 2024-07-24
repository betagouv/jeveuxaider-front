<template>
  <ConversationRecipient :title="user.profile.full_name">
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
      <template v-if="showPrivateInfos">
        <div class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{ user.profile.email }}
          </p>
        </div>
        <div v-if="user.profile.mobile" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{ user.profile.mobile }}
          </p>
        </div>
      </template>
      <div v-if="responsableStructure" class="flex gap-1 items-center text-sm text-cool-gray-500">
        <RiBuildingFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p>
          {{ responsableStructure.name }}
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
    showPrivateInfos: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    responsableStructure() {
      return this.user.structures.length ? this.user.structures[0] : null
    },
  },
})
</script>
