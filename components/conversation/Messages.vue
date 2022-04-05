<template>
  <div
    ref="messagesContainer"
    class="panel--container pb-24 md:pb-0"
    style="overflow-anchor: none"
    @scroll="onScrollMessages"
  >
    <div class="panel--content flex-1">
      <div class="h-full">
        <transition-group name="fade-in" tag="div" class="h-full">
          <!-- <ElContainer v-if="loading" key="loading" v-loading="loading">
            <div class="w-16 h-16" />
          </ElContainer> -->

          <div v-if="!loading" key="loaded" class="h-full flex flex-col">
            <!-- Fake loading -->
            <!-- <ElContainer
              v-if="currentPageMessages < lastPageMessages"
              v-loading="true"
              class="mt-64"
            >
              <div class="w-16 h-16" />
            </ElContainer> -->

            <template
              v-for="message in $store.getters['messaging/messages']
                .slice()
                .reverse()"
            >
              <ConversationContextualMessage
                v-if="message.type == 'contextual'"
                :key="message.id"
                :message="message"
              />

              <ConversationMessage
                v-else
                :key="message.id"
                :name="message.from.profile.first_name"
                :short-name="message.from.profile.short_name"
                :img-srcset="message.from.profile.avatar && message.from.profile.avatar.urls.thumbSmall"
                :img-src="message.from.profile.avatar && message.from.profile.avatar.urls.original"
                :date="message.created_at"
              >
                <nl2br
                  tag="p"
                  :text="message.content"
                  class-name="break-word"
                />
              </ConversationMessage>
            </template>

            <div
              v-if="canWriteMessage"
              id="textarea--container"
              class="fixed md:sticky bottom-0 bg-white pb-6 mt-auto"
              style="border-top-right-radius: 8px; border-top-left-radius: 8px"
            >
              <div class="m-auto w-full" style="max-width: 550px">
                <div
                  class="px-4 py-2 pr-2 border m-[1px] border-gray-600 focus-within:border-jva-blue-500 focus-within:border-2 focus-within:m-0 transition flex items-end rounded-xl"
                >
                  <client-only>
                    <TextareaAutosize
                      v-model="newMessage"
                      placeholder="Écrivez un message"
                      rows="1"
                      :max-height="120"
                      class="m-auto w-full !outline-none leading-tight border-0 custom-scrollbar"
                      @keydown.enter.exact.prevent.native="onAddMessage"
                    />
                  </client-only>

                  <button
                    class="px-3 py-1 ml-3 font-semibold text-sm rounded-full bg-[#070191] text-white hover:scale-105 transform transition mb-1"
                    @click="onAddMessage"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import ConversationMessage from '@/components/conversation/Message.vue'
import ConversationContextualMessage from '@/components/conversation/ContextualMessage.vue'

export default {
  components: {
    ConversationMessage,
    ConversationContextualMessage
  },
  data () {
    return {
      newMessage: '',
      loading: true,
      loadingNewMessages: false,
      currentPageMessages: 1,
      lastPageMessages: null
    }
  },
  async fetch () {
    this.loading = true

    const messages = await this.$axios.get(`/conversations/${this.$store.getters['messaging/conversation'].id}/messages`)

    this.$store.commit('messaging/setMessages', messages.data.data)
    this.lastPageMessages = messages.data.last_page
    this.loading = false
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging/conversation']
    },
    canWriteMessage () {
      return !!this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    }
  },
  methods: {
    onScrollMessages () {
      const scrollHeight =
        this.$refs.messagesContainer.scrollHeight -
        this.$refs.messagesContainer.offsetHeight

      if (
        this.currentPageMessages < this.lastPageMessages &&
        this.$refs.messagesContainer.scrollTop + scrollHeight <= 275 &&
        !this.loadingNewMessages
      ) {
        this.fetchNextPageMessages()
      }
    },
    async fetchNextPageMessages () {
      this.loadingNewMessages = true
      this.currentPageMessages++

      const messages = await this.$axios.get(`/conversations/${this.$store.getters['messaging/conversation'].id}/messages`, {
        params: {
          page: this.currentPageMessages,
          pagination: 15 + this.$store.getters['messaging/newMessagesCount']
        }
      })

      this.$store.commit('messaging/setMessages', [
        ...this.$store.getters['messaging/messages'],
        ...messages.data.data
      ])

      this.$nextTick(() => {
        this.loadingNewMessages = false
      })
    },
    async onAddMessage () {
      if (this.newMessage.trim().length) {
        const response = await this.$axios.post(`/conversations/${this.conversation.id}/messages`, {
          content: this.newMessage
        }).catch(() => {})

        this.$store.commit('messaging/setMessages', [
          response.data,
          ...this.$store.getters['messaging/messages']
        ])

        this.$store.commit('messaging/incrementNewMessagesCount')
        this.newMessage = ''
        this.$refs.messagesContainer.scrollTop = 0
        await this.$store.dispatch(
          'messaging/refreshConversation',
          this.$store.getters['messaging/conversation']
        )
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
#textarea--container {
  width: calc(100% - 3rem);
  @screen md {
    @apply w-auto;
  }
}

#textarea--container textarea:focus {
  border: 0;
  box-shadow: none
}
</style>
