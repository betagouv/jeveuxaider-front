<template>
  <div class="inline-flex items-center space-x-2">
    <div
      :class="['h-3 w-3 rounded-full flex-none', published ? 'bg-jva-green-500' : 'bg-jva-red-500']"
    />
    <component :is="component" :to="link" :is-external="true" class="text-sm">
      {{ published ? publishedLabel : unpublishedLabel }}
    </component>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    published: {
      type: Boolean,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    publishedLabel: {
      type: String,
      default: 'En ligne',
    },
    unpublishedLabel: {
      type: String,
      default: 'Hors ligne',
    },
  },
  computed: {
    component() {
      return this.link ? resolveComponent('DsfrLink') : 'span'
    },
  },
})
</script>
