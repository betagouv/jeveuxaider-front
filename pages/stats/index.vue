<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <DsfrBreadcrumb
          :links="[{ text: 'Statistiques', to: '/stats' }, { text: 'Vue d\'ensemble' }]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Vue d'ensemble">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatisticsPublic @refetch="refetch()" />
        </div>
      </template>
    </BaseSectionHeading>

    <BaseBox>
      <div class="space-y-2 text-gray-600 leading-6">
        <p>
          JeVeuxAider.gouv.fr est la plateforme publique du bénévolat, proposée par la Réserve
          Civique. Elle met en relation des individus qui souhaitent agir pour l’intérêt général
          avec des associations et organisations publiques qui ont besoin de bénévoles.
        </p>
        <p>
          JeVeuxAider.gouv.fr est ouvert à toute personne âgée de plus de 16 ans et résidant en
          France, souhaitant s’engager de façon bénévole et occasionnelle, sur tout le territoire.
          Fondée sur les valeurs de la République, JeVeuxAider.gouv.fr se mobilise pour construire
          une société plus résiliente et solidaire.
        </p>
        <p>
          Afin de suivre l’impact et l’activité de JeVeuxAider.gouv.fr, nous mettons à disposition
          les données disponibles ci-dessous, qui couvrent la période allant de mars 2020 à
          aujourd’hui, sur toute la France. Pour plus de précisions, il est possible de filtrer en
          fonction du département et de la date souhaitée.
        </p>
        <p>
          Vous avez une question ? L’équipe du Support Utilisateurs se tient à votre disposition
          pour y répondre !
        </p>
      </div>
    </BaseBox>

    <OverviewQuickGlance ref="overviewQuickGlance" />

    <BaseHeading as="h2" :level="2"> L’activité sur JeVeuxAider.gouv.fr en détail </BaseHeading>

    <OverviewParticipations ref="overviewParticipations" />
    <OverviewUtilisateurs ref="overviewUtilisateurs" />
    <OverviewOrganisations ref="overviewOrganisations" />
    <OverviewMissions ref="overviewMissions" />
    <OverviewPlaces ref="overviewPlaces" />
  </div>
</template>

<script>
import OverviewOrganisations from '@/components/statistics/OverviewOrganisations.vue'
import OverviewMissions from '@/components/statistics/OverviewMissions.vue'
import OverviewParticipations from '@/components/statistics/OverviewParticipations.vue'
import OverviewQuickGlance from '@/components/statistics/OverviewQuickGlance.vue'
import OverviewUtilisateurs from '@/components/statistics/OverviewUtilisateurs.vue'
import OverviewPlaces from '@/components/statistics/OverviewPlaces.vue'
// import OverviewAPIEngagement from '@/components/statistics/OverviewAPIEngagement.vue'
import FiltersStatisticsPublic from '@/components/custom/FiltersStatisticsPublic.vue'

export default defineNuxtComponent({
  components: {
    FiltersStatisticsPublic,
    OverviewQuickGlance,
    OverviewOrganisations,
    OverviewParticipations,
    OverviewMissions,
    OverviewUtilisateurs,
    OverviewPlaces,
    // OverviewAPIEngagement,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-public',
    })
  },
  methods: {
    refetch() {
      this.$refs.overviewQuickGlance.fetch()
      this.$refs.overviewParticipations.fetch()
      this.$refs.overviewUtilisateurs.fetch()
      this.$refs.overviewOrganisations.fetch()
      this.$refs.overviewMissions.fetch()
      this.$refs.overviewPlaces.fetch()
    },
  },
})
</script>

<style></style>
