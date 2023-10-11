import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

interface ConversationsQueryParams {
  'filter[type]': string
  'filter[search]': string | null
  page: number
}

// @todo: à tester
export const useMessagingStore = defineStore({
  id: 'messaging',
  state: (): {
    isConversationsLoading: boolean
    conversations: Conversation[]
    conversationsQueryParams: ConversationsQueryParams
    hasMoreConversations: boolean
    activeConversation: Conversation
    activeConversationMessages: ConversationMessage[]
    hasActiveConversationMoreMessages: boolean
    unreadMessagesCount: number
    showFilters: boolean
    messageTemplates: MessageTemplate[]
  } => ({
    isConversationsLoading: true,
    conversations: [],
    conversationsQueryParams: {
      'filter[type]': 'all',
      'filter[search]': null,
      page: 1,
    },
    hasMoreConversations: false,
    activeConversation: {} as Conversation,
    activeConversationMessages: [],
    hasActiveConversationMoreMessages: false,
    unreadMessagesCount: 0,
    showFilters: false,
    messageTemplates: [],
  }),
  getters: {
    hasConversationsResults: (state) =>
      state.hasMoreConversations || state.conversations.length > 0,
    isCurrentUserInConversation: (state) => {
      const storeAuth = useAuthStore()
      return state.activeConversation.users?.filter(
        (user: ConversationUser) => user.id === storeAuth.user?.id
      ).length
    },
    isConversationArchivedForCurrentUser: (state) => {
      const storeAuth = useAuthStore()
      return !state.activeConversation.users?.filter(
        (user: ConversationUser) => user.id === storeAuth.user?.id
      )[0]?.pivot.status
    },
    activeFiltersCount: (state) => {
      let count = 0
      const wildwardFilters = ['filter[type]', 'filter[search]', 'page']
      for (const [key, value] of Object.entries(state.conversationsQueryParams)) {
        if (!wildwardFilters.includes(key) && (value as string)?.length > 0) {
          count += 1
        }
      }
      return count
    },
  },
  actions: {
    async fetchConversations() {
      this.isConversationsLoading = true
      const formattedParams = {} as any
      for (const [key, value] of Object.entries(this.conversationsQueryParams)) {
        formattedParams[key] = Array.isArray(value) ? value.join(',') : value
      }
      const { data, error } = await useApiFetch<QueryBuilderResponse>('/conversations', {
        params: {
          ...formattedParams,
          page: 1,
        },
      })
      if (data.value) {
        this.conversations = data.value.data
        this.isConversationsLoading = false
        this.hasMoreConversations = data.value.last_page !== data.value.current_page
      }
    },
    async fetchMoreConversations() {
      this.conversationsQueryParams.page += 1
      this.isConversationsLoading = true
      const { data, error } = await useApiFetch<QueryBuilderResponse>('/conversations', {
        params: this.conversationsQueryParams,
      })
      if (data.value) {
        data.value.data.forEach((conversation) => {
          this.conversations.push(conversation)
        })
        this.isConversationsLoading = false
        this.hasMoreConversations = data.value.last_page !== data.value.current_page
      }
    },
    async fetchConversationMessages(conversationId: number) {
      const { data, error } = await useApiFetch<QueryBuilderResponse>(
        `/conversations/${conversationId}/messages`
      )
      if (data.value) {
        this.activeConversationMessages = [...data.value?.data].reverse()
        this.hasActiveConversationMoreMessages = data.value.last_page !== 1
      }
    },
    async fetchNewConversationMessages(conversationId: number) {
      const lastMessage = this.activeConversationMessages?.slice(-1)[0]
      if (lastMessage) {
        const { data, error } = await useApiFetch<QueryBuilderResponse>(
          `/conversations/${conversationId}/messages`,
          {
            params: {
              'filter[after_message_id]': lastMessage.id,
            },
          }
        )
        if (data.value) {
          data.value.data.forEach((message) => {
            this.activeConversationMessages.push(message)
          })
        }
      }
    },
    async fetchOldConversationMessages(conversationId: number) {
      const firstMessage = this.activeConversationMessages[0]
      if (firstMessage) {
        const { data, error } = await useApiFetch<QueryBuilderResponse>(
          `/conversations/${conversationId}/messages`,
          {
            params: { 'filter[before_message_id]': firstMessage.id },
          }
        )
        if (data.value) {
          data.value.data.forEach((message) => {
            this.activeConversationMessages.unshift(message)
          })
          this.hasActiveConversationMoreMessages = data.value.last_page !== 1
        }
      }
    },
    async refreshActiveConversation(conversationId: number) {
      const { data, error } = await useApiFetch<Conversation>(`/conversations/${conversationId}`)
      if (data.value) {
        this.activeConversation = data.value
        const index = this.conversations.findIndex(
          (conversation) => conversation.id == conversationId
        )
        this.conversations.splice(index, 1, data.value)
      }
    },
    selectNextActiveConversation() {
      const activeConversationIndex = this.conversations.findIndex(
        (conversation) => conversation.id === this.activeConversation.id
      )
      let nextConversationId = null
      if (this.conversations.length > activeConversationIndex + 1) {
        nextConversationId = this.conversations[activeConversationIndex + 1]?.id
      } else {
        nextConversationId = this.conversations[activeConversationIndex - 1]?.id
      }
      if (nextConversationId) {
        navigateTo(`/messages/${nextConversationId}`)
      } else {
        navigateTo('/messages')
      }

      this.removeConversationFromConversations(this.activeConversation)
    },
    async getUserUnreadMessagesCount() {
      const { data, error } = await useApiFetch<any>('user/unread-messages')
      this.unreadMessagesCount = data.value.count
    },
    toggleShowFilters() {
      this.showFilters = !this.showFilters
    },
    setActiveConversationAsRead(payload: Conversation) {
      const index = this.conversations.findIndex((conversation) => conversation.id == payload.id)
      if (index !== -1) {
        this.conversations.splice(index, 1, {
          ...payload,
          is_read: true,
        })
      }
    },
    removeConversationFromConversations(payload: Conversation) {
      const index = this.conversations.findIndex((conversation) => conversation.id == payload.id)
      this.conversations.splice(index, 1)
    },
    async fetchMessageTemplates() {
      const { data, error } = await useApiFetch<QueryBuilderResponse>('/message-templates')
      if (data.value) {
        this.messageTemplates = data.value.data
      }
    },
  },
})
