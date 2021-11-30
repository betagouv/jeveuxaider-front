<template>
  <div>
    <nuxt-link v-if="to" :to="to" class="flex items-center space-x-2 cursor-pointer text-jva-blue-500 hover:text-jva-blue-600 hover:underline focus:underline transition focus:outline-none">
      <slot />
      <component
        :is="icon"
        v-if="icon"
        class="h-3"
      />
    </nuxt-link>
    <div v-else class="flex items-center space-x-2 cursor-pointer text-jva-blue-500 hover:text-jva-blue-600 hover:underline focus:underline transition focus:outline-none">
      <slot />
      <component
        :is="icon"
        v-if="icon"
        class="h-3"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: { type: String, default: null },
    icon: { type: String, default: null }
  }
}
</script>

<style>

</style>
