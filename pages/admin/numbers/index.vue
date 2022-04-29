<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Plus de chiffres"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersNumbers @refetch="$fetch" />
        </div>
      </template>
    </SectionHeading>

    <Box padding="sm" :loading="loadingStatistics" loading-text="Récupération des statistiques...">
      <Heading as="h2" :level="3" class="mb-4">
        Statistiques globales
      </Heading>
      <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
        <CardStatistic
          v-if="['admin', 'referent','referent_regional','tete_de_reseau','analyste','responsable_territoire'].includes($store.getters.contextRole)"
          :value="statistics.organisations_actives"
          :title="`${$options.filters.pluralize(statistics.organisations_actives, 'Organisation active', 'Organisations actives', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations)}`"
          link="/admin/numbers/organisations"
        />
        <CardStatistic
          v-if="['admin', 'responsable', 'referent','referent_regional','tete_de_reseau','analyste','responsable_territoire'].includes($store.getters.contextRole)"
          :value="statistics.participations_validated"
          :title="`${$options.filters.pluralize(statistics.participations_validated, 'Participation validée', 'Participations validées', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(statistics.participations)} ${$options.filters.pluralize(statistics.participations, 'candidature', 'candidatures', false)}`"
          link="/admin/numbers/participations"
        />
        <CardStatistic
          v-if="['admin','analyste'].includes($store.getters.contextRole)"
          :value="statistics.users_benevoles"
          title="Bénévoles"
          :subtitle="`sur ${$options.filters.formatNumber(statistics.users)}`"
          link="/admin/numbers/utilisateurs"
        />
        <CardStatistic
          v-if="['admin','analyste'].includes($store.getters.contextRole)"
          :value="statistics.reseaux_actives"
          :title="`${$options.filters.pluralize(statistics.reseaux_actives, 'Réseau en ligne', 'Réseaux en ligne', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(statistics.reseaux)}`"
        />
        <CardStatistic
          v-if="['admin','analyste'].includes($store.getters.contextRole)"
          :value="statistics.territoires_actives"
          :title="`${$options.filters.pluralize(statistics.territoires_actives, 'Territoire en ligne', 'Territoires en ligne', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(statistics.territoires)}`"
        />
        <CardStatistic
          v-if="['admin','analyste'].includes($store.getters.contextRole)"
          :value="statistics.mission_templates_actives"
          :title="`${$options.filters.pluralize(statistics.mission_templates_actives, 'Modèle en ligne', 'Modèles en ligne', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(statistics.mission_templates)}`"
        />
        <CardStatistic
          v-if="['admin','analyste'].includes($store.getters.contextRole)"
          :value="statistics.activities_actives"
          :title="`${$options.filters.pluralize(statistics.activities_actives, 'Activité en ligne', 'Activités en ligne', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(statistics.activities)} activités`"
        />
      </div>
    </Box>

    <Box padding="sm" :loading="loadingOffers" loading-text="Récupération des statistiques...">
      <Heading as="h2" :level="3" class="mb-4">
        Aperçu de l'offre actuelle
      </Heading>
      <div v-if="offers" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
        <CardStatistic
          v-if="['admin', 'responsable', 'referent','referent_regional','tete_de_reseau','analyste','responsable_territoire'].includes($store.getters.contextRole)"
          :value="offers.missions_actives"
          :title="`${$options.filters.pluralize(offers.missions_actives, 'Mission en ligne', 'Missions en ligne', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(offers.missions)} ${$options.filters.pluralize(offers.missions, 'mission', 'missions', false)}`"
          link="/admin/numbers/missions"
        />
        <CardStatistic
          :value="offers.places_left"
          :title="`${$options.filters.pluralize(offers.places_left, 'Place restante', 'Places restantes', false)}`"
          :subtitle="`sur ${$options.filters.formatNumber(offers.places)} proposées`"
        />
        <CardStatistic :value="`${offers.places_occupation_rate}%`" title="Taux de remplissage" :gauge-percentage="offers.places_occupation_rate" />
      </div>
    </Box>
  </div>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
import FiltersNumbers from '@/components/custom/FiltersNumbers'

export default {
  components: {
    CardStatistic,
    FiltersNumbers
  },
  layout: 'admin-numbers',
  middleware: 'authenticated',
  data () {
    return {
      statistics: null,
      loadingStatistics: true,
      offers: null,
      loadingOffers: true
    }
  },
  async fetch () {
    // a checker avec await
    await Promise.all([
      this.getNumbersGlobal(),
      this.getNumbersOffer()
    ])
  },
  methods: {
    async getNumbersGlobal () {
      this.loadingStatistics = true
      await this.$axios.get('/numbers/global', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingStatistics = false
        this.statistics = response.data
      })
    },
    async getNumbersOffer () {
      this.loadingOffers = true
      await this.$axios.get('/numbers/offers', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingOffers = false
        this.offers = response.data
      })
    }

  }
}
</script>

<style>

</style>
