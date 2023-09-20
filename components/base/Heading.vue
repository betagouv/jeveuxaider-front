<template>
  <component
    :is="as"
    :class="{
      'text-2xl sm:text-4xl font-extrabold': level == 1,
      'text-3xl font-bold': level == 2,
      'text-xl font-extrabold': level == 3,
      'text-lg font-bold': level == 4,
      'text-base font-bold': level == 5,
    }"
  >
    <slot />
  </component>
</template>

<script>
export default defineNuxtComponent({
  props: {
    as: {
      type: String,
      default: 'div',
    },
    level: {
      type: Number,
      required: true,
    },
  },
})
</script>
