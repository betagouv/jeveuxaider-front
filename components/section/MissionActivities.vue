<template>
  <div v-if="facetActivities.length > 0" class="bg-jva-orange-300 py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="flex flex-col gap-6 xl:gap-8">
        <div class="lg:max-w-4xl">
          <DsfrHeading
            as="h2"
            size="alt-sm"
            class="hidden sm:block mb-6 md:mb-2"
            color="text-[#522F29]"
          >
            {{ title }}
          </DsfrHeading>
          <h2 class="text-4xl font-bold sm:hidden">Au programme</h2>
        </div>
        <div class="flex flex-wrap gap-8">
          <div v-for="(activity, i) in facetActivities" :key="i">
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
  props: {
    title: {
      type: String,
      required: true,
    },
    activities: {
      type: Array,
      required: true,
    },
    redirectParameters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      allActivities: activities,
      facetHits: [],
    }
  },
  computed: {
    facetActivities() {
      return this.activities.map((activity) => {
        return {
          ...activity,
          ...this.allActivities.find((item) => item.id === activity.id),
        }
      })
    },
  },
  methods: {
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
