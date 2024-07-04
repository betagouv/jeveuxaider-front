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
            { text: 'Statistiques', to: '/admin/statistics' },
            { text: 'Indicateurs clés' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Indicateurs clés"
      secondary-title-bottom="Évolution des indicateurs avec leurs variations par rapport à l'année précédente"
    >
    </BaseSectionHeading>

    <div class="space-y-12">
      <EvolutionsByYear ref="evolutionsByYear" />
      <EvolutionsByMonth ref="evolutionsByMonth" />
    </div>
  </div>
</template>

<script>
import EvolutionsByYear from '@/components/numbers/EvolutionsByYear.vue'
import EvolutionsByMonth from '@/components/numbers/EvolutionsByMonth.vue'
// import FiltersStatistics from '@/components/custom/FiltersStatistics.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    EvolutionsByYear,
    EvolutionsByMonth,
    // FiltersStatistics,
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'statistics-admin',
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (
      !['admin', 'referent', 'tete_de_reseau', 'responsable'].includes($stores.auth.contextRole)
    ) {
      return showError({ statusCode: 403 })
    }
  },
  data() {
    return {}
  },
  methods: {
    refetch() {
      this.$refs.evolutionsByYear.fetch()
      this.$refs.evolutionsByMonth.fetch()
    },
  },
})
</script>

<style></style>
