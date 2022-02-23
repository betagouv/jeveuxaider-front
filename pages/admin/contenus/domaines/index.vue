<template>
  <div class="container">
    <DrawerDomaine :domaine-id="drawerDomaineId" @close="drawerDomaineId = null" />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Domaines d\'action' }
      ]"
    />

    <div class="grid grid-cols-5 py-12">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <SecondaryMenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-8">
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
                  <Button size="lg" :loading="loading" icon="PlusIcon">
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
              v-for="domaine in queryResult.data"
              :key="domaine.id"
              :title="domaine.name"
              :state-style="domaine.published ? 'success' : 'error'"
              :state-text="domaine.published ? 'En ligne' : 'Hors ligne'"
              :description="domaine.title"
              :image-url="domaine.banner ? domaine.banner.urls.card : undefined"
              @click.native="drawerDomaineId = domaine.id"
            >
              <template #footer>
                <div
                  class="border-t text-gray-900 font-semibold  text-sm text-center py-4 opacity-25"
                >
                  @TODO
                  {{ $options.filters.formatNumber(domaine.missions_count) }} {{ $options.filters.pluralize(domaine.missions_count, 'mission', 'missions', false) }}
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
      </div>
    </div>
  </div>
</template>

<script>
import SecondaryMenuAdmin from '@/components/section/admin/SecondaryMenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import Card from '@/components/card/Card'
import DrawerDomaine from '@/components/drawer/DrawerDomaine'

export default {
  components: {
    SecondaryMenuAdmin,
    Card,
    DrawerDomaine
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/domaines',
      queryParams: {
        include: 'banner'
      },
      drawerDomaineId: null
    }
  }
}
</script>
