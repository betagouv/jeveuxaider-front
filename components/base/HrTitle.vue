<template>
  <div class="hr-title flex items-center mb-4">
    <p class="font-bold text-xs uppercase text-[#666666]">
      <slot />
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.hr-title {
  &::after {
    content: '';
    flex: 1 1;
    border-bottom: 1px solid #E5E5E5;
    @apply my-auto ml-4;
  }
}
</style>
