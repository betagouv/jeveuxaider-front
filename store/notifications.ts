import { defineStore } from 'pinia'
import Notification from 'types/notification'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
    unreadNotificationsCount: 0,
  }),
  getters: {},
  actions: {
    refreshNotificationInNotifications(payload: Notification) {
      const index = this.notifications.findIndex((notification) => notification.id == payload.id)
      this.notifications.splice(index, 1, payload)
    },
    decrementUnreadNotificationsCount() {
      this.unreadNotificationsCount = Math.max(0, this.unreadNotificationsCount - 1)
    },
    async fetchNotifications() {
      const { data, error } = await useApiFetch<QueryBuilderResponse>('/user/notifications')
      if (error.value) {
        return error.value
      }
      if (data.value) {
        this.notifications = data.value.data as Notification[]
      }
    },
    // @todo: à tester
    async markNotificationAsRead(payload: Notification) {
      const { data, error } = await useApiFetch<any>(
        `/user/notifications/${payload.id}/mark-as-read`,
        {
          method: 'POST',
        }
      )
      if (data.value) {
        this.refreshNotificationInNotifications(data.value)
      }
    },
    // @todo: à tester
    async getUserUnreadNotificationsCount() {
      const data: any = await apiFetch(`user/unread-notifications`)
      this.unreadNotificationsCount = data.count
    },
  },
})
