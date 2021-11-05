<template>
  <div class="bg-white shadow-xl px-16 pt-10 pb-16 rounded-2xl">
    <BaseHeading v-if="title" as="h2" :level="3" class="mb-8 text-jva-black-primary">
      {{ title }}
    </BaseHeading>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>

<style>

</style>
