<template>
  <td
    class="px-5 py-4 whitespace-nowrap text-sm text-gray-600"
    :class="[center ? 'text-center' : 'text-left']"
  >
    <slot />
  </td>
</template>

<script>
export default defineNuxtComponent({
  props: {
    center: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
