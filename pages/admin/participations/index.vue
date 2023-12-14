<template>
  <BaseContainerRightSidebar>
    <DrawerParticipation
      :participation-id="drawerParticipationId"
      @close="drawerParticipationId = null"
      @updated="onDrawerUpdated()"
      @refetch="fetch()"
    />

    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Participations' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 sticky top-8">
        <BaseCombobox
          v-if="activities.length && ['admin', 'referent'].includes($stores.auth.contextRole)"
          name="activity_id"
          placeholder="Activité"
          :options="activities"
          clearable
          attribute-key="id"
          attribute-label="name"
          variant="transparent"
          :modelValue="$route.query['filter[ofActivity]']"
          @update:modelValue="changeFilter('filter[ofActivity]', $event)"
        />
        <BaseInputAutocomplete
          v-if="
            ['admin', 'tete_de_reseau', 'referent', 'referent_regional'].includes(
              $stores.auth.contextRole
            )
          "
          :modelValue="$route.query['filter[mission.structure.name]']"
          icon="RiSearchLine"
          name="autocomplete"
          placeholder="Organisation"
          :options="autocompleteOptionsOrga"
          :show-key-in-options="true"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsOrga"
          @selected="onSelectOrganisation"
        />
        <BaseSelectAdvanced
          v-if="responsables.length && ['responsable', 'admin'].includes($stores.auth.contextRole)"
          :key="`responsable-${$route.fullPath}`"
          name="responsable"
          placeholder="Responsable"
          :options="responsables"
          :modelValue="$route.query['filter[ofResponsable]']"
          variant="transparent"
          attribute-key="id"
          attribute-label="full_name"
          clearable
          @update:modelValue="changeFilter('filter[ofResponsable]', $event)"
        />
        <BaseInputAutocomplete
          :modelValue="$route.query['filter[mission.name]']"
          icon="RiSearchLine"
          name="autocomplete"
          placeholder="Mission"
          :options="autocompleteOptionsMission"
          :show-key-in-options="true"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsMission"
          @selected="changeFilter('filter[mission.id]', $event ? $event.id : undefined)"
        />
        <BaseSelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Statut"
          :options="$labels.participation_workflow_states"
          :modelValue="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[state]', $event)"
        />
        <BaseSelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="mission.department"
          placeholder="Département"
          :options="
            $labels.departments.map((option) => {
              return {
                key: option.key,
                label: `${option.key} - ${option.label}`,
              }
            })
          "
          :modelValue="$route.query['filter[mission.department]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[mission.department]', $event)"
        />
        <BaseInput
          name="mission.zip"
          placeholder="Code Postal"
          variant="transparent"
          :modelValue="$route.query['filter[mission.zip]']"
          @update:modelValue="changeFilter('filter[mission.zip]', $event)"
        />
        <div class="flex space-x-4 mb-2">
          <BaseCheckbox
            :key="`type-1-${$route.fullPath}`"
            :option="{ key: 'presentiel', label: 'Présentiel' }"
            :is-checked="
              $route.query['filter[mission.type]'] &&
              $route.query['filter[mission.type]'].includes('Mission en présentiel')
            "
            transparent
            variant="button"
            @change="changeFilter('filter[mission.type]', 'Mission en présentiel', true)"
          />
          <BaseCheckbox
            :key="`type-2-${$route.fullPath}`"
            :option="{ key: 'distance', label: 'À distance' }"
            :is-checked="
              $route.query['filter[mission.type]'] &&
              $route.query['filter[mission.type]'].includes('Mission à distance')
            "
            transparent
            variant="button"
            @change="changeFilter('filter[mission.type]', 'Mission à distance', true)"
          />
        </div>
      </div>
    </template>
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
              v-if="
                !bulkOperationIsActive &&
                ['responsable', 'tete_de_reseau'].includes($stores.auth.contextRole)
              "
              type="secondary"
              icon="RiDownload2Line"
              :disabled="queryResult?.total === 0"
              :loading="exportLoading"
              @click.native="handleExport"
            >
              Exporter
            </DsfrButton>
          </div>
        </template>
      </BaseSectionHeading>
      <BaseInput
        v-if="!bulkOperationIsActive"
        class="mt-8"
        name="search"
        placeholder="Recherche par prénom, nom ou e-mail"
        icon="RiSearchLine"
        variant="transparent"
        :modelValue="$route.query['filter[search]']"
        clearable
        @update:modelValue="changeFilter('filter[search]', $event)"
      />
      <div v-if="!bulkOperationIsActive" class="hidden lg:flex gap-3 mt-4 text-sm flex-wrap">
        <DsfrTag
          :key="`tous-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="hasActiveFilters()"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="deleteAllFilters"
        >
          Toutes
        </DsfrTag>

        <DsfrTag
          v-if="$stores.auth.user.statistics?.participations_need_to_be_treated_count > 0"
          :key="`state-atraiterenpriorite-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[need_to_be_treated]'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[need_to_be_treated]', 'true')"
        >
          ⚠️ À traiter en priorité
        </DsfrTag>

        <DsfrTag
          :key="`state-encoursmoderation-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="
            $route.query['filter[is_state_pending]'] &&
            $route.query['filter[is_state_pending]'] == 'true'
          "
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_state_pending]', 'true')"
        >
          En cours de modération
        </DsfrTag>
      </div>

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

      <DsfrPagination
        v-if="!bulkOperationIsActive"
        class="mt-12"
        variant="light"
        align="right"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="onPageChange"
      />

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

      <DsfrPagination
        v-if="!bulkOperationIsActive"
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="onPageChange"
      />
    </div>
  </BaseContainerRightSidebar>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardParticipation from '@/components/card/CardParticipation.vue'
import DrawerParticipation from '@/components/drawer/DrawerParticipation.vue'
import MixinExport from '@/mixins/export'
import MixinBulkOperations from '@/mixins/bulk-operations'
import BoxContext from '@/components/section/BoxContext.vue'
import ModalBulkParticipationsValidate from '@/components/modal/ModalBulkParticipationsValidate.vue'
import ModalBulkParticipationsDecline from '@/components/modal/ModalBulkParticipationsDecline.vue'
import MixinUsetiful from '@/mixins/usetiful.client.js'

export default defineNuxtComponent({
  components: {
    CardParticipation,
    DrawerParticipation,
    BoxContext,
    ModalBulkParticipationsValidate,
    ModalBulkParticipationsDecline,
  },
  mixins: [QueryBuilder, MixinExport, MixinBulkOperations, MixinUsetiful],
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
    }

    return {
      activities: activities.data,
      responsables: responsables,
    }
  },
  data() {
    return {
      loading: false,
      endpoint: '/participations',
      exportEndpoint: '/export/participations',
      queryParams: {
        include:
          'conversation.latestMessage,profile.avatar,mission.responsable,mission.structure,tags',
      },
      drawerParticipationId: null,
      autocompleteOptionsOrga: [],
      autocompleteOptionsMission: [],
      showModalBulkParticipationsValidate: false,
      showModalBulkParticipationsDecline: false,
    }
  },
  computed: {
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
      },
      immediate: true,
    },
  },
  methods: {
    onDrawerUpdated() {
      this.fetch()
    },
    async onFetchSuggestionsOrga(value) {
      const organisations = await apiFetch('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsOrga = organisations.data
    },
    async onFetchSuggestionsMission(value) {
      const missions = await apiFetch('/missions', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsMission = missions.data
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
      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          'filter[mission.structure.name]': $event?.name ?? undefined,
          'filter[mission.structure.id]': $event?.id ?? undefined,
          'filter[ofResponsable]': undefined,
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
