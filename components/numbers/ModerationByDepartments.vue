<template>
  <div>
    <Table v-if="items">
      <TableHead>
        <TableHeadCell>#</TableHeadCell>
        <TableHeadCell>
          Nom
        </TableHeadCell>
        <TableHeadCell center>
          Organisations
        </TableHeadCell>
        <TableHeadCell center>
          Missions
        </TableHeadCell>
      </TableHead>
      <TableBody>
        <TableRow
          v-for="item,i in items"
          :key="item.id"
          class="cursor-pointer"
        >
          <TableRowCell
            center
            style="max-width: 20px"
          >
            <div class="text-lg font-semibold text-gray-500">
              {{ i+1 }}.
            </div>
          </TableRowCell>
          <TableRowCell
            style="max-width: 200px"
          >
            <div class="font-medium text-gray-900 truncate">
              {{ item.department | label('departments') }}
            </div>
            <div class="text-gray-500">
              {{ item.department }}
            </div>
          </TableRowCell>
          <TableRowCell center>
            <div class="font-medium text-gray-900 truncate">
              {{ item.organisations_count }}
            </div>
            <div class="text-gray-500">
              à traiter
            </div>
          </TableRowCell>
          <TableRowCell center>
            <div class="font-medium text-gray-900 truncate">
              {{ item.missions_count }}
            </div>
            <div class="text-gray-500">
              à traiter
            </div>
          </TableRowCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      loading: true,
      items: null

    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/moderation-by-departments', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  }
}
</script>

<style>

</style>
