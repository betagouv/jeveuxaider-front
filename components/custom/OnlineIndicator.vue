<template>
  <div class="inline-flex items-center space-x-2">
    <div :class="['h-3 w-3 rounded-full', published ? 'bg-jva-green-500' : 'bg-jva-red-500']" />
    <component :is="link ? 'Link' : 'span'" :to="link" :is-external="true" class="text-sm">
      {{ published ? publishedLabel : unpublishedLabel }}
    </component>
  </div>
</template>

<script>
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Link
  },
  props: {
    published: {
      type: Boolean,
      required: true
    },
    link: {
      type: String,
      default: null
    },
    publishedLabel: {
      type: String,
      default: 'En ligne'
    },
    unpublishedLabel: {
      type: String,
      default: 'Hors ligne'
    }
  }
}
</script>

<style>

</style>
