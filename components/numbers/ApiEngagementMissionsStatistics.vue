<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
    <BoxHeadingStatistics title="todo" class="mb-6" />

    <div>
      <div>
        <Table>
          <TableHead>
            <TableHeadCell>Période</TableHeadCell>
            <TableHeadCell>Trafic entrant</TableHeadCell>
            <TableHeadCell>Trafic sortant</TableHeadCell>
            <TableHeadCell>Candidatures entrantes</TableHeadCell>
            <TableHeadCell>Candidatures sortantes</TableHeadCell>
            <TableHeadCell>Performance</TableHeadCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableRowCell>Septembre 2022</TableRowCell>
              <TableRowCell>1111</TableRowCell>
              <TableRowCell>222</TableRowCell>
              <TableRowCell>1234</TableRowCell>
              <TableRowCell>454</TableRowCell>
              <TableRowCell>4.64%</TableRowCell>
            </TableRow>
            <TableRow>
              <TableRowCell>Aout 2022</TableRowCell>
              <TableRowCell>1111</TableRowCell>
              <TableRowCell>222</TableRowCell>
              <TableRowCell>1234</TableRowCell>
              <TableRowCell>454</TableRowCell>
              <TableRowCell>4.64%</TableRowCell>
            </TableRow>
            <TableRow>
              <TableRowCell>Juillet 2022</TableRowCell>
              <TableRowCell>1111</TableRowCell>
              <TableRowCell>222</TableRowCell>
              <TableRowCell>1234</TableRowCell>
              <TableRowCell>454</TableRowCell>
              <TableRowCell>4.64%</TableRowCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <!-- <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="statistics.missions"
        :title="`${$options.filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions, 'créée', 'créées', false)}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions créées sur la période"
      />
      <CardStatistic
        :value="statistics.missions_validated_and_over"
        :title="`${$options.filters.pluralize(statistics.missions_validated_and_over, 'Mission', 'Missions', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_validated_and_over, 'validée ou terminée', 'validées ou terminées', false)}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions créées sur la période, qui sont validées ou bien terminées"
      />
      <CardStatistic
        :value="`${statistics.missions_conversion_rate}%`"
        title="Taux de conversion"
        :gauge-percentage="statistics.missions_conversion_rate"
        infos-bulle="Correspond au ratio entre le nombre de missions créées et le nombre de missions validées ou terminées sur la période"
      />
      <CardStatistic
        class="col-start-1"
        :value="statistics.missions_participations_max_sum"
        :title="`${$options.filters.pluralize(statistics.missions_participations_max_sum, 'Place', 'Places', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_participations_max_sum, 'proposée', 'proposées', false)}`"
        infos-bulle="Correspond aux places proposées sur la période sur des missions, qui ont été validées ou bien terminées"
      />
      <CardStatistic
        :value="statistics.missions_snu"
        :title="`${$options.filters.pluralize(statistics.missions_snu, 'Mission SNU-MIG', 'Missions SNU-MIG', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_snu, 'créée', 'créées', false)}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions proposées en MIG créées sur la période, qui sont validées ou bien terminées"
      />
      <CardStatistic
        :value="statistics.missions_snu_participations_max_sum"
        :title="`${$options.filters.pluralize(statistics.missions_snu_participations_max_sum, 'Place SNU-MIG', 'Places SNU-MIG', false)}`"
        :subtitle="`${$options.filters.pluralize(statistics.missions_snu_participations_max_sum, 'proposée', 'proposées', false)}`"
        infos-bulle="Correspond aux places proposées en MIG sur la période, pour des missions validées ou bien terminées"
      />
    </div> -->
  </Box>
</template>

<script>
// import CardStatistic from '@/components/card/CardStatistic'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default {
  components: {
    // CardStatistic,
    BoxHeadingStatistics
  },
  data () {
    return {
      loading: true,
      statistics: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/api-engagement/missions', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      console.log('/statistics/api-engagement/missions', response.data)
      this.statistics = response.data
    })
  }
}

</script>
