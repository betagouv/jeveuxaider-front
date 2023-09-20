<template>
  <div class="container">
    <slot name="breadcrumb" />
    <div class="flex flex-col gap-8 lg:gap-12 pb-8 lg:pb-12">
      <slot name="header" />
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
    classLeft: { type: String, default: 'flex flex-col lg:col-span-7 gap-8 lg:gap-12' },
    classRight: { type: String, default: 'lg:col-span-5 space-y-8 lg:space-y-12' },
  },
})
</script>
