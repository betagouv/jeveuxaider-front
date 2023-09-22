<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Utilisateurs ›"
      link="/stats/utilisateurs"
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
        infos-bulle="Nombre total d’utilisateurs inscrits sur JeVeuxAider.gouv.fr"
      />
      <CardStatistic
        :value="statistics.benevoles"
        :title="`${$filters.pluralize(statistics.benevoles, 'Bénévole', 'Bénévoles', false)}`"
        :subtitle="`${$filters.pluralize(statistics.benevoles, 'inscrit', 'inscrits', false)}`"
        infos-bulle="Nombre total d’utilisateurs inscrits en tant que “bénévoles” sur JeVeuxAider.gouv.fr"
      />
      <CardStatistic
        :value="statistics.benevoles_visibles_marketplace"
        :title="`${$filters.pluralize(
          statistics.benevoles_visibles_marketplace,
          'Bénévole visible',
          'Bénévoles visibles',
          false
        )}`"
        subtitle="pour une mise en relation inversée"
        infos-bulle="Nombre de bénévoles visibles pour une mise en relation inversée"
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

      await apiFetch('/statistics/public/overview-utilisateurs', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
