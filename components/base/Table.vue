<template>
  <div
    class="shadow border-b border-gray-200"
    :class="[{'overflow-x-auto rounded-lg': overflow}]"
  >
    <table class="min-w-full divide-y divide-gray-200">
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
