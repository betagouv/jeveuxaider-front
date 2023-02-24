<template>
  <div class="overflow-hidden">
    <div
      :class="[
        'overflow-y-auto custom-scrollbar-gray h-full',
        {'flex flex-col-reverse': reverse}
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reverse: { type: Boolean, default: false }
  }
}
</script>
