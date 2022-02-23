<template>
  <ContainerRightSidebar>
    <DrawerMission :mission-id="drawerMissionId" @close="drawerMissionId = null" @updated="$fetch()" />
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Missions' }]"
      />
    </template>
    <template #sidebar>
      <div class="flex flex-col gap-y-4 sticky top-8">
        <InputAutocomplete
          v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
          :value="$route.query['filter[structure.name]']"
          icon="SearchIcon"
          name="autocomplete"
          placeholder="Organisation"
          :options="autocompleteOptionsOrga"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsOrga"
          @selected="changeFilter('filter[structure.name]', $event ? $event.name : undefined)"
        />
        <SelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="department"
          placeholder="Département"
          :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
          :value="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[department]', $event)"
        />
        <SelectAdvanced
          :key="`domaine-${$route.fullPath}`"
          name="domaine"
          placeholder="Domaine d'action"
          :options="$labels.domaines"
          :value="$route.query['filter[domaine]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[domaine]', $event)"
        />
        <div class="flex space-x-4 mb-2">
          <Checkbox
            :key="`type-1-${$route.fullPath}`"
            :option="{key:'presentiel', label: 'Présentiel'}"
            :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'].includes('Mission en présentiel')"
            transparent
            variant="button"
            @change="changeFilter('filter[type]', 'Mission en présentiel', true)"
          />
          <Checkbox
            :key="`type-2-${$route.fullPath}`"
            :option="{key:'distance', label: 'À distance'}"
            :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'].includes('Mission à distance')"
            transparent
            variant="button"
            @change="changeFilter('filter[type]', 'Mission à distance', true)"
          />
        </div>
        <SelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Statut"
          :options="$labels.mission_workflow_states"
          :value="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
        <SelectAdvanced
          :key="`place-${$route.fullPath}`"
          name="place"
          placeholder="Place restante"
          :options="[{key: 'true', label: 'Oui'}, {key: 'false', label: 'Non'}]"
          :value="$route.query['filter[place]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[place]', $event)"
        />
        <SelectAdvanced
          :key="`publics_volontaires-${$route.fullPath}`"
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
      <SectionHeading
        :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
          queryResult.total,
          'mission',
          'missions',
          false
        )}`"
      >
        <template #action>
          <nuxt-link
            v-if="$store.getters.contextRole === 'responsable'"
            :to="`/admin/organisations/${$store.getters.currentRole.contextable_id}/missions/add`"
          >
            <Button icon="PlusIcon" size="lg">
              Publier une mission
            </Button>
          </nuxt-link>
        </template>
      </Sectionheading>
      <Input
        class="mt-8"
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
        <Checkbox
          :key="`toutes-${$route.fullPath}`"
          :option="{key: 'toutes', label:'Toutes'}"
          :is-checked="hasActiveFilters()"
          variant="button"
          size="xs"
          transparent
          @change="deleteAllFilters()"
        />
        <Checkbox
          v-if="['responsable'].includes($store.getters.contextRole)"
          :key="`responsable-id-${$route.fullPath}`"
          :option="{key: 'mes-missions', label:'Mes missions'}"
          :is-checked="$route.query['filter[responsable.id]'] && $route.query['filter[responsable.id]'] == $store.getters.profile.id"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[responsable.id]', $store.getters.profile.id)"
        />
        <Checkbox
          :key="`state-en-attente-validation-${$route.fullPath}`"
          :option="{key: 'en-attente-validation', label:'En attente de validation'}"
          :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == 'En attente de validation'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'En attente de validation')"
        />
        <Checkbox
          :key="`state-en-cours-traitement-${$route.fullPath}`"
          :option="{key: 'en-cours-traitement', label:'En cours de traitement'}"
          :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == 'En cours de traitement'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'En cours de traitement')"
        />
        <Checkbox
          :key="`available-${$route.fullPath}`"
          :option="{key: 'available', label:'En ligne'}"
          :is-checked="$route.query['filter[available]'] && $route.query['filter[available]'] == 'available'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[available]', 'available')"
        />
        <Checkbox
          v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
          :key="`snu-mig-${$route.fullPath}`"
          :option="{key: 'snu-mig', label:'SNU/MIG'}"
          :is-checked="$route.query['filter[publics_volontaires]'] && $route.query['filter[publics_volontaires]'] == 'Jeunes volontaires du Service National Universel'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[publics_volontaires]', 'Jeunes volontaires du Service National Universel')"
        />
        <Checkbox
          v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
          :key="`mineurs-${$route.fullPath}`"
          :option="{key: 'mineurs', label:'Ouverte aux mineurs'}"
          :is-checked="$route.query['filter[publics_volontaires]'] && $route.query['filter[publics_volontaires]'] == 'Mineurs'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[publics_volontaires]', 'Mineurs')"
        />
      </div>
      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardMission
          v-for="mission in queryResult.data"
          :key="mission.id"
          class="cursor-pointer"
          :mission="mission"
          show-state
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
import QueryBuilder from '@/mixins/query-builder'
import CardMission from '@/components/card/CardMission.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'

export default {
  components: {
    CardMission,
    DrawerMission
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'responsable', 'tete_de_reseau'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      endpoint: '/missions',
      queryParams: {
        include: 'template.photo,illustrations'
      },
      drawerMissionId: null,
      autocompleteOptionsOrga: []
    }
  },
  methods: {
    async onFetchSuggestionsOrga (value) {
      const res = await this.$axios.get('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20
        }
      })
      this.autocompleteOptionsOrga = res.data.data
    }
  }
}
</script>
