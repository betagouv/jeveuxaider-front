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
            { text: 'Trafic sortant' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Trafic sortant"
      secondary-title-bottom="JeVeuxAider.gouv.fr diffuse les missions de bénévolat hébergées sur des plateformes partenaires, avec l’objectif d’optimiser leur visibilité. Le trafic sortant est donc le trafic généré par JeVeuxAider.gouv.fr vers les sites partenaires."
    >
      <template #action>
        <CustomFiltersStatisticsButton />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <OverviewApiEngagementSortant ref="apiEngagementStatisticSortant" />
      <OverviewApiEngagementSortantDetails ref="apiEngagementStatisticsSortantDetails" />
    </div>
  </div>
</template>

<script>
import OverviewApiEngagementSortant from '@/components/numbers/OverviewApiEngagementSortant.vue'
import OverviewApiEngagementSortantDetails from '@/components/numbers/OverviewApiEngagementSortantDetails.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    OverviewApiEngagementSortant,
    OverviewApiEngagementSortantDetails,
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
  methods: {
    refetch() {
      if (this.$refs.apiEngagementStatisticSortant) {
        this.$refs.apiEngagementStatisticSortant.fetch()
      }
      if (this.$refs.apiEngagementStatisticsSortantDetails) {
        this.$refs.apiEngagementStatisticsSortantDetails.fetch()
      }
    },
  },
})
</script>
