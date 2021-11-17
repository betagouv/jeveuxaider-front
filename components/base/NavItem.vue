<template>
  <nuxt-link v-if="to" :to="to">
    <slot />
  </nuxt-link>
  <a v-else-if="href" :href="href">
    <slot />
  </a>
  <button v-else-if="click" type="button" @click="click">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    to: { type: String, default: null },
    href: { type: String, default: null },
    click: { type: Function, default: null }
  }
}
</script>
