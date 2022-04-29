<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Participations' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Participations"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button variant="white" size="lg" icon="PlusIcon">
            @TODO sélection périodes
          </Button>
        </div>
      </template>
    </SectionHeading>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Box padding="sm" :loading="loadingTrendsParticipationsByActivities" loading-text="Récupération des activités...">
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

      <Box padding="sm" :loading="loadingTrendsParticipationsByDepartments" loading-text="Récupération des départements...">
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
      <Box padding="sm" :loading="loadingTrendsParticipationsByMissionTemplates" loading-text="Récupération des modèles de mission..." class="col-span-2">
        <Heading as="h2" :level="3" class="mb-4">
          Par modèles de missions
        </Heading>
        <StackedList v-if="trendsParticipationsByMissionTemplates" :divided="false">
          <StackedListItem
            v-for="missionTemplate, i in trendsParticipationsByMissionTemplates"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/participations?filter[ofTemplate]=${missionTemplate.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="missionTemplate.title" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(missionTemplate.count, 'participation', 'participations') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  layout: 'admin-numbers',
  middleware: 'authenticated',
  data () {
    return {
      trendsParticipationsByActivities: null,
      loadingTrendsParticipationsByActivities: true,
      trendsParticipationsByMissionTemplates: null,
      loadingTrendsParticipationsByMissionTemplates: true,
      trendsParticipationsByDepartments: null,
      loadingTrendsParticipationsByDepartments: true
    }
  },
  async created () {
    await Promise.all([
      this.getNumbersTrendsParticipationsByActivities(),
      this.getNumbersTrendsParticipationsByMissionTemplates(),
      this.getNumbersTrendsParticipationsByDepartments()
    ])
  },
  methods: {
    getNumbersTrendsParticipationsByActivities () {
      this.$axios.get('/numbers/trends/participations-by-activities?period=all').then((response) => {
        this.loadingTrendsParticipationsByActivities = false
        this.trendsParticipationsByActivities = response.data
      })
    },
    getNumbersTrendsParticipationsByMissionTemplates () {
      this.$axios.get('/numbers/trends/participations-by-mission-templates?period=all').then((response) => {
        this.loadingTrendsParticipationsByMissionTemplates = false
        this.trendsParticipationsByMissionTemplates = response.data
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
