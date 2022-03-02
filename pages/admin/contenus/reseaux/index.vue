<template>
  <div class="flex flex-col gap-8">
    <DrawerReseau :reseau-id="drawerReseauId" @close="drawerReseauId = null" />
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
      </div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="reseau in queryResult.data"
        :key="reseau.id"
        :title="reseau.name"
        :state-text="reseau.is_published ? 'En ligne' : 'Hors ligne'"
        :state-style="reseau.is_published ? 'validated' : 'error'"
        :description="`${reseau.structures_count} antennes`"
        :image-url="illustration(reseau)"
        @click.native="drawerReseauId = reseau.id"
      >
        <template #footer>
          <div
            class="border-t text-gray-900 font-semibold  text-sm text-center py-4"
          >
            {{ $options.filters.formatNumber(reseau.missions_count) }} {{ $options.filters.pluralize(reseau.missions_count, 'mission', 'missions', false) }}
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

export default {
  components: {
    Card,
    DrawerReseau
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
        include: 'illustrations,overrideImage1'
      },
      drawerReseauId: null,
      drawerReseau: null
    }
  },
  methods: {
    illustration (reseau) {
      return reseau.override_image1?.urls.large ??
        reseau.illustrations[0]?.urls.large ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    }
  }
}
</script>
