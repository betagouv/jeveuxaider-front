<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Administration', to: ['admin'].includes(
            $store.getters.contextRole
          ) ? '/admin' : null },
          { text: 'Statistiques', to: '/admin/statistics' },
          { text: 'Indicateurs clés' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Indicateurs clés"
      secondary-title-bottom="Évolution des indicateurs avec leurs variations par rapport à l'année précédente"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics :filters="['department']" @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="space-y-12">
      <EvolutionsByYear ref="evolutionsByYear" />
      <EvolutionsByMonth ref="evolutionsByMonth" />
    </div>
  </div>
</template>

<script>
import EvolutionsByYear from '@/components/numbers/EvolutionsByYear.vue'
import EvolutionsByMonth from '@/components/numbers/EvolutionsByMonth.vue'
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    EvolutionsByYear,
    EvolutionsByMonth,
    FiltersStatistics,
    Breadcrumb
  },
  layout: 'statistics',
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
      this.$refs.evolutionsByYear.$fetch()
      this.$refs.evolutionsByMonth.$fetch()
    }
  }
}
</script>

<style>

</style>
