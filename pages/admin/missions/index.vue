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
              placeholder="Les plus récentes"
              @update:modelValue="changeFilter('sort', $event)"
            />
            <div aria-hidden class="bg-gray-600 mx-1 w-[1px] h-6" />
          </div>

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

          <BaseFilterSelectAdvanced
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

          <!-- @todo : le reste de + -->

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

          <BaseFilterInputAutocomplete
            v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
            v-model="selectedOrganisation"
            label="Organisation"
            name="autocomplete-organisation"
            :options="autocompleteOptionsOrga"
            @fetch-suggestions="onFetchSuggestionsOrga"
            @selected="onSelectOrganisation"
          />

          <BaseFilterSelectAdvanced
            v-if="responsablesStructures.length && ['admin'].includes($stores.auth.contextRole)"
            :key="`responsable-${$route.fullPath}`"
            name="responsable"
            :options="responsablesStructures"
            :modelValue="$route.query['filter[ofResponsable]']"
            attribute-key="id"
            attribute-label="full_name"
            placeholder="Responsable"
            @update:modelValue="changeFilter('filter[ofResponsable]', $event)"
          />

          <BaseFilterSelectAdvanced
            v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
            key="statut_juridique"
            name="statut_juridique"
            :options="$labels.structure_legal_status"
            :modelValue="$route.query['filter[structure.statut_juridique]']"
            placeholder="Statut juridique"
            @update:modelValue="changeFilter('filter[structure.statut_juridique]', $event)"
          />

          <BaseFilterSelectAdvanced
            key="department"
            name="department"
            :options="
              $labels.departments.map((option) => {
                return {
                  key: option.key,
                  label: `${option.key} - ${option.label}`,
                }
              })
            "
            :modelValue="$route.query['filter[department]']"
            placeholder="Département"
            @update:modelValue="changeFilter('filter[department]', $event)"
          />

          <BaseFilterInputAutocomplete
            :modelValue="$route.query['filter[zip]']"
            label="Code postal"
            name="autocomplete-zips"
            :options="autocompleteOptionsZips"
            attribute-key="zip"
            hide-attribute-key
            attribute-right-label="zip"
            @fetch-suggestions="onFetchSuggestionsZips"
            @selected="changeFilter('filter[zip]', $event?.zip)"
          />

          <BaseFilterSelectAdvanced
            key="domaine"
            name="domaine"
            :options="$labels.domaines"
            :modelValue="$route.query['filter[ofDomaine]']"
            placeholder="Domaine d'action"
            @update:modelValue="changeFilter('filter[ofDomaine]', $event)"
          />

          <BaseFilterSelectAdvanced
            :modelValue="$route.query['filter[ofActivity]']"
            key="activity_id"
            name="activity_id"
            :options="activities"
            attribute-key="id"
            attribute-label="name"
            placeholder="Activité"
            options-class="!min-w-[300px]"
            @update:modelValue="changeFilter('filter[ofActivity]', $event)"
          />

          <BaseFilterSelectAdvanced
            :modelValue="$route.query['filter[hasCreneaux]']"
            key="creneaux"
            name="creneaux"
            :options="[
              { key: 'true', label: 'Avec créneaux' },
              { key: 'false', label: 'Sans créneaux' },
            ]"
            placeholder="Créneaux"
            @update:modelValue="changeFilter('filter[hasCreneaux]', $event)"
          />

          <BaseFilterSelectAdvanced
            :modelValue="$route.query['filter[is_active]']"
            name="is-active"
            :options="[
              { key: 'true', label: 'Missions activées' },
              { key: 'false', label: 'Missions désactivées' },
            ]"
            placeholder="État"
            @update:modelValue="changeFilter('filter[is_active]', $event)"
          />

          <BaseFilterSelectAdvanced
            :modelValue="$route.query['filter[state]']"
            name="state"
            :options="$labels.mission_workflow_states"
            placeholder="Statut"
            @update:modelValue="changeFilter('filter[state]', $event)"
          />

          <BaseFilterSelectAdvanced
            :modelValue="$route.query['filter[publics_beneficiaires]']"
            name="publics_beneficiaires"
            :options="$labels.mission_publics_beneficiaires"
            placeholder="Publics aidés"
            options-class="!min-w-[300px]"
            @update:modelValue="changeFilter('filter[publics_beneficiaires]', $event)"
          />

          <BaseFilterSelectAdvanced
            v-if="$stores.auth.contextRole == 'admin'"
            :modelValue="$route.query['filter[tags]']"
            name="tags"
            :options="tags"
            placeholder="Tags"
            @update:modelValue="changeFilter('filter[tags]', $event)"
          />

          <BaseFilterSelectAdvanced
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
            as="button"
            size="md"
            context="selectable"
            :is-selected="
              $route.query['filter[is_autonomy]'] && $route.query['filter[is_autonomy]'] == 'true'
            "
            is-selected-class="border-gray-50 bg-gray-50"
            @click="changeFilter('filter[is_autonomy]', 'true')"
          >
            En autonomie
          </DsfrTag>
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardMission from '@/components/card/CardMission.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'
import MixinExport from '@/mixins/export'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import ButtonCreateMission from '@/components/custom/ButtonCreateMission.vue'

export default defineNuxtComponent({
  components: {
    CardMission,
    DrawerMission,
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
      autocompleteOptionsZips: [],
    }
  },
  computed: {
    selectedOrganisation() {
      return {
        key: Number(this.$route.query['filter[structure.id]']) || undefined,
        label: this.$route.query['organisation_name'],
      }
    },
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
    async onFetchSuggestionsOrga(value) {
      const organisations = await apiFetch('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsOrga = organisations.data
    },
    async onFetchSuggestionsZips(value) {
      const trimmedValue = value?.trim()
      if (!trimmedValue || trimmedValue.length < 3) {
        this.autocompleteOptionsZips = []
        return
      }

      // First character must be a letter or a number to avoid error 400
      var re = new RegExp(/^[a-z0-9]$/i)
      if (!re.test(trimmedValue[0])) {
        this.autocompleteOptionsZips = []
        return
      }

      const suggestions = await $fetch('https://api-adresse.data.gouv.fr/search', {
        params: {
          q: trimmedValue,
          limit: 5,
          type: 'municipality',
        },
      })

      const formatOptions = suggestions.features.map((option) => {
        return {
          id: option.properties.id,
          name: option.properties.city,
          zip: option.properties.postcode,
        }
      })
      this.autocompleteOptionsZips = formatOptions
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
      const queryOrganisationName =
        $event !== null && this.$route.query['organisation_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryOrganisationId =
        $event !== null && Number(this.$route.query['filter[structure.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          organisation_name: queryOrganisationName,
          'filter[structure.id]': queryOrganisationId,
          'filter[ofResponsable]': undefined,
        },
      })
    },
  },
})
</script>
