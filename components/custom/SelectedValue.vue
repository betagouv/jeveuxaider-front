<script setup>
const emit = defineEmits(['delete'])
</script>

<template>
  <div
    :class="[
      'border border-jva-blue-500 text-jva-blue-500 rounded-[4px] bg-[#F5F5FE] py-2 px-4',
      'transition ease-out',
      'flex items-center justify-between gap-3',
      'truncate',
    ]"
  >
    <div class="truncate"><slot /></div>
    <button
      class="-m-1.5 p-1.5 flex-none cursor-pointer hover:scale-125 transition ease-out"
      @click="$emit('delete')"
    >
      <RiCloseFill class="size-4" />
    </button>
  </div>
</template>

<style lang="postcss" scoped></style>
