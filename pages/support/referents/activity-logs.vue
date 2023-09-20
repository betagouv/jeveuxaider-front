<template>
  <div class="flex flex-col gap-12">
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />

    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Référents' },
            { text: 'Logs des activités' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Logs des activités"
      secondary-title-bottom="Liste des référents en fonction de leur activité"
    />

    <SearchFilters>
      <BaseInput
        name="search"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        variant="transparent"
        :modelValue="$route.query['search']"
        clearable
        @update:modelValue="changeFilter('search', $event)"
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
        <BaseFilterSelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="department"
          placeholder="Tous les départements"
          :options="$labels.departments"
          :modelValue="$route.query['department']"
          clearable
          @update:modelValue="changeFilter('department', $event)"
        />
        <BaseFilterSelectAdvanced
          key="sort"
          name="sort"
          :options="[
            {
              key: 'activity_logs_total_count',
              label: 'Actions depuis le début',
            },
            {
              key: 'activity_logs_last_month_count',
              label: 'Actions depuis les 30 derniers jours',
            },
            {
              key: 'activity_logs_last_week_count',
              label: 'Actions depuis les 7 derniers jours',
            },
          ]"
          :modelValue="$route.query['sort']"
          placeholder="Trier par"
          @update:modelValue="changeFilter('sort', $event)"
        />
      </template>
    </SearchFilters>

    <div>
      <QueryResultSummary
        :loading="queryLoading"
        :total="queryResult.total"
        :from="queryResult.from"
        :to="queryResult.to"
        class="mb-2 pr-2"
      />
      <BaseTable>
        <BaseTableHead>
          <BaseTableHeadCell> Référents </BaseTableHeadCell>
          <BaseTableHeadCell> # total </BaseTableHeadCell>
          <BaseTableHeadCell> # mois </BaseTableHeadCell>
          <BaseTableHeadCell> # semaine </BaseTableHeadCell>
          <BaseTableHeadCell> En ligne </BaseTableHeadCell>
        </BaseTableHead>
        <BaseTableBody :loading="queryLoading" :colspan="5">
          <BaseTableRow
            v-for="(item, y) in queryResult.data"
            :key="y"
            class="hover:cursor-pointer"
            @click.native="drawerProfileId = item.profile_id"
          >
            <BaseTableRowCell>
              <div class="flex">
                <BaseAvatar :initials="item.department_number" size="sm" class="mr-4" />
                <div>
                  <div class="text-gray-900 font-semibold">
                    {{ item.first_name }} {{ item.last_name }}
                  </div>
                  <div class="text-xs">
                    {{ item.email }}
                  </div>
                  <div class="text-xs">
                    {{ $filters.label(item.department_number, 'departments') }}
                  </div>
                </div>
              </div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="text-gray-900 font-semibold">
                {{ item.activity_logs_total_count }} actions
              </div>
              <div class="text-xs">depuis le début</div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="text-gray-900 font-semibold">
                {{ item.activity_logs_last_month_count }} actions
              </div>
              <div class="text-xs">sur le mois</div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="text-gray-900 font-semibold">
                {{ item.activity_logs_last_week_count }} actions
              </div>
              <div class="text-xs">sur la semaine</div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <OnlineIndicator
                :published="$dayjs().subtract(10, 'minute').isBefore(item.last_online_at)"
                class="text-xs"
              />
              <div class="text-xs italic">
                {{ item.last_online_at ? $dayjs(item.last_online_at).fromNow() : 'Jamais' }}
              </div>
            </BaseTableRowCell>
          </BaseTableRow>
        </BaseTableBody>
      </BaseTable>
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
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import Pagination from '@/components/dsfr/Pagination.vue'
import QueryResultSummary from '@/components/custom/QueryResultSummary.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    SearchFilters,
    Tag,
    DrawerProfile,
    OnlineIndicator,
    Pagination,
    QueryResultSummary,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'support',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      endpoint: '/support/referents/activity-logs',
      loading: true,
      drawerProfileId: null,
    }
  },
  computed: {},
  methods: {},
})
</script>

<style></style>
