<template>
  <nuxt-link no-prefetch v-if="to" :to="to" :target="target">
    <slot />
  </nuxt-link>
  <a v-else-if="href" :href="href" :target="target">
    <slot />
  </a>
  <button v-else-if="click" type="button" @click="click">
    <slot />
  </button>
</template>

<script>
export default defineNuxtComponent({
  props: {
    to: { type: String, default: null },
    href: { type: String, default: null },
    click: { type: Function, default: null },
    target: { type: String, default: null },
  },
})
</script>
