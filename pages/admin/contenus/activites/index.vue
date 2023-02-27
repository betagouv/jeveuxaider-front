<template>
  <div class="flex flex-col gap-8">
    <DrawerActivity :activity-id="drawerActivityId" @close="drawerActivityId = null" @refetch="$fetch" />

    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Contenus' },
          { text: 'Activités' }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'activité',
        'activités',
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button icon="RiAddLine" @click="$router.push(`/admin/contenus/activites/add`)">
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

        <FilterSelectAdvanced
          name="domaine"
          placeholder="Tous les domaines"
          :options="$labels.domaines"
          :value="$route.query['filter[domaines.id]']"
          clearable
          @input="changeFilter('filter[domaines.id]', $event)"
        />
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="activity in queryResult.data"
        :key="activity.id"
        :title="activity.name"
        :state-style="activity.is_published ? 'success' : 'error'"
        :state-text="activity.is_published ? 'En ligne' : 'Hors ligne'"
        :description="`Réalisez une mission de bénévolat ${activity.name}`"
        :image-srcset="activity.banner ? activity.banner.urls.desktop : undefined"
        :image-src="activity.banner ? activity.banner.urls.original : undefined"
        @click.native="drawerActivityId = activity.id"
      >
        <template #badges>
          <div v-if="activity.domaines.length" class="mb-2 flex gap-2">
            <Badge class="uppercase" :color="activity.domaines[0].id">
              {{ activity.domaines[0].name }}
            </Badge>
            <Badge v-if="activity.domaines.length - 1 > 0" color="gray-light">
              +{{ activity.domaines.length - 1 }}
            </Badge>
          </div>
        </template>
        <div class="mt-4 text-[13px] text-gray-500">
          Complétion: <span class="font-semibold">{{ activity.completion_rate }}%</span>
        </div>
        <template #footer>
          <div
            class="border-t font-semibold  text-sm text-center py-4"
            :class="[
              activity.is_published ? 'text-gray-900' : 'text-gray-400'
            ]"
          >
            {{
              activity.places_left
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
import DrawerActivity from '@/components/drawer/DrawerActivity'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Card,
    DrawerActivity,
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
      endpoint: '/activities',
      queryParams: {
        include: 'banner,domaines',
        append: ['places_left', 'completion_rate']
      },
      drawerActivityId: null
    }
  }
}
</script>
