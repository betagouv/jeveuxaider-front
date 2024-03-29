<template>
  <div class="flex flex-col gap-8">
    <DrawerTemoignage
      :temoignage-id="drawerTemoignageId"
      @close="drawerTemoignageId = null"
      @updated="fetch()"
      @refetch="fetch()"
    />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Administration', to: '/admin' }, { text: 'Témoignages' }]" />
      </Teleport>
    </ClientOnly>
    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'témoignage',
        'témoignages',
        false
      )}`"
      :loading="queryLoading"
    />
    <SearchFilters class="mb-4" @reset-filters="deleteAllFilters">
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Rechercher par mots clés, email, nom"
        icon="RiSearchLine"
        :modelValue="$route.query['filter[search]']"
        @update:modelValue="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <!-- <Tag
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click.native="deleteAllFilters"
        >
          Tous
        </Tag> -->

        <Tag
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'
          "
          @click.native="changeFilter('filter[is_published]', 'true')"
        >
          En ligne
        </Tag>

        <Tag
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'
          "
          @click.native="changeFilter('filter[is_published]', 'false')"
        >
          Hors ligne
        </Tag>

        <BaseFilterSelectAdvanced
          name="state"
          placeholder="Toutes les notes"
          :options="$labels.testimonial_grade"
          :modelValue="$route.query['filter[grade]']?.split(',').map((i) => parseInt(i))"
          clearable
          multiple
          @update:modelValue="changeFilter('filter[grade]', $event, true)"
        />

        <template v-if="$stores.auth.contextRole === 'admin'">
          <BaseFilterInputAutocomplete
            v-model="selectedOrganisation"
            label="Toutes les organisations"
            name="autocomplete-organisation"
            :options="autocompleteOptionsOrganisations"
            :loading="loadingFetchOrganisations"
            @fetch-suggestions="onFetchSuggestionsOrganisations"
            @selected="onSelectOrganisation"
          />
        </template>
      </template>
    </SearchFilters>

    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <CardTemoignage
        v-for="temoignage in queryResult.data"
        :key="temoignage.id"
        class="cursor-pointer"
        :temoignage="temoignage"
        @click.native="drawerTemoignageId = temoignage.id"
      />
    </div>

    <CustomEmptyState v-if="queryResult.total === 0 && !queryLoading" />

    <Pagination
      class="mt-6"
      :current-page="queryResult.current_page"
      :total-rows="queryResult.total"
      :per-page="queryResult.per_page"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardTemoignage from '@/components/card/CardTemoignage.vue'
import DrawerTemoignage from '@/components/drawer/DrawerTemoignage.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default defineNuxtComponent({
  components: {
    CardTemoignage,
    DrawerTemoignage,
    SearchFilters,
    Pagination,
    Breadcrumb,
    Tag,
  },
  mixins: [QueryBuilder],
  setup() {
    const { $stores } = useNuxtApp()

    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }
  },
  computed: {
    selectedOrganisation() {
      return {
        key: Number(this.$route.query['filter[participation.mission.structure.id]']) || undefined,
        label: this.$route.query['filter[organisation]'],
      }
    },
  },
  data() {
    return {
      endpoint: '/temoignages',
      queryParams: {},
      drawerTemoignageId: null,
      autocompleteOptionsOrganisations: [],
      loadingFetchOrganisations: false,
    }
  },
  methods: {
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
    async onSelectOrganisation($event) {
      const queryOrganisationName =
        $event !== null && this.$route.query['filter[organisation]'] !== $event?.name
          ? $event.name
          : undefined
      const queryOrganisationId =
        $event !== null &&
        Number(this.$route.query['filter[participation.mission.structure.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          'filter[organisation]': queryOrganisationName,
          'filter[participation.mission.structure.id]': queryOrganisationId,
        },
      })
    },
  },
})
</script>
