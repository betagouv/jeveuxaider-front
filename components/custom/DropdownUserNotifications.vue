<template>
  <BaseDropdown ref="dropdownUserNotifications" menu-button-class="leading-3">
    <template #button>
      <button class="group p-1">
        <BellIcon class="text-jva-blue-500 h-[22px] group-hover:scale-105" />
        <div
          v-if="$stores.notifications.unreadNotificationsCount"
          class="group-hover:scale-105 absolute top-[2px] right-[2px] border border-white bg-[#FF463D] rounded-full w-[10px] h-[10px]"
        />
      </button>
    </template>

    <template #items>
      <div class="w-[400px] grid grid-cols-1 divide-y">
        <div class="p-4 lg:p-6 flex gap-4 lg:gap-6 items-center justify-between">
          <div class="text-lg font-bold">Notifications</div>
          <div>
            <BaseLink class="text-sm" icon="RiArrowRightSLine" @click.native="goToNotifications">
              Voir tout
            </BaseLink>
          </div>
        </div>
        <template v-if="notifications.length > 0">
          <div class="max-h-[350px] grid grid-cols-1 divide-y overflow-y-auto">
            <NotificationListItemTeaser
              v-for="notification in notifications"
              :key="notification.id"
              :notification="notification"
              @close="$refs.dropdownUserNotifications.close()"
            />
          </div>
        </template>
        <template v-else>
          <div class="text-gray-400 p-8 text-sm text-center">Aucune notification</div>
        </template>
      </div>
    </template>
  </BaseDropdown>
</template>

<script>
import NotificationListItemTeaser from '@/components/notification/NotificationListItemTeaser.vue'
import { BellIcon } from '@heroicons/vue/24/outline'

export default defineNuxtComponent({
  components: {
    NotificationListItemTeaser,
    BellIcon,
  },
  computed: {
    notifications() {
      return this.$stores.notifications.notifications
    },
  },
  methods: {
    goToNotifications() {
      this.$refs.dropdownUserNotifications.close()
      this.$router.push('/notifications')
    },
  },
})
</script>
