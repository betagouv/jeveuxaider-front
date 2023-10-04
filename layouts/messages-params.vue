<template>
  <div class="overflow-hidden h-full">
    <div class="h-full flex flex-col">
      <HeaderMessagerie />

      <div class="flex flex-col bg-white overflow-hidden lg:flex-row h-full">
        <div :class="['w-full h-full lg:w-[80px] lg:flex-none lg:flex flex-1']">
          <ConversationsTabs
            :class="[
              'fixed bottom-0 w-full z-20 lg:relative lg:w-[80px] lg:border-r',
              { 'hidden lg:block': $stores.messaging.showFilters },
            ]"
          />
        </div>

        <BaseContainerScrollable :class="['flex-1']">
          <NuxtPage class="lg:flex-1" />
        </BaseContainerScrollable>
      </div>

      <div id="teleport-drawer" class="relative z-20"></div>
      <div id="teleport-body-end"></div>
    </div>
  </div>
</template>

<script>
import HeaderMessagerie from '@/components/layout/HeaderMessagerie.vue'
import ConversationsTabs from '@/components/messaging/ConversationsTabs.vue'
import MixinUsetiful from '@/mixins/usetiful.client.js'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  components: {
    HeaderMessagerie,
    ConversationsTabs,
  },
  mixins: [MixinUsetiful, MixinPlausible],
  setup() {
    useHead({
      bodyAttrs: {
        class: 'full-height-layout',
      },
    })
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
