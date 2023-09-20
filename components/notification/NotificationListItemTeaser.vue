<template>
  <div
    class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center cursor-pointer hover:bg-gray-50"
    @click="handleClick(notification)"
  >
    <div :class="['w-[24px] text-lg']">
      {{ notificationResolver.emoji }}
    </div>
    <div :class="['flex-1 overflow-x-hidden w-[253px]']">
      <div
        v-if="notificationResolver.message"
        :class="['text-black text-base mb-2']"
        v-html="$filters.marked(notificationResolver.message)"
      />
      <div :class="['text-sm text-gray-600 first-letter:uppercase']">
        {{ $dayjs(notification.created_at).fromNow() }}
      </div>
    </div>
    <div class="w-[12px]">
      <div
        v-if="notification.read_at === null"
        aria-label="Notification non lue"
        class="flex-none w-[9px] h-[9px] bg-[#FF463D] rounded-full"
      />
    </div>
  </div>
</template>

<script>
import MixinNotification from '@/mixins/notification'

export default defineNuxtComponent({
  mixins: [MixinNotification],
  props: {
    notification: {
      type: Object,
      required: true,
    },
    variant: {
      type: String,
      default: 'dropdown', // dropdown, card
    },
  },
})
</script>
