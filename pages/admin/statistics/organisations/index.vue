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
      <!-- <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template> -->
    </BaseSectionHeading>

    <div class="space-y-12">
      <OrganisationsStatistics ref="organisationsStatistics" />
      <BaseHeading as="h2" :level="2"> L’activité des organisations en détail </BaseHeading>
      <OrganisationsByDate ref="organisationsByDate" />
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <OrganisationsByStates ref="organisationsByStates" />
          <OrganisationsByTypes ref="organisationsByTypes" />
          <ParticipationsRefusedByResponsables ref="participationsRefusedByResponsables" />
        </div>
        <div class="space-y-12 w-1/2">
          <OrganisationsByDomaines ref="organisationsByDomaines" />
          <OrganisationsByReseaux ref="organisationsByReseaux" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
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
    // FiltersStatistics,
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
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.organisationsByDate.fetch()
      this.$refs.organisationsStatistics.fetch()
      this.$refs.organisationsByStates.fetch()
      this.$refs.organisationsByTypes.fetch()
      this.$refs.participationsRefusedByResponsables.fetch()
      this.$refs.organisationsByDomaines.fetch()
      this.$refs.organisationsByReseaux.fetch()
    },
  },
})
</script>

<style></style>
