<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des admins">
    <BoxHeadingStatistics
      :title="title"
      class="mb-6"
      no-period
      infos-bulle="Liste des pages les plus visitées sur les 2 dernières semaines"
    />

    <StackedList :divided="false">
      <StackedListItem
        v-for="item, i in results"
        :key="i"
        :icon="medal(i)"
        :icon-class="[
          { 'text-4xl': i < 3},
          { 'text-2xl font-semibold text-gray-500': i >= 3 }
        ]"
        :href="`https://jeveuxaider.gouv.fr/${item.page}`"
      >
        <div class="text-gray-900 font-semibold">
          {{ item.page }}
        </div>
        <div class="text-gray-500 text-sm">
          {{ item.pageviews }} vues
        </div>
      </StackedListItem>
    </StackedList>
  </Box>
</template>

<script>
import axios from 'axios'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default {
  components: {
    BoxHeadingStatistics
  },
  props: {
    title: {
      type: String,
      default: 'Pages vues'
    },
    paramsFilters: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: true,
      results: []
    }
  },
  async fetch () {
    const { data: plausibleStats } = await axios.get(
      'https://plausible.io/api/v1/stats/breakdown',
      {
        headers: {
          Authorization: `Bearer ${this.$config.plausible.token}`
        },
        params: {
          site_id: this.$config.plausible.site_id,
          metrics: 'pageviews',
          property: 'event:page',
          period: 'custom',
          filters: this.paramsFilters,
          date: `${this.$dayjs().subtract(14, 'day').format('YYYY-MM-DD')},${this.$dayjs().format('YYYY-MM-DD')}`,
          limit: 5
        }
      }
    )
    this.results = plausibleStats.results
    this.loading = false
  },
  methods: {
    medal (index) {
      switch (index) {
        case 0: return '🥇'
        case 1: return '🥈'
        case 2: return '🥉'
        default: return `${index + 1}.`
      }
    }
  }
}
</script>

<style>

</style>
