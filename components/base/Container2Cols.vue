<template>
  <div class="container">
    <slot name="breadcrumb" />
    <div class="flex flex-col gap-12 pb-12">
      <slot name="header" />
      <div class="grid grid-cols-1 md:grid-cols-12 grid-col gap-12">
        <div class="md:col-span-6 lg:col-span-7 xl:col-span-8 space-y-12">
          <slot name="left" />
        </div>
        <div class="md:col-span-6 lg:col-span-5 xl:col-span-4 space-y-12">
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
