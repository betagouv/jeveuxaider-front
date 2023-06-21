<template>
  <ConversationRecipient :title="user.profile.full_name">
    <template #badges>
      <Badge
        size="sm"
        no-icon
      >
        {{ user.context_role | label('roles') }}
      </Badge>
    </template>
    <div class="flex flex-wrap gap-4 items-center">
      <div class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
        <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
          {{ user.profile.email }}
        </p>
      </div>
      <div v-if="user.profile.mobile" class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
        <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
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
