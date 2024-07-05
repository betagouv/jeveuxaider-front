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
      <template #action>
        <CustomFiltersStatisticsButton v-if="filters.length > 0" :filters="filters" />
      </template>
      <template #bottom>
        <CustomFiltersStatisticsActive v-if="filters.length > 0" :filters="filters" class="mt-4" />
      </template>
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
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    EvolutionsByYear,
    EvolutionsByMonth,
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
        return ['department']
      }
      if (this.$stores.auth.contextRole === 'referent') {
        return []
      }
      if (this.$stores.auth.contextRole === 'tete_de_reseau') {
        return ['department']
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        return ['department']
      }

      return []
    },
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
