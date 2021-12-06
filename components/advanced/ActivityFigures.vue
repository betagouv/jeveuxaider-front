<template>
  <Box padding="sm" :loading="$fetchState.pending" loading-text="Récupération de votre activité ...">
    <Heading as="h2" :level="3" class="mb-8">
      Votre activité en chiffres
    </Heading>
    <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic :value="statistics.places_left" title="Bénévoles recherchés" />
      <CardStatistic :value="`${statistics.places_occupation_rate}%`" title="Taux d'occupation" :gauge-percentage="statistics.places_occupation_rate" />
      <CardStatistic
        v-if="['referent','referent_regional'].includes($store.getters.contextRole)"
        :value="statistics.organisations_actives"
        title="Organisations actives"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations)} organisations`"
        link="/dashboard/organisations"
        link-label="Organisations"
      />
      <CardStatistic
        v-if="['responsable', 'referent','referent_regional'].includes($store.getters.contextRole)"
        :value="statistics.missions_actives"
        title="Missions actives"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.missions)} missions`"
        link="/dashboard/missions"
        link-label="Missions"
      />
      <CardStatistic
        v-if="['responsable', 'referent','referent_regional'].includes($store.getters.contextRole)"
        :value="statistics.participations_validated"
        title="Participations validées"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.participations)} candidatures`"
        link="/dashboard/participations"
        link-label="Participations"
      />
      <CardStatistic
        v-if="['admin'].includes($store.getters.contextRole)"
        :value="statistics.users_benevoles"
        title="Bénévoles"
        :subtitle="`sur ${$options.filters.formatNumber(statistics.users)} utilisateurs`"
        link="/dashboard/users"
        link-label="Utilisateurs"
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
      statistics: null
    }
  },
  async fetch () {
    const response = await this.$axios.get('/statistics')
    if (response.data) {
      this.statistics = response.data
    }
  }
}
</script>

<style>

</style>
