<template>
  <ul :class="[{ 'divide-y': divided }]">
    <slot />
  </ul>
</template>

<script>
export default defineNuxtComponent({
  props: {
    divided: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
