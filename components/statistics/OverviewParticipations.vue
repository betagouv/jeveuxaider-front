<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Mises en relation ›"
      link="/stats/participations"
      no-period
      class="mb-6"
    />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.participations"
        :title="`${$filters.pluralize(
          statistics.participations,
          'Mise en relation',
          'Mises en relation',
          false
        )}`"
        infos-bulle="Total de mises en relation depuis le début"
      />
      <CardStatistic
        :value="statistics.messages"
        :title="`${$filters.pluralize(statistics.messages, 'Message', 'Messages', false)}`"
        :subtitle="`${$filters.pluralize(statistics.messages, 'échangé', 'échangés', false)}`"
        infos-bulle="Total de messages échangés sur la messagerie depuis le début"
      />
    </div>
  </BaseBox>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    CardStatistic,
    BoxHeadingStatistics,
  },
  data() {
    return {
      loading: true,
      statistics: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/statistics/public/overview-participations', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
