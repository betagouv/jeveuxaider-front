<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics title="Vue d'ensemble du trafic sortant" class="mb-6" />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.periodRedirections"
        title="Redirections"
        subtitle="sur la période"
        infos-bulle="Nombre de redirections vers les partenaires sur la période"
      />
      <CardStatistic
        :value="statistics.periodApplications"
        title="Candidatures"
        subtitle="sur la période"
        infos-bulle="Nombre de candidatures vers les partenaires depuis le début"
      />
      <CardStatistic
        :value="statistics.totalRedirections"
        title="Redirections"
        subtitle="au total"
        infos-bulle="Nombre de redirections vers les partenaires sur la période"
      />
      <CardStatistic
        :value="statistics.totalApplications"
        title="Candidatures"
        subtitle="au total"
        infos-bulle="Nombre de candidatures vers les partenaires depuis le début"
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

      await apiFetch('/statistics/overview-api-engagement-sortant', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
