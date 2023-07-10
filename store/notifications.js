export const state = () => ({
  notifications: []
})

export const mutations = {
  setNotifications (state, notifications) {
    state.notifications = notifications
  },
  refreshNotificationnInNotificationns (state, payload) {
    const index = state.notifications.findIndex(notification => notification.id == payload.id)
    state.notifications.splice(index, 1, payload)
  }

}

export const getters = {
  notifications: state => state.notifications
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
  }
}
