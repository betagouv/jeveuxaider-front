<template>
  <div class="bg-jva-blue-600 relative z-30">
    <div class="container py-3">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <span class="flex rounded-lg bg-jva-blue-800">
            <component
              :is="icon"
              class="h-6 w-6 text-white"
            />
          </span>
          <p class="ml-3 font-medium text-white truncate">
            <slot />
          </p>
        </div>
        <div class="flex-shrink-0 w-full sm:w-auto sm:ml-2">
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null }
  }
}
</script>

<style>

</style>
