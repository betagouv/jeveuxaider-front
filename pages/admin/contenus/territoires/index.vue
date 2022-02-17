<template>
  <div class="container">
    <DrawerTerritoire :territoire-id="drawerTerritoireId" @close="drawerTerritoireId = null" />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Territoires' }
      ]"
    />

    <div class="grid grid-cols-5 py-12">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-8">
          <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} territoires`">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/contenus/territoires/add`">
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
              :image-url="territoire.photo && territoire.photo.large"
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
      </div>
    </div>
  </div>
</template>

<script>
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import Card from '@/components/card/Card'
import DrawerTerritoire from '@/components/drawer/DrawerTerritoire'

export default {
  components: {
    MenuAdmin,
    Card,
    DrawerTerritoire
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/territoires?append=places_left',
      drawerTerritoireId: null,
      drawerTerritoire: null
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
