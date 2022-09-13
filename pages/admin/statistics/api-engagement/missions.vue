<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'API Engagement' },
          { label: 'Missions' },
        ]"
      />
    </portal>

    <SectionHeading
      title="API Engagement"
    >
      <!-- <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template> -->
    </SectionHeading>

    <div class="space-y-12">
      <Table>
        <TableHead>
          <TableHeadCell>Période</TableHeadCell>
          <TableHeadCell>Trafic</TableHeadCell>
          <TableHeadCell>Candidatures</TableHeadCell>
          <TableHeadCell>Performance</TableHeadCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableRowCell>Septembre 2022</TableRowCell>
            <TableRowCell>
              <div class="flex space-x-2 items-center">
                <span class="text-xs text-gray-800">Entrant</span>
                <span>1444</span>
                <span class="text-xs text-red-800">-3%</span>
              </div>
              <div class="flex space-x-2">
                <span class="text-xs text-gray-800">Sortant</span>
                <span>245</span>
                <span class="text-xs text-green-800">+1%</span>
              </div>
            </TableRowCell>
            <TableRowCell>
              <div class="flex space-x-2 items-center">
                <span class="text-xs text-gray-800">Entrant</span>
                <span>456</span>
                <span class="text-xs text-red-800">-3%</span>
              </div>
              <div class="flex space-x-2">
                <span class="text-xs text-gray-800">Sortant</span>
                <span>124</span>
                <span class="text-xs text-green-800">+1%</span>
              </div>
            </TableRowCell>
            <TableRowCell>4.64%</TableRowCell>
          </TableRow>
        </TableBody>
      </Table>
      <!-- <ApiEngagementMissionsStatistics ref="missionsStatistics" /> -->
    </div>
  </div>
</template>

<script>
// import FiltersStatistics from '@/components/custom/FiltersStatistics'
// import ApiEngagementMissionsStatistics from '@/components/numbers/ApiEngagementMissionsStatistics.vue'

export default {
  components: {
    // FiltersStatistics,
    // ApiEngagementMissionsStatistics
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  created () {
    fetch(
      'https://api.api-engagement.beta.gouv.fr/v0/view/stats?createdAt=gt:2022-04-25&createdAt=lt:2022-05-25&toPublisherId=5f5931496c7ea514150a818f&type=click',
      {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          apiKey: '73b5c238_2b8b_4cb5_8851_94e1cac58123'
        }
      }
    ).then(response => response.json())
      .then((data) => {
        console.log('data', data)
        console.log('data.total', data.total)
        console.log('data.facets', data.facets)
      })
  },
  methods: {
    refetch () {
      this.$refs.missionsStatistics.$fetch()
    }
  }
}
</script>

<style>

</style>
