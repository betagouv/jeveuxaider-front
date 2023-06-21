<template>
  <ConversationRecipient :title="user.profile.full_name">
    <template #badges>
      <Badge
        size="sm"
        no-icon
        class="hidden lg:flex"
      >
        {{ user.context_role | label('roles') }}
      </Badge>
    </template>
    <div v-dragscroll.x class="flex gap-4 items-center overflow-hidden whitespace-nowrap">
      <div class="flex gap-1 items-center text-sm text-cool-gray-500">
        <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="">
          {{ user.profile.email }}
        </p>
      </div>
      <div v-if="user.profile.mobile" class="flex gap-1 items-center text-sm text-cool-gray-500">
        <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="">
          {{ user.profile.mobile }}
        </p>
      </div>
    </div>
  </ConversationRecipient>
</template>

<script>
import ConversationRecipient from '@/components/messaging/ConversationRecipient.vue'
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    ConversationRecipient,
    Badge
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {

  }
}
</script>

<style>

</style>
