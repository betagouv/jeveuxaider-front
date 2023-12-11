<template>
  <BaseContainerRightSidebar>
    <DrawerMission
      :mission-id="drawerMissionId"
      @close="drawerMissionId = null"
      @updated="fetch()"
      @refetch="fetch()"
    />
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Missions' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 mb-32">
        <BaseInputAutocomplete
          v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
          :value="$route.query['filter[structure.name]']"
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
          v-if="responsablesStructures.length && ['admin'].includes($stores.auth.contextRole)"
          :key="`responsable-${$route.fullPath}`"
          name="responsable"
          placeholder="Responsable"
          :options="responsablesStructures"
          :modelValue="$route.query['filter[ofResponsable]']"
          variant="transparent"
          attribute-key="id"
          attribute-label="full_name"
          clearable
          @update:modelValue="changeFilter('filter[ofResponsable]', $event)"
        />
        <BaseSelectAdvanced
          v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
          name="statut_juridique"
          placeholder="Statut juridique"
          :options="$labels.structure_legal_status"
          :modelValue="$route.query['filter[structure.statut_juridique]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[structure.statut_juridique]', $event)"
        />
        <BaseSelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="department"
          placeholder="Département"
          :options="
            $labels.departments.map((option) => {
              return {
                key: option.key,
                label: `${option.key} - ${option.label}`,
              }
            })
          "
          :modelValue="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[department]', $event)"
        />
        <BaseInput
          v-if="['responsable'].includes($stores.auth.contextRole)"
          name="zip"
          placeholder="Code Postal"
          variant="transparent"
          :modelValue="$route.query['filter[zip]']"
          @update:modelValue="changeFilter('filter[zip]', $event)"
        />
        <BaseSelectAdvanced
          :key="`domaine-${$route.fullPath}`"
          name="domaine"
          placeholder="Domaine d'action"
          :options="$labels.domaines"
          :modelValue="$route.query['filter[ofDomaine]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[ofDomaine]', $event)"
        />
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
        <BaseSelectAdvanced
          :key="`creneaux-${$route.fullPath}`"
          name="creneaux"
          placeholder="Créneaux"
          :options="[
            { key: 'true', label: 'Oui' },
            { key: 'false', label: 'Non' },
          ]"
          :modelValue="$route.query['filter[hasCreneaux]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[hasCreneaux]', $event)"
        />
        <BaseSelectAdvanced
          :key="`is-active-${$route.fullPath}`"
          name="is-active"
          placeholder="État"
          :options="[
            { key: 'true', label: 'Activée' },
            { key: 'false', label: 'Désactivée' },
          ]"
          :modelValue="$route.query['filter[is_active]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[is_active]', $event)"
        />
        <BaseSelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Statut"
          :options="$labels.mission_workflow_states"
          :modelValue="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[state]', $event)"
        />
        <BaseSelectAdvanced
          :key="`date-${$route.fullPath}`"
          name="date"
          placeholder="Date"
          :options="[
            { key: 'incoming', label: 'À venir' },
            { key: 'in_progress', label: 'En cours' },
            { key: 'over', label: 'Passée' },
          ]"
          :modelValue="$route.query['filter[date]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[date]', $event)"
        />
        <BaseSelectAdvanced
          :key="`place-${$route.fullPath}`"
          name="place"
          placeholder="Place restante"
          :options="[
            { key: 'true', label: 'Oui' },
            { key: 'false', label: 'Non' },
          ]"
          :modelValue="$route.query['filter[place]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[place]', $event)"
        />
        <BaseSelectAdvanced
          :key="`publics_volontaires-${$route.fullPath}`"
          name="publics_volontaires"
          placeholder="Proposé aux"
          :options="[{ key: 'Mineurs', label: 'Mineurs' }]"
          :modelValue="$route.query['filter[publics_volontaires]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[publics_volontaires]', $event)"
        />
        <BaseSelectAdvanced
          :key="`publics_beneficiaires-${$route.fullPath}`"
          name="publics_beneficiaires"
          placeholder="Publics aidés"
          :options="$labels.mission_publics_beneficiaires"
          :modelValue="$route.query['filter[publics_beneficiaires]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[publics_beneficiaires]', $event)"
        />
        <BaseSelectAdvanced
          v-if="$stores.auth.contextRole == 'admin'"
          :key="`tags-${$route.fullPath}`"
          name="tags"
          placeholder="Tags"
          :options="tags"
          :modelValue="$route.query['filter[tags]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[tags]', $event)"
        />
        <div class="flex flex-wrap mb-2 gap-4">
          <BaseCheckbox
            :key="`type-1-${$route.fullPath}`"
            :option="{ key: 'presentiel', label: 'Présentiel' }"
            :is-checked="
              $route.query['filter[type]'] &&
              $route.query['filter[type]'].includes('Mission en présentiel')
            "
            transparent
            variant="button"
            @change="changeFilter('filter[type]', 'Mission en présentiel', true)"
          />
          <BaseCheckbox
            :key="`type-2-${$route.fullPath}`"
            :option="{ key: 'distance', label: 'À distance' }"
            :is-checked="
              $route.query['filter[type]'] &&
              $route.query['filter[type]'].includes('Mission à distance')
            "
            transparent
            variant="button"
            @change="changeFilter('filter[type]', 'Mission à distance', true)"
          />
          <BaseCheckbox
            :key="`type-3-${$route.fullPath}`"
            :option="{ key: 'autonomy', label: 'En autonomie' }"
            :is-checked="
              $route.query['filter[is_autonomy]'] &&
              $route.query['filter[is_autonomy]'].includes('true')
            "
            transparent
            variant="button"
            @change="changeFilter('filter[is_autonomy]', 'true', true)"
          />
        </div>
      </div>
    </template>
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

      <SearchFilters class="my-8">
        <BaseInput
          name="search"
          placeholder="Recherche par mots clés..."
          icon="RiSearchLine"
          variant="transparent"
          :modelValue="$route.query['filter[search]']"
          clearable
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <DsfrTag
            :key="`toutes-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="hasActiveFilters()"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="deleteAllFilters"
          >
            Toutes
          </DsfrTag>

          <BaseFilterSelectAdvanced
            v-if="['responsable'].includes($stores.auth.contextRole) && responsables.length"
            :key="`responsable-id-${$route.fullPath}`"
            name="responsable.id"
            placeholder="Tous les responsables"
            :options="responsables"
            attribute-key="id"
            attribute-label="full_name"
            :modelValue="$route.query['filter[responsable.id]']"
            clearable
            @update:modelValue="changeFilter('filter[responsable.id]', $event)"
          />

          <!-- <FilterInputAutocomplete
            v-if="['admin'].includes($stores.auth.contextRole)"
            :value="$route.query['filter[responsable.email]']"
            label="Tous les responsables"
            name="autocomplete"
            :options="autocompleteOptionsResponsables"
            attribute-label="full_name"
            @fetch-suggestions="onFetchSuggestionsResponsables"
            @selected="changeFilter('filter[responsable.email]', $event ? $event.email : undefined)"
          /> -->

          <DsfrTag
            :key="`state-en-attente-validation-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="
              $route.query['filter[state]'] &&
              $route.query['filter[state]'] == 'En attente de validation'
            "
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'En attente de validation')"
          >
            En attente de validation
          </DsfrTag>

          <DsfrTag
            :key="`available-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="
              $route.query['filter[available]'] && $route.query['filter[available]'] == 'available'
            "
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[available]', 'available')"
          >
            En ligne
          </DsfrTag>

          <DsfrTag
            v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
            :key="`snu-mig-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="
              $route.query['filter[is_snu_mig_compatible]'] &&
              $route.query['filter[is_snu_mig_compatible]'] == 'true'
            "
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[is_snu_mig_compatible]', 'true')"
          >
            SNU/MIG
          </DsfrTag>

          <DsfrTag
            v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
            :key="`mineurs-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="
              $route.query['filter[publics_volontaires]'] &&
              $route.query['filter[publics_volontaires]'] == 'Mineurs'
            "
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[publics_volontaires]', 'Mineurs')"
          >
            Ouverte aux mineurs
          </DsfrTag>
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
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardMission
          v-for="mission in queryResult.data"
          :key="mission.id"
          class="cursor-pointer"
          :mission="mission"
          show-state
          :show-tags="['admin'].includes($stores.auth.contextRole)"
          tabindex="0"
          @click.native="drawerMissionId = mission.id"
        />
      </div>

      <DsfrPagination
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </BaseContainerRightSidebar>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardMission from '@/components/card/CardMission.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'
import MixinExport from '@/mixins/export'
import BoxContext from '@/components/section/BoxContext.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import ButtonCreateMission from '@/components/custom/ButtonCreateMission.vue'

