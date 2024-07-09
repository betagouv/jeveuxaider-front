<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="L’activité sur JeVeuxAider.gouv.fr en un coup d’oeil"
      class="mb-6"
    />

    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        v-if="statistics.organisations !== null"
        :value="statistics.organisations"
        :title="`${$filters.pluralize(
          statistics.organisations,
          'Organisation',
          'Organisations',
          false
        )}`"
        :subtitle="`${$filters.pluralize(statistics.organisations, 'validée', 'validées', false)}`"
        link="/admin/statistics/organisations"
        infos-bulle="Correspond au nombre d’organisations inscrites et validées sur la période"
      />
      <CardStatistic
        v-if="statistics.missions !== null"
        :value="statistics.missions"
        :title="`${$filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        :subtitle="`${$filters.pluralize(
          statistics.missions,
          'validée ou terminée',
          'validées ou terminées',
          false
        )}`"
        link="/admin/statistics/missions"
        infos-bulle="Correspond aux missions créées sur la période, qui sont validées ou bien terminées"
      />
      <CardStatistic
        v-if="statistics.participations !== null"
        :value="statistics.participations"
        :title="`${$filters.pluralize(
          statistics.participations,
          'Mise en relation',
          'Mises en relation',
          false
        )}`"
        :subtitle="`${$filters.pluralize(statistics.participations, 'brute', 'brutes', false)}`"
        link="/admin/statistics/participations"
        infos-bulle="Correspond au nombre de mises en relation brutes sur la période"
      />
      <CardStatistic
        v-if="statistics.participations_validated !== null"
        :value="statistics.participations_validated"
        :title="`${$filters.pluralize(
          statistics.participations_validated,
          'Mise en relation',
          'Mises en relation',
          false
        )}`"
        :subtitle="`${$filters.pluralize(
          statistics.participations_validated,
          'validée',
          'validées',
          false
        )}`"
        link="/admin/statistics/participations"
        infos-bulle="Correspond au nombre de mises en relation validées sur la période"
      />
      <CardStatistic
        v-if="statistics.utilisateurs !== null"
        :value="statistics.utilisateurs"
        :title="`${$filters.pluralize(
          statistics.utilisateurs,
          'Utilisateur',
          'Utilisateurs',
          false
        )}`"
        :subtitle="`${$filters.pluralize(statistics.utilisateurs, 'inscrit', 'inscrits', false)}`"
        link="/admin/statistics/utilisateurs"
        infos-bulle="Correspond au nombre d’utilisateurs inscrits sur la période"
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

      await apiFetch('/statistics/overview-quick-glance', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
