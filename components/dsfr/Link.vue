<template>
  <component
    :is="as"
    :target="to ? (isExternal ? '_blank' : '_self') : undefined"
    :class="['dsfr-link inline no-underline cursor-pointer']"
    :href="isExternal && to ? to : undefined"
    :to="!isExternal && to ? to : undefined"
    :title="title || $slots.default?.[0]?.text?.trim()"
    no-prefetch
  >
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left'"
      :width="iconSize"
      :class="[iconClasses, iconClass]"
    />

    <slot />

    <component
      :is="icon"
      v-if="icon && iconPosition === 'right'"
      :width="iconSize"
      :class="[iconClasses, iconClass]"
    />

    <RiExternalLinkLine
      v-if="isExternal"
      :width="iconSize"
      :class="[iconClasses, iconClass, 'ml-1']"
    />
  </component>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isExternal: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: undefined,
    },
    icon: {
      type: [String, null],
      default: null,
    },
    iconPosition: {
      type: String,
      default: 'right',
      validator: (i) => ['left', 'right'].includes(i),
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    iconClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    iconClasses() {
      return 'inline-block fill-current align-baseline translate-y-[.15rem]'
    },
    as() {
      return this.to ? (this.isExternal ? 'a' : resolveComponent('NuxtLink')) : 'button'
    },
  },
})
</script>

<style scoped>
.dsfr-link {
  text-rendering: optimizeLegibility;
  background-image: linear-gradient(0deg, currentColor, currentColor),
    linear-gradient(0deg, currentColor, currentColor);
  background-position: 0 100%, 0 calc(100% - 0.0625em);
  background-repeat: no-repeat, no-repeat;
  background-size: 0 0.125em, 100% 0.0625em;
}

.dsfr-link:hover {
  background-size: 100% 0.125em, 100% 0.0625em;
}

.dsfr-link:active {
  background-color: #ededed;
}
</style>
