<template>
  <ContainerRightSidebar>
    <DrawerParticipation
      :participation-id="drawerParticipationId"
      @close="drawerParticipationId = null"
      @updated="handleUpdate"
    />

    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Participations' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 sticky top-8">
        <Combobox
          v-if="activities.length"
          name="activity_id"
          placeholder="Activité"
          :options="activities"
          clearable
          attribute-key="id"
          attribute-label="name"
          variant="transparent"
          :value="$route.query['filter[ofActivity]']"
          @input="changeFilter('filter[ofActivity]', $event)"
        />
        <InputAutocomplete
          v-if="['admin','tete_de_reseau','referent','referent_regional'].includes($store.getters.contextRole)"
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
          :value="$route.query['filter[mission.name]']"
          icon="SearchIcon"
          name="autocomplete"
          placeholder="Mission"
          :options="autocompleteOptionsMission"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsMission"
          @selected="changeFilter('filter[mission.id]', $event ? $event.id : undefined)"
        />
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
      <SectionHeading
        :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
          queryResult.total,
          'participation',
          'participations',
          false
        )}`"
      >
        <template #action>
          <div class="flex space-x-2">
            <Button variant="white" icon="DownloadIcon" size="lg" :loading="exportLoading" @click.native="handleExport">
              Exporter
            </Button>
            <ButtonMassValidation v-if="$store.getters.contextRole === 'responsable' && waitingParticipationsCount" :structure-id="$store.getters.contextableId" :count="waitingParticipationsCount" />
          </div>
        </template>
      </Sectionheading>
      <Input
        class="mt-8"
        name="search"
        placeholder="Recherche par prénom, nom ou e-mail"
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
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
import DrawerParticipation from '@/components/drawer/DrawerParticipation.vue'
import MixinExport from '@/mixins/export'
import ButtonMassValidation from '@/components/custom/ButtonMassValidation'
import BoxContext from '@/components/section/BoxContext.vue'

export default {
  components: {
    CardParticipation,
    DrawerParticipation,
    ButtonMassValidation,
    BoxContext
  },
  mixins: [QueryBuilder, MixinExport],
  middleware: 'authenticated',
  async asyncData ({ $axios, store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'responsable', 'tete_de_reseau'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }

    const { data: activities } = await $axios.get('/activities?pagination=0')

    if (store.getters.contextRole === 'responsable' && store.getters.contextableId) {
      const res = await $axios.post(`/structures/${store.getters.contextableId}/waiting-participations`)
      return {
        waitingParticipationsCount: res.data,
        activities: activities.data

      }
    }
    return {
      activities: activities.data
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/participations',
      exportEndpoint: '/export/participations',
      queryParams: {
        include: 'conversation.latestMessage,profile.avatar'
      },
      drawerParticipationId: null,
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
    },
    handleUpdate (payload) {
      const index = this.queryResult.data.findIndex(participation => participation.id === payload.id)
      this.queryResult.data.splice(index, 1, payload)
    }
  }
}
</script>
