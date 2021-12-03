<template>
  <div
    class="bg-white rounded-xl overflow-hidden"
    :class="[{
      'shadow-lg': variant == 'shadow',
      'border': variant == 'flat',
      'px-6 py-8 xl:py-12 xl:px-16': padding == 'lg',
      'px-6 py-8 xl:py-10 xl:px-8': padding == 'sm',
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
      default: 'shadow',
      validator: s => ['shadow', 'flat', false].includes(s)
    },
    padding: {
      type: [String, Boolean],
      default: 'lg',
      validator: s => ['sm', 'lg', false].includes(s)
    }
  }
}
</script>
