<template>
  <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-12">
    <div class="max-w-4xl">
      <div v-if="secondaryTitle" class="text-xl text-gray-600">
        {{ secondaryTitle }}
      </div>
      <Heading as="h1" size="2xl">
        {{ title }}
      </Heading>

      <slot name="tags" />
      <div v-if="secondaryTitleBottom" class="text-gray-600 mt-2 text-lg lg:text-xl">
        {{ secondaryTitleBottom }}
      </div>
    </div>
    <slot name="action" />
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Heading
  },
  props: {
    title: {
      type: String,
      required: true
    },
    secondaryTitle: {
      type: String,
      default: null
    },
    secondaryTitleBottom: {
      type: String,
      default: null
    }
  }
}
</script>
