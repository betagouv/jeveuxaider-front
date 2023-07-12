export const state = () => ({
  notifications: [],
  unreadNotificationsCount: 0
})

export const getters = {
  notifications: state => state.notifications,
  unreadNotificationsCount: state => state.unreadNotificationsCount
}

export const mutations = {
  setNotifications (state, notifications) {
    state.notifications = notifications
  },
  refreshNotificationnInNotificationns (state, payload) {
    const index = state.notifications.findIndex(notification => notification.id == payload.id)
    state.notifications.splice(index, 1, payload)
  },
  setUnreadNotificationsCount: (state, payload) => {
    state.unreadNotificationsCount = payload
  },
  decrementUnreadNotificationsCount (state) {
    state.unreadNotificationsCount = state.unreadNotificationsCount > 0 ? state.unreadNotificationsCount -= 1 : 0
  }
}

export const actions = {
  async fetchNotifications ({ commit, dispatch }) {
    const res = await this.$axios
      .get('/user/notifications')
    if (res?.data) {
      commit('setNotifications', res.data.data)
    }
  },
  async markNotificationAsRead ({ commit, dispatch }, payload) {
    const notification = await this.$axios
      .post(`/user/notifications/${payload.id}/mark-as-read`)
    if (notification?.data) {
      commit('refreshNotificationnInNotificationns', notification?.data)
    }
  },
  async getUserUnreadNotificationsCount ({ commit }) {
    const { data: count } = await this.$axios.get('user/unread-notifications')
    commit('setUnreadNotificationsCount', count)
  }
}
