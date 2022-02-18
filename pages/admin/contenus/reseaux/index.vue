<template>
  <div class="container">
    <DrawerReseau :reseau-id="drawerReseauId" @close="drawerReseauId = null" />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Réseaux' }
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
          <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} réseaux`">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/contenus/reseaux/add`">
                  <Button size="lg" :loading="loading" icon="PlusIcon">
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
      </div>
    </div>
  </div>
</template>

<script>
import SecondaryMenuAdmin from '@/components/section/admin/SecondaryMenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import Card from '@/components/card/Card'
import DrawerReseau from '@/components/drawer/DrawerReseau'

export default {
  components: {
    SecondaryMenuAdmin,
    Card,
    DrawerReseau
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/reseaux',
      drawerReseauId: null,
      drawerReseau: null
    }
  },
  methods: {
    onSubmit () {
      //
    }
  }
}
</script>

<style>

</style>
