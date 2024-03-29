<template>
  <div class="container">
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />

    <DsfrBreadcrumb
      :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Utilisateurs' }]"
    />

    <div>
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} utilisateurs`"
        :loading="queryLoading"
      >
        <template #action>
          <div class="flex space-x-2">
            <DsfrButton
              v-if="
                ['referent'].includes($stores.auth.contextRole) &&
                $stores.auth.profile.can_export_profiles
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
      <SearchFilters class="mt-8 mb-12" @reset-filters="deleteAllFilters">
        <DsfrInput
          type="search"
          size="lg"
          placeholder="Recherche par prénom, nom ou e-mail"
          icon="RiSearchLine"
          :modelValue="$route.query['filter[search]']"
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <div class="flex gap-3 items-center">
            <span class="text-base">Trier par</span>
            <BaseFilterSelectAdvanced
              name="sort"
              :options="[
                { key: '-created_at', label: 'Date de création' },
                {
                  key: '-participations_validated_count',
                  label: 'Nombre de participations réalisées',
                },
              ]"
              :modelValue="$route.query['sort']"
              placeholder="Date de création"
              @update:modelValue="changeFilter('sort', $event)"
            />
            <div aria-hidden class="bg-gray-600 mx-1 w-[1px] h-6" />
          </div>

          <!-- <DsfrTag
            as="button"
            size="md"
            context="selectable"
            :is-active="!hasActiveFilters"
            @click.native="deleteAllFilters"
          >
            Tous
          </DsfrTag> -->

          <template v-for="visibleFilter in visibleFilters" :key="visibleFilter">
            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'user.role'"
              :modelValue="$route.query['filter[user.role]']"
              name="user_role"
              :options="[
                { key: 'responsable', label: 'Responsable' },
                { key: 'responsable_territoire', label: 'Responsable territorial' },
                { key: 'tete_de_reseau', label: 'Tête de réseau' },
                { key: 'referent', label: 'Référent départemental' },
                { key: 'referent_regional', label: 'Référent régional' },
                { key: 'admin', label: 'Modérateur' },
              ]"
              placeholder="Rôle"
              @update:modelValue="handleRoleChange"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'referent_department'"
              :modelValue="$route.query['filter[referent_department]']"
              name="referent-department"
              :options="
                $labels.departments.map((option) => {
                  return {
                    key: option.key,
                    label: `${option.key} - ${option.label}`,
                  }
                })
              "
              placeholder="Département du référent"
              @update:modelValue="changeFilter('filter[referent_department]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'referent_region'"
              :modelValue="$route.query['filter[referent_region]']"
              name="referent-region"
              :options="$labels.regions"
              placeholder="Région du référent"
              @update:modelValue="changeFilter('filter[referent_region]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'is_visible'"
              :modelValue="$route.query['filter[is_visible]']"
              name="is_visible"
              :options="[
                { key: 'true', label: 'Visible' },
                { key: 'false', label: 'Invisible' },
              ]"
              placeholder="Visiblilité dans la recherche"
              @update:modelValue="changeFilter('filter[is_visible]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'min_participations'"
              :modelValue="$route.query['filter[min_participations]']"
              name="min_participations"
              :options="[
                { key: 1, label: 'Au moins 1' },
                { key: 3, label: 'Au moins 3' },
                { key: 5, label: 'Au moins 5' },
                { key: 10, label: 'Au moins 10' },
              ]"
              placeholder="Participations réalisées"
              @update:modelValue="changeFilter('filter[min_participations]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'department'"
              :modelValue="$route.query['filter[department]']?.split(',')"
              name="department"
              :options="
                $labels.departments.map((option) => {
                  return {
                    key: option.key,
                    label: `${option.key} - ${option.label}`,
                  }
                })
              "
              placeholder="Département"
              :searchable="true"
              multiple
              @update:modelValue="changeFilter('filter[department]', $event, true)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'zip'"
              :modelValue="$route.query['filter[zip]']"
              label="Code postal"
              name="autocomplete-zips"
              :options="autocompleteOptionsZips"
              :loading="loadingFetchZips"
              attribute-key="zip"
              hide-attribute-key
              attribute-right-label="labelRight"
              @fetch-suggestions="onFetchSuggestionsZips"
              @selected="changeFilter('filter[zip]', $event?.zip)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'tags' && $stores.auth.contextRole == 'admin'"
              :modelValue="$route.query['filter[tags]']"
              name="tags"
              :options="tags"
              placeholder="Tags"
              @update:modelValue="changeFilter('filter[tags]', $event)"
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
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CardProfile
          v-for="profile in queryResult.data"
          :key="profile.id"
          :profile="profile"
          @click.left="drawerProfileId = profile.id"
          @click.middle="
            navigateTo(`/admin/utilisateurs/${profile.id}`, { open: { target: '_blank' } })
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
import MixinExport from '@/mixins/export'
import CardProfile from '@/components/card/CardProfile.vue'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import MixinFiltersVisibility from '@/mixins/filters-visibility'

export default defineNuxtComponent({
  components: {
    CardProfile,
    DrawerProfile,
    SearchFilters,
  },
  mixins: [QueryBuilder, MixinExport, MixinFiltersVisibility],
  async setup() {
    const { $stores } = useNuxtApp()

    definePageMeta({
      middleware: ['authenticated'],
    })

    if (!['admin', 'referent'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
  },
  computed: {
    allFilters() {
      return [
        'user.role',
        this.$route.query['filter[user.role]'] === 'referent' && 'referent_department',
        this.$route.query['filter[user.role]'] === 'referent_regional' && 'referent_region',
        'is_visible',
        'min_participations',
        'department',
        'zip',
        'tags',
      ].filter((f) => f)
    },
    alwaysVisibleFilters() {
      return [
        'user.role',
        ['admin'].includes(this.$stores.auth.contextRole) && 'department',
      ].filter((f) => f)
    },
  },
  data() {
    return {
      loading: false,
      loadingFetchZips: false,
      endpoint: '/profiles',
      exportEndpoint: '/export/profiles',
      queryParams: {
        include: 'user,avatar',
      },
      drawerProfileId: null,
      tags: [],
      autocompleteOptionsZips: [],
    }
  },
  async mounted() {
    const terms = await apiFetch('/vocabularies/profiles/terms', {
      params: { pagination: 50 },
    })
    this.tags = terms.data.map((tag) => {
      return { key: tag.id, label: tag.name }
    })
  },
  methods: {
    handleRoleChange(role) {
      if (this.$route.query?.['filter[referent_region]']) {
        delete this.$route.query['filter[referent_region]']
      }
      if (this.$route.query?.['filter[referent_department]']) {
        delete this.$route.query['filter[referent_department]']
      }
      this.changeFilter('filter[user.role]', role)
    },
    async onFetchSuggestionsZips(value) {
      this.loadingFetchZips = true
      this.autocompleteOptionsZips = await useGeolocationFetch(value, {
        context: 'filter',
        inputGeoType: 'municipality',
      })
      this.loadingFetchZips = false
    },
  },
})
</script>
