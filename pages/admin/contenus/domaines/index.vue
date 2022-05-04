<template>
  <div class="flex flex-col gap-8">
    <DrawerDomaine :domaine-id="drawerDomaineId" @close="drawerDomaineId = null" @refetch="$fetch" />
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Contenus' },
          { label: 'Domaines d\'action' }
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
          <nuxt-link :to="`/admin/contenus/domaines/add`">
            <Button size="lg" icon="PlusIcon">
              Nouveau
            </Button>
          </nuxt-link>
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
        <Checkbox
          :key="`toutes-${$route.fullPath}`"
          :option="{key: 'toutes', label:'Toutes'}"
          :is-checked="hasActiveFilters()"
          variant="button"
          size="xs"
          transparent
          @change="deleteAllFilters()"
        />
        <Checkbox
          :key="`published-${$route.fullPath}`"
          :option="{key: 'true', label:'En ligne'}"
          :is-checked="$route.query['filter[published]'] && $route.query['filter[published]'] == 'true'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[published]', 'true')"
        />
        <Checkbox
          :key="`unpublished-${$route.fullPath}`"
          :option="{key: 'false', label: 'Hors ligne'}"
          :is-checked="$route.query['filter[published]'] && $route.query['filter[published]'] == 'false'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[published]', 'false')"
        />
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

export default {
  components: {
    Card,
    DrawerDomaine,
    SearchFilters
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
