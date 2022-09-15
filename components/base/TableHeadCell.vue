<template>
  <th
    scope="col"
    class="px-5 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
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
