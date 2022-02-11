<template>
  <td
    class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
    :class="[
      center ? 'text-center' : 'text-left',
    ]"
  >
    <slot />
  </td>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
