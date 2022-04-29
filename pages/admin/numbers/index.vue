<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Plus de chiffres"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button variant="white" size="lg" icon="PlusIcon">
            @TODO sélection périodes
          </Button>
        </div>
      </template>
    </SectionHeading>

    <div v-if="global" class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
      <CardStatistic
        :value="global.participations.total"
        :title="`${$options.filters.pluralize(global.participations.total, 'participation', 'participations', false)}`"
        :subtitle="`+${global.participations.current_period} sur la période`"
        :gauge-percentage="75"
      />
      <CardStatistic
        :value="global.missions.total"
        :title="`${$options.filters.pluralize(global.missions.total, 'mission', 'missions', false)}`"
        :subtitle="`+${global.missions.current_period} sur la période`"
      />
      <CardStatistic
        :value="global.organisations.total"
        :title="`${$options.filters.pluralize(global.organisations.total, 'organisation', 'organisations', false)}`"
        :subtitle="`+${global.organisations.current_period} sur la période`"
      />
      <CardStatistic
        :value="global.users.total"
        :title="`${$options.filters.pluralize(global.users.total, 'utilisateurs', 'utilisateurs', false)}`"
        :subtitle="`+${global.users.current_period} sur la période`"
      />
    </div>

    <Heading as="h2" :level="2">
      Tendances des participations
    </Heading>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Box padding="sm" :loading="loadingTrendsParticipationsByActivities" loading-text="Récupération des activités ...">
        <Heading as="h2" :level="3" class="mb-4">
          Par activités
        </Heading>
        <StackedList v-if="trendsParticipationsByActivities" :divided="false">
          <StackedListItem
            v-for="activity, i in trendsParticipationsByActivities"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/participations?filter[ofActivity]=${activity.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="activity.name" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(activity.count, 'participation', 'participations') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
      <Box padding="sm" :loading="loadingTrendsParticipationsByDepartments" loading-text="Récupération des départements ...">
        <Heading as="h2" :level="3" class="mb-4">
          Par départements
        </Heading>
        <StackedList v-if="trendsParticipationsByDepartments" :divided="false">
          <StackedListItem
            v-for="department, i in trendsParticipationsByDepartments"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/participations?filter[ofDepartment]=${department.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="department.name" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(department.count, 'participation', 'participations') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
    </div>
  </div>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'

export default {
  components: {
    CardStatistic
  },
  layout: 'admin-numbers',
  middleware: 'authenticated',
  data () {
    return {
      global: null,
      loadingGlobal: true,
      trendsParticipationsByActivities: null,
      loadingTrendsParticipationsByActivities: true,
      trendsParticipationsByDepartments: null,
      loadingTrendsParticipationsByDepartments: true
    }
  },
  async created () {
    await Promise.all([
      this.getNumbersGlobal(),
      this.getNumbersTrendsParticipationsByActivities(),
      this.getNumbersTrendsParticipationsByDepartments()
    ])
  },
  methods: {
    getNumbersGlobal () {
      this.$axios.get('/numbers/global?period=all').then((response) => {
        this.loadingGlobal = false
        this.global = response.data
      })
    },
    getNumbersTrendsParticipationsByActivities () {
      this.$axios.get('/numbers/trends/participations-by-activities?period=all').then((response) => {
        this.loadingTrendsParticipationsByActivities = false
        this.trendsParticipationsByActivities = response.data
      })
    },
    getNumbersTrendsParticipationsByDepartments () {
      this.$axios.get('/numbers/trends/participations-by-departments?period=all').then((response) => {
        this.loadingTrendsParticipationsByDepartments = false
        this.trendsParticipationsByDepartments = response.data
      })
    }

  }
}
</script>

<style>

</style>
