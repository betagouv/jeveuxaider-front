<template>
  <component
    :is="isExternal ? 'a' : 'nuxt-link'"
    :target="isExternal ? '_blank' : '_self'"
    class="inline"
    :href="to"
    :to="to"
  >
    <slot />

    <RiExternalLinkLine v-if="isExternal" width="16" class="inline-block" style="vertical-align: calc(.375em - 1rem*0.5)" />
  </component>
</template>

<script>
export default {
  props: {
    isExternal: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

[href] {
  background-image: linear-gradient(0deg, currentColor, currentColor), linear-gradient(0deg, currentColor, currentColor);
  background-position: calc(100% * 0) 100%, calc(100% * 0) calc(100% - 0.0625em);
  background-repeat: no-repeat, no-repeat;
  transition: background-size 0s;
  background-size: 0 0.125em, 100% 0.0625em;
}

a[href]:hover {
  background-color: transparent;
}

a[href]:active {
  background-color: #EDEDED;
}

a[href]:hover,
a[href]:active {
  background-size: 100% 0.125em, 100% 0.0625em;
}
</style>
