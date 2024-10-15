<template>
  <BaseBox
    padding="sm"
    :loading="loading"
    loading-text="Récupération des statistiques..."
    class="lg:col-span-2"
  >
    <BoxHeadingStatistics title="Les modérations en un coup d’oeil" class="mb-6" />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.moderations_count"
        :title="`${$filters.pluralize(
          statistics.moderations_count,
          'modération',
          'modérations',
          false
        )}`"
        subtitle="au total"
        link="/admin/statistics/participations"
        infos-bulle="Total du nombre de modérations sur la période sélectionnée"
      />
      <CardStatistic
        :value="statistics.moderations_admins_count"
        :title="`${$filters.pluralize(
          statistics.moderations_admins_count,
          'modération',
          'modérations',
          false
        )}`"
        subtitle="Admins"
        link="/admin/statistics/participations"
        infos-bulle="Nombre de modérations des admins sur la période"
      />
      <CardStatistic
        :value="statistics.moderations_referents_count"
        :title="`${$filters.pluralize(
          statistics.moderations_referents_count,
          'modération',
          'modérations',
          false
        )}`"
        subtitle="Référents"
        infos-bulle="Nombre de modérations des référents sur la période"
      />
      <CardStatistic
        :value="ratioPercentage + '%'"
        title="des actions"
        subtitle="par des admins"
        infos-bulle="Ratios des actions entre admins et référents sur la période"
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
  computed: {
    ratioPercentage() {
      return this.statistics
        ? (
            (this.statistics.moderations_admins_count / this.statistics.moderations_count) *
            100
          ).toFixed(2)
        : 0
    },
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/statistics/global/moderations', {
        params: {
          ...this.$route.query,
        },
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
