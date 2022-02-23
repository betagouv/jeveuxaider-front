<template>
  <div class="container">
    <DrawerRessource :ressource-id="drawerRessourceId" @close="drawerRessourceId = null" />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Ressources' }
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
              'ressource',
              'ressources',
              false
            )}`"
          >
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/contenus/ressources/add`">
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

          <Table v-if="queryResult.total">
            <TableHead>
              <TableHeadCell>Nom</TableHeadCell>
              <TableHeadCell center>
                Référents
              </TableHeadCell>
              <TableHeadCell center>
                Responsables
              </TableHeadCell>
            </TableHead>
            <TableBody>
              <TableRow
                v-for="ressource in queryResult.data"
                :key="ressource.id"
                class="cursor-pointer"
                @click.native="drawerRessourceId = ressource.id"
              >
                <TableRowCell>
                  <div class="font-medium text-gray-900">
                    {{ ressource.title }}
                  </div>
                  <div class="text-gray-500">
                    {{ ressource.is_published ? 'En ligne' : 'Hors ligne' }}
                  </div>
                </TableRowCell>
                <TableRowCell center>
                  <template v-if="ressource.roles.includes('referent')">
                    <CheckIcon class="h-5 w-5 mx-auto" />
                  </template>
                </TableRowCell>
                <TableRowCell center>
                  <template v-if="ressource.roles.includes('responsable')">
                    <CheckIcon class="h-5 w-5 mx-auto" />
                  </template>
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
import SecondaryMenuAdmin from '@/components/section/admin/SecondaryMenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import DrawerRessource from '@/components/drawer/DrawerRessource'

export default {
  components: {
    SecondaryMenuAdmin,
    DrawerRessource
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/documents',
      drawerRessourceId: null
    }
  }
}
</script>
