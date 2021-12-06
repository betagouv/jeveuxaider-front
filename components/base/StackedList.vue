<template>
  <ul
    class=""
    :class="[
      { 'divide-y border-t': divided }
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

<style>

</style>
