<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Support', to: '/support' },
          { text: 'Référents', to: '/support/referents' },
          { text: 'Tous les référents' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Tous les référents"
      secondary-title-bottom="Liste des référents en fonction de leurs actions en attente de modération"
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
        <FilterSelectAdvanced
          key="sort"
          name="sort"
          :options="[
            { key: 'department_number', label: 'Numéro de département' },
            { key: 'structures_total_count', label: 'Organisations à modérer' },
            { key: 'missions_total_count', label: 'Missions à modérer' },
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
          Référents
        </TableHeadCell>
        <TableHeadCell>
          Organisations
        </TableHeadCell>
        <TableHeadCell>
          Missions
        </TableHeadCell>
      </TableHead>
      <TableBody>
        <TableRow v-for="item,y in queryResult" :key="y">
          <TableRowCell>
            <div class="flex">
              <Avatar
                :initials="item.department_number"
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
                  Dernière connexion: {{ item.last_online_at ? $dayjs(item.last_online_at).fromNow() : 'Jamais' }}
                </div>
              </div>
            </div>
          </TableRowCell>
          <TableRowCell>
            <div class="text-gray-900 font-semibold">
              {{ item.structures_total_count }} organisations
            </div>
            <div class="text-xs">
              {{ item.structures_waiting_count }} en attente
            </div>
            <div class="text-xs">
              {{ item.structures_in_progress_count }} en cours
            </div>
          </TableRowCell>
          <TableRowCell>
            <div class="text-gray-900 font-semibold">
              {{ item.missions_total_count }} missions
            </div>
            <div class="text-xs">
              {{ item.missions_waiting_count }} en attente
            </div>
            <div class="text-xs">
              {{ item.missions_in_progress_count }} en cours
            </div>
          </TableRowCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import QueryBuilder from '@/mixins/query-builder'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default {

  components: {
    Breadcrumb,
    SearchFilters
  },
  mixins: [QueryBuilder],
  layout: 'support',
  data () {
    return {
      endpoint: '/support/referents',
      loading: true
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style>

</style>
