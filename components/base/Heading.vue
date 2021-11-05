<template>
  <component
    :is="as"
    :class="{
      'text-4xl font-extrabold tracking-tight': level == 1,
      'text-3xl font-bold tracking-tight': level == 2,
      'text-xl font-bold tracking-tight': level == 3,
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
