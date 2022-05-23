<template>
  <div class="text-jva-blue-500 hover:text-jva-blue-600">
    <component
      :is="external ? 'a' : 'nuxt-link'"
      v-if="to"
      :to="to"
      :href="to"
      :target="target"
      class="flex items-center space-x-2 cursor-pointer hover:underline focus:underline transition focus:outline-none"
      :class="[
        {'flex-row-reverse': iconPosition == 'left'},
        linkClass
      ]"
    >
      <slot />
      <component
        :is="icon"
        v-if="icon"
        class="h-3"
        :class="[
          iconClass
        ]"
      />
    </component>

    <div
      v-else
      class="flex items-center space-x-2 cursor-pointer hover:underline focus:underline transition focus:outline-none"
      :class="[
        {'flex-row-reverse': iconPosition == 'left'},
        linkClass
      ]"
    >
      <slot />
      <component
        :is="icon"
        v-if="icon"
        :class="[
          iconClass
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: { type: String, default: null },
    target: { type: String, default: null },
    external: { type: Boolean, default: false },
    icon: { type: String, default: null },
    iconPosition: { type: String, default: 'right' },
    iconClass: { type: String, default: 'h-3' },
    linkClass: { type: [String, Array], default: '' }
  }
}
</script>
