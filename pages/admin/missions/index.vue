<template>
  <ContainerRightSidebar>
    <Drawer :is-open="Boolean(drawerMissionId)" @close="drawerMissionId = null">
      <template #title>
        <Heading v-if="drawerMission" :level="3" class="text-jva-blue-500">
          {{ drawerMission.name }}
        </Heading>
      </template>
      <DrawerMission :mission-id="drawerMissionId" @loaded="drawerMission = $event" />
    </Drawer>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Missions' }]"
      />
    </template>
    <template #sidebar>
      <div class="flex flex-col gap-y-4 sticky top-8">
        <SelectAdvanced
          name="department"
          placeholder="Département"
          :options="departments"
          :value="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[department]', $event)"
        />
        <SelectAdvanced
          name="domaine"
          placeholder="Domaine d'action"
          :options="domaines"
          :value="$route.query['filter[domaine]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[domaine]', $event)"
        />
        <div class="flex space-x-6 mb-2">
          <Checkbox
            :option="{key:'presentiel', label: 'Présentiel'}"
            :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'].includes('Mission en présentiel')"
            @change="changeFilter('filter[type]', 'Mission en présentiel', true)"
          />
          <Checkbox
            :option="{key:'distance', label: 'À distance'}"
            :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'].includes('Mission à distance')"
            @change="changeFilter('filter[type]', 'Mission à distance', true)"
          />
        </div>
        <SelectAdvanced
          name="state"
          placeholder="Statut"
          :options="mission_states"
          :value="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
        <SelectAdvanced
          name="place"
          placeholder="Place restante"
          :options="[{key: true, label: 'Oui'}, {key: false, label: 'Non'}]"
          :value="$route.query['filter[place]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[place]', $event)"
        />
        <SelectAdvanced
          name="publics_volontaires"
          placeholder="Proposé aux"
          :options="[{key: 'Mineurs', label: 'Mineurs'}, {key: 'Jeunes volontaires du Service National Universel', label: 'Jeunes du SNU'}]"
          :value="$route.query['filter[publics_volontaires]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[publics_volontaires]', $event)"
        />
      </div>
    </template>
    <div>
      <Heading as="h1" :level="1">
        {{ queryResult.total | formatNumber }} missions
      </Heading>
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-6 text-sm flex-wrap">
        <Checkbox
          key="key"
          :option="{key: 1, label:'Solidarité et insertion'}"
          :is-checked="false"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'Brouillon')"
        />
        <Checkbox
          key="key"
          :option="{key: 1, label:'Solidarité et insertion'}"
          :is-checked="true"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'Brouillon')"
        />
        <Checkbox
          key="key"
          :option="{key: 1, label:'Solidarité et insertion'}"
          :is-checked="false"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'Brouillon')"
        />
      </div>
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-6 text-sm flex-wrap">
        <button :class="['px-4 py-1 flex-shrink-0', !$route.query['filter[state]'] ? 'shadow bg-white rounded-full text-gray-900 font-semibold' : 'text-gray-500 font-medium']" @click="deleteFilter('filter[state]')">
          Toutes
        </button>
        <button
          v-for="option in mission_states"
          :key="option.key"
          :class="['px-4 py-1 flex-shrink-0', $route.query['filter[state]'] && $route.query['filter[state]'] == option.key ? 'shadow bg-white rounded-full text-gray-900 font-semibold' : 'text-gray-500 font-medium']"
          @click="changeFilter('filter[state]', option.key)"
        >
          {{ option.label }}
        </button>
      </div>
      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardMission
          v-for="mission in queryResult.data"
          :key="mission.id"
          class="cursor-pointer"
          :mission="mission"
          @click.native="drawerMissionId = mission.id"
        />
      </div>

      <Pagination
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </ContainerRightSidebar>
</template>

<script>
import labels from '@/utils/labels.json'
import QueryBuilder from '@/mixins/query-builder'
import CardMission from '@/components/card/CardMission.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'

export default {
  components: {
    CardMission,
    DrawerMission
  },
  mixins: [QueryBuilder],
  layout: 'dashboard',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'responsable'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      endpoint: '/missions',
      mission_states: labels.mission_workflow_states,
      drawerMissionId: null,
      drawerMission: null,
      domaines: labels.domaines,
      departments: labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })
    }
  }

}
</script>
