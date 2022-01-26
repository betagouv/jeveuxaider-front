<template>
  <div>
    <nuxt-link v-if="link" :to="link" class="inline-flex items-center space-x-2" target="_blank">
      <div
        :class="['h-3 w-3 rounded-full', published ? 'bg-jva-green-500' : 'bg-jva-red-500']"
      />
      <div class="underline text-sm">
        {{ published ? publishedLabel : unpublishedLabel }}
      </div>
      <ExternalLinkIcon class="h-4 w-4" />
    </nuxt-link>
    <div v-else class="inline-flex items-center space-x-2">
      <div
        :class="['h-3 w-3 rounded-full', published ? 'bg-jva-green-500' : 'bg-jva-red-500']"
      />
      <div class="underline text-sm">
        {{ published ? publishedLabel : unpublishedLabel }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
