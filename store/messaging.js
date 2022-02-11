export const state = () => ({
  conversations: [],
  conversation: {},
  messages: [],
  newMessagesCount: 0,
  showPanelLeft: true,
  showPanelCenter: false,
  showPanelRight: false,
  isMobile: true,
  isDesktop: false
})

export const getters = {
  conversations: state => state.conversations,
  conversation: state => state.conversation,
  messages: state => state.messages,
  newMessagesCount: state => state.newMessagesCount,
  isMobile: state => state.isMobile,
  isDesktop: state => state.isDesktop,
  showPanelLeft: state => state.showPanelLeft,
  showPanelCenter: state => state.showPanelCenter,
  showPanelRight: state => state.showPanelRight
}

export const mutations = {
  setConversations: (state, conversations) => {
    state.conversations = conversations
  },
  setConversation: (state, payload) => {
    state.conversation = payload
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
  }
}

export const actions = {
  async refreshConversation ({ state, commit }, payload) {
    const conversation = await this.$api.getConversation(payload.id)
    commit('setConversation', conversation)
    commit('replaceConversationInConversations', conversation)
  }
}
