<template>
  <th
    scope="col"
    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    :class="[
      center ? 'text-center' : 'text-left',
    ]"
  >
    <slot />
  </th>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      default: false
    }
  },
  setup () {}
}
</script>

<style></style>
