<template>
  <div class="p-6">
    <div class="flex">
      <Avatar
        v-for="(recipient, i) in recipients.slice(0, 3)"
        :key="recipient.id"
        class="mr-4 relative"
        :class="[{ '-ml-10': i !== 0 }]"
        :img-srcset="recipient.profile.avatar && recipient.profile.avatar.urls.thumbSmall"
        :img-src="recipient.profile.avatar && recipient.profile.avatar.urls.original"
        :initials="recipient.profile.short_name"
        size="sm"
      />
      <div class="flex-1 min-w-0 relative">
        <p
          class="truncate font-bold text-lg"
          v-html="recipients.map(recipient => recipient.profile.first_name).join(', ')"
        />
        <p class="text-cool-gray-500 text-sm leading-none first-letter:capitalize">
          {{ lastMessageDate }}
        </p>
        <div class="text-gray-800 mt-2">
          @TODO ORGANISATION TEASER
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    conversation: { type: Object, required: true }
  },
  computed: {
    recipients () {
      return this.conversation.users.filter((user) => {
        return user.id != this.$store.getters.profile.user_id
      })
    },
    lastMessageDate () {
      const date = this.$dayjs(this.conversation.updated_at)
      return this.$dayjs().isSame(date, 'day') ? date.fromNow() : date.format('dddd D MMMM YYYY')
    }
  },
  methods: {

  }
}
</script>
