<template>
  <div class="bg-jva-blue-600">
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
        <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
          <slot name="action" />
        </div>
        <!-- <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button type="button" class="-mr-1 flex p-2 rounded-md hover:bg-jva-blue-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
            <span class="sr-only">Dismiss</span>
            <svg
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> -->
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
