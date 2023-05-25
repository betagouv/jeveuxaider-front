<template>
  <div class="flex flex-col gap-12">
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />

    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Support', to: '/support' },
          { text: 'Référents' },
          { text: 'Actions en attente' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Actions en attente"
      secondary-title-bottom="Liste des référents en fonction de leurs actions en attente de modération"
    />

    <SearchFilters>
      <Input
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['search']"
        clearable
        @input="changeFilter('search', $event)"
      />
      <template #prefilters>
        <Tag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="hasActiveFilters()"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="deleteAllFilters"
        >
          Tous
        </Tag>
        <FilterSelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="department"
          placeholder="Tous les départements"
          :options="$labels.departments"
          :value="$route.query['department']"
          clearable
          @input="changeFilter('department', $event)"
        />
        <Tag
          :key="`contact-principal-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['tag'] && $route.query['tag'] == '652'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('tag', '652')"
        >
          Contact principal
        </Tag>
        <Tag
          :key="`online-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['online'] && $route.query['online'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('online', 'true')"
        >
          En ligne
        </Tag>
        <Tag
          :key="`inactif-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['inactive'] && $route.query['inactive'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('inactive', 'true')"
        >
          Inactif depuis 1 mois
        </Tag>
        <FilterSelectAdvanced
          key="sort"
          name="sort"
          :options="[
            { key: 'structures_total_count', label: 'Organisations à modérer' },
            { key: 'missions_total_count', label: 'Missions à modérer' },
          ]"
          :value="$route.query['sort']"
          placeholder="Trier par"
          @input="changeFilter('sort', $event)"
        />
      </template>
    </SearchFilters>

    <div>
      <QueryResultSummary :loading="queryLoading" :total="queryResult.total" :from="queryResult.from" :to="queryResult.to" class="mb-2 pr-2" />
      <Table>
        <TableHead>
          <TableHeadCell>
            Référents
          </TableHeadCell>
          <TableHeadCell>
            Organisations
          </TableHeadCell>
          <TableHeadCell>
            Missions
          </TableHeadCell>
          <TableHeadCell>
            En ligne
          </TableHeadCell>
        </TableHead>
        <TableBody :loading="queryLoading" :colspan="4">
          <TableRow v-for="item,y in queryResult.data" :key="y" class="hover:cursor-pointer" @click.native="drawerProfileId = item.profile_id">
            <TableRowCell>
              <div class="flex">
                <Avatar
                  :initials="item.department_number"
                  size="sm"
                  class="mr-4"
                />
                <div class="">
                  <div class="text-gray-900 font-semibold">
                    {{ item.first_name }} {{ item.last_name }}
                  </div>
                  <div class="text-xs">
                    {{ item.email }}
                  </div>
                  <div class="text-xs">
                    {{ item.department_number|label('departments') }}
                  </div>
                </div>
              </div>
            </TableRowCell>
            <TableRowCell>
              <div class="text-gray-900 font-semibold">
                {{ item.structures_total_count }} organisations
              </div>
              <div class="text-xs">
                {{ item.structures_waiting_count }} en attente
              </div>
              <div class="text-xs">
                {{ item.structures_in_progress_count }} en cours
              </div>
            </TableRowCell>
            <TableRowCell>
              <div class="text-gray-900 font-semibold">
                {{ item.missions_total_count }} missions
              </div>
              <div class="text-xs">
                {{ item.missions_waiting_count }} en attente
              </div>
              <div class="text-xs">
                {{ item.missions_in_progress_count }} en cours
              </div>
            </TableRowCell>
            <TableRowCell>
              <OnlineIndicator :published="$dayjs().subtract(10,'minute').isBefore(item.last_online_at)" class="text-xs" />
              <div class="text-xs italic">
                {{ item.last_online_at ? $dayjs(item.last_online_at).fromNow() : 'Jamais' }}
              </div>
            </TableRowCell>
          </TableRow>
        </TableBody>
      </Table>
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
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import QueryBuilder from '@/mixins/query-builder'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import QueryResultSummary from '@/components/custom/QueryResultSummary.vue'

export default {

  components: {
    Breadcrumb,
    SearchFilters,
    Tag,
    OnlineIndicator,
    DrawerProfile,
    Pagination,
    QueryResultSummary
  },
  mixins: [QueryBuilder],
  layout: 'support',
  data () {
    return {
      endpoint: '/support/referents/waiting-actions',
      loading: true,
      drawerProfileId: null
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style>

</style>
