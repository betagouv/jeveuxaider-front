<template>
  <div
    class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center justify-between cursor-pointer hover:bg-gray-50"
    @click="handleClick(notification)"
  >
    <div>
      <div
        v-if="message"
        :class="[
          'text-black',
          {'text-base mb-2': variant === 'card'},
          {'text-sm': variant === 'dropdown'}
        ]"
        v-html="$options.filters.marked(message)"
      />
      <div
        :class="[
          'text-gray-600 first-letter:uppercase',
          {'text-sm': variant === 'card'},
          {'text-xs': variant === 'dropdown'}
        ]"
      >
        {{ $dayjs(notification.created_at).fromNow() }}
      </div>
    </div>
    <div class="w-3">
      <div
        v-if="notification.read_at === null"
        aria-label="Notification non lue"
        class="flex-none w-3 h-3 bg-[#F95A5C] rounded-full"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      default: 'dropdown' // dropdown, card
    }
  },
  computed: {
    message () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationCreated':
          return `Votre demande de participation a bien été enregistrée pour la mission **${this.notification.data.mission_name}**`
        case 'App\\Notifications\\ResetPassword':
          return 'Une demande de **réinitialisation de votre mot de passe** a été effectuée'
        default:
          return this.notification.type
      }
    }

  },
  methods: {
    handleClick (notification) {
      const redirection = this.redirectionResolver(notification)
      if (redirection) {
        this.$router.push(redirection)
      }
      if (this.notification.read_at === null) {
        this.$store.dispatch('notifications/markNotificationAsRead', notification)
        this.$emit('refetch')
      }
    },
    redirectionResolver () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationCreated':
          return `/messages/${this.notification.data.conversation_id}`
        default:
          return null
      }
    }
  }
}
</script>

<style>

</style>
