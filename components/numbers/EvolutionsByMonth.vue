<template>
  <div class="space-y-12">
    <div v-for="(year, i) in years" :key="i">
      <h2 class="text-3xl font-semibold mb-6">
        {{ year }}
      </h2>
      <BaseTable>
        <BaseTableHead>
          <BaseTableHeadCell>Période</BaseTableHeadCell>
          <BaseTableHeadCell v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
            >Utilisateurs inscrits</BaseTableHeadCell
          >
          <BaseTableHeadCell v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
            >Structures validées</BaseTableHeadCell
          >
          <BaseTableHeadCell>Missions postées</BaseTableHeadCell>
          <BaseTableHeadCell>Mises en relation</BaseTableHeadCell>
          <BaseTableHeadCell>Participations validées</BaseTableHeadCell>
          <BaseTableHeadCell v-if="['admin'].includes($stores.auth.contextRole)">
            Taux de conversion
          </BaseTableHeadCell>
          <BaseTableHeadCell />
        </BaseTableHead>
        <BaseTableBody>
          <BaseTableRow v-for="(item, y) in resultsFilteredByYear(year)" :key="y">
            <BaseTableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ $dayjs(item.created_at).format('MMMM') }}
              </span>
            </BaseTableRowCell>
            <BaseTableRowCell v-if="['admin', 'referent'].includes($stores.auth.contextRole)">
              <div class="flex space-x-2 items-center">
                <span>{{ $numeral(item.profiles_total) }}</span>
                <PercentageVariation
                  v-if="item.profiles_total_variation"
                  :value="item.profiles_total_variation"
                />
              </div>
            </BaseTableRowCell>
            <BaseTableRowCell v-if="['admin', 'referent'].includes($stores.auth.contextRole)">
              <div class="flex space-x-2 items-center">
                <span>{{ $numeral(item.structures_validated) }}</span>
                <PercentageVariation
                  v-if="item.structures_validated_variation"
                  :value="item.structures_validated_variation"
                />
              </div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ $numeral(item.missions_posted) }}</span>
                <PercentageVariation
                  v-if="item.missions_posted_variation"
                  :value="item.missions_posted_variation"
                />
              </div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ $numeral(item.participations_total) }}</span>
                <PercentageVariation
                  v-if="item.participations_total_variation"
                  :value="item.participations_total_variation"
                />
              </div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="flex space-x-2 items-center">
                <span>{{ $numeral(item.participations_validated) }}</span>
                <PercentageVariation
                  v-if="item.participations_validated_variation"
                  :value="item.participations_validated_variation"
                />
              </div>
            </BaseTableRowCell>
            <BaseTableRowCell v-if="['admin'].includes($stores.auth.contextRole)">
              <span v-if="item.participations_conversion" class="text-gray-600 font-semibold">
                {{ $numeral(item.participations_conversion) }}%
              </span>
              <span v-else>--</span>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <RiCloseLine
                v-if="selectedMonth"
                class="h-4 cursor-pointer hover:text-jva-blue-500"
                @click="toggleMonth(item.month)"
              />
              <MagnifyingGlassIcon
                v-else
                class="h-4 cursor-pointer hover:text-jva-blue-500"
                @click="toggleMonth(item.month)"
              />
            </BaseTableRowCell>
          </BaseTableRow>
        </BaseTableBody>
      </BaseTable>
    </div>
  </div>
</template>

<script>
import PercentageVariation from '@/components/custom/PercentageVariation.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

export default defineNuxtComponent({
  components: {
    PercentageVariation,
    MagnifyingGlassIcon,
  },
  data() {
    return {
      loading: true,
      missions: null,
      participations: null,
      users: null,
      structures: null,
      selectedMonth: null,
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    years() {
      const years = []
      for (let year = 2020; year <= this.$dayjs().year(); year++) {
        years.push(year)
      }
      return years.reverse()
    },
    results() {
      return Object.values(
        _merge(
          _keyBy(this.missions, 'created_at'),
          _keyBy(this.structures, 'created_at'),
          _keyBy(this.participations, 'created_at'),
          _keyBy(this.users, 'created_at')
        )
      )
    },
  },
  methods: {
    async fetch() {
      this.loading = true

      await Promise.all([
        this.fetchStructuresByMonth(),
        this.fetchMissionsByMonth(),
        this.fetchUsersByMonth(),
        this.fetchParticipationsByMonth(),
      ]).finally(() => {
        this.loading = false
      })
    },
    resultsFilteredByYear(year) {
      if (this.selectedMonth) {
        return this.results.filter((item) => item.year == year && item.month == this.selectedMonth)
      }
      return this.results.filter((item) => item.year == year)
    },
    toggleMonth(month) {
      if (!this.selectedMonth) {
        this.selectedMonth = month
      } else {
        this.selectedMonth = null
      }
    },
    async fetchStructuresByMonth() {
      if (['responsable', 'tete_de_reseau'].includes(this.$stores.auth.contextRole)) {
        this.structures = []
      } else {
        await apiFetch('/statistics/structures-by-month', {
          params: this.$route.query,
        }).then((response) => {
          this.structures = response
        })
      }
    },
    async fetchMissionsByMonth() {
      await apiFetch('/statistics/missions-by-month', {
        params: this.$route.query,
      }).then((response) => {
        this.missions = response
      })
    },
    async fetchUsersByMonth() {
      if (['responsable', 'tete_de_reseau'].includes(this.$stores.auth.contextRole)) {
        this.users = []
      } else {
        await apiFetch('/statistics/users-by-month', {
          params: this.$route.query,
        }).then((response) => {
          this.users = response
        })
      }
    },
    async fetchParticipationsByMonth() {
      await apiFetch('/statistics/participations-by-month', {
        params: this.$route.query,
      }).then((response) => {
        this.participations = response
      })
    },
  },
})
</script>
