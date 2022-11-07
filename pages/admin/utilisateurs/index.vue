<template>
  <ContainerRightSidebar>
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Utilisateurs' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 sticky top-8">
        <SelectAdvanced
          :key="`role-${$route.fullPath}`"
          name="user.role"
          placeholder="Rôle"
          :options="[
            { key:'responsable', label: 'Responsable' },
            { key:'responsable_territoire', label: 'Responsable territorial' },
            { key:'tete_de_reseau', label: 'Tête de réseau' },
            { key:'referent', label: 'Référent départemental' },
            { key:'referent_regional', label: 'Référent régional' },
            { key:'admin', label: 'Modérateur' }
          ]"
          :value="$route.query['filter[user.role]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[user.role]', $event)"
        />
        <SelectAdvanced
          v-if="$route.query['filter[user.role]'] === 'referent'"
          :key="`referent-department-${$route.fullPath}`"
          name="referent-department"
          placeholder="Département du référent"
          :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
          :value="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[department]', $event)"
        />
        <SelectAdvanced
          v-if="$route.query['filter[user.role]'] === 'referent_regional'"
          :key="`referent-region-${$route.fullPath}`"
          name="referent-region"
          placeholder="Région du référent"
          :options="$labels.regions"
          :value="$route.query['filter[referent_region]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[referent_region]', $event)"
        />

        <SelectAdvanced
          :key="`is_visible-${$route.fullPath}`"
          name="is_visible"
          placeholder="Visible dans la recherche"
          :options="[{key: 'true', label: 'Oui'}, {key: 'false', label: 'Non'}]"
          :value="$route.query['filter[is_visible]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[is_visible]', $event)"
        />
        <SelectAdvanced
          :key="`min_participations-${$route.fullPath}`"
          name="min_participations"
          placeholder="Participations réalisées"
          :options="[{key: 1, label: 'Au moins 1'}, {key: 3, label: 'Au moins 3'}, {key: 5, label: 'Au moins 5'}, {key: 10, label: 'Au moins 10'}]"
          :value="$route.query['filter[min_participations]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[min_participations]', $event)"
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
        <Input
          :key="`zip-${$route.fullPath}`"
          name="zip"
          placeholder="Code postal"
          variant="transparent"
          :value="$route.query['filter[zip]']"
          @input="changeFilter('filter[zip]', $event)"
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
      </div>
    </template>
    <div>
      <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} utilisateurs`">
        <template #action>
          <div v-if="$store.getters.profile.can_export_profiles" class="flex space-x-2">
            <Button icon="DownloadIcon" variant="white" size="lg" :loading="exportLoading" @click.native="handleExport">
              Exporter
            </Button>
          </div>
        </template>
      </SectionHeading>
      <SearchFilters class="my-8">
        <Input
          name="search"
          placeholder="Recherche par prénom, nom ou e-mail"
          icon="SearchIcon"
          variant="transparent"
          :value="$route.query['filter[search]']"
          clearable
          @input="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <Checkbox
            :key="`tous-${$route.fullPath}`"
            :option="{key: 'tous', label:'Tous'}"
            :is-checked="hasActiveFilters()"
            variant="button"
            size="xs"
            transparent
            @change="deleteAllFilters()"
          />
          <Checkbox
            :key="`role-referents-${$route.fullPath}`"
            :option="{key: 'referent', label:'Référents départementaux'}"
            :is-checked="$route.query['filter[user.role]'] == 'referent'"
            variant="button"
            size="xs"
            transparent
            @change="changeFilter('filter[user.role]', 'referent')"
          />
          <Checkbox
            :key="`role-responsable-${$route.fullPath}`"
            :option="{key: 'responsable', label:'Responsables d\'organisations'}"
            :is-checked="$route.query['filter[user.role]'] == 'responsable'"
            variant="button"
            size="xs"
            transparent
            @change="changeFilter('filter[user.role]', 'responsable')"
          />
          <Checkbox
            :key="`role-tete_de_reseau-${$route.fullPath}`"
            :option="{key: 'tete_de_reseau', label:'Têtes de réseau'}"
            :is-checked="$route.query['filter[user.role]'] == 'tete_de_reseau'"
            variant="button"
            size="xs"
            transparent
            @change="changeFilter('filter[user.role]', 'tete_de_reseau')"
          />
        <!-- <Checkbox
          :key="`role-responsable_territoire-${$route.fullPath}`"
          :option="{key: 'responsable_territoire', label:'Responsables territoriaux'}"
          :is-checked="$route.query['filter[user.role]'] == 'responsable_territoire'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[user.role]', 'responsable_territoire')"
        /> -->
        </template>
        <template #sorts>
          <Sort
            key="sort"
            name="sort"
            transparent
            :value="$route.query['sort'] ? $route.query['sort'] : '-created_at'"
            :options="[
              { key: '-created_at', label: 'Date de création' },
              { key: '-participations_validated_count', label: 'Nombre de participations réalisées' },
            ]"
            @input="changeFilter('sort', $event)"
          />
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardProfile
          v-for="profile in queryResult.data"
          :key="profile.id"
          :profile="profile"
          @click.native="drawerProfileId = profile.id"
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
import MixinExport from '@/mixins/export'
import CardProfile from '@/components/card/CardProfile.vue'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import BoxContext from '@/components/section/BoxContext.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'

export default {
  components: {
    CardProfile,
    DrawerProfile,
    BoxContext,
    SearchFilters,
    Pagination
  },
  mixins: [QueryBuilder, MixinExport],
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/profiles',
      exportEndpoint: '/export/profiles',
      queryParams: {
        include: 'user,avatar'
      },
      drawerProfileId: null,
      tags: []
    }
  },
  async mounted () {
    const { data } = await this.$axios.get('/vocabularies/profiles/terms', { params: { pagination: 50 } })
    this.tags = data.data.map((tag) => { return { key: tag.id, label: tag.name } })
  },
  methods: {

  }
}
</script>
