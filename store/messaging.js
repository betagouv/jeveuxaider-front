export const state = () => ({
  conversations: [],
  conversation: {},
  messages: [],
  newMessagesCount: 0,
  showPanelLeft: true,
  showPanelCenter: false,
  showPanelRight: false,
  isMobile: true,
  isDesktop: false,
  unreadMessages: 0
})

export const getters = {
  conversations: state => state.conversations,
  conversation: state => state.conversation,
  conversable: state => state.conversation.conversable,
  messages: state => state.messages,
  newMessagesCount: state => state.newMessagesCount,
  isMobile: state => state.isMobile,
  isDesktop: state => state.isDesktop,
  showPanelLeft: state => state.showPanelLeft,
  showPanelCenter: state => state.showPanelCenter,
  showPanelRight: state => state.showPanelRight,
  unreadMessages: state => state.unreadMessages,
  recipient (state, getters, root) {
    return state.conversation.users.filter((user) => {
      return user.id != root.auth.user.id
    })[0]
  },
  isRecipientReferent (state, getters) {
    return getters.recipient.roles.filter(role => role.key == 'referent').length > 0
  },
  isRecipientAdmin (state, getters) {
    return getters.recipient.roles.filter(role => role.key == 'admin').length > 0
  }
}

export const mutations = {
  setConversations: (state, conversations) => {
    state.conversations = conversations
  },
  setConversation: (state, payload) => {
    state.conversation = payload
  },
  setConversable: (state, payload) => {
    state.conversation.conversable = payload
  },
  removeConversationInConversations (state, payload) {
    state.conversations.splice(
      state.conversations.findIndex(
        conversation => conversation.id == payload.id
      ),
      1
    )
  },
  replaceConversationInConversations (state, payload) {
    state.conversations.splice(
      state.conversations.findIndex(
        conversation => conversation.id == payload.id
      ),
      1,
      payload
    )
  },
  setMessages: (state, messages) => {
    state.messages = messages
  },
  setNewMessagesCount: (state, count) => {
    state.newMessagesCount = count
  },
  incrementNewMessagesCount: (state, count = 1) => {
    state.newMessagesCount = state.newMessagesCount + count
  },
  setIsMobile: (state, isMobile) => {
    state.isMobile = isMobile
  },
  setIsDesktop: (state, isDesktop) => {
    state.isDesktop = isDesktop
  },
  setShowPanelLeft: (state, showPanelLeft) => {
    state.showPanelLeft = showPanelLeft
  },
  setShowPanelCenter: (state, showPanelCenter) => {
    state.showPanelCenter = showPanelCenter
  },
  setShowPanelRight: (state, showPanelRight) => {
    state.showPanelRight = showPanelRight
  },
  reset: (state) => {
    state.conversations = []
    state.conversation = {}
    state.messages = []
    state.newMessagesCount = 0
    state.unreadMessages = 0
  },
  setUnreadMessages: (state, unreadMessages) => {
    state.unreadMessages = unreadMessages
  }
}

export const actions = {
  async refreshConversation ({ state, commit }, payload) {
    const { data: conversation } = await this.$axios.get(`/conversations/${payload.id}`)

    commit('setConversation', conversation)
    commit('replaceConversationInConversations', conversation)
  },
  async fetchUnreadMessages ({ commit }) {
    const { data: unreadMessages } = await this.$axios.get('user/unread-messages')
    commit('setUnreadMessages', unreadMessages)
  }
}
