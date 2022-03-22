<template>
  <div class="bg-gray-100 h-full flex flex-col">
    <HeaderBanner />
    <Header full-width />

    <client-only>
      <div
        id="messagerie"
        class="flex-1 flex flex-col overflow-hidden bg-white"
      >
        <div class="h-full flex overflow-hidden">
          <!-- LEFT -->
          <div
            class="panel--left border-r border-cool-gray-200"
            :class="[{ hide: !$store.getters['messaging/showPanelLeft'] }]"
          >
            <div
              class="panel--header sticky top-0 bg-white px-6 py-3 border-b border-r border-cool-gray-200 flex items-center justify-between"
            >
              <div class="text-lg leading-8 font-bold text-gray-900">
                {{ conversationsLabel }}
              </div>

              <Dropdown>
                <template #button>
                  <button class="border py-1 px-3 rounded-full text-xs border-gray-300 text-gray-900 hover:border-gray-800 transition-all">
                    Filtres
                  </button>
                </template>

                <template #items>
                  <div>
                    <DropdownOptionsItem size="sm" @click.native="onStatusChange(1)">
                      Conversations actives
                    </DropdownOptionsItem>
                    <DropdownOptionsItem size="sm" @click.native="onStatusChange(0)">
                      Conversations archivées
                    </DropdownOptionsItem>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div
              ref="conversationsContainer"
              class="panel--container"
              style="overflow-anchor: none"
              @scroll="onScrollConversations"
            >
              <div class="panel--content">
                <!-- Rechercher un utilisateur -->
                <!-- <div v-if="$store.getters.contextRole == 'admin'" class="m-4"> -->
                <!-- <el-input
                    v-model="conversationFilters['filter[search]']"
                    placeholder="Rechercher un utilisateur"
                    clearable
                  >
                    <svg
                      slot="prefix"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 40 40"
                      class="el-input__icon ml-2 mr-3"
                      style="width: 14px"
                    >
                      <path
                        d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
                        fillRule="evenodd"
                        fill="#6a6f85"
                      />
                    </svg>
                  </el-input> -->
                <!-- </div> -->

                <template v-if="!loading">
                  <div
                    v-if="$store.getters['messaging/conversations'].length == 0"
                    class="p-6 font-light"
                  >
                    Aucune conversation
                    <span
                      v-if="conversationFilters['filter[status]'] == '0'"
                    >archivée</span>
                    <span v-else>active</span>
                  </div>

                  <ConversationTeaser
                    v-for="conversationTeaser in $store.getters[
                      'messaging/conversations'
                    ]"
                    :key="conversationTeaser.id"
                    :conversation="conversationTeaser"
                    class="cursor-pointer hover:bg-gray-100 transition"
                    :class="[
                      {
                        'bg-gray-100':
                          $store.getters['messaging/conversation'] &&
                          conversationTeaser.id ==
                          $store.getters['messaging/conversation'].id,
                      },
                    ]"
                    @click.native="onConversationClick(conversationTeaser)"
                  />
                </template>
              </div>
            </div>
          </div>

          <div v-if="$store.getters['messaging/conversations'].length == 0" class="mt-12 w-full text-center">
            <ChatAltIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 font-medium text-gray-900">
              Vous n'avez pas encore de message
            </h3>
            <p class="mt-1 text-gray-500">
              Inscrivez-vous sur votre première mission en quelques secondes.
            </p>
            <div class="mt-6">
              <Button @click.native="$store.commit('toggleSearchOverlay')">
                <SearchIcon class="-ml-1 mr-2 h-5 w-5" />
                Trouver une mission
              </Button>
            </div>
          </div>
          <Nuxt v-else />
        </div>
      </div>
    </client-only>

    <portal-target name="body-end" multiple />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import ConversationTeaser from '@/components/conversation/Teaser.vue'
import Header from '@/components/layout/Header.vue'
import HeaderBanner from '@/components/layout/HeaderBanner.vue'

