<template>
  <div class="flex flex-col gap-8">
    <DrawerActivityLog :activity-log-id="drawerActivityLogId" @close="drawerActivityLogId = null" />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[{ text: 'Administration', to: '/admin' }, { text: 'Autres' }, { text: 'Logs' }]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'log',
        'logs',
        false
      )}`"
      :loading="queryLoading"
    />

    <SearchFilters>
      <BaseInput
        name="search"
        placeholder="Recherche par emails..."
        icon="RiSearchLine"
        variant="transparent"
        :modelValue="$route.query['filter[search]']"
        clearable
        @update:modelValue="changeFilter('filter[search]', $event)"
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
          Toutes
        </Tag>
        <BaseFilterSelectAdvanced
          :key="`subject-type-${$route.fullPath}`"
          name="types"
          placeholder="Tous les types"
          :options="[
            { key: 'organisations', label: 'Organisations' },
            { key: 'missions', label: 'Missions' },
            { key: 'participations', label: 'Participations' },
            { key: 'utilisateurs', label: 'Utilisateurs' },
            { key: 'rules', label: 'Règles' },
          ]"
          :modelValue="$route.query['filter[type]']"
          clearable
          @update:modelValue="changeFilter('filter[type]', $event)"
        />
        <BaseFilterSelectAdvanced
          :key="`action-${$route.fullPath}`"
          name="action"
          placeholder="Toutes les actions"
          :options="[
            { key: 'created', label: 'Création' },
            { key: 'updated', label: 'Modification' },
            { key: 'duplicated', label: 'Duplication' },
            { key: 'deleted', label: 'Suppression' },
          ]"
          :modelValue="$route.query['filter[description]']"
          clearable
          @update:modelValue="changeFilter('filter[description]', $event)"
        />
      </template>
    </SearchFilters>

    <CardLog
      v-for="log in queryResult.data"
      :key="log.id"
      :log="log"
      class="cursor-pointer"
      @click.native="drawerActivityLogId = log.id"
    />

    <Pagination
      class="mt-6"
      :current-page="queryResult.current_page"
      :total-rows="queryResult.total"
      :per-page="queryResult.per_page"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import DrawerActivityLog from '@/components/drawer/DrawerActivityLog.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import CardLog from '@/components/card/CardLog.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default defineNuxtComponent({
  components: {
    DrawerActivityLog,
    SearchFilters,
    Pagination,
    Breadcrumb,
    CardLog,
    Tag,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      endpoint: '/activity-logs',
      queryParams: {
        include: 'causer,causer.profile',
      },
      drawerActivityLogId: null,
    }
  },
})
</script>
