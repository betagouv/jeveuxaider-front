<template>
  <div class="overflow-hidden">
    <div
      :class="[
        'overflow-y-auto custom-scrollbar-gray h-full',
        {'flex flex-col-reverse': reverse},
        scrollbarClass
      ]"
      @scroll="$emit('scroll', $event)"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    scrollbarClass: {
      type: String,
      default: ''
    }
  }
}
</script>
