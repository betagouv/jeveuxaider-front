<template>
  <ConversationRecipient :title="user.profile.full_name">
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
      <div v-if="user.profile.zip" class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
        <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
          {{ user.profile.zip }}
        </p>
      </div>
      <div v-if="user.profile.type" class="flex space-x-1 truncate text-sm text-cool-gray-500">
        <RiSuitcaseFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
          {{ user.profile.type | label('profile_type') }}
        </p>
      </div>
    </div>
  </ConversationRecipient>
</template>

<script>
import ConversationRecipient from '@/components/messaging/ConversationRecipient.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'

export default {
  components: {
    ConversationRecipient
  },
  mixins: [MixinConversationParticipation],
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
