<template>
  <div class="text-jva-blue-500 hover:text-jva-blue-600">
    <component
      :is="component"
      v-if="to"
      :href="external && to ? to : undefined"
      :to="!external && to ? to : undefined"
      :target="to ? (external ? '_blank' : '_self') : undefined"
      class="flex items-center space-x-2 cursor-pointer hover:underline focus:underline transition focus:outline-none"
      :class="[{ 'flex-row-reverse': iconPosition == 'left' }, linkClass]"
    >
      <slot />
      <component :is="icon" v-if="icon" class="h-3" :class="[iconClass]" />
    </component>

    <div
      v-else
      class="flex items-center space-x-2 cursor-pointer hover:underline focus:underline transition focus:outline-none"
      :class="[{ 'flex-row-reverse': iconPosition == 'left' }, linkClass]"
    >
      <slot />
      <component :is="icon" v-if="icon" :class="[iconClass]" />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    to: { type: String, default: null },
    target: { type: String, default: null },
    external: { type: Boolean, default: false },
    icon: { type: String, default: null },
    iconPosition: { type: String, default: 'right' },
    iconClass: { type: String, default: 'h-3' },
    linkClass: { type: [String, Array], default: '' },
  },
  computed: {
    component() {
      return this.external ? 'a' : resolveComponent('NuxtLink')
    },
  },
})
</script>
