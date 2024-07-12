<template>
  <div
    ref="menuActions"
    :class="[isPinned ? 'bg-white shadow-lg z-50' : '']"
    class="sticky z-40 top-0 py-4 -mt-4"
  >
    <div class="container">
      <div
        :class="[
          'flex justify-between flex-col lg:flex-row',
          isPinned ? 'lg:items-center' : 'lg:items-start',
        ]"
      >
        <div>
          <div :class="['mr-4', isPinned ? 'flex items-center space-x-3' : 'flex-col']">
            <BaseHeading :level="1" :class="['flex-shrink-0', isPinned && '!text-2xl']">
              {{ title }}
              <span v-if="subtitle" class="font-normal text-gray-500"> {{ subtitle }}</span>
            </BaseHeading>
          </div>
        </div>

        <div class="flex-col sm:flex-row flex gap-3 mt-4 lg:mt-0">
          <slot name="action"> </slot>
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
