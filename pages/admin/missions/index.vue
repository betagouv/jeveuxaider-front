<template>
  <div class="container">
    <DrawerMission
      :mission-id="drawerMissionId"
      @close="drawerMissionId = null"
      @updated="fetch()"
      @refetch="fetch()"
    />
    <DsfrBreadcrumb
      :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Missions' }]"
    />

    <div>
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'mission',
          'missions',
          false
        )}`"
        :loading="queryLoading"
      >
        <template #action>
          <div class="flex space-x-2">
            <DsfrButton
              v-if="
                ['admin', 'referent', 'tete_de_reseau', 'responsable'].includes(
                  $stores.auth.contextRole
                )
              "
              type="secondary"
              icon="RiDownload2Line"
              :disabled="queryResult?.total === 0"
              :loading="exportLoading"
              @click.native="handleExport"
            >
              Exporter
            </DsfrButton>
            <ButtonCreateMission v-if="$stores.auth.contextRole === 'responsable'" size="md" />
          </div>
        </template>
      </BaseSectionHeading>

      <SearchFilters class="mt-8 mb-12" @reset-filters="deleteAllFilters">
        <DsfrInput
          type="search"
          size="lg"
          placeholder="Recherche par mots clés..."
          icon="RiSearchLine"
          :modelValue="$route.query['filter[search]']"
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <div class="flex gap-3 items-center">
            <span class="text-base">Trier par</span>
            <BaseFilterSelectAdvanced
              key="sort"
              name="sort"
              :options="[
                { key: '-created_at', label: 'Les plus récentes' },
                { key: 'created_at', label: 'Les plus anciennes' },
                { key: '-updated_at', label: 'Date de denière modification' },
                { key: '-places_left', label: 'Nombre de bénévoles recherchés' },
              ]"
              :modelValue="$route.query['sort']"
              placeholder="Trier par"
              @update:modelValue="changeFilter('sort', $event)"
            />
            <div aria-hidden class="bg-gray-600 mx-1 w-[1px] h-6" />
          </div>

          <template v-for="visibleFilter in visibleFilters" :key="visibleFilter">
            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'responsable.id'"
              name="responsable.id"
              placeholder="Tous les responsables"
              :options="responsables"
              attribute-key="id"
              attribute-label="full_name"
              :modelValue="$route.query['filter[responsable.id]']"
              clearable
              @update:modelValue="changeFilter('filter[responsable.id]', $event)"
            />

            <DsfrTag
              v-if="visibleFilter === 'available'"
              as="button"
              size="md"
              context="selectable"
              :is-active="
                $route.query['filter[available]'] &&
                $route.query['filter[available]'] == 'available'
              "
              @click.native="changeFilter('filter[available]', 'available')"
            >
              En ligne
            </DsfrTag>

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'place'"
              :modelValue="$route.query['filter[place]']"
              name="place"
              :options="[
                { key: 'true', label: 'Avec place restante' },
                { key: 'false', label: 'Sans place restante' },
              ]"
              placeholder="Place restante"
              @update:modelValue="changeFilter('filter[place]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'is_registration_open'"
              name="inscription"
              :options="[
                { key: 'true', label: 'Inscription ouverte' },
                { key: 'false', label: 'Inscription fermée' },
              ]"
              :modelValue="$route.query['filter[is_registration_open]']"
              placeholder="Inscription"
              @update:modelValue="changeFilter('filter[is_registration_open]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'date'"
              :modelValue="$route.query['filter[date]']"
              name="date"
              :options="[
                { key: 'incoming', label: 'À venir' },
                { key: 'in_progress', label: 'En cours' },
                { key: 'over', label: 'Passée' },
              ]"
              placeholder="Date"
              @update:modelValue="changeFilter('filter[date]', $event)"
            />

            <DsfrTag
              v-if="visibleFilter === 'is_snu_mig_compatible'"
              as="button"
              size="md"
              context="selectable"
              :is-active="
                $route.query['filter[is_snu_mig_compatible]'] &&
                $route.query['filter[is_snu_mig_compatible]'] == 'true'
              "
              @click.native="changeFilter('filter[is_snu_mig_compatible]', 'true')"
            >
              SNU/MIG
            </DsfrTag>

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'publics_volontaires'"
              name="publics_volontaires"
              :options="[{ key: 'Mineurs', label: 'Mineurs' }]"
              :modelValue="$route.query['filter[publics_volontaires]']"
              placeholder="Proposé aux"
              @update:modelValue="changeFilter('filter[publics_volontaires]', $event)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'ofStructure'"
              v-model="selectedOrganisation"
              label="Organisation"
              name="autocomplete-organisation"
              :options="autocompleteOptionsOrganisations"
              @fetch-suggestions="onFetchSuggestionsOrganisations"
              @selected="onSelectOrganisation"
              :loading="loadingFetchOrganisations"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'ofReseau'"
              v-model="selectedReseau"
              label="Réseau"
              name="autocomplete-reseau"
              :options="autocompleteOptionsReseaux"
              :loading="loadingFetchReseaux"
              @fetch-suggestions="onFetchSuggestionsReseaux"
              @selected="onSelectReseau"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'ofResponsable'"
              name="responsable"
              :options="responsablesStructures"
              :modelValue="$route.query['filter[ofResponsable]']"
              attribute-key="id"
              attribute-label="full_name"
              placeholder="Responsable"
              @update:modelValue="changeFilter('filter[ofResponsable]', $event)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'ofTerritoire'"
              v-model="selectedTerritoire"
              label="Territoire"
              name="autocomplete-territoire"
              :options="autocompleteOptionsTerritoires"
              :loading="loadingFetchTerritoires"
              @fetch-suggestions="onFetchSuggestionsTerritoires"
              @selected="onSelectTerritoire"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'ofTemplate'"
              v-model="selectedTemplate"
              label="Template"
              name="autocomplete-template"
              attribute-key="id"
              attribute-label="title"
              :options="autocompleteOptionsTemplates"
              :loading="loadingFetchTemplates"
              @fetch-suggestions="onFetchSuggestionsTemplates"
              @selected="onSelectTemplate"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'structure.statut_juridique'"
              name="statut_juridique"
              :options="$labels.structure_legal_status"
              :modelValue="$route.query['filter[structure.statut_juridique]']"
              placeholder="Statut juridique"
              @update:modelValue="changeFilter('filter[structure.statut_juridique]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'department'"
              name="department"
              :options="
                $labels.departments.map((option) => {
                  return {
                    key: option.key,
                    label: `${option.key} - ${option.label}`,
                  }
                })
              "
              :searchable="true"
              :modelValue="$route.query['filter[department]']?.split(',')"
              placeholder="Département"
              multiple
              @update:modelValue="changeFilter('filter[department]', $event, true)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'zip'"
              :modelValue="$route.query['filter[zip]']"
              label="Code postal"
              name="autocomplete-zips"
              :options="autocompleteOptionsZips"
              attribute-key="zip"
              hide-attribute-key
              attribute-right-label="labelRight"
              @fetch-suggestions="onFetchSuggestionsZips"
              @selected="changeFilter('filter[zip]', $event?.zip)"
              :loading="loadingFetchZips"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'ofDomaine'"
              name="domaine"
              :options="$labels.domaines"
              :modelValue="$route.query['filter[ofDomaine]']?.split(',').map((i) => parseInt(i))"
              placeholder="Domaine d'action"
              multiple
              @update:modelValue="changeFilter('filter[ofDomaine]', $event, true)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'ofActivity'"
              :modelValue="$route.query['filter[ofActivity]']?.split(',').map((i) => parseInt(i))"
              name="activity_id"
              :options="activities"
              :searchable="true"
              attribute-key="id"
              attribute-label="name"
              placeholder="Activité"
              options-class="!min-w-[300px]"
              multiple
              @update:modelValue="changeFilter('filter[ofActivity]', $event, true)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'hasCreneaux'"
              :modelValue="$route.query['filter[hasCreneaux]']"
              name="creneaux"
              :options="[
                { key: 'true', label: 'Avec créneaux' },
                { key: 'false', label: 'Sans créneaux' },
              ]"
              placeholder="Créneaux"
              @update:modelValue="changeFilter('filter[hasCreneaux]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'is_online'"
              :modelValue="$route.query['filter[is_online]']"
              name="is-active"
              :options="[
                { key: 'true', label: 'Missions en lignes' },
                { key: 'false', label: 'Missions hors lignes' },
              ]"
              placeholder="État"
              @update:modelValue="changeFilter('filter[is_online]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'state'"
              :modelValue="$route.query['filter[state]']?.split(',')"
              name="state"
              :options="$labels.mission_workflow_states"
              placeholder="Statut"
              multiple
              @update:modelValue="changeFilter('filter[state]', $event, true)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'publics_beneficiaires'"
              :modelValue="$route.query['filter[publics_beneficiaires]']?.split(',')"
              name="publics_beneficiaires"
              :options="$labels.mission_publics_beneficiaires"
              placeholder="Publics aidés"
              options-class="!min-w-[300px]"
              multiple
              @update:modelValue="changeFilter('filter[publics_beneficiaires]', $event, true)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'tags'"
              :modelValue="$route.query['filter[tags]']"
              name="tags"
              :options="tags"
              placeholder="Tags"
              @update:modelValue="changeFilter('filter[tags]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'type'"
              :modelValue="$route.query['filter[type]']"
              name="lieu_type"
              :options="[
                { key: 'presentiel', label: 'Mission en présentiel' },
                { key: 'distance', label: 'Mission à distance' },
              ]"
              placeholder="Présentiel / distance"
              attribute-key="label"
              @update:modelValue="changeFilter('filter[type]', $event)"
            />

            <DsfrTag
              v-if="visibleFilter === 'is_autonomy'"
              as="button"
              size="md"
              context="selectable"
              :is-active="
                $route.query['filter[is_autonomy]'] && $route.query['filter[is_autonomy]'] == 'true'
              "
              @click="changeFilter('filter[is_autonomy]', 'true')"
            >
              En autonomie
            </DsfrTag>
          </template>

          <DsfrTag
            v-if="visibleFilters.length < allFilters.length"
            key="view-all-filter"
            context="clickable"
            icon="RiAddLine"
            :icon-only="true"
            size="md"
            as="button"
            title="Afficher plus de filtres"
            @click="showAllFilters = true"
          />
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CardMission
          class="cursor-pointer"
          v-for="mission in queryResult.data"
          :key="mission.id"
          :mission="mission"
          show-state
          :show-tags="['admin'].includes($stores.auth.contextRole)"
          tabindex="0"
          @click.left="drawerMissionId = mission.id"
          @click.middle="
            navigateTo(`/admin/missions/${mission.id}`, { open: { target: '_blank' } })
          "
        />
      </div>

      <CustomEmptyState v-if="queryResult.total === 0 && !queryLoading" />

      <DsfrPagination
        class="my-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardMission from '@/components/card/CardMission.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'
import MixinExport from '@/mixins/export'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import ButtonCreateMission from '@/components/custom/ButtonCreateMission.vue'
import MixinFiltersVisibility from '@/mixins/filters-visibility'
import activitiesJson from '@/assets/activities.json'
import MixinSuggestionsFilters from '@/mixins/suggestions-filters'

export default defineNuxtComponent({
  components: {
    CardMission,
    DrawerMission,
    SearchFilters,
    ButtonCreateMission,
  },
  mixins: [QueryBuilder, MixinExport, MixinFiltersVisibility, MixinSuggestionsFilters],
  async setup() {
    const { $stores } = useNuxtApp()

    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    if (
      !['admin', 'referent', 'referent_regional', 'responsable', 'tete_de_reseau'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    let responsables = []
    if ($stores.auth.contextRole === 'responsable' && $stores.auth.contextableId) {
      const responsablesResponse = await apiFetch(
        `/structures/${$stores.auth.contextableId}/responsables`
      )
      responsables = responsablesResponse.map((user) => user.profile) ?? []
    }

    return {
      responsables,
    }
  },
  data() {
    return {
      loading: false,
      loadingFetchZips: false,
      endpoint: '/missions',
      exportEndpoint: '/export/missions',
      queryParams: {
        include: 'template.photo,illustrations,tags',
      },
      drawerMissionId: null,
      tags: [],
      responsablesStructures: [],
      autocompleteOptionsZips: [],
      activities: activitiesJson.sort((a, b) => a.name.localeCompare(b.name)),
    }
  },
  computed: {
    allFilters() {
      return [
        'state',
        ['responsable'].includes(this.$stores.auth.contextRole) &&
          this.responsables.length &&
          'responsable.id',
        'available',
        'place',
        'is_registration_open',
        'date',
        'department',
        'zip',
        'ofDomaine',
        'ofActivity',
        'hasCreneaux',
        'is_online',
        'publics_volontaires',
        'publics_beneficiaires',
        'type',
        'is_autonomy',
        ['admin', 'referent', 'referent_regional'].includes(this.$stores.auth.contextRole) &&
          'is_snu_mig_compatible',
        ['admin', 'referent', 'referent_regional'].includes(this.$stores.auth.contextRole) &&
          'ofStructure',
        ['admin', 'referent', 'referent_regional'].includes(this.$stores.auth.contextRole) &&
          'ofReseau',
        this.responsablesStructures.length &&
          ['admin'].includes(this.$stores.auth.contextRole) &&
          'ofResponsable',
        ['admin', 'referent', 'referent_regional'].includes(this.$stores.auth.contextRole) &&
          'structure.statut_juridique',
        ['admin'].includes(this.$stores.auth.contextRole) && 'ofTemplate',
        ['admin'].includes(this.$stores.auth.contextRole) && 'ofTerritoire',
        this.$stores.auth.contextRole == 'admin' && 'tags',
      ].filter((f) => f)
    },
    alwaysVisibleFilters() {
      return ['state', 'responsable.id', 'available', 'place', 'is_registration_open', 'date']
    },
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        if (this.$stores.auth.contextRole === 'admin') {
          this.fetchResponsablesForAdmins(
            newQuery['filter[ofStructure]'],
            oldQuery?.['filter[ofStructure]']
          )
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    const terms = await apiFetch('/vocabularies/missions/terms', {
      params: { pagination: 50 },
    })
    this.tags = terms.data.map((tag) => {
      return { key: tag.id, label: tag.name }
    })
  },
  methods: {
    async onFetchSuggestionsZips(value) {
      this.loadingFetchZips = true
      this.autocompleteOptionsZips = await useGeolocationFetch(value, {
        context: 'filter',
        inputGeoType: 'municipality',
      })
      this.loadingFetchZips = false
    },
    async fetchResponsablesForAdmins(organisationId, oldOrganisationId) {
      if (!organisationId) {
        this.responsablesStructures = []
        return
      }
      if (organisationId !== oldOrganisationId) {
        const responsables = await apiFetch(`/structures/${organisationId}/responsables`)
        this.responsablesStructures = responsables.map((user) => user.profile) ?? []
      }
    },
  },
})
</script>
