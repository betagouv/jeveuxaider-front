<template>
  <div class="flex flex-col gap-12">
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />

    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Support', to: '/support' },
          { text: 'Responsables' },
          { text: 'Participations à modérer' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Participations à modérer"
      secondary-title-bottom="En attente de validation depuis plus de 7 jours ou en cours de traitement depuis plus de 2 mois"
    />

    <SearchFilters>
      <Input
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['search']"
        clearable
        @input="changeFilter('search', $event)"
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
          Tous
        </Tag>
        <FilterInputAutocomplete
          :value="$route.query['organisation']"
          label="Toutes les organisations"
          name="autocomplete"
          :options="autocompleteOptionsOrganisations"
          @fetch-suggestions="onFetchSuggestionsOrganisations"
          @selected="changeFilter('organisation', $event?.id)"
        />
        <Tag
          :key="`inactif-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['inactive'] && $route.query['inactive'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('inactive', 'true')"
        >
          Inactif depuis 1 mois
        </Tag>
        <FilterSelectAdvanced
          key="sort"
          name="sort"
          :options="[
            { key: 'participations_total_count', label: 'Participations à modérer' },
            { key: 'participations_waiting_count', label: 'Participations en attente' },
            { key: 'participations_in_progress_count', label: 'Participations en cours de traitement' },
          ]"
          :value="$route.query['sort']"
          placeholder="Trier par"
          @input="changeFilter('sort', $event)"
        />
      </template>
    </SearchFilters>

    <Table>
      <TableHead>
        <TableHeadCell>
          Responsables
        </TableHeadCell>
        <TableHeadCell>
          # à modérer
        </TableHeadCell>
        <TableHeadCell>
          En ligne
        </TableHeadCell>
      </TableHead>
      <TableBody :loading="queryLoading" :colspan="4">
        <TableRow v-for="item,y in queryResult.data" :key="y" class="hover:cursor-pointer" @click.native="drawerProfileId = item.profile_id">
          <TableRowCell>
            <div class="flex">
              <Avatar
                :initials="item.first_name[0] + item.last_name[0]"
                size="sm"
                class="mr-4"
              />
              <div class="">
                <div class="text-gray-900 font-semibold">
                  {{ item.first_name }} {{ item.last_name }}
                </div>
                <div class="text-xs">
                  {{ item.email }}
                </div>
                <div class="text-xs">
                  {{ item.structure_name }} #{{ item.structure_id }}
                </div>
              </div>
            </div>
          </TableRowCell>
          <TableRowCell>
            <div class="text-gray-900 font-semibold">
              {{ item.participations_total_count }} participations
            </div>
            <div class="text-xs">
              {{ item.participations_waiting_count }} en attente de validation
            </div>
            <div class="text-xs">
              {{ item.participations_in_progress_count }} en cours de traitement
            </div>
          </TableRowCell>
          <TableRowCell>
            <OnlineIndicator :published="$dayjs().subtract(10,'minute').isBefore(item.last_online_at)" class="text-xs" />
            <div class="text-xs italic">
              {{ item.last_online_at ? $dayjs(item.last_online_at).fromNow() : 'Jamais' }}
            </div>
          </TableRowCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
      :current-page="queryResult.current_page"
      :total-rows="queryResult.total"
      :per-page="queryResult.per_page"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import QueryBuilder from '@/mixins/query-builder'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import Pagination from '@/components/dsfr/Pagination.vue'

export default {

  components: {
    Breadcrumb,
    SearchFilters,
    Tag,
    OnlineIndicator,
    DrawerProfile,
    Pagination
  },
  mixins: [QueryBuilder],
  layout: 'support',
  data () {
    return {
      endpoint: '/support/responsables/participations-to-be-treated',
      loading: true,
      drawerProfileId: null,
      autocompleteOptionsOrganisations: []
    }
  },
  computed: {

  },
  methods: {
    async onFetchSuggestionsOrganisations (value) {
      const res = await this.$axios.get('/structures', {
        params: {
          'filter[search]': value,
          pagination: 12
        }
      })
      this.autocompleteOptionsOrganisations = res.data.data
    }
  }
}
</script>

<style>

</style>
