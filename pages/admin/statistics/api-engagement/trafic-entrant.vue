<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            {
              text: 'Administration',
              to: ['admin'].includes($stores.auth.contextRole) ? '/admin' : null,
            },
            { text: 'Plus de chiffres', to: '/admin/statistics' },
            { text: 'API Engagement' },
            { text: 'Trafic entrant' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Trafic entrant"
      secondary-title-bottom="Les missions proposées sur JeVeuxAider.gouv.fr sont diffusées sur des plateformes partenaires, en vue d’optimiser leur visibilité. Le trafic entrant est donc le trafic reçu sur JeVeuxAider.gouv.fr grâce aux partenaires."
    >
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <OverviewApiEngagementEntrant ref="apiEngagementStatisticsEntrant" />
      <OverviewApiEngagementEntrantDetails ref="apiEngagementStatisticsEntrantDetails" />
    </div>
  </div>
</template>

<script>
import OverviewApiEngagementEntrant from '@/components/numbers/OverviewApiEngagementEntrant.vue'
import OverviewApiEngagementEntrantDetails from '@/components/numbers/OverviewApiEngagementEntrantDetails.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    OverviewApiEngagementEntrant,
    OverviewApiEngagementEntrantDetails,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['admin'],
    })
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.refetch()
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    filters() {
      if (this.$stores.auth.contextRole === 'admin') {
        return ['daterange']
      }
      if (this.$stores.auth.contextRole === 'referent') {
        return ['daterange']
      }
      return []
    },
  },
  methods: {
    refetch() {
      if (this.$refs.apiEngagementStatisticsEntrant) {
        this.$refs.apiEngagementStatisticsEntrant.fetch()
      }
      if (this.$refs.apiEngagementStatisticsEntrantDetails) {
        this.$refs.apiEngagementStatisticsEntrantDetails.fetch()
      }
    },
  },
})
</script>
