<template>
  <ContainerRightSidebar>
    <DrawerMission :mission-id="drawerMissionId" @close="drawerMissionId = null" @updated="$fetch()" @refetch="$fetch()" />
    <template #breadcrumb>
      <Breadcrumb
        :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Missions' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 mb-32">
        <InputAutocomplete
          v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
          :value="$route.query['filter[structure.name]']"
          icon="SearchIcon"
          name="autocomplete"
          placeholder="Organisation"
          :options="autocompleteOptionsOrga"
          :show-key-in-options="true"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsOrga"
          @selected="onSelectOrganisation"
        />
        <SelectAdvanced
          v-if="responsables.length && ['admin'].includes($store.getters.contextRole)"
          :key="`responsable-${$route.fullPath}`"
          name="responsable"
          placeholder="Responsable"
          :options="responsables"
          :value="$route.query['filter[ofResponsable]']"
          variant="transparent"
          attribute-key="id"
          attribute-label="full_name"
          clearable
          @input="changeFilter('filter[ofResponsable]', $event)"
        />
        <SelectAdvanced
          v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
          name="statut_juridique"
          placeholder="Statut juridique"
          :options="$labels.structure_legal_status"
          :value="$route.query['filter[structure.statut_juridique]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[structure.statut_juridique]', $event)"
        />
        <SelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="department"
          placeholder="Département"
          :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
          :value="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[department]', $event)"
        />
        <SelectAdvanced
          :key="`domaine-${$route.fullPath}`"
          name="domaine"
          placeholder="Domaine d'action"
          :options="$labels.domaines"
          :value="$route.query['filter[ofDomaine]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[ofDomaine]', $event)"
        />
        <Combobox
          v-if="activities.length && ['admin','referent'].includes($store.getters.contextRole)"
          name="activity_id"
          placeholder="Activité"
          :options="activities"
          clearable
          attribute-key="id"
          attribute-label="name"
          variant="transparent"
          :value="$route.query['filter[ofActivity]']"
          @input="changeFilter('filter[ofActivity]', $event)"
        />
        <SelectAdvanced
          :key="`creneaux-${$route.fullPath}`"
          name="creneaux"
          placeholder="Créneaux"
          :options="[{key: 'true', label: 'Oui'}, {key: 'false', label: 'Non'}]"
          :value="$route.query['filter[hasCreneaux]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[hasCreneaux]', $event)"
        />
        <SelectAdvanced
          :key="`is-active-${$route.fullPath}`"
          name="is-active"
          placeholder="État"
          :options="[{key: 'true', label: 'Activée'}, {key: 'false', label: 'Désactivée'}]"
          :value="$route.query['filter[is_active]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[is_active]', $event)"
        />
        <SelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Statut"
          :options="$labels.mission_workflow_states"
          :value="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
        <SelectAdvanced
          :key="`date-${$route.fullPath}`"
          name="date"
          placeholder="Date"
          :options="[{key: 'incoming', label: 'À venir'}, {key: 'in_progress', label: 'En cours'}, {key: 'over', label: 'Passée'}]"
          :value="$route.query['filter[date]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[date]', $event)"
        />
        <SelectAdvanced
          :key="`place-${$route.fullPath}`"
          name="place"
          placeholder="Place restante"
          :options="[{key: 'true', label: 'Oui'}, {key: 'false', label: 'Non'}]"
          :value="$route.query['filter[place]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[place]', $event)"
        />
        <SelectAdvanced
          :key="`publics_volontaires-${$route.fullPath}`"
          name="publics_volontaires"
          placeholder="Proposé aux"
          :options="[{key: 'Mineurs', label: 'Mineurs'}]"
          :value="$route.query['filter[publics_volontaires]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[publics_volontaires]', $event)"
        />
        <SelectAdvanced
          :key="`publics_beneficiaires-${$route.fullPath}`"
          name="publics_beneficiaires"
          placeholder="Publics aidés"
          :options="$labels.mission_publics_beneficiaires"
          :value="$route.query['filter[publics_beneficiaires]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[publics_beneficiaires]', $event)"
        />
        <SelectAdvanced
          v-if="$store.getters.contextRole == 'admin'"
          :key="`tags-${$route.fullPath}`"
          name="tags"
          placeholder="Tags"
          :options="tags"
          :value="$route.query['filter[tags]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[tags]', $event)"
        />
        <div class="flex flex-wrap mb-2 gap-4">
          <Checkbox
            :key="`type-1-${$route.fullPath}`"
            :option="{key:'presentiel', label: 'Présentiel'}"
            :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'].includes('Mission en présentiel')"
            transparent
            variant="button"
            @change="changeFilter('filter[type]', 'Mission en présentiel', true)"
          />
          <Checkbox
            :key="`type-2-${$route.fullPath}`"
            :option="{key:'distance', label: 'À distance'}"
            :is-checked="$route.query['filter[type]'] && $route.query['filter[type]'].includes('Mission à distance')"
            transparent
            variant="button"
            @change="changeFilter('filter[type]', 'Mission à distance', true)"
          />
          <Checkbox
            :key="`type-3-${$route.fullPath}`"
            :option="{key:'autonomy', label: 'En autonomie'}"
            :is-checked="$route.query['filter[is_autonomy]'] && $route.query['filter[is_autonomy]'].includes('true')"
            transparent
            variant="button"
            @change="changeFilter('filter[is_autonomy]', 'true', true)"
          />
        </div>
      </div>
    </template>
    <div>
      <SectionHeading
        :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
          queryResult.total,
          'mission',
          'missions',
          false
        )}`"
      >
        <template #action>
          <div class="flex space-x-2">
            <Button
              type="secondary"
              icon="RiDownload2Line"
              :loading="exportLoading"
              @click.native="handleExport"
            >
              Exporter
            </Button>
            <ButtonCreateMission
              v-if="$store.getters.contextRole === 'responsable'"
              size="md"
            />
          </div>
        </template>
      </Sectionheading>

      <SearchFilters class="my-8">
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

          <Tag
            v-if="['responsable'].includes($store.getters.contextRole)"
            :key="`responsable-id-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[responsable.id]'] && $route.query['filter[responsable.id]'] == $store.getters.profile.id"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[responsable.id]', $store.getters.profile.id.toString())"
          >
            Mes missions
          </Tag>

          <Tag
            :key="`state-en-attente-validation-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[state]'] && $route.query['filter[state]'] == 'En attente de validation'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'En attente de validation')"
          >
            En attente de validation
          </Tag>

          <Tag
            :key="`available-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[available]'] && $route.query['filter[available]'] == 'available'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[available]', 'available')"
          >
            En ligne
          </Tag>

          <Tag
            v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :key="`snu-mig-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[is_snu_mig_compatible]'] && $route.query['filter[is_snu_mig_compatible]'] == 'true'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[is_snu_mig_compatible]', 'true')"
          >
            SNU/MIG
          </Tag>

          <Tag
            v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :key="`mineurs-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[publics_volontaires]'] && $route.query['filter[publics_volontaires]'] == 'Mineurs'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[publics_volontaires]', 'Mineurs')"
          >
            Ouverte aux mineurs
          </Tag>
          <FilterSelectAdvanced
            key="sort"
            name="sort"
            :options="[
              { key: '-created_at', label: 'Les plus récentes' },
              { key: 'created_at', label: 'Les plus anciennes' },
              { key: '-updated_at', label: 'Date de denière modification' },
              { key: '-places_left', label: 'Nombre de bénévoles recherchés' },
            ]"
            :value="$route.query['sort']"
            placeholder="Trier par"
            @input="changeFilter('sort', $event)"
          />
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardMission
          v-for="mission in queryResult.data"
          :key="mission.id"
          class="cursor-pointer"
          :mission="mission"
          show-state
          :show-tags="['admin'].includes($store.getters.contextRole)"
          tabindex="0"
          @click.native="drawerMissionId = mission.id"
        />
      </div>

      <Pagination
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </ContainerRightSidebar>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardMission from '@/components/card/CardMission.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'
import MixinExport from '@/mixins/export'
import BoxContext from '@/components/section/BoxContext.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import ButtonCreateMission from '@/components/custom/ButtonCreateMission'
import Pagination from '@/components/dsfr/Pagination.vue'
import Tag from '@/components/dsfr/Tag.vue'
import Button from '@/components/dsfr/Button.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    CardMission,
    DrawerMission,
    BoxContext,
    SearchFilters,
    ButtonCreateMission,
    Pagination,
    Tag,
    Button,
    Breadcrumb
  },
  mixins: [QueryBuilder, MixinExport],
  middleware: ['authenticated', 'agreedResponsableTerms'],
  async asyncData ({ $axios, store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'responsable', 'tete_de_reseau'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }

    const { data: activities } = await $axios.get('/activities', {
      params: {
        pagination: 999,
        'filter[is_published]': 1
      }
    })

    return {
      activities: activities.data
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/missions',
      exportEndpoint: '/export/missions',
      queryParams: {
        include: 'template.photo,illustrations,tags'
      },
      drawerMissionId: null,
      autocompleteOptionsOrga: [],
      tags: [],
      responsables: []
    }
  },
  watch: {
    '$route.query': {
      handler (newQuery, oldQuery) {
        if (this.$store.getters.contextRole === 'admin') {
          this.fetchResponsablesForAdmins(newQuery['filter[structure.id]'], oldQuery?.['filter[structure.id]'])
        }
      },
      immediate: true
    }
  },
  async mounted () {
    const { data } = await this.$axios.get('/vocabularies/missions/terms', { params: { pagination: 50 } })
    this.tags = data.data.map((tag) => { return { key: tag.id, label: tag.name } })
  },
  methods: {
    async onFetchSuggestionsOrga (value) {
      const res = await this.$axios.get('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20
        }
      })
      this.autocompleteOptionsOrga = res.data.data
    },
    async fetchResponsablesForAdmins (organisationId, oldOrganisationId) {
      if (!organisationId) {
        this.responsables = []
        return
      }
      if (organisationId !== oldOrganisationId) {
        const { data: responsables } = await this.$axios.get(`/structures/${organisationId}/responsables`)
        this.responsables = responsables?.map(user => user.profile) ?? []
      }
    },
    async onSelectOrganisation ($event) {
      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          'filter[structure.name]': $event?.name ?? undefined,
          'filter[structure.id]': $event?.id ?? undefined,
          'filter[ofResponsable]': undefined
        }
      })
    }
  }
}
</script>
