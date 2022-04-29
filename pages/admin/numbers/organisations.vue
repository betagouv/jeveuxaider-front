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
          <Button variant="white" size="lg" icon="PlusIcon">
            @TODO sélection périodes
          </Button>
        </div>
      </template>
    </SectionHeading>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

export default {
  components: {
  },
  layout: 'admin-numbers',
  middleware: 'authenticated',
  data () {
    return {
      trendsParticipationsByOrganisations: null,
      loadingTrendsParticipationsByOrganisations: true,
      trendsParticipationsByReseaux: null,
      loadingTrendsParticipationsByReseaux: true
    }
  },
  async created () {
    await Promise.all([
      this.getNumbersTrendsParticipationsByOrganisations(),
      this.getNumbersTrendsParticipationsByReseaux()
    ])
  },
  methods: {
    getNumbersTrendsParticipationsByOrganisations () {
      this.$axios.get('/numbers/trends/participations-by-organisations?period=all').then((response) => {
        this.loadingTrendsParticipationsByOrganisations = false
        this.trendsParticipationsByOrganisations = response.data
      })
    },
    getNumbersTrendsParticipationsByReseaux () {
      this.$axios.get('/numbers/trends/participations-by-reseaux?period=all').then((response) => {
        this.loadingTrendsParticipationsByReseaux = false
        this.trendsParticipationsByReseaux = response.data
      })
    }

  }
}
</script>

<style>

</style>
