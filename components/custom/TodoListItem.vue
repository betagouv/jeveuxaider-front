<template>
  <div class="flex gap-6 items-center">
    <div>
      <RiCheckboxCircleFill v-if="isCompleted" class="h-8 w-8 text-[#00A95F] fill-current" />
      <RiCheckboxBlankCircleLine v-else class="h-8 w-8 text-[#161616] fill-current" />
    </div>
    <div
      :class="[
        'flex gap-4 items-center',
        { 'text-[#666666] line-through': isCompleted },
        { 'text-[#161616]': !isCompleted },
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isCompleted: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
