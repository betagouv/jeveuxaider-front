<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des admins">
    <BoxHeadingStatistics
      :title="title"
      class="mb-6"
      infos-bulle="Liste des pages les plus visitées sur la période"
    />

    <BaseStackedList :divided="false">
      <BaseStackedListItem
        v-for="(item, i) in results"
        :key="i"
        :icon="medal(i)"
        :icon-class="[{ 'text-4xl': i < 3 }, { 'text-2xl font-semibold text-gray-500': i >= 3 }]"
        :href="`https://jeveuxaider.gouv.fr${item.page}`"
      >
        <div class="text-gray-900 font-semibold">
          {{ item.page }}
        </div>
        <div class="text-gray-500 text-sm">{{ $numeral(item.pageviews) }} vues</div>
      </BaseStackedListItem>
    </BaseStackedList>
  </BaseBox>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    BoxHeadingStatistics,
  },
  props: {
    title: {
      type: String,
      default: 'Pages vues',
    },
    paramsFilters: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      results: [],
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    dateRange() {
      let startDate = '2020-01-01'
      let endDate = this.$dayjs().format('YYYY-MM-DD')

      if (this.$route.query.start_date) {
        startDate = this.$route.query.start_date
      }

      if (this.$route.query.end_date) {
        endDate = this.$route.query.end_date
      }

      return `${this.$dayjs(startDate).format('YYYY-MM-DD')},${this.$dayjs(endDate).format(
        'YYYY-MM-DD'
      )}`
    },
  },
  methods: {
    async fetch() {
      const runtimeConfig = useRuntimeConfig()
      const plausibleStats = await $fetch('https://plausible.io/api/v1/stats/breakdown', {
        headers: {
          Authorization: `Bearer ${runtimeConfig.public.plausible.token}`,
        },
        params: {
          site_id: runtimeConfig.public.plausible.site_id,
          metrics: 'pageviews',
          property: 'event:page',
          period: 'custom',
          filters: this.paramsFilters,
          date: this.dateRange,
          limit: 5,
        },
      })
      this.results = plausibleStats.results
      this.loading = false
    },
    medal(index) {
      switch (index) {
        case 0:
          return '🥇'
        case 1:
          return '🥈'
        case 2:
          return '🥉'
        default:
          return `${index + 1}.`
      }
    },
  },
})
</script>
