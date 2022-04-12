<template>
  <div class="flex flex-col gap-8">
    <DrawerTerritoire :territoire-id="drawerTerritoireId" @close="drawerTerritoireId = null" @refetch="$fetch" />
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Contenus' },
          { label: 'Territoires' }
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
          <Button icon="DownloadIcon" variant="white" size="lg" :loading="exportLoading" @click.native="handleExport">
            Exporter
          </Button>
          <nuxt-link :to="`/admin/contenus/territoires/add`">
            <Button size="lg" icon="PlusIcon">
              Nouveau
            </Button>
          </nuxt-link>
        </div>
      </template>
    </SectionHeading>
    <div>
      <Input
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
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
          :key="`state-en-attente-validation-${$route.fullPath}`"
          :option="{key: 'en-attente-validation', label:'En attente de validation'}"
          :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == 'waiting'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', 'waiting')"
        />
        <Checkbox
          :key="`type-dep-${$route.fullPath}`"
          :option="{key: 'department', label:'Départements'}"
          :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'] == 'department'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[type]', 'department')"
        />
        <Checkbox
          :key="`type-city-${$route.fullPath}`"
          :option="{key: 'city', label:'Villes'}"
          :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'] == 'city'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[type]', 'city')"
        />
      </div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="territoire in queryResult.data"
        :key="territoire.id"
        :title="territoire.name"
        :state-style="territoire.state"
        :state-text="$options.filters.label(territoire.state, 'mission_template_workflow_states')"
        :description="territoire.department ? `${territoire.department} - ${$options.filters.label(territoire.department,'departments')}` : null"
        :image-srcset="territoire.banner ? territoire.banner.urls.desktop : undefined"
        :image-src="territoire.banner ? territoire.banner.urls.original : undefined"
        @click.native="drawerTerritoireId = territoire.id"
      >
        <template #footer>
          <div
            class="border-t text-gray-900 font-semibold  text-sm text-center py-4"
          >
            {{ $options.filters.formatNumber(territoire.places_left) }} {{ $options.filters.pluralize(territoire.places_left, 'bénévole recherché', 'bénévoles recherchés', false) }}
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
import DrawerTerritoire from '@/components/drawer/DrawerTerritoire'
import MixinExport from '@/mixins/export'

export default {
  components: {
    Card,
    DrawerTerritoire
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
        append: 'places_left'
      },
      drawerTerritoireId: null,
      drawerTerritoire: null
    }
  },
  methods: {

  }
}
</script>
