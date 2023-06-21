<template>
  <ConversationRecipient :title="name">
    <div class="flex flex-wrap gap-4 items-center">
      <template v-if="showPrivateInfos">
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
      </template>
      <div v-if="responsableStructure" class="flex space-x-1 items-center truncate text-sm text-cool-gray-500">
        <RiBuildingFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
        <p class="truncate leading-none">
          {{ responsableStructure.name }}
        </p>
      </div>
    </div>
  </ConversationRecipient>
</template>

<script>
import ConversationRecipient from '@/components/messaging/ConversationRecipient.vue'

export default {
  components: {
    ConversationRecipient
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    showPrivateInfos: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    name () {
      if (this.showPrivateInfos) {
        return this.user.profile.full_name
      }
      return `${this.user.profile.first_name} ${this.user.profile.last_name[0]}.`
    },
    responsableStructure () {
      return this.user.structures.length ? this.user.structures[0] : null
    }
  }
}
</script>

<style>

</style>
