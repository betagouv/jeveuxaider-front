<template>
  <div
    class="w-full flex flex-1"
    :class="[
      {
        hidden:
          !$store.getters['messaging/showPanelCenter'] &&
          !$store.getters['messaging/showPanelRight'],
      },
    ]"
  >
    <!-- CENTER -->
    Coucou
    <div
      :class="[{ hide: !$store.getters['messaging/showPanelCenter'] }]"
      class="panel--center min-w-0 border-r border-gray-200"
    >
      <div
        class="panel--header relative top-0 bg-white px-6 py-3 border-b border-gray-200 flex items-center"
      >
        <ConversationMessagesHeader
          v-if="$store.getters['messaging/conversation']"
          @toggle-panel-right="onPanelRightToggle"
        />
      </div>

      <ConversationMessages v-if="$store.getters['messaging/conversation']" />
    </div>

    <!-- RIGHT -->
    <div
      :class="[{ hide: !$store.getters['messaging/showPanelRight'] }]"
      class="panel--right"
    >
      <div
        class="panel--header sticky top-0 bg-white px-6 py-3 border-b border-gray-200 flex items-center"
      >
        <div class="flex flex-1 justify-between">
          <h3 class="text-lg leading-8 font-bold text-gray-900">
            Détails
          </h3>

          <button
            class="h-7 w-7 flex items-center justify-center border rounded-full hover:border-gray-900"
            @click="onPanelRightToggle"
          >
            <XIcon
              class="text-gray-600 hover:border-black h-4 w-4"
            />
          </button>
        </div>
      </div>

      <div ref="participationContainer" class="panel--container">
        <div class="panel--content">
          <ConversationDetails
            v-if="$store.getters['messaging/conversation']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConversationMessages from '@/components/conversation/Messages.vue'
import ConversationDetails from '@/components/conversation/Details.vue'
import ConversationMessagesHeader from '@/components/conversation/MessagesHeader.vue'

export default {
  components: {
    ConversationMessages, ConversationDetails, ConversationMessagesHeader
  },
  methods: {
    onPanelRightToggle () {
      this.$store.commit(
        'messaging/setShowPanelRight',
        !this.$store.getters['messaging/showPanelRight']
      )

      // Show
      if (this.$store.getters['messaging/showPanelRight']) {
        if (this.$store.getters['messaging/isMobile']) {
          this.$store.commit('messaging/setShowPanelCenter', false)
          this.$store.commit('messaging/setShowPanelLeft', false)
        } else if (!this.$store.getters['messaging/isDesktop']) {
          this.$store.commit(
            'messaging/setShowPanelLeft',
            !this.$store.getters['messaging/showPanelLeft']
          )
        }
      } else if (this.$store.getters['messaging/isMobile']) { // Hide
        this.$store.commit('messaging/setShowPanelCenter', true)
        this.$store.commit('messaging/setShowPanelLeft', false)
      } else if (!this.$store.getters['messaging/isDesktop']) {
        this.$store.commit(
          'messaging/setShowPanelLeft',
          !this.$store.getters['messaging/showPanelLeft']
        )
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.panel--center,
.panel--right {
  transition: opacity 0.25s;
  opacity: 1;
  pointer-events: auto;
  @apply flex flex-col max-w-full;
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

.panel--center {
  width: 100%;
  @apply flex-grow;
  @screen md {
    flex: 1 1 0%;
    transition: all 0.25s;
  }
  .panel--container {
    @apply flex-col-reverse flex-1 px-6;
    ::v-deep .panel--content {
      max-width: 550px;
      @apply mx-auto mb-auto w-full pt-4;
    }
  }
}

.panel--right {
  width: 100%;
  @screen md {
    width: 415px;
    transition: all 0.25s;
    @apply flex-none;
    > * {
      width: 415px;
    }
  }
}
</style>
