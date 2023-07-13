<template>
  <Dropdown ref="dropdownUserNotifications" menu-button-class="leading-3">
    <template #button>
      <button class="group">
        <BellIcon class="text-jva-blue-500 h-[22px] group-hover:scale-105" />
        <div v-if="$store.getters['notifications/unreadNotificationsCount']" class="group-hover:scale-105 absolute top-[-1px] right-[0px] border border-white bg-[#FF463D] rounded-full w-[10px] h-[10px]" />
      </button>
    </template>

    <template #items>
      <div class="w-[400px] grid grid-cols-1 divide-y divide-y-[#ECECEC]">
        <div class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center justify-between">
          <div class="text-lg font-bold">
            Notifications
          </div>
          <div class="">
            <Link class="text-sm" icon="ChevronRightIcon" @click.native="goToNotifications">
              Voir tout
            </Link>
          </div>
        </div>
        <template v-if="notifications.length > 0">
          <div class="max-h-[350px] grid grid-cols-1 divide-y divide-y-[#ECECEC] overflow-y-scroll">
            <NotificationListItem
              v-for="notification in notifications"
              :key="notification.id"
              :notification="notification"
              variant="dropdown"
            />
          </div>
        </template>
        <template v-else>
          <div class="text-gray-400 p-4 text-sm text-center">
            Aucune notification
          </div>
        </template>
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
