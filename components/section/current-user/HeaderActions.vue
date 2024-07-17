<template>
  <div
    ref="menuActions"
    :class="[isPinned ? 'sm:bg-white sm:shadow-lg sm:z-50' : '']"
    class="sm:sticky sm:z-40 sm:top-0 py-2 -mt-2 transition"
  >
    <div class="container">
      <div
        :class="[
          'flex justify-between flex-col sm:flex-row',
          isPinned ? 'sm:items-center' : 'sm:items-start',
        ]"
      >
        <div>
          <div :class="['mr-4', isPinned ? 'flex items-center space-x-3' : 'flex-col']">
            <DsfrHeading
              as="h1"
              size="2xl"
              :class="['transition-[font-size]', isPinned && '!text-2xl']"
              >{{ title }}</DsfrHeading
            >
            <span v-if="subtitle" class="font-normal text-gray-500"> {{ subtitle }}</span>
          </div>
        </div>

        <div class="flex-col sm:flex-row flex gap-3 mt-4 sm:mt-0">
          <slot name="action" :is-pinned="isPinned" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['isPinned'],
  data() {
    return {
      isPinned: false,
      waitingOnAnimRequest: false,
    }
  },
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
  computed: {
    profile() {
      return this.$stores.auth.user?.profile
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (!this.waitingOnAnimRequest) {
        window.requestAnimationFrame(() => {
          if (!this.$refs.menuActions) {
            return
          }
          this.isPinned = this.$refs.menuActions.getBoundingClientRect().top <= 0
          this.$emit('isPinned', this.isPinned)
          this.waitingOnAnimRequest = false
        })
      }
      this.waitingOnAnimRequest = true
    },
  },
})
</script>
