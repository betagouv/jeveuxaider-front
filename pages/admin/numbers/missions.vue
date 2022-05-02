<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Missions' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Missions"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersNumbers @refetch="$fetch" />
        </div>
      </template>
    </SectionHeading>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Box padding="sm" :loading="loadingTrendsMissionsByActivities" loading-text="Récupération des activités...">
        <Heading as="h2" :level="3" class="mb-4">
          Par activités
        </Heading>
        <StackedList v-if="trendsMissionsByActivities" :divided="false">
          <StackedListItem
            v-for="activity, i in trendsMissionsByActivities"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/missions?filter[ofActivity]=${activity.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="activity.name" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(activity.count, 'mission', 'missions') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>

      <Box padding="sm" :loading="loadingTrendsMissionsByDepartments" loading-text="Récupération des départements...">
        <Heading as="h2" :level="3" class="mb-4">
          Par départements
        </Heading>
        <StackedList v-if="trendsMissionsByDepartments" :divided="false">
          <StackedListItem
            v-for="department, i in trendsMissionsByDepartments"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/missions?filter[ofDepartment]=${department.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="department.name" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(department.count, 'mission', 'missions') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
      <Box padding="sm" :loading="loadingTrendsMissionsByMissionTemplates" loading-text="Récupération des modèles de mission..." class="col-span-2">
        <Heading as="h2" :level="3" class="mb-4">
          Par modèles de missions
        </Heading>
        <StackedList v-if="trendsMissionsByMissionTemplates" :divided="false">
          <StackedListItem
            v-for="missionTemplate, i in trendsMissionsByMissionTemplates"
            :key="i"
            :icon="`${(i+1)}.`"
            icon-class="text-xl font-semibold text-gray-500"
            :link="`/admin/missions?filter[ofTemplate]=${missionTemplate.id}`"
          >
            <div class="text-gray-900 font-semibold" v-html="missionTemplate.title" />
            <div class="text-gray-500 text-sm">
              {{ $options.filters.pluralize(missionTemplate.count, 'mission', 'missions') }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
    </div>
  </div>
</template>

<script>
import FiltersNumbers from '@/components/custom/FiltersNumbers'

export default {
  components: {
    FiltersNumbers
  },
  layout: 'admin-numbers',
  middleware: 'authenticated',
  data () {
    return {
      trendsMissionsByActivities: null,
      loadingTrendsMissionsByActivities: true,
      trendsMissionsByMissionTemplates: null,
      loadingTrendsMissionsByMissionTemplates: true,
      trendsMissionsByDepartments: null,
      loadingTrendsMissionsByDepartments: true
    }
  },
  async fetch () {
    await Promise.all([
      this.getNumbersTrendsMissionsByActivities(),
      this.getNumbersTrendsMissionsByMissionTemplates(),
      this.getNumbersTrendsMissionsByDepartments()
    ])
  },
  methods: {
    async getNumbersTrendsMissionsByActivities () {
      await this.$axios.get('/numbers/trends/missions-by-activities',
        {
          params: this.$store.state.numbers.params
        }).then((response) => {
        this.loadingTrendsMissionsByActivities = false
        this.trendsMissionsByActivities = response.data
      })
    },
    async getNumbersTrendsMissionsByMissionTemplates () {
      await this.$axios.get('/numbers/trends/missions-by-mission-templates', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingTrendsMissionsByMissionTemplates = false
        this.trendsMissionsByMissionTemplates = response.data
      })
    },
    async getNumbersTrendsMissionsByDepartments () {
      await this.$axios.get('/numbers/trends/missions-by-departments', {
        params: this.$store.state.numbers.params
      }).then((response) => {
        this.loadingTrendsMissionsByDepartments = false
        this.trendsMissionsByDepartments = response.data
      })
    }

  }
}
</script>

<style>

</style>
