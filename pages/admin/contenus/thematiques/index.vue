<template>
  <div class="container">
    <DrawerThematique :thematique-id="drawerThematiqueId" @close="drawerThematiqueId = null" />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Thématiques' }
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
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Va disparaitre au profit de Domaine.php
          </div>
          <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} thématiques`">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/contenus/thematiques/add`">
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
              v-for="thematique in queryResult.data"
              :key="thematique.id"
              :title="thematique.name"
              :state-style="thematique.published ? 'success' : 'error'"
              :state-text="thematique.published ? 'En ligne' : 'Hors ligne'"
              :description="thematique.title"
              :image-url="thematique.photo && thematique.photo.large"
              @click.native="drawerThematiqueId = thematique.id"
            >
              <template #footer>
                <div
                  class="border-t text-gray-900 font-semibold  text-sm text-center py-4 opacity-25"
                >
                  @TODO
                  {{ $options.filters.formatNumber(thematique.missions_count) }} {{ $options.filters.pluralize(thematique.missions_count, 'mission', 'missions', false) }}
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
import SecondaryMenuAdmin from '@/components/menu/SecondaryMenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import Card from '@/components/card/Card'
import DrawerThematique from '@/components/drawer/DrawerThematique'

export default {
  components: {
    SecondaryMenuAdmin,
    Card,
    DrawerThematique
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/thematiques',
      drawerThematiqueId: null
    }
  }
}
</script>
