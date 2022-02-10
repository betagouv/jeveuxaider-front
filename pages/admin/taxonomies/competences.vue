<template>
  <div class="container">
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
          <SectionHeading title="Compétences">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/missions`">
                  <Button size="lg" icon="PlusIcon">
                    Compétence
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
              <TableHeadCell>Profils</TableHeadCell>
              <TableHeadCell>Missions</TableHeadCell>
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
                    {{ term.related_count ? $options.filters.pluralize(term.related_count, 'élément lié', 'éléments liés') : 'Aucun élément lié' }}
                  </div>
                </TableRowCell>
                <TableRowCell>
                  {{ term.profiles_count ? $options.filters.pluralize(term.profiles_count, 'profil') : '-' }}
                </TableRowCell>
                <TableRowCell>
                  {{ term.missions_count ? $options.filters.pluralize(term.missions_count, 'mission') : '-' }}
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

export default {
  components: {
    MenuAdmin
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      endpoint: '/vocabularies/skills/terms',
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
