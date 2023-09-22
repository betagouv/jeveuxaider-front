<template>
  <BaseContainer2Cols>
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Retours d\'expériences' }]"
      />
    </template>
    <template #header>
      <BaseSectionHeading
        :title="`Retours d\'expériences`"
        :secondary-title="`Bonjour ${$stores.auth.user.profile.first_name}`"
        :loading="queryLoading"
      />
    </template>
    <template #left>
      <BaseBox>
        <BaseHeading as="h2" :level="2" class="mb-8 font-extrabold">
          {{ $numeral(queryResult.total) }}
          {{ $filters.pluralize(queryResult.total, 'retour', 'retours', false) }}
        </BaseHeading>
        <SearchFilters class="mb-8">
          <BaseInput
            name="search"
            placeholder="Rechercher par mots clés, email, nom"
            icon="RiSearchLine"
            variant="transparent"
            :modelValue="$route.query['filter[search]']"
            clearable
            @update:modelValue="changeFilter('filter[search]', $event)"
          />
          <template #prefilters>
            <DsfrTag
              :key="`tous-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="hasActiveFilters()"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="deleteAllFilters"
            >
              Tous
            </DsfrTag>

            <DsfrTag
              :key="`published-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="
                $route.query['filter[is_published]'] &&
                $route.query['filter[is_published]'] == 'true'
              "
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[is_published]', 'true')"
            >
              En ligne
            </DsfrTag>

            <DsfrTag
              :key="`unpublished-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="
                $route.query['filter[is_published]'] &&
                $route.query['filter[is_published]'] == 'false'
              "
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[is_published]', 'false')"
            >
              Hors ligne
            </DsfrTag>

            <BaseFilterSelectAdvanced
              :key="`state-${$route.fullPath}`"
              name="state"
              placeholder="Toutes les notes"
              :options="$labels.testimonial_grade"
              :modelValue="$route.query['filter[grade]']"
              clearable
              @update:modelValue="changeFilter('filter[grade]', $event)"
            />
          </template>
        </SearchFilters>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <CardTemoignage
            v-for="temoignage in queryResult.data"
            :key="temoignage.id"
            class="cursor-pointer"
            :temoignage="temoignage"
            @click.native="drawerTemoignageId = temoignage.id"
          />
        </div>

        <DsfrPagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />

        <DrawerTemoignage
          :temoignage-id="drawerTemoignageId"
          @close="drawerTemoignageId = null"
          @updated="fetch()"
          @refetch="fetch()"
        />
      </BaseBox>
    </template>
    <template #right>
      <MoreNumbers v-if="['admin', 'referent'].includes($stores.auth.contextRole)" />
      <GuideLinks />
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import GuideLinks from '@/components/section/dashboard/GuideLinks.vue'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers.vue'
import CardTemoignage from '@/components/card/CardTemoignage.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import DrawerTemoignage from '@/components/drawer/DrawerTemoignage.vue'

export default defineNuxtComponent({
  components: {
    DrawerTemoignage,
    HelpCenter,
    GuideLinks,
    MoreNumbers,
    CardTemoignage,
    SearchFilters,
  },
  mixins: [QueryBuilder],
  middleware: ['authenticated', 'agreedResponsableTerms'],
  data() {
    return {
      loading: false,
      endpoint: '/temoignages',
      queryParams: {},
      drawerTemoignageId: null,
    }
  },
  methods: {},
})
</script>
