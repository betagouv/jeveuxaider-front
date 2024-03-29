<template>
  <div class="flex flex-col gap-8">
    <DrawerTerritoire
      :territoire-id="drawerTerritoireId"
      @close="drawerTerritoireId = null"
      @refetch="fetch"
    />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <DsfrBreadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Contenus' },
            { text: 'Territoires' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'territoire',
        'territoires',
        false
      )}`"
      :loading="queryLoading"
    >
      <template #action>
        <div class="flex space-x-2">
          <DsfrButton
            type="secondary"
            icon="RiDownload2Line"
            :disabled="queryResult?.total === 0"
            :loading="exportLoading"
            @click.native="handleExport"
          >
            Exporter
          </DsfrButton>

          <DsfrButton icon="RiAddLine" @click="$router.push(`/admin/contenus/territoires/add`)">
            Nouveau
          </DsfrButton>
        </div>
      </template>
    </BaseSectionHeading>

    <SearchFilters class="mb-4" @reset-filters="deleteAllFilters">
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        :modelValue="$route.query['filter[search]']"
        @update:modelValue="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <!-- <DsfrTag
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click="deleteAllFilters"
        >
          Tous
        </DsfrTag> -->

        <DsfrTag
          as="button"
          size="md"
          context="selectable"
          :is-active="$route.query['filter[type]'] && $route.query['filter[type]'] == 'department'"
          @click="changeFilter('filter[type]', 'department')"
        >
          Départements
        </DsfrTag>

        <DsfrTag
          as="button"
          size="md"
          context="selectable"
          :is-active="$route.query['filter[type]'] && $route.query['filter[type]'] == 'city'"
          @click="changeFilter('filter[type]', 'city')"
        >
          Villes
        </DsfrTag>

        <DsfrTag
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'
          "
          @click="changeFilter('filter[is_published]', 'true')"
        >
          En ligne
        </DsfrTag>

        <DsfrTag
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'
          "
          @click="changeFilter('filter[is_published]', 'false')"
        >
          Hors ligne
        </DsfrTag>

        <BaseFilterSelectAdvanced
          name="state"
          placeholder="Tous les statuts"
          :options="$labels.territoire_workflow_states"
          :modelValue="$route.query['filter[state]']?.split(',')"
          clearable
          multiple
          @update:modelValue="changeFilter('filter[state]', $event, true)"
        />
        <BaseFilterSelectAdvanced
          name="sort"
          :options="[
            { key: '-created_at', label: 'Les plus récentes' },
            { key: 'created_at', label: 'Les plus anciennes' },
            { key: '-updated_at', label: 'Date de denière modification' },
          ]"
          :modelValue="$route.query['sort']"
          placeholder="Trier par"
          @update:modelValue="changeFilter('sort', $event)"
        />
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="territoire in queryResult.data"
        :key="territoire.id"
        :title="territoire.name"
        :state-style="territoire.is_published ? 'success' : 'error'"
        :state-text="territoire.is_published ? 'En ligne' : 'Hors ligne'"
        :description="
          territoire.department
            ? `${territoire.department} - ${$filters.label(territoire.department, 'departments')}`
            : null
        "
        :image-srcset="territoire.banner ? territoire.banner.urls.desktop : undefined"
        :image-src="territoire.banner ? territoire.banner.urls.original : undefined"
        @click.left="drawerTerritoireId = territoire.id"
        @click.middle="
          navigateTo(`/admin/contenus/territoires/${territoire.id}`, { open: { target: '_blank' } })
        "
      >
        <div class="mt-4 text-[13px] text-gray-500">
          Complétion:
          <span class="font-semibold">{{ territoire.completion_rate }}%</span>
        </div>
        <div class="mt-4 flex items-center">
          <BaseBadge :color="territoire.state" plain>
            {{ $filters.label(territoire.state, 'territoire_workflow_states') }}
          </BaseBadge>
          <div
            v-if="['admin'].includes($stores.auth.contextRole)"
            class="text-gray-500 text-xs flex-shrink-0 ml-2"
          >
            ID <span class="font-semibold">{{ territoire.id }}</span>
          </div>
        </div>
        <template #footer>
          <div
            class="border-t font-semibold text-sm text-center py-4"
            :class="[
              territoire.is_published && territoire.state === 'validated'
                ? 'text-gray-900'
                : 'text-gray-400',
            ]"
          >
            {{ $numeral(territoire.places_left) }}
            {{
              $filters.pluralize(
                territoire.places_left,
                'bénévole recherché',
                'bénévoles recherchés',
                false
              )
            }}
          </div>
        </template>
      </Card>
    </div>

    <CustomEmptyState v-if="queryResult.total === 0 && !queryLoading" />

    <DsfrPagination
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
import Card from '@/components/card/Card.vue'
import DrawerTerritoire from '@/components/drawer/DrawerTerritoire.vue'
import MixinExport from '@/mixins/export'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default defineNuxtComponent({
  components: {
    Card,
    DrawerTerritoire,
    SearchFilters,
  },
  mixins: [QueryBuilder, MixinExport],
  setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      endpoint: '/territoires',
      exportEndpoint: '/export/territoires',
      queryParams: {
        include: 'banner',
        append: 'places_left,completion_rate',
      },
      drawerTerritoireId: null,
      drawerTerritoire: null,
    }
  },
  methods: {},
})
</script>
