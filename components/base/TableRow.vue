<template>
  <tr class="group hover:bg-gray-50" :class="[{ 'bg-gray-50': active }]">
    <slot />
  </tr>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false }
  }
}
</script>

<style></style>
