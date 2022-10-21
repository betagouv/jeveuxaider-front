<template>
  <div :class="['relative z-30', bgColor]">
    <div class="container py-3">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-full flex-1 flex items-center">
          <component
            :is="icon ?? iconFromType"
            v-if="!noIcon"
            class="h-5 w-5 fill-current flex-none"
          />
          <p class="ml-3 truncate">
            <slot />
          </p>
        </div>
        <div class="flex-shrink-0 w-full sm:w-auto sm:ml-2">
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null },
    noIcon: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'info',
      validator: t => ['info', 'warning', 'error'].includes(t)
    }
  },
  computed: {
    iconFromType () {
      switch (this.type) {
        case 'info':
          return 'RiInformationLine'
        case 'warning':
          return 'RiErrorWarningLine'
        case 'error':
          return 'RiAlertLine'
        default:
          return null
      }
    },
    bgColor () {
      switch (this.type) {
        case 'info':
          return 'bg-[#ECECFE]'
        case 'warning':
          return 'bg-[#ffe9e6]'
        case 'error':
          return 'bg-[#ffbdbd]'
        default:
          return 'bg-[#ECECFE]'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
:deep(.dsfr-link) {
  @apply active:!bg-transparent;
}
</style>
