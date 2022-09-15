<template>
  <div
    class="max-w-full"
    :class="[{'overflow-x-auto rounded-lg': overflow}]"
  >
    <table class="min-w-full divide-y divide-gray-100 p-3">
      <slot />
    </table>
  </div>
</template>

<script>
export default {
  props: {
    overflow: {
      type: Boolean,
      default: true
    }
  }
}
</script>
