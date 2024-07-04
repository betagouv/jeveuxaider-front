<template>
  <div>
    <h2 class="text-3xl font-semibold mb-6">Par années</h2>
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
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow v-for="(item, y) in results" :key="y">
          <BaseTableRowCell>
            <span class="capitalize text-gray-600 font-semibold">
              {{ item.year }}
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
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
  </div>
</template>

<script>
import PercentageVariation from '@/components/custom/PercentageVariation.vue'

export default defineNuxtComponent({
  components: {
    PercentageVariation,
  },
  data() {
    return {
      loading: true,
      missions: null,
      participations: null,
      users: null,
      structures: null,
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
        this.fetchStructuresByYear(),
        this.fetchMissionsByYear(),
        this.fetchUsersByYear(),
        this.fetchParticipationsByYear(),
      ]).finally(() => {
        this.loading = false
      })
    },
    async fetchStructuresByYear() {
      if (['responsable'].includes(this.$stores.auth.contextRole)) {
        this.structures = []
      } else {
        await apiFetch('/statistics/structures-by-year', {
          params: this.$route.query,
        }).then((response) => {
          this.structures = response
        })
      }
    },
    async fetchMissionsByYear() {
      await apiFetch('/statistics/missions-by-year', {
        params: this.$route.query,
      }).then((response) => {
        this.missions = response
      })
    },
    async fetchUsersByYear() {
      if (['responsable'].includes(this.$stores.auth.contextRole)) {
        this.users = []
      } else {
        await apiFetch('/statistics/users-by-year', {
          params: this.$route.query,
        }).then((response) => {
          this.users = response
        })
      }
    },
    async fetchParticipationsByYear() {
      await apiFetch('/statistics/participations-by-year', {
        params: this.$route.query,
      }).then((response) => {
        this.participations = response
      })
    },
  },
})
</script>
