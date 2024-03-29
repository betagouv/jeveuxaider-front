<template>
  <div class="flex flex-col gap-8">
    <DrawerMissionTemplate
      :mission-template-id="drawerMissionTemplateId"
      @close="drawerMissionTemplateId = null"
      @updated="fetch()"
      @refetch="fetch()"
    />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Contenus' },
            { text: 'Modèles de mission' },
          ]"
        />
      </Teleport>
    </ClientOnly>
    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'modèle de mission',
        'modèles de mission',
        false
      )}`"
      :loading="queryLoading"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <DsfrButton icon="RiAddLine" @click="$router.push(`/admin/contenus/modeles-mission/add`)">
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
          @click.native="deleteAllFilters"
        >
          Tous
        </DsfrTag> -->

        <DsfrTag
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[published]'] && $route.query['filter[published]'] == 'true'
          "
          @click.native="changeFilter('filter[published]', 'true')"
        >
          En ligne
        </DsfrTag>

        <DsfrTag
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[published]'] && $route.query['filter[published]'] == 'false'
          "
          @click.native="changeFilter('filter[published]', 'false')"
        >
          Hors ligne
        </DsfrTag>

        <DsfrTag
          v-if="$stores.auth.contextRole === 'admin'"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[with_reseau]'] && $route.query['filter[with_reseau]'] == 'yes'
          "
          @click.native="changeFilter('filter[with_reseau]', 'yes')"
        >
          Réseaux
        </DsfrTag>

        <BaseFilterSelectAdvanced
          name="state"
          placeholder="Tous les statuts"
          :options="$labels.mission_template_workflow_states"
          :modelValue="$route.query['filter[state]']?.split(',')"
          clearable
          multiple
          @update:modelValue="changeFilter('filter[state]', $event, true)"
        />
        <BaseFilterSelectAdvanced
          name="domaine"
          placeholder="Tous les domaines"
          :options="$labels.domaines"
          :modelValue="$route.query['filter[domaine.id]']?.split(',').map((i) => parseInt(i))"
          clearable
          multiple
          @update:modelValue="changeFilter('filter[domaine.id]', $event, true)"
        />

        <template v-if="$stores.auth.contextRole === 'admin'">
          <BaseFilterInputAutocomplete
            v-model="selectedReseau"
            label="Tous les réseaux"
            name="autocomplete-reseau"
            :options="autocompleteOptionsReseau"
            :loading="loadingFetchReseaux"
            @fetch-suggestions="onFetchSuggestionsReseau"
            @selected="onSelectReseau"
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
            <BaseBadge v-if="missionTemplate.reseau" color="gray-light">
              {{ missionTemplate.reseau.name }}
            </BaseBadge>
          </div>
        </template>
        <div class="mt-3">
          <BaseBadge :color="missionTemplate.state" plain>
            {{ $filters.label(missionTemplate.state, 'mission_template_workflow_states') }}
          </BaseBadge>
        </div>
        <template #footer>
          <div
            class="border-t font-semibold text-sm text-center py-4"
            :class="[
              missionTemplate.published && missionTemplate.state === 'validated'
                ? 'text-gray-900'
                : 'text-gray-400',
            ]"
          >
            {{ $numeral(missionTemplate.places_left) }}
            {{
              $filters.pluralize(
                missionTemplate.places_left,
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
import DrawerMissionTemplate from '@/components/drawer/DrawerMissionTemplate.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    Card,
    DrawerMissionTemplate,
    SearchFilters,
    Pagination,
    Breadcrumb,
  },
  mixins: [QueryBuilder],
  setup() {
    const { $stores } = useNuxtApp()

    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['authenticated'],
    })

    if (!['admin', 'tete_de_reseau'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
  },
  computed: {
    selectedReseau() {
      return {
        key: Number(this.$route.query['filter[reseau.id]']) || undefined,
        label: this.$route.query['filter[reseau.name]'],
      }
    },
  },
  data() {
    return {
      loading: false,
      loadingFetchReseaux: true,
      endpoint: '/mission-templates',
      queryParams: {
        include: 'photo,reseau',
        append: 'places_left',
      },
      drawerMissionTemplateId: null,
      autocompleteOptionsReseau: [],
    }
  },
  methods: {
    async onFetchSuggestionsReseau(value) {
      this.loadingFetchReseaux = true
      const reseaux = await apiFetch('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsReseau = reseaux.data
      this.loadingFetchReseaux = false
    },
    async onSelectReseau($event) {
      const queryReseauName =
        $event !== null && this.$route.query['filter[reseau.name]'] !== $event?.name
          ? $event.name
          : undefined
      const queryReseauId =
        $event !== null && Number(this.$route.query['filter[reseau.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          'filter[reseau.name]': queryReseauName,
          'filter[reseau.id]': queryReseauId,
        },
      })
    },
  },
})
</script>
