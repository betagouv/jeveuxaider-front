<script>
export default defineNuxtComponent({
  props: {
    sticky: { type: Boolean, default: false },
    footerClass: { type: String, default: null },
  },
})
</script>

<template>
  <div
    v-if="$slots.default"
    :class="[
      'flex initial:flex-wrap justify-end initial:gap-2 initial:sm:gap-4',
      {
        'shadow-[0px_-3px_10px_0px_#00000014] bg-white initial:p-2 initial:sm:p-4': sticky,
      },
      {
        'initial:py-4 initial:px-6 initial:sm:px-8 initial:sm:pb-8': !sticky,
      },
      footerClass,
    ]"
  >
    <slot />
  </div>
</template>
