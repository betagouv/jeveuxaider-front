<template>
  <ContainerRightSidebar>
    <!-- <Drawer :is-open="Boolean(drawerParticipationId)" @close="drawerParticipationId = null">
      <template #title>
        <Heading v-if="drawerParticipation" :level="3" class="text-jva-blue-500">
          <nuxt-link :to="`/admin/utilisateurs/${drawerParticipationId}`" class="hover:underline">
            {{ drawerParticipation.full_name }}
          </nuxt-link>
        </Heading>
      </template>
      <DrawerParticipation :profile-id="drawerParticipationId" @loaded="drawerParticipation = $event" />
    </Drawer> -->
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Participations' }]"
      />
    </template>
    <template #sidebar>
      <div class="flex flex-col gap-y-4 sticky top-8">
        <SelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Statut"
          :options="$labels.participation_workflow_states"
          :value="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
        <InputAutocomplete
          :value="$route.query['filter[mission.structure.name]']"
          icon="SearchIcon"
          name="autocomplete"
          placeholder="Organisation"
          :options="autocompleteOptionsOrga"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsOrga"
          @selected="changeFilter('filter[mission.structure.name]', $event ? $event.name : undefined)"
        />
        <InputAutocomplete
          :value="$route.query['filter[mission_id]']"
          icon="SearchIcon"
          name="autocomplete"
          placeholder="Mission"
          :options="autocompleteOptionsMission"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsMission"
          @selected="changeFilter('filter[mission_id]', $event ? $event.id : undefined)"
        />
        <SelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="mission.department"
          placeholder="Département"
          :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
          :value="$route.query['filter[mission.department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[mission.department]', $event)"
        />
        <Input
          name="mission.zip"
          placeholder="Code Postal"
          variant="transparent"
          :value="$route.query['filter[mission.zip]']"
          @input="changeFilter('filter[mission.zip]', $event)"
        />
        <div class="flex space-x-4 mb-2">
          <Checkbox
            :key="`type-1-${$route.fullPath}`"
            :option="{key:'presentiel', label: 'Présentiel'}"
            :is-checked="$route.query['filter[mission.type]'] && $route.query['filter[mission.type]'].includes('Mission en présentiel')"
            transparent
            variant="button"
            @change="changeFilter('filter[mission.type]', 'Mission en présentiel', true)"
          />
          <Checkbox
            :key="`type-2-${$route.fullPath}`"
            :option="{key:'distance', label: 'À distance'}"
            :is-checked="$route.query['filter[mission.type]'] && $route.query['filter[mission.type]'].includes('Mission à distance')"
            transparent
            variant="button"
            @change="changeFilter('filter[mission.type]', 'Mission à distance', true)"
          />
        </div>
      </div>
    </template>
    <div>
      <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} participations`">
        <template #action>
          <nuxt-link
            :to="`/admin/utilisateurs/add`"
            class="opacity-25"
          >
            <Button icon="DownloadIcon" size="lg">
              Exporter
            </Button>
          </nuxt-link>
        </template>
      </Sectionheading>
      <Input
        class="mt-8"
        name="search"
        placeholder="Recherche par prénom, nom ou e-mail"
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        @input="changeFilter('filter[search]', $event)"
      />
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
        <Checkbox
          :key="`tous-${$route.fullPath}`"
          :option="{key: 'tous', label:'Tous'}"
          :is-checked="hasActiveFilters()"
          variant="button"
          size="xs"
          transparent
          @change="deleteAllFilters()"
        />
        <Checkbox
          :key="`state-encoursvalidation-${$route.fullPath}`"
          :option="{key: 'En attente de validation', label:'En attente de validation'}"
          :is-checked="$route.query['filter[state]'] == 'En attente de validation'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'En attente de validation')"
        />
        <Checkbox
          :key="`state-encourstraitement-${$route.fullPath}`"
          :option="{key: 'En cours de traitement', label:'En cours de traitement'}"
          :is-checked="$route.query['filter[state]'] == 'En cours de traitement'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'En cours de traitement')"
        />
        <Checkbox
          :key="`state-validee-${$route.fullPath}`"
          :option="{key: 'Validée', label:'Validée'}"
          :is-checked="$route.query['filter[state]'] == 'Validée'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'Validée')"
        />
        <Checkbox
          :key="`state-cancel-${$route.fullPath}`"
          :option="{key: 'Annulée', label:'Annulée'}"
          :is-checked="$route.query['filter[state]'] == 'Annulée'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'Annulée')"
        />
        <Checkbox
          :key="`state-refus-${$route.fullPath}`"
          :option="{key: 'Refusée', label:'Refusée'}"
          :is-checked="$route.query['filter[state]'] == 'Refusée'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'Refusée')"
        />
      </div>
      <div class="my-6 space-y-4">
        <CardParticipation
          v-for="participation in queryResult.data"
          :key="participation.id"
          :participation="participation"
          @click.native="drawerParticipationId = participation.id"
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
import CardParticipation from '@/components/card/CardParticipation.vue'
// import DrawerParticipation from '@/components/drawer/DrawerParticipation.vue'

export default {
  components: {
    CardParticipation
    // DrawerParticipation
  },
  mixins: [QueryBuilder],
  layout: 'admin',
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
      endpoint: '/participations',
      queryParams: {
        include: 'conversation.latestMessage'
      },
      drawerParticipationId: null,
      drawerParticipation: null,
      autocompleteOptionsOrga: [],
      autocompleteOptionsMission: []
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
    },
    async onFetchSuggestionsMission (value) {
      const res = await this.$axios.get('/missions', {
        params: {
          'filter[search]': value,
          pagination: 20
        }
      })
      this.autocompleteOptionsMission = res.data.data
    }
  }
}
</script>
