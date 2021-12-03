<template>
  <nuxt-link :to="to" class="group py-6 flex items-center space-x-6 cursor-pointer">
    <div v-if="icon" class="text-3xl">
      {{ icon }}
    </div>
    <div class="flex-1 group-hover:underline font-bold">
      <slot />
    </div>
    <ChevronRightIcon class="h-4 group-hover:scale-125" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, default: null }
  }
}
</script>

<style>

</style>
