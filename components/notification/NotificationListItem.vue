<template>
  <div
    class="p-4 flex gap-4 items-center cursor-pointer hover:bg-gray-50"
    @click="handleClick(notification)"
  >
    <div>
      <div class="text-sm text-black">
        {{ message }}
      </div>
      <div class="text-xs">
        {{ $dayjs(notification.created_at).fromNow() }}
      </div>
    </div>
    <div
      v-if="notification.read_at === null"
      aria-label="Message non lu"
      class="flex-none w-3 h-3 bg-[#F95A5C] rounded-full"
    />
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    message () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ResetPassword':
          return 'Une demande de réinitialisation de votre mot de passe a été effectuée'
        default:
          return this.notification.type
      }
    }
  },
  methods: {
    handleClick (notification) {
      this.markNotificationAsRead(notification)
    },
    async markNotificationAsRead (notification) {
      await this.$axios.get(`/user/notifications/${notification.id}/mark-as-read`)
    }
  }
}
</script>

<style>

</style>
