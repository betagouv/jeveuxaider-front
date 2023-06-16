export const state = () => ({
  conversations: [],
  conversationsQueryParams: {
    'filter[type]': 'all',
    'filter[search]': null,
    page: 1
  },
  hasMoreConversations: false,
  activeConversation: {},
  activeConversationMessages: [],
  hasActiveConversationMoreMessages: false,
  unreadMessagesCount: 0,
  isCurrentUserInConversation: false,
  isConversationArchivedForCurrentUser: false,
  showFilters: false
})

export const getters = {
  conversations: state => state.conversations,
  conversationsQueryParams: state => state.conversationsQueryParams,
  hasMoreConversations: state => state.hasMoreConversations,
  activeConversation: state => state.activeConversation,
  activeConversationMessages: state => state.activeConversationMessages,
  hasActiveConversationMoreMessages: state => state.hasActiveConversationMoreMessages,
  unreadMessagesCount: state => state.unreadMessagesCount,
  isCurrentUserInConversation: (state, getters, rootState) => state.activeConversation?.users.filter(user => user.id === rootState.auth.user.id).length,
  isConversationArchivedForCurrentUser: (state, getters, rootState) => !state.activeConversation?.users.filter(user => user.id === rootState.auth.user.id)[0]?.pivot.status,
  showFilters: state => state.showFilters
}

export const mutations = {
  setConversations: (state, conversations) => {
    state.conversations = conversations
  },
  setConversationsQueryParams: (state, payload) => {
    state.conversationsQueryParams = payload
  },
  setHasMoreConversations: (state, payload) => {
    state.hasMoreConversations = payload
  },
  incrementConversationQueryParamsPage: (state) => {
    state.conversationsQueryParams.page += 1
  },
  pushConversationInConversations: (state, payload) => {
    state.conversations.push(payload)
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
  },
  toggleShowFilters (state) {
    state.showFilters = !state.showFilters
  },
  removeConversationFromConversations (state, payload) {
    const index = state.conversations.findIndex(conversation => conversation.id == payload.id)
    state.conversations.splice(index, 1)
  },
  setShowFilters (state, payload) {
    state.showFilters = payload
  }
}

export const actions = {

  // CONVERSATIONS
  async fetchConversations ({ state, commit }) {
    console.log('fetchConversations', state.conversationsQueryParams)
    const { data: conversations } = await this.$axios.get('/conversationsv2', {
      params: {
        ...state.conversationsQueryParams,
        page: 1
      }
    })
    commit('setConversations', conversations.data)
    commit('setHasMoreConversations', conversations.last_page !== conversations.current_page)
  },
  async fetchMoreConversations ({ state, commit }) {
    console.log('fetchMoreConversations', state.conversationsQueryParams)

    commit('incrementConversationQueryParamsPage')
    const { data: moreConversations } = await this.$axios.get('/conversationsv2', {
      params: state.conversationsQueryParams
    })
    moreConversations?.data.forEach((conversation) => {
      commit('pushConversationInConversations', conversation)
    })
    commit('setHasMoreConversations', moreConversations.last_page !== moreConversations.current_page)
  },

  // CONVERSATION MESSAGES
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

  // USER
  async getUserUnreadMessagesCount ({ commit }) {
    const { data: count } = await this.$axios.get('user/unread-messages')
    commit('setUnreadMessagesCount', count)
  },

  selectNextActiveConversation ({ state, commit }) {
    const activeConversationIndex = state.conversations.findIndex(conversation => conversation.id === state.activeConversation.id)
    let nextConversationId = null

    if (state.conversations.length > (activeConversationIndex + 1)) {
      nextConversationId = state.conversations[activeConversationIndex + 1]?.id
    } else {
      nextConversationId = state.conversations[activeConversationIndex - 1]?.id
    }
    if (nextConversationId) {
      this.app.router.push(`/messages/${nextConversationId}`)
    } else {
      this.app.router.push('/messages')
    }
    commit('removeConversationFromConversations', state.activeConversation)
  }
}
