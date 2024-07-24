<template>
  <div class="container">
    <slot name="breadcrumb" />
    <div class="flex flex-col gap-8 xl:gap-12 pb-8 xl:pb-12">
      <slot name="header" />
      <div :class="[gridClass]">
        <div :class="classLeft">
          <slot name="left" />
        </div>
        <div :class="classRight">
          <slot name="right" />
        </div>
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    gridClass: { type: String, default: 'grid gap-8 xl:gap-12 grid-cols-1 lg:grid-cols-12' },
    classLeft: { type: String, default: 'flex flex-col lg:col-span-7 gap-8 xl:gap-12' },
    classRight: { type: String, default: 'lg:col-span-5 flex flex-col gap-8 xl:gap-12' },
  },
})
</script>
