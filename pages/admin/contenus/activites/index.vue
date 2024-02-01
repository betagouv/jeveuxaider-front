<template>
  <div class="flex flex-col gap-8">
    <DrawerActivity
      :activity-id="drawerActivityId"
      @close="drawerActivityId = null"
      @refetch="fetch"
    />

    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Contenus' },
            { text: 'Activités' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'activité',
        'activités',
        false
      )}`"
      :loading="queryLoading"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <DsfrButton icon="RiAddLine" @click="$router.push(`/admin/contenus/activites/add`)">
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
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click.native="deleteAllFilters"
        >
          Toutes
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

        <BaseFilterSelectAdvanced
          name="domaine"
          placeholder="Tous les domaines"
          :options="$labels.domaines"
          :modelValue="$route.query['filter[domaines.id]']"
          clearable
          @update:modelValue="changeFilter('filter[domaines.id]', $event)"
        />
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="activity in queryResult.data"
        :key="activity.id"
        :title="activity.name"
        :state-style="activity.is_published ? 'success' : 'error'"
        :state-text="activity.is_published ? 'En ligne' : 'Hors ligne'"
        :description="`Réalisez une mission de bénévolat ${activity.name}`"
        :image-srcset="activity.banner ? activity.banner.urls.desktop : undefined"
        :image-src="activity.banner ? activity.banner.urls.original : undefined"
        @click.left="drawerActivityId = activity.id"
        @click.middle="
          navigateTo(`/admin/contenus/activites/${activity.id}`, { open: { target: '_blank' } })
        "
      >
        <template #badges>
          <div v-if="activity.domaines.length" class="mb-4 flex gap-2 mt-2">
            <DsfrTag
              :custom-theme="true"
              :class="`${domaineBackgroundColor(activity.domaines[0].id)} text-white`"
            >
              {{ activity.domaines[0].name }}
            </DsfrTag>
            <DsfrTag v-if="activity.domaines.length - 1 > 0" color="gray-light">
              +{{ activity.domaines.length - 1 }}
            </DsfrTag>
          </div>
        </template>
        <div class="mt-4 text-[13px] text-gray-500">
          Complétion:
          <span class="font-semibold">{{ activity.completion_rate }}%</span>
        </div>
        <template #footer>
          <div
            class="border-t font-semibold text-sm text-center py-4"
            :class="[activity.is_published ? 'text-gray-900' : 'text-gray-400']"
          >
            {{
              $filters.pluralize(activity.places_left, 'bénévole recherché', 'bénévoles recherchés')
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
import DrawerActivity from '@/components/drawer/DrawerActivity.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import MixinDomaines from '@/mixins/domaines'

export default defineNuxtComponent({
  components: {
    Card,
    DrawerActivity,
    SearchFilters,
    Pagination,
    Breadcrumb,
  },
  mixins: [QueryBuilder, MixinDomaines],
  setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      endpoint: '/activities',
      queryParams: {
        include: 'banner,domaines',
        append: 'places_left,completion_rate',
      },
      drawerActivityId: null,
    }
  },
})
</script>
