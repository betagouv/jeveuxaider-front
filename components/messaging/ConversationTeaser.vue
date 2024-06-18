<template>
  <div class="p-4 lg:p-6">
    <div class="flex">
      <div class="flex flex-col mr-4">
        <BaseAvatar
          v-for="(recipient, i) in recipients.slice(0, 4)"
          :key="recipient.id"
          class="relative border-white border-2 z-10"
          :class="[{ '-mt-[15px]': i !== 0 }]"
          :img-srcset="recipient.profile.avatar && recipient.profile.avatar.urls.thumbSmall"
          :img-src="recipient.profile.avatar && recipient.profile.avatar.urls.original"
          :initials="recipient.profile.short_name"
          size="sm"
        />
      </div>
      <div class="flex-1 min-w-0 relative">
        <div class="flex items-center">
          <p class="truncate font-bold text-lg">
            {{ title }}
          </p>
          <div
            v-if="hasUnreadMessage"
            aria-label="Message non lu"
            class="flex-none w-3 h-3 ml-2 mr-auto bg-[#FF463D] rounded-full"
          />

          <!-- Badge Desktop -->
          <div class="pl-4 ml-auto hidden xs:block leading-none">
            <slot name="badge" />
          </div>
        </div>
        <p class="text-cool-gray-500 text-sm leading-tight first-letter:capitalize">
          {{ lastMessageDate }}
        </p>
        <div class="text-gray-800 mt-4">
          <slot />
        </div>

        <!-- Badge Mobile -->
        <div class="mt-4 xs:hidden">
          <slot name="badge" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinConversation from '@/mixins/conversation.js'

export default defineNuxtComponent({
  mixins: [MixinConversation],
  props: {
    conversation: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    hideAvatars: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    recipients() {
      if(this.isCurrentUserResponsable){
        return this.conversation.users.filter((user)=> user.id === this.conversation.conversable.profile.user_id)
      }
      return this.conversation.users.filter((user) => {
        return user.id != this.$stores.auth.profile.user_id
      })
    },
    lastMessageDate() {
      const date = this.$dayjs(this.conversation.updated_at)
      return this.$dayjs().isSame(date, 'day') ? date.fromNow() : date.format('dddd D MMMM YYYY')
    },
  },
})
</script>
