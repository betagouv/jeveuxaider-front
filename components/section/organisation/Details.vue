<template>
  <div class="flex flex-col lg:grid lg:grid-cols-2 relative bg-white">
    <!-- LEFT -->
    <div class="order-2 lg:order-1">
      <img
        :srcset="srcSet"
        sizes="(min-width: 1024px) 50vw, 100vw"
        class="lg:absolute object-cover w-full lg:w-1/2 h-full max-h-[400px] lg:max-h-full"
      >
    </div>

    <!-- RIGHT -->
    <div
      class="order-1 lg:order-2 col-span-2 lg:col-span-1"
      :style="`background-color: ${organisation.color ? organisation.color : '#B91C1C'}`"
    >
      <div class="max-w-3xl mr-auto">
        <div class="text-white px-4 py-8 md:p-8 xl:p-16">
          <slot />
          <DomainsPublicsLinks :organisation="organisation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks.vue'

export default {
  components: {
    DomainsPublicsLinks
  },
  props: {
    organisation: {
      type: Object,
      required: true
    },
    srcSet: {
      type: String,
      required: true
    }
  }
}
</script>
