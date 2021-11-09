<template>
  <div
    class="bg-white rounded-xl"
    :class="[{
      'shadow-lg': variant == 'shadow',
      'border': variant == 'flat',
      'px-6 py-8 xl:py-12 xl:px-16': padding == 'lg',
      'px-6 py-4': padding == 'sm',
      'overflow-hidden': padding === false
    }]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: [String],
      default: 'shadow' // shadow / flat
    },
    padding: {
      type: [String, Boolean],
      default: 'lg' // lg , sm, false
    }
  }
}
</script>
