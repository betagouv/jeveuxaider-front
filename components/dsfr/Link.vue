<template>
  <component
    :is="isExternal ? 'a' : 'nuxt-link'"
    :target="isExternal ? '_blank' : '_self'"
    :class="[
      'inline no-underline'
    ]"
    :href="to"
    :to="to"
    title="test"
  >
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left'"
      :width="iconSize"
      :class="iconClass"
    />

    <slot />

    <component
      :is="icon"
      v-if="icon && iconPosition === 'right'"
      :width="iconSize"
      :class="iconClass"
    />

    <RiExternalLinkLine
      v-if="isExternal"
      :width="iconSize"
      :class="iconClass"
    />
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
    },
    type: {
      type: String,
      default: 'inside-text',
      validator: s => ['inside-text', 'alone'].includes(s)
    },
    icon: {
    // See vue-remix-icons.js
      type: [String, null],
      default: null
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: i => ['left', 'right'].includes(i)
    },
    iconSize: {
      type: Number,
      default: 16
    }
  },
  computed: {
    iconClass () {
      return 'inline-block fill-current align-baseline translate-y-[.15rem]'
    }
  }
}
</script>

<style lang="postcss" scoped>
[href] {
  text-rendering: optimizeLegibility;
  background-image: linear-gradient(0deg,currentColor,currentColor),linear-gradient(0deg,currentColor,currentColor);
  background-position: 0 100%, 0 calc(100% - 0.0625em);
  background-repeat: no-repeat,no-repeat;
  background-size: 0 0.125em,100% 0.0625em;
}

a[href]:hover {
  background-size: 100% 0.125em,100% 0.0625em;
}

a[href]:active {
  background-color: #EDEDED;
}
</style>
