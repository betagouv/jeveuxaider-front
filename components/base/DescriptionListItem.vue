<template>
  <div class="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt class="text-sm text-gray-500">
      {{ term }}
    </dt>
    <dd class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 sm:col-span-2 break-words">
      {{ description || '-' }}
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    term: {
      type: String,
      required: true
    },
    description: {
      type: [String, Number],
      default: null
    }
  }
}
</script>
