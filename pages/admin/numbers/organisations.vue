<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Organisations' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Organisations"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersNumbers @refetch="$fetch" />
        </div>
      </template>
    </SectionHeading>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Box padding="sm" :loading="loadingStatistics" loading-text="Récupération des statistiques..." class="lg:col-span-2">
        <Heading as="h2" :level="3" class="mb-4">
          Statistiques globales
        </Heading>
        <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
          <CardStatistic
            :value="statistics.associations_actives"
            :title="`${$options.filters.pluralize(statistics.associations_actives, 'Association active', 'Associations actives', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.associations)}`"
            link="/admin/numbers/organisations"
          />
          <CardStatistic
            :value="statistics.collectivites_actives"
            :title="`${$options.filters.pluralize(statistics.collectivites_actives, 'Collectivité active', 'Collectivités actives', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.collectivites)}`"
            link="/admin/numbers/organisations"
          />
          <CardStatistic
            :value="statistics.organisations_publiques_actives"
            :title="`${$options.filters.pluralize(statistics.organisations_publiques_actives, 'Orga. publique active', 'Orgas. publiques actives', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations_publiques)}`"
            link="/admin/numbers/organisations"
          />
          <CardStatistic
            :value="statistics.organisations_privees_actives"
            :title="`${$options.filters.pluralize(statistics.organisations_privees_actives, 'Orga. privée active', 'Orgas. privées actives', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations_privees)}`"
            link="/admin/numbers/organisations"
          />
        </div>
      </Box>

      <Box padding="sm" :loading="loadingOrganisationsByStates" loading-text="Récupération des statistiques..." class="lg:col-span-2">
        <Heading as="h2" :level="3" class="mb-4">
          Par statuts
        </Heading>
        <div v-if="organisationsByStates" class="">
          <div class="">
            Brouillon: {{ organisationsByStates.draft }}
          </div>
          <div class="">
            En attente de validation: {{ organisationsByStates.waiting }}
          </div>
          <div class="">
            En cours de traitement: {{ organisationsByStates.in_progress }}
          </div>
          <div class="">
            Validée: {{ organisationsByStates.validated }}
          </div>
          <div class="">
            Signalée: {{ organisationsByStates.signaled }}
          </div>
          <div class="">
            Désinscrite: {{ organisationsByStates.unsuscribed }}
          </div>
        </div>
      </Box>

      <Box padding="sm" :loading="loadingTrendsParticipationsByOrganisations" loading-text="Récupération des activités...">
        <Heading as="h2" :level="3" class="mb-4">
          Organisations les plus attractives
        </Heading>
        <StackedList v-if="trendsParticipationsByOrganisations" :divided="false">
          <StackedListItem
            v-for="organisation, i in trendsParticipationsByOrganisations"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/organisations/${organisation.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="organisation.name" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(organisation.count, 'participation', 'participations') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>

      <Box padding="sm" :loading="loadingTrendsParticipationsByReseaux" loading-text="Récupération des activités...">
        <Heading as="h2" :level="3" class="mb-4">
          Réseaux les plus attractifs
        </Heading>
        <StackedList v-if="trendsParticipationsByReseaux" :divided="false">
          <StackedListItem
            v-for="reseau, i in trendsParticipationsByReseaux"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/reseaux/${reseau.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="reseau.name" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(reseau.count, 'participation', 'participations') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
    </div>
  </div>
</template>

<script>
import FiltersNumbers from '@/components/custom/FiltersNumbers'
import CardStatistic from '@/components/card/CardStatistic'

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
      loadingStatistics: null,
      organisationsByStates: null,
      loadingOrganisationsByStates: true,
      trendsParticipationsByOrganisations: null,
      loadingTrendsParticipationsByOrganisations: true,
      trendsParticipationsByReseaux: null,
      loadingTrendsParticipationsByReseaux: true
    }
  },
  async fetch () {
    await Promise.all([
      this.getNumbersOrganisationsGlobal(),
      this.getNumbersOrganisationsByStates(),
      this.getNumbersTrendsParticipationsByOrganisations(),
      this.getNumbersTrendsParticipationsByReseaux()
    ])
  },
  methods: {
    async getNumbersOrganisationsGlobal () {
      this.loadingStatistics = true
      await this.$axios.get('/numbers/global/organisations', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingStatistics = false
        this.statistics = response.data
      })
    },
    async getNumbersOrganisationsByStates () {
      this.loadingOrganisationsByStates = true
      await this.$axios.get('/numbers/organisations-by-states', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingOrganisationsByStates = false
        this.organisationsByStates = response.data
      })
    },
    async getNumbersTrendsParticipationsByOrganisations () {
      await this.$axios.get('/numbers/trends/participations-by-organisations', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingTrendsParticipationsByOrganisations = false
        this.trendsParticipationsByOrganisations = response.data
      })
    },
    async getNumbersTrendsParticipationsByReseaux () {
      await this.$axios.get('/numbers/trends/participations-by-reseaux', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingTrendsParticipationsByReseaux = false
        this.trendsParticipationsByReseaux = response.data
      })
    }

  }
}
</script>

<style>

</style>
