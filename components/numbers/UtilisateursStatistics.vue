<template>
  <BaseBox
    padding="sm"
    :loading="loading"
    loading-text="Récupération des statistiques..."
    class="lg:col-span-2"
  >
    <BoxHeadingStatistics title="Les utilisateurs en un coup d’oeil" class="mb-6" />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.utilisateurs"
        :title="`${$filters.pluralize(
          statistics.utilisateurs,
          'Utilisateur',
          'Utilisateurs',
          false
        )}`"
        :subtitle="`${$filters.pluralize(statistics.utilisateurs, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre d'utilisateurs inscrits sur la période"
      />
      <CardStatistic
        :value="statistics.benevoles"
        :title="`${$filters.pluralize(statistics.benevoles, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$filters.pluralize(statistics.benevoles, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre de bénévoles inscrits sur la période"
      />
      <CardStatistic
        :value="statistics.utilisateurs_with_participations"
        :title="`${$filters.pluralize(
          statistics.utilisateurs_with_participations,
          'Bénévole actif',
          'Bénévoles actifs',
          false
        )}`"
        link="/admin/utilisateurs"
        infos-bulle="Nombre de bénévoles isncrits sur la période ayant fait au moins une mise en relation"
      />
      <CardStatistic
        :value="statistics.participations_avg.toString()"
        :title="`${$filters.pluralize(
          statistics.participations_avg,
          'Participation',
          'Participations',
          false
        )}`"
        :subtitle="`par bénévole actif`"
        link="/admin/utilisateurs"
        infos-bulle="Nombre de participations moyen par bénévoles inscrits sur la période"
      />
      <CardStatistic
        :value="statistics.benevoles_visibles_marketplace"
        :title="`${$filters.pluralize(
          statistics.benevoles_visibles_marketplace,
          'Bénévole visible',
          'Bénévoles visibles',
          false
        )}`"
        subtitle="sur la marketplace"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre de bénévoles inscrits sur la période et visibles sur la marketplace"
      />
      <CardStatistic
        :value="statistics.benevoles_notifications_martketplace"
        :title="`${$filters.pluralize(
          statistics.benevoles_notifications_martketplace,
          'Demande',
          'Demandes',
          false
        )}`"
        subtitle="via la marketplace"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre de notifications envoyées aux bénévoles sur la période pour les inviter à participer à leurs missions"
      />
    </div>
  </BaseBox>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
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
      await apiFetch('/statistics/global/utilisateurs', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
