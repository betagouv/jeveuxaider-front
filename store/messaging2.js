export const state = () => ({
  conversations: [],
  activeConversation: {},
  unreadMessagesCount: 0,
  isCurrentUserInConversation: false
})

export const getters = {
  conversations: state => state.conversations,
  activeConversation: state => state.activeConversation,
  unreadMessagesCount: state => state.unreadMessagesCount,
  isCurrentUserInConversation: (state, getters, rootState) => state.activeConversation?.users.filter(user => user.id === rootState.auth.user.id).length
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
  refreshConversationInConversations (state, payload) {
    const index = state.conversations.findIndex(conversation => conversation.id == payload.id)
    state.conversations.splice(index, 1, payload)
  }
}

export const actions = {
  async refreshConversationInConversations ({ state, commit }, conversationId) {
    const { data: conversation } = await this.$axios.get(`/conversationsv2/${conversationId}`)
    commit('refreshConversationInConversations', conversation)
  },
  async getUserUnreadMessagesCount ({ commit }) {
    const { data: count } = await this.$axios.get('user/unread-messages')
    commit('setUnreadMessagesCount', count)
  }
}
