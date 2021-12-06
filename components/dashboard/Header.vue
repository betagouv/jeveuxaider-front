<template>
  <div class="flex justify-between items-center">
    <div>
      <div v-if="secondaryTitle" class="text-xl text-gray-600">
        {{ secondaryTitle }}
      </div>
      <Heading as="h1" :level="1">
        {{ title }}
      </Heading>
    </div>
    <slot name="action" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    secondaryTitle: {
      type: String,
      default: null
    }
  }
}
</script>

<style>

</style>