export default defineNuxtComponent({
  components: {
    CardMission,
    DrawerMission,
    BoxContext,
    SearchFilters,
    ButtonCreateMission,
  },
  mixins: [QueryBuilder, MixinExport],
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

    const activities = await apiFetch('/activities', {
      params: {
        pagination: 999,
        'filter[is_published]': 1,
      },
    })

    return {
      activities: activities.data,
      responsables,
    }
  },
  data() {
    return {
      loading: false,
      endpoint: '/missions',
      exportEndpoint: '/export/missions',
      queryParams: {
        include: 'template.photo,illustrations,tags',
      },
      drawerMissionId: null,
      autocompleteOptionsOrga: [],
      tags: [],
      responsablesStructures: [],
      autocompleteOptionsResponsables: [],
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        if (this.$stores.auth.contextRole === 'admin') {
          this.fetchResponsablesForAdmins(
            newQuery['filter[structure.id]'],
            oldQuery?.['filter[structure.id]']
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
    async onFetchSuggestionsResponsables(value) {
      const responsables = await apiFetch('/profiles', {
        params: {
          'filter[search]': value,
          'filter[user.role]': 'responsable',
          pagination: 6,
        },
      })
      this.autocompleteOptionsResponsables = responsables.data
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
    async onSelectOrganisation($event) {
      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          'filter[structure.name]': $event?.name ?? undefined,
          'filter[structure.id]': $event?.id ?? undefined,
          'filter[ofResponsable]': undefined,
        },
      })
    },
  },
})
</script>
