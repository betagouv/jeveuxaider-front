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
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
    </BaseSectionHeading>

    <div class="space-y-12">
      <OrganisationsStatistics ref="organisationsStatistics" />
      <BaseHeading as="h2" :level="2"> L’activité des organisations en détail </BaseHeading>
      <!-- <OrganisationsByDate ref="organisationsByDate" /> -->
      <div class="flex flex-col gap-12">
        <OrganisationsByPeriod ref="organisationsByPeriod" />
        <OrganisationsByStates ref="organisationsByStates" />
        <OrganisationsByTypes ref="organisationsByTypes" />
        <!-- <ParticipationsRefusedByResponsables ref="participationsRefusedByResponsables" /> -->
        <OrganisationsByDomaines ref="organisationsByDomaines" />
        <OrganisationsByReseaux
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
          ref="organisationsByReseaux"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrganisationsStatistics from '@/components/numbers/OrganisationsStatistics.vue'
import OrganisationsByDate from '@/components/numbers/OrganisationsByDate.vue'
import OrganisationsByPeriod from '@/components/numbers/OrganisationsByPeriod.vue'
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
    OrganisationsByPeriod,
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

    if (!['admin', 'referent', 'tete_de_reseau'].includes($stores.auth.contextRole)) {
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
  computed: {
    filters() {
      if (this.$stores.auth.contextRole === 'admin') {
        return ['department', 'daterange', 'reseau']
      }
      if (this.$stores.auth.contextRole === 'referent') {
        return ['daterange']
      }
      if (this.$stores.auth.contextRole === 'tete_de_reseau') {
        return ['daterange', 'department']
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        return ['daterange']
      }

      return []
    },
  },
  methods: {
    refetch() {
      this.$refs.organisationsByDate?.fetch()
      this.$refs.organisationsByPeriod?.fetch()
      this.$refs.organisationsStatistics?.fetch()
      this.$refs.organisationsByStates?.fetch()
      this.$refs.organisationsByTypes?.fetch()
      this.$refs.participationsRefusedByResponsables?.fetch()
      this.$refs.organisationsByDomaines?.fetch()
      this.$refs.organisationsByReseaux?.fetch()
    },
  },
})
</script>

<style></style>
