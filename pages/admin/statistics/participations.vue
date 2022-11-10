<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Plus de chiffres', to: '/admin/statistics' },
          { text: 'Participations' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Participations"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <ParticipationsStatistics ref="participationsStatistics" class="lg:col-span-2" />
      <Heading as="h2" :level="2">
        Les participations en détail
      </Heading>
      <ParticipationsByDate ref="participationsByDate" class="lg:col-span-2" />
      <client-only>
        <ParticipationsConversionByDate v-if="['admin'].includes($store.getters.contextRole)" ref="participationsConversionByDate" class="lg:col-span-2" />
      </client-only>
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="space-y-12 w-1/2">
          <ParticipationsByStates ref="participationsByStates" />
          <ParticipationsByActivities ref="participationsByActivities" />
          <ParticipationsByReseaux ref="participationsByReseaux" />
        </div>
        <div class="space-y-12 w-1/2">
          <ParticipationsByDomaines ref="participationsByDomaines" />
          <ParticipationsByOrganisations ref="participationsByOrganisations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ParticipationsStatistics from '@/components/numbers/ParticipationsStatistics.vue'
import ParticipationsByDate from '@/components/numbers/ParticipationsByDate.vue'
import ParticipationsByStates from '@/components/numbers/ParticipationsByStates.vue'
import ParticipationsByOrganisations from '@/components/numbers/ParticipationsByOrganisations.vue'
import ParticipationsByDomaines from '@/components/numbers/ParticipationsByDomaines.vue'
import ParticipationsByReseaux from '@/components/numbers/ParticipationsByReseaux.vue'
import ParticipationsByActivities from '@/components/numbers/ParticipationsByActivities.vue'
import ParticipationsConversionByDate from '~/components/numbers/ParticipationsConversionByDate.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    FiltersStatistics,
    ParticipationsStatistics,
    ParticipationsByDate,
    ParticipationsByStates,
    ParticipationsByOrganisations,
    ParticipationsByDomaines,
    ParticipationsByReseaux,
    ParticipationsByActivities,
    ParticipationsConversionByDate,
    Breadcrumb
  },
  layout: 'statistics',
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.participationsByDate.$fetch()
      this.$refs.participationsConversionByDate.$fetch()
      this.$refs.participationsStatistics.$fetch()
      this.$refs.participationsByStates.$fetch()
      this.$refs.participationsByDomaines.$fetch()
      this.$refs.participationsByOrganisations.$fetch()
      this.$refs.participationsByReseaux.$fetch()
      this.$refs.participationsByActivities.$fetch()
    }
  }
}
</script>

<style>

</style>
