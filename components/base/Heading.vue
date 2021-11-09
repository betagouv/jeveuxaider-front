<template>
  <component
    :is="as"
    :class="{
      'text-2xl sm:text-4xl font-extrabold': level == 1,
      'text-3xl font-bold': level == 2,
      'text-xl font-bold': level == 3,
    }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>

</style>
