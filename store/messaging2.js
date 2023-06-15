export const state = () => ({
  conversations: [],
  activeConversation: {},
  activeConversationMessages: [],
  hasActiveConversationMoreMessages: false,
  unreadMessagesCount: 0,
  isCurrentUserInConversation: false,
  isConversationArchivedForCurrentUser: false
})

export const getters = {
  conversations: state => state.conversations,
  activeConversation: state => state.activeConversation,
  activeConversationMessages: state => state.activeConversationMessages,
  hasActiveConversationMoreMessages: state => state.hasActiveConversationMoreMessages,
  unreadMessagesCount: state => state.unreadMessagesCount,
  isCurrentUserInConversation: (state, getters, rootState) => state.activeConversation?.users.filter(user => user.id === rootState.auth.user.id).length,
  isConversationArchivedForCurrentUser: (state, getters, rootState) => !state.activeConversation?.users.filter(user => user.id === rootState.auth.user.id)[0]?.pivot.status
}

export const mutations = {
  setConversations: (state, conversations) => {
    state.conversations = conversations
  },
  setActiveConversation: (state, payload) => {
    state.activeConversation = payload
  },
  setActiveConversationMessages: (state, payload) => {
    state.activeConversationMessages = payload
  },
  pushNewMessageInActiveConversationMessages: (state, payload) => {
    state.activeConversationMessages.push(payload)
  },
  unshiftOldMessageInActiveConversationMessages: (state, payload) => {
    state.activeConversationMessages.unshift(payload)
  },
  setUnreadMessagesCount: (state, payload) => {
    state.activeConversation = payload
  },
  setHasActiveConversationMoreMessages: (state, payload) => {
    state.hasActiveConversationMoreMessages = payload
  },
  refreshConversationInConversations (state, payload) {
    console.log('refreshConversationInConversations', payload)

    const index = state.conversations.findIndex(conversation => conversation.id == payload.id)
    state.conversations.splice(index, 1, payload)
  }
}

export const actions = {
  async fetchConversationMessages ({ state, commit }, conversationId) {
    const { data: messages } = await this.$axios.get(`/conversationsv2/${conversationId}/messages`)
    commit('setActiveConversationMessages', messages.data?.reverse())
    commit('setHasActiveConversationMoreMessages', messages.last_page !== 1)
  },
  async fetchNewConversationMessages ({ state, commit }, conversationId) {
    const lastMessage = state.activeConversationMessages?.slice(-1)[0]
    if (lastMessage) {
      const { data: newMessages } = await this.$axios.get(`/conversationsv2/${conversationId}/messages`, {
        params: { 'filter[after_message_id]': lastMessage.id }
      })
      newMessages?.data.forEach((message) => {
        commit('pushNewMessageInActiveConversationMessages', message)
      })
    }
  },
  async fetchOldConversationMessages ({ state, commit }, conversationId) {
    const firstMessage = state.activeConversationMessages[0]
    if (firstMessage) {
      const { data: oldMessages } = await this.$axios.get(`/conversationsv2/${conversationId}/messages`, {
        params: { 'filter[before_message_id]': firstMessage.id }
      })
      oldMessages?.data.forEach((message) => {
        commit('unshiftOldMessageInActiveConversationMessages', message)
      })
      commit('setHasActiveConversationMoreMessages', oldMessages.last_page !== 1)
    }
  },
  async refreshActiveConversation ({ state, commit }, conversationId) {
    console.log('refreshActiveConversation', conversationId)
    const { data: conversation } = await this.$axios.get(`/conversationsv2/${conversationId}`)
    console.log('refreshActiveConversation conversation', conversation)

    commit('setActiveConversation', conversation)
    commit('refreshConversationInConversations', conversation)
  },
  async refreshConversationInConversations ({ state, commit }, conversationId) {
    const { data: conversation } = await this.$axios.get(`/conversationsv2/${conversationId}`)

    commit('refreshConversationInConversations', conversation)
  },
  async getUserUnreadMessagesCount ({ commit }) {
    const { data: count } = await this.$axios.get('user/unread-messages')
    commit('setUnreadMessagesCount', count)
  }
}
