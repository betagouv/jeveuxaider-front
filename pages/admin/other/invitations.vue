<template>
  <div class="flex flex-col gap-8">
    <DrawerRessource :ressource-id="drawerRessourceId" @close="drawerRessourceId = null" />
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Autre' },
          { label: 'Invitations' }
        ]"
      />
    </portal>

    <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} invitations`">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button size="lg" :loading="loading" icon="PlusIcon">
            Inviter un utilisateur
          </Button>
        </div>
      </template>
    </SectionHeading>

    <Table v-if="queryResult.total">
      <TableHead>
        <TableHeadCell>E-mail</TableHeadCell>
        <TableHeadCell center>
          Invité le
        </TableHeadCell>
        <TableHeadCell center>
          Action
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
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import DrawerRessource from '@/components/drawer/DrawerRessource'

export default {
  components: {
    DrawerRessource
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
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
