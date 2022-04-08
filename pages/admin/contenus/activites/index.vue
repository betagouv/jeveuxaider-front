<template>
  <div class="flex flex-col gap-8">
    <DrawerActivity :activity-id="drawerActivityId" @close="drawerActivityId = null" />

    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Contenus' },
          { label: 'Activités' }
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
          <nuxt-link :to="`/admin/contenus/activites/add`">
            <Button size="lg" icon="PlusIcon">
              Nouveau
            </Button>
          </nuxt-link>
        </div>
      </template>
    </SectionHeading>
    <Input
      name="search"
      placeholder="Recherche par mots clés..."
      icon="SearchIcon"
      variant="transparent"
      :value="$route.query['filter[search]']"
      clearable
      @input="changeFilter('filter[search]', $event)"
    />

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
          </div>
        </template>
        <template #footer>
          <div
            class="border-t text-gray-900 font-semibold  text-sm text-center py-4"
          >
            @TODO
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
import DrawerActivity from '@/components/drawer/DrawerActivity'

export default {
  components: {
    Card,
    DrawerActivity
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/activities',
      queryParams: {
        include: 'banner,domaines'
      },
      drawerActivityId: null
    }
  }
}
</script>
