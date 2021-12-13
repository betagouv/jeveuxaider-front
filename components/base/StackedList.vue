<template>
  <ul
    class=""
    :class="[
      { 'divide-y': divided }
    ]"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  props: {
    divided: {
      type: Boolean,
      default: true
    }
  }
}
</script>
