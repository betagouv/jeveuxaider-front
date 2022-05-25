<template>
  <div class="rounded-md bg-jva-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleSolidIcon class="h-5 w-5 text-jva-blue-500" aria-hidden="true" />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm text-jva-blue-500">
          <slot />
        </p>
        <p class="mt-3 text-sm md:mt-0 md:ml-6">
          <slot name="action" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: { type: String, default: 'infos' }
  }
}
</script>

<style>

</style>
