<template>
  <div class="flex flex-col gap-12">
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />

    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Responsables' },
            { text: 'Missions périmées' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      title="Missions périmées"
      secondary-title-bottom="Missions validées dont la date de fin est passée"
    />

    <SearchFilters>
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        :modelValue="$route.query['search']"
        @update:modelValue="changeFilter('search', $event)"
      />
      <template #prefilters>
        <Tag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click.native="deleteAllFilters"
        >
          Tous
        </Tag>
        <BaseFilterInputAutocomplete
          v-model="selectedOrganisation"
          label="Toutes les organisations"
          name="autocomplete-organisation"
          :options="autocompleteOptionsOrganisations"
          :loading="loadingFetchOrganisations"
          @fetch-suggestions="onFetchSuggestionsOrganisations"
          @selected="onSelectOrganisation"
        />
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
          <BaseTableHeadCell> Responsables </BaseTableHeadCell>
          <BaseTableHeadCell> # à terminer </BaseTableHeadCell>
          <BaseTableHeadCell> En ligne </BaseTableHeadCell>
        </BaseTableHead>
        <BaseTableBody :loading="queryLoading" :colspan="4">
          <BaseTableRow
            v-for="(item, y) in queryResult.data"
            :key="y"
            class="hover:cursor-pointer"
            @click.native="drawerProfileId = item.profile_id"
          >
            <BaseTableRowCell class="max-w-[300px]">
              <div class="flex">
                <BaseAvatar
                  :initials="item.first_name[0] + item.last_name[0]"
                  size="sm"
                  class="mr-4"
                />
                <div class="truncate">
                  <div class="text-gray-900 font-semibold truncate">
                    {{ item.first_name }} {{ item.last_name }}
                  </div>
                  <div class="text-xs truncate">
                    {{ item.email }}
                  </div>
                  <div class="text-xs truncate">
                    {{ item.structure_name }} #{{ item.structure_id }}
                  </div>
                </div>
              </div>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <div class="text-gray-900 font-semibold">
                {{ item.missions_total_count }} missions
              </div>
              <div class="text-xs">dont la date de fin est passée</div>
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
  computed: {
    selectedOrganisation() {
      return {
        key: Number(this.$route.query['organisation_id']) || undefined,
        label: this.$route.query['organisation_name'],
      }
    },
  },
  data() {
    return {
      endpoint: '/support/responsables/missions-outdated',
      loading: true,
      loadingFetchOrganisations: false,
      drawerProfileId: null,
      autocompleteOptionsOrganisations: [],
    }
  },
  methods: {
    async onFetchSuggestionsOrganisations(value) {
      this.loadingFetchOrganisations = true
      const organisations = await apiFetch('/structures', {
        params: {
          'filter[search]': value,
          pagination: 12,
        },
      })
      this.autocompleteOptionsOrganisations = organisations.data
      this.loadingFetchOrganisations = false
    },
    async onSelectOrganisation($event) {
      const queryOrganisationName =
        $event !== null && this.$route.query['organisation_name'] !== $event?.name
          ? $event.name
          : undefined
      const queryOrganisationId =
        $event !== null && Number(this.$route.query['organisation_id']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          organisation_name: queryOrganisationName,
          organisation_id: queryOrganisationId,
        },
      })
    },
  },
})
</script>
