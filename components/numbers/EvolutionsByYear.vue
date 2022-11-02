<template>
  <div class="">
    <h2 class="text-3xl font-semibold mb-6">
      Par années
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
      </TableHead>
      <TableBody>
        <TableRow v-for="item,y in results" :key="y">
          <TableRowCell>
            <span class="capitalize text-gray-600 font-semibold">
              {{ item.year }}
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
        </TableRow>
      </TableBody>
    </Table>
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
      structures: null
    }
  },
  async fetch () {
    this.loading = true

    await Promise.all([
      this.fetchStructuresByYear(),
      this.fetchMissionsByYear(),
      this.fetchUsersByYear(),
      this.fetchParticipationsByYear()
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
    async fetchStructuresByYear () {
      await this.$axios.get('/statistics/structures-by-year', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.structures = response.data
      })
    },
    async fetchMissionsByYear () {
      await this.$axios.get('/statistics/missions-by-year', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.missions = response.data
      })
    },
    async fetchUsersByYear () {
      await this.$axios.get('/statistics/users-by-year', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.users = response.data
      })
    },
    async fetchParticipationsByYear () {
      await this.$axios.get('/statistics/participations-by-year', {
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
