<template>
  <Dropdown ref="dropdownUserNotifications">
    <template #button>
      <button class="group">
        <BellIcon class="text-[#9CA3AF] group-hover:scale-105" />
        <div v-if="$store.getters['notifications/unreadNotificationsCount']" class="group-hover:scale-105 absolute top-[-1px] right-[0px] bg-[#FF463D] rounded-full w-[10px] h-[10px]" />
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
