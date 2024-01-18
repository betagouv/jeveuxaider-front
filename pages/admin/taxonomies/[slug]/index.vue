<template>
  <div v-if="vocabulary" class="flex flex-col gap-8">
    <DrawerTerm :term-id="drawerTermId" @close="drawerTermId = null" @deleted="fetch()" />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <DsfrBreadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Taxonomies' },
            { text: vocabulary.name },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${vocabulary.name} - ${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'tag',
        `tags`,
        false
      )}`"
      :loading="queryLoading"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <DsfrButton
            icon="RiAddLine"
            @click="
              $router.push(
                `/admin/taxonomies/${$route.params.slug}/add?redirect=/admin/taxonomies/${$route.params.slug}`
              )
            "
          >
            Nouveau
          </DsfrButton>
        </div>
      </template>
    </BaseSectionHeading>
    <SearchFilters class="mb-4" @reset-filters="deleteAllFilters">
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        :modelValue="$route.query['filter[search]']"
        @update:modelValue="changeFilter('filter[search]', $event)"
      />

      <template #prefilters>
        <!-- <DsfrTag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click.native="deleteAllFilters"
        >
          Toutes
        </DsfrTag> -->

        <DsfrTag
          :key="`terms-with-related-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[has_related]'] && $route.query['filter[has_related]'] == 'yes'
          "
          @click.native="changeFilter('filter[has_related]', 'yes')"
        >
          Avec des liaisons
        </DsfrTag>

        <DsfrTag
          :key="`terms-without-related-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[has_related]'] && $route.query['filter[has_related]'] == 'no'
          "
          @click.native="changeFilter('filter[has_related]', 'no')"
        >
          Sans liaison
        </DsfrTag>
        <DsfrTag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'
          "
          @click.native="changeFilter('filter[is_published]', 'true')"
        >
          En ligne
        </DsfrTag>

        <DsfrTag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'
          "
          @click.native="changeFilter('filter[is_published]', 'false')"
        >
          Hors ligne
        </DsfrTag>
      </template>
    </SearchFilters>

    <BaseTable v-if="queryResult.total">
      <BaseTableHead>
        <BaseTableHeadCell>Nom</BaseTableHeadCell>
        <BaseTableHeadCell>Liaisons</BaseTableHeadCell>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow
          v-for="term in queryResult.data"
          :key="term.id"
          class="cursor-pointer"
          @click.native="drawerTermId = term.id"
        >
          <BaseTableRowCell>
            <div class="font-medium text-gray-900">
              {{ term.name }}
            </div>
            <div class="text-gray-500">
              #{{ term.id }} -
              {{ term.is_published ? 'En ligne' : 'Hors ligne' }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell>
            {{ term.related_count ? $filters.pluralize(term.related_count, 'liaison') : '-' }}
          </BaseTableRowCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>

    <CustomEmptyState v-if="queryResult.total === 0 && !queryLoading" />

    <DsfrPagination
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
import DrawerTerm from '@/components/drawer/DrawerTerm.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default defineNuxtComponent({
  components: {
    DrawerTerm,
    SearchFilters,
  },
  mixins: [QueryBuilder],
  async setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })

    const route = useRoute()

    const vocabulary = await apiFetch(`/vocabularies/${route.params.slug}`)
    return {
      vocabulary,
    }
  },
  data() {
    return {
      endpoint: `/vocabularies/${this.$route.params.slug}/terms`,
      drawerTermId: null,
    }
  },
  computed: {},
  methods: {
    onSubmit() {
      //
    },
  },
})
</script>

<style></style>
