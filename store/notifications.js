export const state = () => ({
  notifications: []
})

export const mutations = {

  setNotifications (state, notifications) {
    state.notifications = notifications
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
  }
}
