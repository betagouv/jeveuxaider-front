<template>
  <div v-if="statistics" class="">
    <Box padding="sm" :loading="loading" loading-text="Récupération des partenaires..." class="">
      <BoxHeadingStatistics title="Vue détaillée du trafic sortant" class="mb-6" />
      <Table>
        <TableHead>
          <TableHeadCell>Noms</TableHeadCell>
          <TableHeadCell>Redirections</TableHeadCell>
          <TableHeadCell>Candidatures</TableHeadCell>
        </TableHead>
        <TableBody>
          <TableRow v-for="item,y in results" :key="y">
            <TableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ item.name }}
              </span>
            </TableRowCell>
            <TableRowCell>
              <span>{{ item.redirections|formatNumber }}</span>
            </TableRowCell>
            <TableRowCell>
              <span> {{ item.applications|formatNumber }}</span>
            </TableRowCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  </div>
</template>

<script>
import _ from 'lodash'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics'

export default {
  components: {
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

    await this.$axios.get('/statistics/overview-api-engagement-sortant-details', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  },
  computed: {
    results () {
      return Object.values(_.merge(
        _.keyBy(this.statistics.redirections, 'name'),
        _.keyBy(this.statistics.applications, 'name')
      ))
    }
  }
}
</script>
