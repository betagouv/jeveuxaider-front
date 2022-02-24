<template>
  <div class="container">
    <DrawerTerm :term-id="drawerTermId" @close="drawerTermId = null" />

    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Taxonomies' },
        { label: $route.params.slug }
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <SecondaryMenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading
            :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
              queryResult.total,
              title,
              `${title}s`,
              false
            )}`"
          >
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/taxonomies/${$route.params.slug}/add`">
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
                :key="`terms-with-related-${$route.fullPath}`"
                :option="{key: 'yes', label:'Avec des liaisons'}"
                :is-checked="$route.query['filter[has_related]'] && $route.query['filter[has_related]'] == 'yes'"
                variant="button"
                size="xs"
                transparent
                @change="changeFilter('filter[has_related]', 'yes')"
              />
              <Checkbox
                :key="`terms-without-related-${$route.fullPath}`"
                :option="{key: 'no', label:'Sans liaison'}"
                :is-checked="$route.query['filter[has_related]'] && $route.query['filter[has_related]'] == 'no'"
                variant="button"
                size="xs"
                transparent
                @change="changeFilter('filter[has_related]', 'no')"
              />
            </div>
          </div>

          <Table v-if="queryResult.total">
            <TableHead>
              <TableHeadCell>Nom</TableHeadCell>
              <TableHeadCell>Liaisons</TableHeadCell>
            </TableHead>
            <TableBody>
              <TableRow
                v-for="term in queryResult.data"
                :key="term.id"
                class="cursor-pointer"
                @click.native="drawerTermId = term.id"
              >
                <TableRowCell>
                  <div class="font-medium text-gray-900">
                    {{ term.name }}
                  </div>
                  <div class="text-gray-500">
                    {{ term.is_published ? 'En ligne' : 'Hors ligne' }}
                  </div>
                </TableRowCell>
                <TableRowCell>
                  {{ term.related_count ? $options.filters.pluralize(term.related_count, 'liaison') : '-' }}
                </TableRowCell>
              </TableRow>
            </TableBody>
          </Table>

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
import DrawerTerm from '@/components/drawer/DrawerTerm'

export default {
  components: {
    SecondaryMenuAdmin,
    DrawerTerm
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      endpoint: `/vocabularies/${this.$route.params.slug}/terms`,
      drawerTermId: null
    }
  },
  computed: {
    title () {
      switch (this.$route.params.slug) {
        case 'skills':
          return 'compétence'
        case 'tags':
          return 'tag'
        default:
          return this.$route.params.slug
      }
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
