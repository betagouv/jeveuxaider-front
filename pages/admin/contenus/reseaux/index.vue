<template>
  <div class="flex flex-col gap-8">
    <DrawerReseau :reseau-id="drawerReseauId" @close="drawerReseauId = null" @refetch="$fetch" />
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Contenus' },
          { label: 'Réseaux' }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'réseau',
        'réseaux',
        false
      )}`"
    >
      <template #action>
        <div class="flex space-x-2">
          <Button icon="DownloadIcon" variant="white" size="lg" :loading="exportLoading" @click.native="handleExport">
            Exporter
          </Button>
          <nuxt-link :to="`/admin/contenus/reseaux/add`">
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
          :option="{key: true, label:'En ligne'}"
          :is-checked="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 1"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[is_published]', 1)"
        />
        <Checkbox
          :key="`unpublished-${$route.fullPath}`"
          :option="{key: 0, label: 'Hors ligne'}"
          :is-checked="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 0"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[is_published]', 0)"
        />
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="reseau in queryResult.data"
        :key="reseau.id"
        :title="reseau.name"
        :state-text="reseau.is_published ? 'En ligne' : 'Hors ligne'"
        :state-style="reseau.is_published ? 'validated' : 'error'"
        :description="`${reseau.structures_count} antennes`"
        :image-srcset="illustrationSrcset(reseau)"
        :image-src="illustrationSrc(reseau)"
        @click.native="drawerReseauId = reseau.id"
      >
        <template #footer>
          <div
            class="border-t font-semibold  text-sm text-center py-4"
            :class="[
              reseau.is_published ? 'text-gray-900' : 'text-gray-400'
            ]"
          >
            {{ $options.filters.formatNumber(reseau.places_left) }} {{ $options.filters.pluralize(reseau.places_left, 'bénévole recherché', 'bénévoles recherchés', false) }}
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
import DrawerReseau from '@/components/drawer/DrawerReseau'
import MixinExport from '@/mixins/export'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default {
  components: {
    Card,
    DrawerReseau,
    SearchFilters
  },
  mixins: [QueryBuilder, MixinExport],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/reseaux',
      exportEndpoint: '/export/reseaux',
      queryParams: {
        include: 'illustrations,overrideImage1,structuresCount',
        append: 'places_left'
      },
      drawerReseauId: null,
      drawerReseau: null
    }
  },
  methods: {
    illustrationSrcset (reseau) {
      return reseau.override_image1?.urls.large ??
        reseau.illustrations[0]?.urls.large ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
    illustrationSrc (reseau) {
      return reseau.override_image1?.urls.original ??
        reseau.illustrations[0]?.urls.original ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
</script>
