<template>
  <div class="flex items-center justify-center space-x-4">
    <SpinIcon class="animate-spin h-5 w-5 text-gray-400" />
    <div class="text-gray-300 font-medium">
      <slot />
    </div>
  </div>
</template>

<script>
import SpinIcon from '@/components/icon/SpinIcon.vue'

export default defineNuxtComponent({
  components: {
    SpinIcon,
  },
})
</script>
