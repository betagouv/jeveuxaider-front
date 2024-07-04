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
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <!-- <FiltersStatistics :filters="['daterange']" @refetch="refetch()" /> -->
        </div>
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <OverviewApiEngagementEntrant ref="apiEngagementStatisticsEntrant" />
      <OverviewApiEngagementEntrantDetails ref="apiEngagementStatisticsEntrantDetails" />
    </div>
  </div>
</template>

<script>
// import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import OverviewApiEngagementEntrant from '@/components/numbers/OverviewApiEngagementEntrant.vue'
import OverviewApiEngagementEntrantDetails from '@/components/numbers/OverviewApiEngagementEntrantDetails.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    // FiltersStatistics,
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
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.apiEngagementStatisticsEntrant.$fetch()
      this.$refs.apiEngagementStatisticsEntrantDetails.$fetch()
    },
  },
})
</script>
