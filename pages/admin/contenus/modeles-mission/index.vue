
<template>
  <div class="flex flex-col gap-8">
    <DrawerMissionTemplate :mission-template-id="drawerMissionTemplateId" @close="drawerMissionTemplateId = null" @updated="$fetch()" @refetch="$fetch()" />
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Contenus' },
          { text: 'Modèles de mission' }
        ]"
      />
    </portal>
    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'modèle de mission',
        'modèles de mission',
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button icon="RiAddLine" @click="$router.push(`/admin/contenus/modeles-mission/add`)">
            Nouveau
          </Button>
        </div>
      </template>
    </SectionHeading>

    <SearchFilters>
      <Input
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <Tag
          :key="`tous-${$route.fullPath}`"
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
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[published]'] && $route.query['filter[published]'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[published]', 'true')"
        >
          En ligne
        </Tag>

        <Tag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[published]'] && $route.query['filter[published]'] == 'false'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[published]', 'false')"
        >
          Hors ligne
        </Tag>

        <Tag
          v-if="$store.getters.contextRole === 'admin'"
          :key="`from-reseau-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[with_reseau]'] && $route.query['filter[with_reseau]'] == 'yes'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[with_reseau]', 'yes')"
        >
          Réseaux
        </Tag>

        <TagSelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Tous les statuts"
          :options="$labels.mission_template_workflow_states"
          :value="$route.query['filter[state]']"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
        <TagSelectAdvanced
          :key="`domaine-${$route.fullPath}`"
          name="domaine"
          placeholder="Tous les domaines"
          :options="$labels.domaines"
          :value="$route.query['filter[domaine.id]']"
          clearable
          @input="changeFilter('filter[domaine.id]', $event)"
        />

        <template v-if="$store.getters.contextRole === 'admin'">
          <InputAutocomplete
            :value="$route.query['filter[reseau.name]']"
            icon="SearchIcon"
            name="autocomplete"
            placeholder="Tous les réseaux"
            theme="filter"
            :options="autocompleteOptionsReseau"
            variant="transparent"
            @fetch-suggestions="onFetchSuggestionsReseau"
            @selected="changeFilter('filter[reseau.name]', $event ? $event.name : undefined)"
          />
        </template>
      </template>
    </SearchFilters>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="missionTemplate in queryResult.data"
        :key="missionTemplate.id"
        :title="missionTemplate.title"
        :state-style="missionTemplate.published ? 'success' : 'error'"
        :state-text="missionTemplate.published ? 'En ligne' : 'Hors ligne'"
        :description="missionTemplate.subtitle"
        :image-srcset="missionTemplate.photo ? missionTemplate.photo.urls.card : undefined"
        :image-src="missionTemplate.photo ? missionTemplate.photo.urls.original : undefined"
        @click.native="drawerMissionTemplateId = missionTemplate.id"
      >
        <template #badges>
          <div class="mb-2">
            <Badge v-if=" missionTemplate.reseau" class="" color="gray-light">
              {{ missionTemplate.reseau.name }}
            </Badge>
          </div>
        </template>
        <div class="mt-3">
          <Badge :color="missionTemplate.state" plain>
            {{ missionTemplate.state | label('mission_template_workflow_states') }}
          </Badge>
        </div>
        <template #footer>
          <div
            class="border-t font-semibold text-sm text-center py-4"
            :class="[
              missionTemplate.published && missionTemplate.state === 'validated' ? 'text-gray-900' : 'text-gray-400'
            ]"
          >
            {{ $options.filters.formatNumber(missionTemplate.places_left) }} {{ $options.filters.pluralize(missionTemplate.places_left, 'bénévole recherché', 'bénévoles recherchés', false) }}
          </div>
        </template>
      </Card>
    </div>

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
import Card from '@/components/card/Card'
import DrawerMissionTemplate from '@/components/drawer/DrawerMissionTemplate'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Card,
    DrawerMissionTemplate,
    SearchFilters,
    Pagination,
    Tag,
    Breadcrumb,
    Button
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'authenticated',
  asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'tete_de_reseau'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    return {
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/mission-templates',
      queryParams: {
        include: 'photo,reseau',
        append: 'places_left'
      },
      drawerMissionTemplateId: null,
      autocompleteOptionsReseau: []

    }
  },
  methods: {
    async onFetchSuggestionsReseau (value) {
      const res = await this.$axios.get('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 6
        }
      })
      this.autocompleteOptionsReseau = res.data.data
    }
  }
}
</script>
