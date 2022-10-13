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
  border-bottom: 1px solid;
  padding-bottom: 2px;
}

a[href]:hover {
  background-color: transparent;
  border-bottom: 2px solid;
}

a[href]:active {
  background-color: #EDEDED;
}
</style>
