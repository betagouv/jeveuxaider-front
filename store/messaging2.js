export const state = () => ({
  conversations: [],
  activeConversation: {},
  unreadMessagesCount: 0
})

export const getters = {
  conversations: state => state.conversations,
  activeConversation: state => state.activeConversation,
  unreadMessagesCount: state => state.unreadMessagesCount
}

export const mutations = {
  setConversations: (state, conversations) => {
    state.conversations = conversations
  },
  setActiveConversation: (state, payload) => {
    state.activeConversation = payload
  },
  setUnreadMessagesCount: (state, payload) => {
    state.activeConversation = payload
  },
  refreshActiveConversationInConversations (state, payload) {
    state.conversations.splice(
      state.conversations.findIndex(
        conversation => conversation.id == payload.id
      ),
      1,
      payload
    )
  }
}

export const actions = {
  async refreshActiveConversation ({ state, commit }, payload) {
    const { data: conversation } = await this.$axios.get(`/conversations/${payload.id}`)
    commit('setActiveConversation', conversation)
    commit('refreshActiveConversationInConversations', conversation)
  },
  async getUserUnreadMessagesCount ({ commit }) {
    const { data: count } = await this.$axios.get('user/unread-messages')
    commit('setUnreadMessagesCount', count)
  }
}
