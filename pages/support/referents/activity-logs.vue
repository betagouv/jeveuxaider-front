<template>
  <div class="flex flex-col gap-12">
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />

    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Support', to: '/support' },
          { text: 'Référents' },
          { text: 'Logs des activités' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Logs des activités"
      secondary-title-bottom="Liste des référents en fonction de leur activité"
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
        <FilterSelectAdvanced
          key="sort"
          name="sort"
          :options="[
            { key: 'activity_logs_total_count', label: 'Actions depuis le début' },
            { key: 'activity_logs_last_month_count', label: 'Actions depuis les 30 derniers jours' },
            { key: 'activity_logs_last_week_count', label: 'Actions depuis les 7 derniers jours' },
          ]"
          :value="$route.query['sort']"
          placeholder="Trier par"
          @input="changeFilter('sort', $event)"
        />
      </template>
    </SearchFilters>

    <Table>
      <TableHead>
        <TableHeadCell>
          Référents
        </TableHeadCell>
        <TableHeadCell>
          # total
        </TableHeadCell>
        <TableHeadCell>
          # mois
        </TableHeadCell>
        <TableHeadCell>
          # semaine
        </TableHeadCell>
        <TableHeadCell>
          En ligne
        </TableHeadCell>
      </TableHead>
      <TableBody :loading="queryLoading" :colspan="5">
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
              {{ item.activity_logs_total_count }} actions
            </div>
            <div class="text-xs">
              depuis le début
            </div>
          </TableRowCell>
          <TableRowCell>
            <div class="text-gray-900 font-semibold">
              {{ item.activity_logs_last_month_count }} actions
            </div>
            <div class="text-xs">
              sur le mois
            </div>
          </TableRowCell>
          <TableRowCell>
            <div class="text-gray-900 font-semibold">
              {{ item.activity_logs_last_week_count }} actions
            </div>
            <div class="text-xs">
              sur la semaine
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
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import Pagination from '@/components/dsfr/Pagination.vue'

export default {

  components: {
    Breadcrumb,
    SearchFilters,
    Tag,
    DrawerProfile,
    OnlineIndicator,
    Pagination
  },
  mixins: [QueryBuilder],
  layout: 'support',
  data () {
    return {
      endpoint: '/support/referents/activity-logs',
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
