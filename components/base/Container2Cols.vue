<template>
  <div class="container">
    <slot name="breadcrumb" />
    <div class="flex flex-col gap-12 pb-12">
      <slot name="header" />
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div class="lg:col-span-3 space-y-12">
          <slot name="left" />
        </div>
        <div class="lg:col-span-2 space-y-12">
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
