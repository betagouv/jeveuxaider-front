<template>
  <Dropdown ref="dropdownUserNotifications">
    <template #button>
      <button class="group">
        <RiNotification2Line class="w-[20px] text-[#9CA3AF] fill-current hover:scale-105" />
      </button>
    </template>

    <template #items>
      <div class="w-[350px] grid grid-cols-1 divide-y divide-y-[#ECECEC] ">
        <NotificationListItem
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
          variant="dropdown"
        />
        <div class="p-4 lg:p-6 text-center">
          <Link class="text-sm" icon="ChevronRightIcon" @click.native="goToNotifications">
            Voir toutes les notifications
          </Link>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import NotificationListItem from '@/components/notification/NotificationListItem.vue'

export default {
  components: {
    NotificationListItem
  },
  computed: {
    notifications () {
      return this.$store.getters['notifications/notifications']
    }
  },
  methods: {
    goToNotifications () {
      this.$refs.dropdownUserNotifications.close()
      this.$router.push('/notifications')
    }
  }
}
</script>
