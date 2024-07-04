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
            { text: 'Organisations' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Organisations">
      <template #action>
        <CustomFiltersStatisticsButton />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <OrganisationsStatistics ref="organisationsStatistics" />
      <BaseHeading as="h2" :level="2"> L’activité des organisations en détail </BaseHeading>
      <!-- <OrganisationsByDate ref="organisationsByDate" /> -->
      <div class="flex flex-col gap-12">
        <OrganisationsByStates ref="organisationsByStates" />
        <OrganisationsByTypes ref="organisationsByTypes" />
        <ParticipationsRefusedByResponsables ref="participationsRefusedByResponsables" />
        <OrganisationsByDomaines ref="organisationsByDomaines" />
        <OrganisationsByReseaux ref="organisationsByReseaux" />
      </div>
    </div>
  </div>
</template>

<script>
import OrganisationsStatistics from '@/components/numbers/OrganisationsStatistics.vue'
import OrganisationsByDate from '@/components/numbers/OrganisationsByDate.vue'
import OrganisationsByStates from '@/components/numbers/OrganisationsByStates.vue'
import OrganisationsByTypes from '@/components/numbers/OrganisationsByTypes.vue'
import OrganisationsByDomaines from '@/components/numbers/OrganisationsByDomaines.vue'
import OrganisationsByReseaux from '@/components/numbers/OrganisationsByReseaux.vue'
import ParticipationsRefusedByResponsables from '@/components/numbers/ParticipationsRefusedByResponsables.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    OrganisationsStatistics,
    OrganisationsByDate,
    OrganisationsByStates,
    OrganisationsByTypes,
    OrganisationsByDomaines,
    OrganisationsByReseaux,
    ParticipationsRefusedByResponsables,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (!['admin', 'referent'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
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
      if (this.$refs.organisationsByDate) {
        this.$refs.organisationsByDate.fetch()
      }
      if (this.$refs.organisationsStatistics) {
        this.$refs.organisationsStatistics.fetch()
      }
      if (this.$refs.organisationsByStates) {
        this.$refs.organisationsByStates.fetch()
      }
      if (this.$refs.organisationsByTypes) {
        this.$refs.organisationsByTypes.fetch()
      }
      if (this.$refs.participationsRefusedByResponsables) {
        this.$refs.participationsRefusedByResponsables.fetch()
      }
      if (this.$refs.organisationsByDomaines) {
        this.$refs.organisationsByDomaines.fetch()
      }
      if (this.$refs.organisationsByReseaux) {
        this.$refs.organisationsByReseaux.fetch()
      }
    },
  },
})
</script>

<style></style>
