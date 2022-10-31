<template>
  <div class="space-y-12">
    <div v-for="year,i in years" :key="i">
      <h2 class="text-3xl font-semibold mb-6">
        {{ year }}
      </h2>
      <Table>
        <TableHead>
          <TableHeadCell>Période</TableHeadCell>
          <TableHeadCell>Utilisateurs inscrits</TableHeadCell>
          <TableHeadCell>Structures validées</TableHeadCell>
          <TableHeadCell>Missions postées</TableHeadCell>
          <TableHeadCell>Mises en relation</TableHeadCell>
          <TableHeadCell>Participations validées</TableHeadCell>
          <TableHeadCell v-if="['admin'].includes($store.getters.contextRole)">
            Taux de conversion
          </TableHeadCell>
          <TableHeadCell />
        </TableHead>
        <TableBody>
          <TableRow v-for="item,y in resultsFilteredByYear(year)" :key="y">
            <TableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ $dayjs(item.created_at).format('MMMM') }}
              </span>
            </TableRowCell>
            <TableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ item.profiles_total|formatNumber }}</span>
                <PercentageVariation v-if="item.profiles_total_variation" :value="item.profiles_total_variation" />
              </div>
            </TableRowCell>
            <TableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ item.structures_validated|formatNumber }}</span>
                <PercentageVariation v-if="item.structures_validated_variation" :value="item.structures_validated_variation" />
              </div>
            </TableRowCell>
            <TableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ item.missions_posted|formatNumber }}</span>
                <PercentageVariation v-if="item.missions_posted_variation" :value="item.missions_posted_variation" />
              </div>
            </TableRowCell>
            <TableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ item.participations_total|formatNumber }}</span>
                <PercentageVariation v-if="item.participations_total_variation" :value="item.participations_total_variation" />
              </div>
            </TableRowCell>
            <TableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ item.participations_validated|formatNumber }}</span>
                <PercentageVariation v-if="item.participations_validated_variation" :value="item.participations_validated_variation" />
              </div>
            </TableRowCell>
            <TableRowCell v-if="['admin'].includes($store.getters.contextRole)">
              <span v-if="item.participations_conversion" class="text-gray-600 font-semibold">
                {{ item.participations_conversion|formatNumber }}%
              </span>
              <span v-else>--</span>
            </TableRowCell>
            <TableRowCell>
              <XIcon v-if="selectedMonth" class="h-4 cursor-pointer hover:text-jva-blue-500" @click="toggleMonth(item.month)" />
              <SearchIcon v-else class="h-4 cursor-pointer hover:text-jva-blue-500" @click="toggleMonth(item.month)" />
            </TableRowCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import PercentageVariation from '@/components/custom/PercentageVariation.vue'

export default {
  components: {
    PercentageVariation
  },
  data () {
    return {
      loading: true,
      missions: null,
      participations: null,
      users: null,
      structures: null,
      selectedMonth: null
    }
  },
  async fetch () {
    this.loading = true

    await Promise.all([
      this.fetchStructuresByMonth(),
      this.fetchMissionsByMonth(),
      this.fetchUsersByMonth(),
      this.fetchParticipationsByMonth()
    ]).finally(() => {
      this.loading = false
    })
  },
  computed: {
    years () {
      const years = []
      for (let year = 2020; year <= this.$dayjs().year(); year++) {
        years.push(year)
      }
      return years.reverse()
    },
    results () {
      return Object.values(_.merge(
        _.keyBy(this.missions, 'created_at'),
        _.keyBy(this.structures, 'created_at'),
        _.keyBy(this.participations, 'created_at'),
        _.keyBy(this.users, 'created_at')
      ))
    }
  },
  methods: {
    resultsFilteredByYear (year) {
      if (this.selectedMonth) {
        return this.results.filter(item => item.year == year && item.month == this.selectedMonth)
      }
      return this.results.filter(item => item.year == year)
    },
    toggleMonth (month) {
      if (!this.selectedMonth) {
        this.selectedMonth = month
      } else {
        this.selectedMonth = null
      }
    },
    async fetchStructuresByMonth () {
      await this.$axios.get('/statistics/structures-by-month', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.structures = response.data
      })
    },
    async fetchMissionsByMonth () {
      await this.$axios.get('/statistics/missions-by-month', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.missions = response.data
      })
    },
    async fetchUsersByMonth () {
      await this.$axios.get('/statistics/users-by-month', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.users = response.data
      })
    },
    async fetchParticipationsByMonth () {
      await this.$axios.get('/statistics/participations-by-month', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.participations = response.data
      })
    }
  }
}
</script>

<style>

</style>
