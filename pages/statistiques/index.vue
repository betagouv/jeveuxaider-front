<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Statistiques', link: '/statistiques' },
          { label: 'Vue d\'ensemble' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Vue d'ensemble"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>
    <Box>
      <div class="space-y-2 text-gray-600 leading-6">
        <p>JeVeuxAider.gouv.fr est la plateforme publique du bénévolat, proposée par la Réserve Civique. Elle met en relation des individus qui souhaitent agir pour l’intérêt général avec des associations et organisations publiques qui ont besoin de bénévoles.</p>
        <p>JeVeuxAider.gouv.fr est ouvert à toute personne âgée de plus de 16 ans et résidant en France, souhaitant s’engager de façon bénévole et occasionnelle, sur tout le territoire. Fondée sur les valeurs de la République, JeVeuxAider.gouv.fr se mobilise pour construire une société plus résiliente et solidaire.</p>
        <p>Afin de suivre l’impact et l’activité de JeVeuxAider.gouv.fr, nous mettons à disposition les données disponibles ci-dessous, qui couvrent la période allant de mars 2020 à aujourd’hui, sur toute la France. Pour plus de précisions, il est possible de filtrer en fonction du département et de la date souhaitée.</p>
        <p>Vous avez une question ? L’équipe du Support Utilisateurs se tient à votre disposition pour y répondre !</p>
      </div>
    </Box>

    <OverviewQuickGlance ref="overviewQuickGlance" />

    <Heading as="h2" :level="2">
      L’activité sur JeVeuxAider.gouv.fr en détail
    </Heading>

    <OverviewParticipations ref="overviewParticipations" />
    <OverviewUtilisateurs ref="overviewUtilisateurs" />
    <OverviewOrganisations ref="overviewOrganisations" />
    <OverviewMissions ref="overviewMissions" />
    <OverviewPlaces ref="overviewPlaces" />
    <!-- <OverviewAPIEngagement ref="overviewAPIEngagement" /> -->
  </div>
</template>

<script>
import OverviewOrganisations from '@/components/statistics/OverviewOrganisations'
import OverviewMissions from '@/components/statistics/OverviewMissions'
import OverviewParticipations from '@/components/statistics/OverviewParticipations'
import OverviewQuickGlance from '@/components/statistics/OverviewQuickGlance'
import OverviewUtilisateurs from '@/components/statistics/OverviewUtilisateurs'
import OverviewPlaces from '@/components/statistics/OverviewPlaces'
// import OverviewAPIEngagement from '@/components/statistics/OverviewAPIEngagement'
import FiltersStatistics from '@/components/custom/FiltersStatistics'

export default {
  components: {
    FiltersStatistics,
    OverviewQuickGlance,
    OverviewOrganisations,
    OverviewParticipations,
    OverviewMissions,
    OverviewUtilisateurs,
    OverviewPlaces
    // OverviewAPIEngagement
  },
  layout: 'statistics-public',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.overviewQuickGlance.$fetch()
      this.$refs.overviewParticipations.$fetch()
      this.$refs.overviewUtilisateurs.$fetch()
      this.$refs.overviewOrganisations.$fetch()
      this.$refs.overviewMissions.$fetch()
      this.$refs.overviewPlaces.$fetch()
    }
  }
}
</script>

<style>

</style>
