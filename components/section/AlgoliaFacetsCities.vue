<template>
  <div v-if="facetHits.length > 0" class="overflow-hidden">
    <div class="flex flex-wrap items-center gap-8">
      <div class="text-lg font-bold text-[#161616]">
        {{ title }}
      </div>
      <DsfrTag
        v-for="(city, i) in facetHits"
        :key="i"
        @click="onClick(city)"
        size="md"
        :custom-theme="true"
        class="text-jva-blue-500 bg-[#E3E3FD]"
      >
        {{ city.value }}
      </DsfrTag>
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
      default: () => {},
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
        'city',
        '',
        this.searchParameters
      )

      this.facetHits = facetHits
      this.$emit('facet-hits', facetHits)
    },
    onClick(city) {
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
          city: city.value,
        },
      })
    },
  },
})
</script>
