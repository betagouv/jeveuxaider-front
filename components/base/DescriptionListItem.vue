<template>
  <div class="py-2 sm:gap-4 sm:flex">
    <dt class="text-sm text-[#666666] flex-none" :style="style">
      {{ term }}
    </dt>
    <dd
      class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 flex-1"
      style="word-break: break-word"
    >
      <slot>
        {{ description || '-' }}
      </slot>
    </dd>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    term: {
      type: String,
      required: true,
    },
    termSize: {
      type: Number,
      default: null,
    },
    description: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      style: {
        width: this.termSize ? `${this.termSize}px` : 'calc(100%/3)',
      },
    }
  },
})
</script>