export default {
  name: 'MessagesLayout',
  components: {
    Header,
    HeaderBanner,
    ConversationTeaser
  },
  middleware: 'authenticated',
  data () {
    return {
      currentPageConversation: 1,
      lastPageConversation: null,
      conversationFilters: {
        'filter[search]': null,
        'filter[exclude]': null,
        'filter[status]': this.$store.getters.contextRole == 'admin' ? null : 1
      },
      windowWidth: 0,
      loading: true,
      conversationsLabel: 'Messages',
      isInitialized: false
    }
  },
  async fetch () {
    this.loading = true
    this.currentPageConversation = 1

    // If conversation is archived, set status filter accordingly
    if (this.$router.currentRoute.params.id && !this.isInitialized) {
      const currentUser = this.$store.getters[
        'messaging/conversation'
      ].users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })

      if (currentUser && !currentUser.pivot.status) {
        this.conversationFilters['filter[status]'] = 0
      }
    }

    // Fetch conversations
    let conversations = await this.$axios.get('/conversations', {
      params: {
        page: 1,
        ...this.conversationFilters
      }
    })

    this.lastPageConversation = conversations.data.last_page
    conversations = conversations.data.data
    // Like Facebook.
    // If the conversation is not present in the first
    // page of results, we get it here.
    if (this.$router.currentRoute.params.id && !this.isInitialized) {
      const isInConversations = conversations.find((conversation) => {
        return conversation.id == this.$router.currentRoute.params.id
      })
      if (!isInConversations) {
        const { data: conversation } = await this.$axios.get(`/conversations/${this.$router.currentRoute.params.id}`)
        conversations = [...conversations, conversation]
        this.conversationFilters['filter[exclude]'] = conversation.id
      }
    }
    this.$store.commit('messaging/setConversations', conversations)

    this.conversationsLabel =
      this.conversationFilters['filter[status]'] == 0 ? 'Archivés' : 'Messages'
    this.isInitialized = true
    this.loading = false
  },
  head: {
    bodyAttrs: {
      class: 'full-height-layout'
    }
  },
  computed: {
    search () {
      return this.conversationFilters['filter[search]']
    }
  },
  watch: {
    search () {
      this.debouncedFetch()
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      this.windowWidth = window.innerWidth
      this.onResize()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    debouncedFetch () {
      debounce(this.$fetch, 500)()
    },
    onConversationClick (conversation) {
      this.$router.push(`/messages/${conversation.id}`)

      // If mobile and already on the same route
      if (
        this.$router.currentRoute.params.id == conversation.id &&
        this.$store.getters['messaging/isMobile']
      ) {
        this.$store.commit('messaging/setShowPanelLeft', false)
        this.$store.commit('messaging/setShowPanelCenter', true)
      }
    },
    onScrollConversations () {
      const isBottom =
        this.$refs.conversationsContainer.scrollHeight -
          (this.$refs.conversationsContainer.offsetHeight +
            this.$refs.conversationsContainer.scrollTop) <=
        45

      if (
        this.currentPageConversation < this.lastPageConversation &&
        isBottom &&
        !this.loadingNewPage
      ) {
        this.fetchNextPageConversations()
      }
    },
    async fetchNextPageConversations () {
      this.loadingNewPage = true
      const conversations = await this.$axios.get('/conversations', {
        params: {
          page: this.currentPageConversation + 1,
          ...this.conversationFilters
        }
      })
      this.$store.commit('messaging/setConversations', [
        ...this.$store.getters['messaging/conversations'],
        ...conversations.data.data
      ])

      this.currentPageConversation = conversations.data.current_page

      this.$nextTick(() => {
        this.loadingNewPage = false
      })
    },
    onResize () {
      this.windowWidth = window.innerWidth
      this.$store.commit('messaging/setIsMobile', this.windowWidth < 768)
      this.$store.commit('messaging/setIsDesktop', this.windowWidth >= 1280)

      this.$store.commit(
        'messaging/setShowPanelLeft',
        !!(
          this.$route.name == 'messages' ||
          !this.$store.getters['messaging/isMobile']
        )
      )

      this.$store.commit(
        'messaging/setShowPanelCenter',
        !!(
          this.$route.name == 'messages-id' ||
          !this.$store.getters['messaging/isMobile']
        )
      )

      this.$store.commit(
        'messaging/setShowPanelRight',
        this.$store.getters['messaging/isDesktop']
      )
    },
    onStatusChange (status) {
      if (this.conversationFilters['filter[status]'] != status) {
        this.loading = true
        this.conversationFilters['filter[status]'] = status
        this.debouncedFetch()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
#messagerie {
  height: calc(100% - 110px);
}

.panel--left {
  transition: opacity 0.25s;
  opacity: 1;
  pointer-events: auto;
  @apply flex flex-col max-w-full;
  @screen md {
    transition: all 0.25s;
  }
  &.hide {
    flex: 0 1 0%;
    width: 0;
    opacity: 0;
    pointer-events: none;
  }
  .panel--header {
    min-height: 77px;
  }
  .panel--container {
    @apply flex flex-col overflow-y-auto;
  }
}

.panel--left {
  flex: 1 1 0%;
  @screen md {
    width: 415px;
    @apply flex-none;
    > * {
      width: 415px;
    }
  }
}
</style>
