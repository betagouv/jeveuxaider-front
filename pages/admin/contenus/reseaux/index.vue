<template>
  <div class="flex flex-col gap-8">
    <DrawerReseau :reseau-id="drawerReseauId" @close="drawerReseauId = null" @refetch="fetch" />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Contenus' },
            { text: 'Réseaux' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'réseau',
        'réseaux',
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

          <DsfrButton icon="RiAddLine" @click="$router.push(`/admin/contenus/reseaux/add`)">
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
          :key="`tous-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click.native="deleteAllFilters"
        >
          Tous
        </DsfrTag> -->

        <DsfrTag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'
          "
          @click.native="changeFilter('filter[is_published]', 'true')"
        >
          En ligne
        </DsfrTag>

        <DsfrTag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'
          "
          @click.native="changeFilter('filter[is_published]', 'false')"
        >
          Hors ligne
        </DsfrTag>
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="reseau in queryResult.data"
        :key="reseau.id"
        :title="reseau.name"
        :state-text="reseau.is_published ? 'En ligne' : 'Hors ligne'"
        :state-style="reseau.is_published ? 'validated' : 'error'"
        :description="`${reseau.structures_count} antennes`"
        :image-srcset="illustrationSrcset(reseau)"
        :image-src="illustrationSrc(reseau)"
        @click.left="drawerReseauId = reseau.id"
        @click.middle="
          navigateTo(`/admin/contenus/reseaux/${reseau.id}`, { open: { target: '_blank' } })
        "
      >
        <template #footer>
          <div
            class="border-t font-semibold text-sm text-center py-4"
            :class="[reseau.is_published ? 'text-gray-900' : 'text-gray-400']"
          >
            {{ $numeral(reseau.places_left) }}
            {{
              $filters.pluralize(
                reseau.places_left,
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
import Card from '@/components/card/Card.vue'
import DrawerReseau from '@/components/drawer/DrawerReseau.vue'
import MixinExport from '@/mixins/export'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    Card,
    DrawerReseau,
    SearchFilters,
    Pagination,
    Breadcrumb,
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
      endpoint: '/reseaux',
      exportEndpoint: '/export/reseaux',
      queryParams: {
        include: 'illustrations,overrideImage1,structuresCount',
        append: 'places_left',
      },
      drawerReseauId: null,
      drawerReseau: null,
    }
  },
  methods: {
    illustrationSrcset(reseau) {
      return (
        reseau.override_image1?.urls.large ??
        reseau.illustrations[0]?.urls.large ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
      )
    },
    illustrationSrc(reseau) {
      return (
        reseau.override_image1?.urls.original ??
        reseau.illustrations[0]?.urls.original ??
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
      )
    },
  },
}
</script>
