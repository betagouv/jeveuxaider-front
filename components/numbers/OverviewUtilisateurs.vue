<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Utilisateurs ›"
      link="/admin/statistics/utilisateurs"
      no-period
      class="mb-6"
    />
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
        infos-bulle="Nombre total d’utilisateurs inscrits sur JeVeuxAider.gouv.fr"
      />
      <CardStatistic
        :value="statistics.benevoles"
        :title="`${$filters.pluralize(statistics.benevoles, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$filters.pluralize(statistics.benevoles, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre total d’utilisateurs inscrits en tant que “bénévoles” sur JeVeuxAider.gouv.fr"
      />
      <CardStatistic
        :value="statistics.benevoles_actifs"
        :title="`${$filters.pluralize(
          statistics.benevoles_actifs,
          'Bénévole',
          'Bénévoles',
          false
        )}`"
        :subtitle="`${$filters.pluralize(statistics.benevoles_actifs, 'actif', 'actifs', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Nombre de bénévoles ayant réalisé au moins une demande de participation à une mission"
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
        infos-bulle="Nombre de bénévoles visibles sur la marketplace"
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

      await apiFetch('/statistics/overview-utilisateurs', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
