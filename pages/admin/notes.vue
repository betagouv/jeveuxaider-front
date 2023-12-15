<template>
  <BaseContainer2Cols>
    <template #breadcrumb>
      <Breadcrumb :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Notes' }]" />
    </template>
    <template #header>
      <BaseSectionHeading
        :title="`Toutes les notes`"
        :secondary-title="`Bonjour ${$stores.auth.user.profile.first_name}`"
      />
    </template>
    <template #left>
      <BaseBox>
        <BaseHeading as="h2" :level="2" class="mb-8 font-extrabold">
          {{ $numeral(queryResult.total) }}
          {{ $filters.pluralize(queryResult.total, 'note', 'notes', false) }}
        </BaseHeading>
        <SearchFilters class="mb-8">
          <BaseInput
            name="search"
            placeholder="Rechercher par mots clés, nom"
            icon="RiSearchLine"
            variant="transparent"
            :modelValue="$route.query['filter[search]']"
            clearable
            @update:modelValue="changeFilter('filter[search]', $event)"
          />
          <template #prefilters>
            <Tag
              :key="`tous-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-active="hasActiveFilters()"
              @click.native="deleteAllFilters"
            >
              Toutes
            </Tag>

            <Tag
              :key="`mine-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-active="$route.query['filter[mine]'] && $route.query['filter[mine]'] == '1'"
              @click.native="changeFilter('filter[mine]', '1')"
            >
              Mes notes
            </Tag>

            <Tag
              :key="`type-organisations-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-active="
                $route.query['filter[type]'] && $route.query['filter[type]'] == 'organisations'
              "
              @click.native="changeFilter('filter[type]', 'organisations')"
            >
              Organisations
            </Tag>

            <Tag
              :key="`type-missions-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-active="
                $route.query['filter[type]'] && $route.query['filter[type]'] == 'missions'
              "
              @click.native="changeFilter('filter[type]', 'missions')"
            >
              Missions
            </Tag>
          </template>
        </SearchFilters>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <CardNote v-for="note in queryResult.data" :key="note.id" :note="note" />
        </div>

        <Pagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </BaseBox>
    </template>
    <template #right>
      <MoreNumbers />
      <GuideLinks />
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import CardNote from '@/components/card/CardNote.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers.vue'
import GuideLinks from '@/components/section/dashboard/GuideLinks.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    Pagination,
    Breadcrumb,
    CardNote,
    SearchFilters,
    Tag,
    MoreNumbers,
    GuideLinks,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (!['admin', 'referent'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
  },
  data() {
    return {
      loading: false,
      endpoint: '/notes',
      queryParams: {},
    }
  },
})
</script>
