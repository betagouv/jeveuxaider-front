<template>
  <div v-if="facetHits.length > 0" class="bg-jva-orange-300 py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="flex flex-col lg:gap-6 xl:gap-8">
        <div class="max-w-4xl">
          <DsfrHeading as="h2" size="alt-sm" class="mb-6 md:mb-2" color="text-[#522F29]">
            {{ title }}
          </DsfrHeading>
        </div>
        <div class="flex flex-wrap gap-8">
          <div v-for="(activity, i) in facetHits" :key="i">
            <button
              class="inline-flex p-4 xl:px-8 xl:py-5 bg-white shadow xl:shadow-xl text-lg xl:text-[22px] font-bold w-full sm:w-auto sm:hover:bg-[#F6F6F6] transition text-left"
              @click="onClick(activity)"
            >
              <span aria-hidden="true" class="flex-none">{{ activity.icon }}</span>
              <span class="ml-3">{{ activity.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activities from '@/assets/activities.json'

export default defineNuxtComponent({
  emits: ['facet-hits'],
  props: {
    title: {
      type: String,
      required: true,
    },
    searchParameters: {
      type: Object,
      required: true,
    },
    redirectParameters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activities,
      facetHits: [],
    }
  },
  created() {
    if (process.client) {
      this.fetch()
    }
  },
  computed: {},
  methods: {
    async fetch() {
      const { facetHits } = await this.$algolia.missionsIndex.searchForFacetValues(
        'activities.id',
        '',
        this.searchParameters
      )

      const facetHitsFullMerged = facetHits.map((facetActivity) => {
        return {
          ...facetActivity,
          ...this.activities.find((item) => item.id.toString() === facetActivity.value),
        }
      })
      this.facetHits = facetHitsFullMerged
      this.$emit('facet-hits', facetHitsFullMerged)
    },
    onClick(activity) {
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
          'activities.name': activity.name,
        },
      })
    },
  },
})
</script>
