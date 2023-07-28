<template>
  <div v-if="facetActivities.length > 0" class="bg-jva-orange-300 py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="flex flex-col lg:gap-6 xl:gap-8">
        <div class="max-w-4xl">
          <Heading as="h2" size="alt-sm" class="mb-6 md:mb-2" color="text-[#522F29]">
            {{ title }}
          </Heading>
        </div>
        <div class="flex flex-wrap gap-8">
          <div
            v-for="activity,i in facetActivities"
            :key="i"
          >
            <button
              class="inline-flex p-4 xl:px-8 xl:py-5 bg-white shadow xl:shadow-xl text-lg  xl:text-[22px] font-bold w-full sm:w-auto sm:hover:bg-[#F6F6F6] transition text-left"
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
import Heading from '@/components/dsfr/Heading.vue'
import activities from '@/assets/activities.json'

export default {
  components: {
    Heading
  },
  props: {
    title: {
      type: String,
      required: true
    },
    searchParameters: {
      type: Object,
      required: true
    },
    redirectParameters: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activities,
      facetHits: []
    }
  },
  async fetch () {
    const { facetHits } = await this.$algolia.missionsIndex.searchForFacetValues('activities.id', '', this.searchParameters)
    this.facetHits = facetHits
  },
  computed: {
    facetActivities () {
      return this.activities.filter(activity => this.facetHits.map(a => a.value).includes(activity.id.toString()))
    }
  },
  fetchOnServer: false,
  methods: {
    onClick (activity) {
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
          'activities.name': activity.name
        }
      })
    }
  }
}
</script>

<style>

</style>
