<template>
  <div class="flex flex-col gap-12">
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />

    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Référents' },
            { text: 'Actions en attente' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Actions en attente"
      secondary-title-bottom="Liste des référents en fonction de leurs actions en attente de modération"
    />

    <SearchFilters @reset-filters="deleteAllFilters">
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        :modelValue="$route.query['search']"
        @update:modelValue="changeFilter('search', $event)"
      />
      <template #prefilters>
        <!-- <Tag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click.native="deleteAllFilters"
        >
          Tous
        </Tag> -->
        <BaseFilterSelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="department"
          placeholder="Tous les départements"
          :options="$labels.departments"
          :modelValue="$route.query['department']"
          clearable
          @update:modelValue="changeFilter('department', $event)"
        />
        <Tag
          :key="`contact-principal-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="$route.query['tag'] && $route.query['tag'] == '652'"
          @click.native="changeFilter('tag', '652')"
        >
          Contact principal
        </Tag>
        <Tag
          :key="`online-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="$route.query['online'] && $route.query['online'] == 'true'"
          @click.native="changeFilter('online', 'true')"
        >
          En ligne
        </Tag>
        <Tag
          :key="`inactif-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="$route.query['inactive'] && $route.query['inactive'] == 'true'"
          @click.native="changeFilter('inactive', 'true')"
        >
          Inactif depuis 1 mois
        </Tag>
        <BaseFilterSelectAdvanced
          key="sort"
          name="sort"
          :options="[
            { key: 'structures_total_count', label: 'Organisations à modérer' },
            { key: 'missions_total_count', label: 'Missions à modérer' },
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
          <BaseTableHeadCell> Organisations </BaseTableHeadCell>
          <BaseTableHeadCell> Missions </BaseTableHeadCell>
          <BaseTableHeadCell> En ligne </BaseTableHeadCell>
        </BaseTableHead>
        <BaseTableBody :loading="queryLoading" :colspan="4">
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
                {{ item.structures_total_count }} organisations
              </div>
              <div class="text-xs">{{ item.structures_waiting_count }} en attente</div>
              <div class="text-xs">{{ item.structures_in_progress_count }} en cours</div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="text-gray-900 font-semibold">
                {{ item.missions_total_count }} missions
              </div>
              <div class="text-xs">{{ item.missions_waiting_count }} en attente</div>
              <div class="text-xs">{{ item.missions_in_progress_count }} en cours</div>
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
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import QueryResultSummary from '@/components/custom/QueryResultSummary.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    SearchFilters,
    Tag,
    OnlineIndicator,
    DrawerProfile,
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
      endpoint: '/support/referents/waiting-actions',
      loading: true,
      drawerProfileId: null,
    }
  },
  computed: {},
  methods: {},
})
</script>

<style></style>
