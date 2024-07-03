<template>
  <div class="relative">
    <div
      v-if="infosBulle"
      v-tooltip="{
        content: infosBulle,
        placement: 'top',
      }"
      class="hidden sm:block p-2 cursor-help absolute top-0 -right-2 group"
    >
      <RiInformationLine class="h-4 w-4 text-gray-400 group-hover:text-gray-900 fill-current" />
    </div>
    <BaseHeading as="h2" :level="3" :class="[{ 'sm:pr-6': infosBulle }]">
      <template v-if="link">
        <nuxt-link no-prefetch :to="link" class="hover:text-jva-blue-500">
          {{ title }}
        </nuxt-link>
      </template>
      <template v-else>
        {{ title }}
      </template>
    </BaseHeading>
    <!-- <div v-if="contextLabels.length && !noParams" class="text-gray-400 font-semibold">
      {{ contextLabels.join(' · ') }}
    </div> -->
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
    noPeriod: {
      type: Boolean,
      default: false,
    },
    noParams: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: null,
    },
    infosBulle: {
      type: String,
      default: null,
    },
  },
  computed: {
    contextLabels() {
      const contextLabels = []
      if (this.subtitle) {
        return [this.subtitle]
      }
      if (!this.noPeriod) {
        contextLabels.push(this.periodLabel)
      }
      if (this.$stores.statistics.params.department) {
        contextLabels.push(
          `${this.$stores.statistics.params.department} ${this.$filters.label(
            this.$stores.statistics.params.department,
            'departments'
          )}`
        )
      }
      return contextLabels
    },
    periodLabel() {
      return `Du ${this.$dayjs(this.$stores.statistics.params.startDate).format(
        'DD/MM/YYYY'
      )} jusqu'au ${this.$dayjs(this.$stores.statistics.params.endDate).format('DD/MM/YYYY')}`
    },
  },
})
</script>
