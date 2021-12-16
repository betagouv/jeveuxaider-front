<template>
  <ContainerRightSidebar>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Missions' }]"
      />
    </template>
    <template #sidebar>
      <div class="flex flex-col gap-y-4 sticky top-8">
        <div>
          Département<br>
          Domaine d’action<br>
          Type de mission<br>
          Statut<br>
          Places restantes<br>
          Proposé aux<br>
          Missions prioritaires (facultatif)<br>
        </div>
        <!-- <SelectAdvanced
          name="statut_juridique"
          placeholder="Statut juridique"
          :options="structure_legal_status"
          :value="$route.query['filter[statut_juridique]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[statut_juridique]', $event)"
        />
        <SelectAdvanced
          name="department"
          placeholder="Département"
          :options="departments"
          :value="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[department]', $event)"
        /> -->
      </div>
    </template>
    <div>
      <Heading as="h1" :level="1">
        {{ queryResult.total }} missions
      </Heading>
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
          :mission="mission"
        />
        <!-- <div v-for="mission in queryResult.data" :key="mission.id">
          <div class="flex justify-between font-gray-800">
            <div>{{ mission.id }} : {{ mission.name }}</div>
          </div>
        </div> -->
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
import QueryBuilder from '@/mixins/query-builder'
import labels from '@/utils/labels.json'
import CardMission from '@/components/card/CardMission.vue'

export default {
  components: {
    CardMission
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
      mission_states: labels.mission_workflow_states
    }
  }

}
</script>
