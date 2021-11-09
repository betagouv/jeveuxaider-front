<template>
  <div class="bg-white shadow-xl p-8 sm:p-16 rounded-2xl">
    <Heading v-if="title" as="h2" :level="3" class="mb-8 text-jva-gray-900">
      {{ title }}
    </Heading>
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
