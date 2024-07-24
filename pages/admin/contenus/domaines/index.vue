<template>
  <div class="flex flex-col gap-8">
    <DrawerDomaine :domaine-id="drawerDomaineId" @close="drawerDomaineId = null" @refetch="fetch" />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Contenus' },
            { text: 'Domaines d\'action' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'domaine',
        'domaines d\'action',
        false
      )}`"
      :loading="queryLoading"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <DsfrButton icon="RiAddLine" @click="$router.push(`/admin/contenus/domaines/add`)">
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
        <DsfrTag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[published]'] && $route.query['filter[published]'] == 'true'
          "
          @click.native="changeFilter('filter[published]', 'true')"
        >
          En ligne
        </DsfrTag>

        <DsfrTag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[published]'] && $route.query['filter[published]'] == 'false'
          "
          @click.native="changeFilter('filter[published]', 'false')"
        >
          Hors ligne
        </DsfrTag>
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="domaine in queryResult.data"
        :key="domaine.id"
        :title="domaine.name"
        :state-style="domaine.published ? 'success' : 'error'"
        :state-text="domaine.published ? 'En ligne' : 'Hors ligne'"
        :description="domaine.title"
        :image-srcset="domaine.banner ? domaine.banner.urls.card : undefined"
        :image-src="domaine.banner ? domaine.banner.urls.original : undefined"
        tabindex="0"
        @click.native="drawerDomaineId = domaine.id"
      >
        <template #footer>
          <div
            class="border-t font-semibold text-sm text-center py-4"
            :class="[domaine.published ? 'text-gray-900' : 'text-gray-400']"
          >
            {{
              $filters.pluralize(domaine.places_left, 'bénévole recherché', 'bénévoles recherchés')
            }}
          </div>
        </template>
      </Card>
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
import Card from '@/components/card/Card.vue'
import DrawerDomaine from '@/components/drawer/DrawerDomaine.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    Card,
    DrawerDomaine,
    SearchFilters,
    Pagination,
    Breadcrumb,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      endpoint: '/domaines',
      queryParams: {
        include: 'banner',
        append: 'places_left',
      },
      drawerDomaineId: null,
    }
  },
})
</script>
