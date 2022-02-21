<template>
  <ContainerRightSidebar>
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Utilisateurs' }]"
      />
    </template>
    <template #sidebar>
      <div class="flex flex-col gap-y-4 sticky top-8">
        <SelectAdvanced
          :key="`role-${$route.fullPath}`"
          name="role"
          placeholder="Rôle"
          :options="[
            { key:'responsable', label: 'Responsable' },
            { key:'responsable_territoire', label: 'Responsable territorial' },
            { key:'tete_de_reseau', label: 'Tête de réseau' },
            { key:'referent', label: 'Référent départemental' },
            { key:'referent_regional', label: 'Référent régional' },
            { key:'analyste', label: 'Analyste' }]"
          :value="$route.query['filter[role]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[role]', $event)"
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
          placeholder="Code Postal"
          variant="transparent"
          :value="$route.query['filter[zip]']"
          @input="changeFilter('filter[zip]', $event)"
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
      </div>
    </template>
    <div>
      <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} utilisateurs`" />
      <Input
        class="mt-8"
        name="search"
        placeholder="Recherche par prénom, nom ou e-mail"
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
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
          :is-checked="$route.query['filter[role]'] == 'referent'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[role]', 'referent')"
        />
        <Checkbox
          :key="`role-responsable-${$route.fullPath}`"
          :option="{key: 'responsable', label:'Responsables d\'organisations'}"
          :is-checked="$route.query['filter[role]'] == 'responsable'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[role]', 'responsable')"
        />
        <Checkbox
          :key="`role-tete_de_reseau-${$route.fullPath}`"
          :option="{key: 'tete_de_reseau', label:'Têtes de réseau'}"
          :is-checked="$route.query['filter[role]'] == 'tete_de_reseau'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[role]', 'tete_de_reseau')"
        />
        <Checkbox
          :key="`role-responsable_territoire-${$route.fullPath}`"
          :option="{key: 'responsable_territoire', label:'Responsables territoriaux'}"
          :is-checked="$route.query['filter[role]'] == 'responsable_territoire'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[role]', 'responsable_territoire')"
        />
      </div>
      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardProfile
          v-for="profile in queryResult.data"
          :key="profile.id"
          :profile="profile"
          @click.native="drawerProfileId = profile.id"
        />
      </div>

      <Pagination
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
import CardProfile from '@/components/card/CardProfile.vue'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'

export default {
  components: {
    CardProfile,
    DrawerProfile
  },
  mixins: [QueryBuilder],
  layout: 'admin',
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
      endpoint: '/profiles',
      queryParams: {
        include: 'user,participationsValidatedCount,avatar'
      },
      drawerProfileId: null
    }
  }
}
</script>
