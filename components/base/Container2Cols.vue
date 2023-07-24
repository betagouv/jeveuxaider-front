<template>
  <div class="container">
    <slot name="breadcrumb" />
    <div class="flex flex-col gap-8 lg:gap-12 pb-8 lg:pb-12">
      <slot name="header" />
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="flex flex-col lg:col-span-7 xl:col-span-8 gap-8 lg:gap-12">
          <slot name="left" />
        </div>
        <div class="lg:col-span-5 xl:col-span-4 space-y-8 lg:space-y-12">
          <slot name="right" />
        </div>
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
