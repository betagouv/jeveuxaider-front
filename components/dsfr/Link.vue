<template>
  <component
    :is="to ? (isExternal ? 'a' : 'nuxt-link') : 'button'"
    :target="isExternal ? '_blank' : '_self'"
    :class="[
      'dsfr-link inline no-underline cursor-pointer'
    ]"
    :href="to"
    :to="!isExternal && to"
    :title="title || $slots.default?.[0]?.text?.trim()"
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
      :class="[iconClasses, iconClass]"
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
      default: ''
    },
    title: {
      type: String,
      default: undefined
    },
    icon: {
    // See vue-remix-icons.js
      type: [String, null],
      default: null
    },
    iconPosition: {
      type: String,
      default: 'right',
      validator: i => ['left', 'right'].includes(i)
    },
    iconSize: {
      type: Number,
      default: 16
    },
    iconClass: {
      type: String,
      default: null
    }
  },
  computed: {
    iconClasses () {
      return 'inline-block fill-current align-baseline translate-y-[.15rem]'
    }
  }
}
</script>

<style lang="postcss" scoped>
.dsfr-link {
  text-rendering: optimizeLegibility;
  background-image: linear-gradient(0deg,currentColor,currentColor),linear-gradient(0deg,currentColor,currentColor);
  background-position: 0 100%, 0 calc(100% - 0.0625em);
  background-repeat: no-repeat,no-repeat;
  background-size: 0 0.125em,100% 0.0625em;
}

.dsfr-link:hover {
  background-size: 100% 0.125em,100% 0.0625em;
}

.dsfr-link:active {
  background-color: #EDEDED;
}
</style>
