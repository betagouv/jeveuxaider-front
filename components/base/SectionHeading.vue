<template>
  <div>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-12">
      <div class="max-w-4xl">
        <div v-if="secondaryTitle" class="text-xl text-gray-600">
          {{ secondaryTitle }}
        </div>
        <div class="flex space-x-4 items-center">
          <DsfrHeading as="h1" size="2xl">
            {{ title }}
          </DsfrHeading>
          <LoadingIndicator v-if="loading" />
        </div>

        <slot name="tags" />
        <div v-if="secondaryTitleBottom" class="text-gray-600 mt-2 text-lg lg:text-xl">
          {{ secondaryTitleBottom }}
        </div>
      </div>
      <slot name="action" />
    </div>
    <slot name="bottom" />
  </div>
</template>

<script>
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'

export default defineNuxtComponent({
  components: {
    LoadingIndicator,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    secondaryTitle: {
      type: String,
      default: null,
    },
    secondaryTitleBottom: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
