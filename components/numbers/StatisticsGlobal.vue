<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <div class="mb-6">
      <Heading as="h2" :level="3">
        Statistiques globales
      </Heading>
      <div class="text-gray-400 font-semibold">
        Tous les indicateurs depuis le début
      </div>
    </div>
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.organisations"
        :title="`${$options.filters.pluralize(statistics.organisations, 'Organisation', 'Organisations', false)}`"
        subtitle="au total"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="statistics.territoires"
        :title="`${$options.filters.pluralize(statistics.territoires, 'Territoire', 'Territoires', false)}`"
        subtitle="au total"
        link="/admin/statistics/organisations"
      />
      <CardStatistic
        :value="statistics.missions"
        :title="`${$options.filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        subtitle="au total"
        link="/admin/statistics/missions"
      />
      <CardStatistic
        :value="statistics.activites"
        :title="`${$options.filters.pluralize(statistics.activites, 'Activité', 'Activités', false)}`"
        subtitle="au total"
        link="/admin/statistics/missions"
      />
      <CardStatistic
        :value="statistics.modeles"
        :title="`${$options.filters.pluralize(statistics.modeles, 'Modèle', 'Modèles', false)}`"
        subtitle="au total"
        link="/admin/statistics/missions"
      />
      <CardStatistic
        :value="statistics.participations"
        :title="`${$options.filters.pluralize(statistics.participations, 'Participation', 'Participations', false)}`"
        subtitle="au total"
        link="/admin/statistics/participations"
      />
      <CardStatistic
        :value="statistics.users"
        :title="`${$options.filters.pluralize(statistics.users, 'Utilisateur', 'Utilisateurs', false)}`"
        subtitle="au total"
        link="/admin/statistics/utilisateurs"
      />
      <CardStatistic
        :value="statistics.reseaux"
        :title="`${$options.filters.pluralize(statistics.reseaux, 'Réseau', 'Réseaux', false)}`"
        subtitle="au total"
        link="/admin/statistics/organisations"
      />
    </div>
  </Box>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'

export default {
  components: {
    CardStatistic
  },
  data () {
    return {
      loading: true,
      statistics: null
    }
  },
  async fetch () {
    this.loading = true

    await this.$axios.get('/statistics/global', {
      // params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
