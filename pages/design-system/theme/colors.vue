<template>
  <div class="space-y-12">
    <div v-for="colorGroup,key in tailwindConfig.theme.extend.colors" :key="key" class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        {{ key }}
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <div v-for="color,variant in colorGroup" :key="variant" class="m-2 text-center">
          <div class="h-16 w-16 rounded flex items-center justify-center text-white text-xs" :style="`background-color: ${color}`" />
          <div class="text-xs text-gray-500 mt-2">
            {{ variant }}<br>
            {{ color }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import tailwindConfig from '@/tailwind.config'

export default {
  layout: 'design-system',
  data () {
    return {
      tailwindConfig
    }
  },
  computed: {

  }
}
</script>
