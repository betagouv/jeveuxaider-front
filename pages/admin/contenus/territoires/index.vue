<template>
  <div class="flex flex-col gap-8">
    <DrawerTerritoire :territoire-id="drawerTerritoireId" @close="drawerTerritoireId = null" @refetch="$fetch" />
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Contenus' },
          { text: 'Territoires' }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'territoire',
        'territoires',
        false
      )}`"
    >
      <template #action>
        <div class="flex space-x-2">
          <Button type="secondary" icon="RiDownload2Line" :loading="exportLoading" @click.native="handleExport">
            Exporter
          </Button>

          <Button icon="RiAddLine" @click="$router.push(`/admin/contenus/territoires/add`)">
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
          :key="`tous-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="hasActiveFilters()"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="deleteAllFilters"
        >
          Tous
        </Tag>

        <Tag
          :key="`type-dep-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'department'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[type]', 'department')"
        >
          Départements
        </Tag>

        <Tag
          :key="`type-city-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'city'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[type]', 'city')"
        >
          Villes
        </Tag>

        <Tag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 'true')"
        >
          En ligne
        </Tag>

        <Tag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 'false')"
        >
          Hors ligne
        </Tag>

        <TagSelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Tous les statuts"
          :options="$labels.territoire_workflow_states"
          :value="$route.query['filter[state]']"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
      </template>
      <template #sorts>
        <Sort
          key="sort"
          name="sort"
          transparent
          :value="$route.query['sort'] ? $route.query['sort'] : '-created_at'"
          :options="[
            { key: '-created_at', label: 'Les plus récentes' },
            { key: 'created_at', label: 'Les plus anciennes' },
            { key: '-updated_at', label: 'Date de denière modification' },
          ]"
          @input="changeFilter('sort', $event)"
        />
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="territoire in queryResult.data"
        :key="territoire.id"
        :title="territoire.name"
        :state-style="territoire.is_published ? 'success' : 'error'"
        :state-text="territoire.is_published ? 'En ligne' : 'Hors ligne'"
        :description="territoire.department ? `${territoire.department} - ${$options.filters.label(territoire.department,'departments')}` : null"
        :image-srcset="territoire.banner ? territoire.banner.urls.desktop : undefined"
        :image-src="territoire.banner ? territoire.banner.urls.original : undefined"
        @click.native="drawerTerritoireId = territoire.id"
      >
        <div class="mt-4 text-[13px] text-gray-500">
          Complétion: <span class="font-semibold">{{ territoire.completion_rate }}%</span>
        </div>
        <div class="mt-4 flex items-center">
          <Badge :color="territoire.state" plain>
            {{ territoire.state | label('territoire_workflow_states') }}
          </Badge>
          <div v-if="['admin'].includes($store.getters.contextRole)" class="text-gray-500 text-xs flex-shrink-0 ml-2">
            ID <span class="font-semibold">{{ territoire.id }}</span>
          </div>
        </div>
        <template #footer>
          <div
            class="border-t font-semibold  text-sm text-center py-4"
            :class="[
              territoire.is_published && territoire.state === 'validated' ? 'text-gray-900' : 'text-gray-400'
            ]"
          >
            {{ $options.filters.formatNumber(territoire.places_left) }} {{ $options.filters.pluralize(territoire.places_left, 'bénévole recherché', 'bénévoles recherchés', false) }}
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
import DrawerTerritoire from '@/components/drawer/DrawerTerritoire'
import MixinExport from '@/mixins/export'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Card,
    DrawerTerritoire,
    SearchFilters,
    Pagination,
    Breadcrumb,
    Tag,
    Button
  },
  mixins: [QueryBuilder, MixinExport],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/territoires',
      exportEndpoint: '/export/territoires',
      queryParams: {
        include: 'banner',
        append: ['places_left', 'completion_rate']
      },
      drawerTerritoireId: null,
      drawerTerritoire: null
    }
  },
  methods: {

  }
}
</script>
