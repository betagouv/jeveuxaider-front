<template>
  <td
    class="px-5 py-4 whitespace-nowrap text-sm text-gray-500"
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
