<template>
  <div class="flex flex-col gap-8">
    <DrawerDomaine :domaine-id="drawerDomaineId" @close="drawerDomaineId = null" @refetch="$fetch" />
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Contenus' },
          { text: 'Domaines d\'action' }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'domaine',
        'domaines d\'action',
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button icon="RiAddLine" @click="$router.push(`/admin/contenus/domaines/add`)">
            Nouveau
          </Button>
        </div>
      </template>
    </SectionHeading>

    <SearchFilters>
      <Input
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <Tag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="hasActiveFilters()"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="deleteAllFilters"
        >
          Toutes
        </Tag>

        <Tag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[published]'] && $route.query['filter[published]'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[published]', 'true')"
        >
          En ligne
        </Tag>

        <Tag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[published]'] && $route.query['filter[published]'] == 'false'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[published]', 'false')"
        >
          Hors ligne
        </Tag>
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
            class="border-t font-semibold  text-sm text-center py-4"
            :class="[
              domaine.published ? 'text-gray-900' : 'text-gray-400'
            ]"
          >
            {{
              domaine.places_left
                | pluralize('bénévole recherché', 'bénévoles recherchés')
            }}
          </div>
        </template>
      </Card>
    </div>

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
import Card from '@/components/card/Card'
import DrawerDomaine from '@/components/drawer/DrawerDomaine'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Card,
    DrawerDomaine,
    SearchFilters,
    Pagination,
    Breadcrumb,
    Button,
    Tag
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/domaines',
      queryParams: {
        include: 'banner',
        append: 'places_left'
      },
      drawerDomaineId: null
    }
  }
}
</script>
