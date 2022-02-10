<template>
  <div class="container">
    <DrawerTerm :term-id="drawerTermId" @close="drawerTermId = null" />

    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Taxonomies' },
        { label: 'Compétences' }
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading :title="$route.params.slug">
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

          <Input
            name="search"
            placeholder="Recherche par mots clés..."
            icon="SearchIcon"
            variant="transparent"
            :value="$route.query['filter[search]']"
            clearable
            @input="changeFilter('filter[search]', $event)"
          />

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
                  {{ term.related_count ? $options.filters.pluralize(term.related_count, 'liaisons') : '-' }}
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
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import DrawerTerm from '@/components/drawer/DrawerTerm'

export default {
  components: {
    MenuAdmin,
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
  methods: {
    onSubmit () {
      //
    }
  }
}
</script>

<style>

</style>
