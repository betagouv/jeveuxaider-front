<template>
  <div class="container">
    <DrawerParticipation
      :participation-id="drawerParticipationId"
      @close="drawerParticipationId = null"
      @updated="onDrawerUpdated()"
      @refetch="fetch()"
      @update-selected-tags="onUpdateSelectedTags"
    />

    <DsfrBreadcrumb
      :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Participations' }]"
    />

    <div>
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'participation',
          'participations',
          false
        )}`"
        :loading="queryLoading"
      >
        <template #action>
          <div class="flex space-x-2">
            <DsfrButton
              v-if="canExport"
              type="secondary"
              icon="RiDownload2Line"
              :disabled="queryResult?.total === 0"
              :loading="exportLoading"
              @click.native="handleExport"
            >
              Exporter
            </DsfrButton>
            <div class="relative">
              <BulkOperationActions
                v-if="bulkOperationIsActive"
                :operations="operations"
                @unselectAll="operations = []"
              >
                <BaseDropdownOptionsItem
                  v-if="canBulkValidate"
                  @click.native="showModalBulkParticipationsValidate = true"
                >
                  Valider les participations
                </BaseDropdownOptionsItem>
                <BaseDropdownOptionsItem
                  v-if="canBulkDecline"
                  @click.native="showModalBulkParticipationsDecline = true"
                >
                  Refuser les participations
                </BaseDropdownOptionsItem>
              </BulkOperationActions>
            </div>
          </div>
        </template>
      </BaseSectionHeading>

      <CustomSearchFilters class="mt-8 mb-12" @reset-filters="deleteAllFilters">
        <DsfrInput
          type="search"
          size="lg"
          placeholder="Recherche par prénom, nom ou e-mail"
          icon="RiSearchLine"
          :modelValue="$route.query['filter[search]']"
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <!-- <DsfrTag
            as="button"
            size="md"
            context="selectable"
            :is-active="!hasActiveFilters"
            @click.native="deleteAllFilters"
          >
            Toutes
          </DsfrTag> -->

          <template v-for="(visibleFilter, i) in visibleFilters" :key="`${visibleFilter}-${i}`">
            <DsfrTag
              v-if="visibleFilter === 'need_to_be_treated'"
              as="button"
              size="md"
              context="selectable"
              :is-active="$route.query['filter[need_to_be_treated]'] == 'true'"
              @click.native="changeFilter('filter[need_to_be_treated]', 'true')"
            >
              ⚠️ À traiter en priorité
            </DsfrTag>

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'ofActivity'"
              :modelValue="$route.query['filter[ofActivity]']"
              name="ofActivity"
              :options="activities"
              attribute-key="id"
              attribute-label="name"
              placeholder="Activité"
              :searchable="true"
              options-class="!min-w-[300px]"
              @update:modelValue="changeFilter('filter[ofActivity]', $event)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'mission.structure.id'"
              v-model="selectedOrganisation"
              label="Organisation"
              name="autocomplete-organisation"
              :options="autocompleteOptionsOrganisations"
              :loading="loadingFetchOrganisations"
              @fetch-suggestions="onFetchSuggestionsOrganisations"
              @selected="onSelectOrganisation"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'ofResponsable'"
              name="responsable"
              :options="responsables"
              :modelValue="$route.query['filter[ofResponsable]']"
              attribute-key="id"
              attribute-label="full_name"
              placeholder="Responsable"
              @update:modelValue="changeFilter('filter[ofResponsable]', $event)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'mission.id'"
              v-model="selectedMission"
              label="Mission"
              name="autocomplete-mission"
              :options="autocompleteOptionsMission"
              :loading="loadingFetchMissions"
              @fetch-suggestions="onFetchSuggestionsMission"
              @selected="onSelectMission"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'state'"
              multiple
              searchable
              :modelValue="$route.query['filter[state]']?.split(',')"
              name="state"
              :options="$labels.participation_workflow_states"
              placeholder="Statut"
              @update:modelValue="changeFilter('filter[state]', $event, true)"
            />

            <BaseFilterSelectAdvanced
              v-if="
                ['responsable'].includes($stores.auth.contextRole) &&
                $stores.structureTags.options.length > 0 &&
                visibleFilter === 'tags'
              "
              :modelValue="$route.query['filter[tags]']"
              name="tags"
              :options="$stores.structureTags.options"
              placeholder="Tags"
              @update:modelValue="changeFilter('filter[tags]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'mission.department'"
              name="department"
              :options="
                $labels.departments.map((option) => {
                  return {
                    key: option.key,
                    label: `${option.key} - ${option.label}`,
                  }
                })
              "
              :modelValue="$route.query['filter[mission.department]']"
              placeholder="Département"
              :searchable="true"
              @update:modelValue="changeFilter('filter[mission.department]', $event)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'mission.zip'"
              :modelValue="$route.query['filter[mission.zip]']"
              label="Code postal"
              name="autocomplete-zips"
              :options="autocompleteOptionsZips"
              :loading="loadingFetchZips"
              attribute-key="zip"
              hide-attribute-key
              attribute-right-label="zip"
              @fetch-suggestions="onFetchSuggestionsZips"
              @selected="changeFilter('filter[mission.zip]', $event?.zip)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'mission.type'"
              :modelValue="$route.query['filter[mission.type]']"
              name="lieu_type"
              :options="[
                { key: 'presentiel', label: 'Mission en présentiel' },
                { key: 'distance', label: 'Mission à distance' },
              ]"
              placeholder="Présentiel / distance"
              attribute-key="label"
              @update:modelValue="changeFilter('filter[mission.type]', $event)"
            />
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
      </CustomSearchFilters>

      <!--
      <DsfrPagination
        v-if="!bulkOperationIsActive"
        class="mt-12 mb-6"
        variant="light"
        align="right"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="onPageChange"
      /> -->

      <div class="my-6 space-y-4">
        <div
          v-for="(participation, index) in queryResult.data"
          :key="participation.id"
          class="flex items-center"
        >
          <div v-if="canUseBulkOperation" class="min-w-[48px]">
            <BulkOperationCheckbox
              v-if="canEditStatut(participation)"
              v-model="operations"
              :model="participation"
              :class="`bulk-operation-checkbox--${index}`"
            />
          </div>

          <CardParticipation
            :participation="participation"
            @click.native="drawerParticipationId = participation.id"
            @refetch="fetch()"
            show-tags
          />
        </div>
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
    <ModalBulkParticipationsValidate
      v-if="canBulkValidate"
      :is-open="showModalBulkParticipationsValidate"
      :operations="operations"
      @close="showModalBulkParticipationsValidate = false"
      @processed="onBulkOperationProcessed"
    />
    <ModalBulkParticipationsDecline
      v-if="canBulkDecline"
      :is-open="showModalBulkParticipationsDecline"
      :operations="operations"
      @close="showModalBulkParticipationsDecline = false"
      @processed="onBulkOperationProcessed"
    />
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardParticipation from '@/components/card/CardParticipation.vue'
import DrawerParticipation from '@/components/drawer/DrawerParticipation.vue'
import MixinExport from '@/mixins/export'
import MixinBulkOperations from '@/mixins/bulk-operations'
import ModalBulkParticipationsValidate from '@/components/modal/ModalBulkParticipationsValidate.vue'
import ModalBulkParticipationsDecline from '@/components/modal/ModalBulkParticipationsDecline.vue'
import MixinUsetiful from '@/mixins/usetiful.client.js'
import MixinFiltersVisibility from '@/mixins/filters-visibility'

export default defineNuxtComponent({
  components: {
    CardParticipation,
    DrawerParticipation,
    ModalBulkParticipationsValidate,
    ModalBulkParticipationsDecline,
  },
  mixins: [QueryBuilder, MixinExport, MixinBulkOperations, MixinUsetiful, MixinFiltersVisibility],
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

    const activities = await apiFetch('/activities', {
      params: {
        pagination: 999,
        'filter[is_published]': 1,
      },
    })

    let responsables = []
    if ($stores.auth.contextRole === 'responsable' && $stores.auth.contextableId) {
      const response = await apiFetch(`/structures/${$stores.auth.contextableId}/responsables`)
      responsables = response?.map((user) => user.profile) ?? []

      $stores.structureTags.endpoint = `/structures/${$stores.auth.contextableId}/tags`
      $stores.structureTags.fetchOptions()
    }

    return {
      activities: activities.data,
      responsables: responsables,
    }
  },
  data() {
    return {
      loading: false,
      loadingFetchOrganisations: false,
      loadingFetchMissions: false,
      loadingFetchZips: false,
      endpoint: '/participations',
      exportEndpoint: '/export/participations',
      queryParams: {
        include:
          'conversation.latestMessage,profile.avatar,mission.responsable,mission.structure,tags',
      },
      drawerParticipationId: null,
      autocompleteOptionsOrganisations: [],
      autocompleteOptionsMission: [],
      autocompleteOptionsZips: [],
      showModalBulkParticipationsValidate: false,
      showModalBulkParticipationsDecline: false,
    }
  },
  computed: {
    canExport() {
      if (this.bulkOperationIsActive) {
        return false
      }
      if (['responsable', 'tete_de_reseau'].includes(this.$stores.auth.contextRole)) {
        return true
      }
      if (
        ['referent'].includes(this.$stores.auth.contextRole) &&
        this.$stores.auth.profile.can_export_profiles
      ) {
        return true
      }
      return false
    },
    canUseBulkOperation() {
      return ['admin', 'responsable'].includes(this.$stores.auth.contextRole)
    },
    canBulkValidate() {
      return this.$labels.participation_workflow_states
        .find((state) => state.key === 'Validée')
        ?.roles?.includes(this.$stores.auth.contextRole)
    },
    canBulkDecline() {
      return this.$labels.participation_workflow_states
        .find((state) => state.key === 'Refusée')
        ?.roles?.includes(this.$stores.auth.contextRole)
    },
    selectedOrganisation() {
      return {
        key: Number(this.$route.query['filter[mission.structure.id]']) || undefined,
        label: this.$route.query['organisation_name'],
      }
    },
    selectedMission() {
      return {
        key: Number(this.$route.query['filter[mission.id]']) || undefined,
        label: this.$route.query['mission_name'],
      }
    },
    allFilters() {
      return [
        this.$stores.auth.user.statistics?.participations_need_to_be_treated_count > 0 &&
          'need_to_be_treated',
        'state',
        'tags',
        this.activities.length &&
          ['admin', 'referent'].includes(this.$stores.auth.contextRole) &&
          'ofActivity',
        ['admin', 'tete_de_reseau', 'referent', 'referent_regional'].includes(
          this.$stores.auth.contextRole
        ) && 'mission.structure.id',
        this.responsables.length &&
          ['responsable', 'admin'].includes(this.$stores.auth.contextRole) &&
          'ofResponsable',
        'mission.type',
        'mission.id',
        'mission.department',
        'mission.zip',
      ].filter((f) => f)
    },
    alwaysVisibleFilters() {
      return [
        this.$stores.auth.user.statistics?.participations_need_to_be_treated_count > 0 &&
          'need_to_be_treated',
        'state',
        'tags',
        ['admin'].includes(this.$stores.auth.contextRole) && 'mission.structure.id',
        ['admin'].includes(this.$stores.auth.contextRole) && 'mission.department',
      ].filter((f) => f)
    },
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        if (this.$stores.auth.contextRole === 'admin') {
          this.fetchResponsablesForAdmins(
            newQuery['filter[mission.structure.id]'],
            oldQuery?.['filter[mission.structure.id]']
          )
        }
        this.operations = []
      },
      immediate: true,
    },
  },
  methods: {
    onDrawerUpdated() {
      this.fetch()
    },
    onUpdateSelectedTags(tags) {
      this.queryResult.data.find(
        (participation) => participation.id === this.drawerParticipationId
      ).tags = tags
    },
    async onFetchSuggestionsOrganisations(value) {
      this.loadingFetchOrganisations = true
      const organisations = await apiFetch('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsOrganisations = organisations.data
      this.loadingFetchOrganisations = false
    },
    async onFetchSuggestionsMission(value) {
      this.loadingFetchMissions = true
      const missions = await apiFetch('/missions', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsMission = missions.data
      this.loadingFetchMissions = false
    },
    async onFetchSuggestionsZips(value) {
      this.loadingFetchZips = true
      this.autocompleteOptionsZips = await useGeolocationFetch(value, {
        context: 'filter',
        inputGeoType: 'municipality',
      })
      this.loadingFetchZips = false
    },
    onBulkOperationProcessed() {
      this.drawerParticipationId = null // Force closing drawer
      this.operations = []
      this.fetch()
    },
    onPageChange(page) {
      this.operations = []
      this.changePage(page)
    },
    canEditStatut(participation) {
      if (this.$stores.auth.contextRole === 'admin') {
        return true
      }
      if (this.$stores.auth.contextRole === 'responsable') {
        return participation.mission.responsable_id === this.$stores.auth.profile.id
      }

      return false
    },
    async onSelectOrganisation($event) {
      const queryOrganisationName =
        $event !== null && this.$route.query['organisation_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryOrganisationId =
        $event !== null && Number(this.$route.query['filter[mission.structure.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          organisation_name: queryOrganisationName,
          'filter[mission.structure.id]': queryOrganisationId,
          'filter[ofResponsable]': undefined,
        },
      })
    },
    async onSelectMission($event) {
      const queryMissionName =
        $event !== null && this.$route.query['mission_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryMissionId =
        $event !== null && Number(this.$route.query['filter[mission.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          mission_name: queryMissionName,
          'filter[mission.id]': queryMissionId,
        },
      })
    },
    async fetchResponsablesForAdmins(organisationId, oldOrganisationId) {
      if (!organisationId) {
        this.responsables = []
        return
      }
      if (organisationId !== oldOrganisationId) {
        const responsables = await apiFetch(`/structures/${organisationId}/responsables`)
        this.responsables = responsables?.map((user) => user.profile) ?? []
      }
    },
  },
})
</script>
