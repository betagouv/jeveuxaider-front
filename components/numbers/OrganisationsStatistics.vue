<template>
  <BaseBox
    padding="sm"
    :loading="loading"
    loading-text="Récupération des statistiques..."
    class="lg:col-span-2"
  >
    <BoxHeadingStatistics title="L’activité des organisations en un coup d’oeil" class="mb-6" />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.organisations_count"
        :title="`${$filters.pluralize(
          statistics.organisations_count,
          'Organisation',
          'Organisations',
          false
        )}`"
        :subtitle="`${$filters.pluralize(
          statistics.organisations_count,
          'inscrite',
          'inscrites',
          false
        )}`"
        link="/admin/statistics/organisations"
        infos-bulle="Nombre d’organisations qui se sont inscrites sur la période sélectionnée"
      />
      <CardStatistic
        :value="statistics.organisations_validated_count"
        :title="`${$filters.pluralize(
          statistics.organisations_validated_count,
          'Organisation',
          'Organisations',
          false
        )}`"
        :subtitle="`${$filters.pluralize(
          statistics.organisations_validated_count,
          'validée',
          'validées',
          false
        )}`"
        link="/admin/statistics/organisations"
        infos-bulle="Correspond au nombre d’organisations inscrites et validées sur la période"
      />
      <CardStatistic
        :value="`${statistics.organisations_conversion_rate}%`"
        title="Taux de conversion"
        :gauge-percentage="statistics.organisations_conversion_rate"
        infos-bulle="Correspond au ratio entre le nombre d'organisations isncrites et le nombre de organisations validées sur la période"
      />
      <CardStatistic
        class="col-start-1"
        :value="`${
          Math.round((statistics.organisations_response_time_avg / (3600 * 24)) * 10) / 10
        } jours`"
        :title="`Temps de réponse`"
        link="/admin/statistics/organisations"
        infos-bulle="Temps moyen de traitement aux demandes de participation reçues sur la période sélectionnée"
      />
      <CardStatistic
        :value="`${statistics.organisations_response_ratio_avg}%`"
        :title="`Taux de réponse`"
        link="/admin/statistics/organisations"
        infos-bulle="Taux de réponse aux demandes de participations reçues sur la période sélectionnée"
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
      await apiFetch('/statistics/global/organisations', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
