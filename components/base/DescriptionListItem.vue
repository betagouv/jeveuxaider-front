<template>
  <div class="py-2 sm:gap-4" :class="[{'sm:grid sm:grid-cols-3': !termSize}, {'sm:flex': termSize}]">
    <dt class="text-sm text-gray-500" :style="style">
      {{ term }}
    </dt>
    <dd class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 sm:col-span-2" style="word-break: break-word;">
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
    termSize: {
      type: Number,
      default: null
    },
    description: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      style: {
        width: this.termSize ? `${this.termSize}px` : 'auto'
      }
    }
  }
}
</script>
