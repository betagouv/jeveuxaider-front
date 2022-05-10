<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres' },
          { label: 'Vue d\'ensemble' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Vue d'ensemble"
    />

    <StatisticsOffer ref="statisticsOffer" />
    <StatisticsGlobal ref="statisticsGlobal" />
  </div>
</template>

<script>
import StatisticsGlobal from '@/components/numbers/StatisticsGlobal'
import StatisticsOffer from '@/components/numbers/StatisticsOffer'

export default {
  components: {
    StatisticsGlobal,
    StatisticsOffer
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },

  methods: {
    refetch () {
      this.$refs.statisticsGlobal.$fetch()
      this.$refs.statisticsOffer.$fetch()
    }
  }
}
</script>

<style>

</style>
