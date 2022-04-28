<template>
  <div class="container">
    <DrawerMission :mission-id="drawerMissionId" @close="drawerMissionId = null" @updated="$fetch()" />

    <portal to="body-end">
      <Modal
        v-scroll-lock="showModal"
        :is-open="showModal"
        title="Transfert de missions à une activité"
        :prevent-click-outside="true"
        :overflow-hidden="false"
        @close="showModal = false"
      >
        <div class="space-y-4 relative z-50">
          <div class="text-gray-500 text-sm">
            Vous êtes sur le point de transférer <span class="font-bold">{{ queryResult.total }} mission(s)</span>.
          </div>
          <FormControl
            v-if="activities.length"
            html-for="activity_id"
            :error="errors.activity_id"
          >
            <Combobox
              v-model="form.activity_id"
              :value="form.activity_id"
              name="activity_id"
              placeholder="Sélectionner une activité"
              :options="activities"
              clearable
              attribute-key="id"
              attribute-label="name"
            />
          </FormControl>
        </div>

        <template #footer>
          <Button class="mr-3" variant="white" @click.native="showModal = false">
            Retour
          </Button>
          <Button variant="green" @click.native="handleConfirmSubmit">
            Confirmer le transfert
          </Button>
        </template>
      </Modal>
    </portal>

    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Scripts' },
          { label: 'Activités des missions libres' }
        ]"
      />
    </portal>

    <div class="flex flex-col gap-8">
      <SectionHeading
        title="Liaisons aux activités"
        secondary-title-bottom="Liste les missions libres sans activité par nombres de bénévoles recherchés"
      >
        <template #action>
          <div class="flex space-x-2">
            <Button size="xl" :loading="loading" :disabled="queryResult.total == 0" @click.native="showModal = true">
              Affecter {{ $options.filters.formatNumber(queryResult.total) }}
              {{ $options.filters.pluralize(
                queryResult.total,
                'mission libre',
                'missions libres',
                false
              ) }}
            </Button>
          </div>
        </template>
      </Sectionheading>

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
          <Checkbox
            :key="`toutes-${$route.fullPath}`"
            :option="{key: 'toutes', label:'Toutes'}"
            :is-checked="hasActiveFilters()"
            variant="button"
            size="xs"
            transparent
            @change="deleteAllFilters()"
          />
          <Checkbox
            :key="`available-${$route.fullPath}`"
            :option="{key: 'available', label:'En ligne'}"
            :is-checked="$route.query['filter[available]'] && $route.query['filter[available]'] == 'available'"
            variant="button"
            size="xs"
            transparent
            @change="changeFilter('filter[available]', 'available')"
          />
          <SelectAdvanced
            :key="`state-${$route.fullPath}`"
            name="state"
            placeholder="Tous les statuts"
            :options="$labels.mission_workflow_states"
            :value="$route.query['filter[state]']"
            theme="filter"
            variant="transparent"
            clearable
            @input="changeFilter('filter[state]', $event)"
          />
          <SelectAdvanced
            :key="`domaine-${$route.fullPath}`"
            name="domaine"
            placeholder="Tous les domaines"
            :options="$labels.domaines"
            :value="$route.query['filter[ofDomaine]']"
            variant="transparent"
            theme="filter"
            clearable
            @input="changeFilter('filter[ofDomaine]', $event)"
          />
          <InputAutocomplete
            :value="$route.query['filter[structure.name]']"
            icon="SearchIcon"
            name="autocomplete"
            placeholder="Toutes les orgas"
            theme="filter"
            :options="autocompleteOptionsOrga"
            variant="transparent"
            @fetch-suggestions="onFetchSuggestionsOrga"
            @selected="changeFilter('filter[structure.name]', $event ? $event.name : undefined)"
          />
          <InputAutocomplete
            :value="$route.query['filter[structure.reseaux.name]']"
            icon="SearchIcon"
            name="autocomplete"
            placeholder="Tous les réseaux"
            theme="filter"
            :options="autocompleteOptionsReseau"
            variant="transparent"
            @fetch-suggestions="onFetchSuggestionsReseau"
            @selected="changeFilter('filter[structure.reseaux.name]', $event ? $event.name : undefined)"
          />
        </template>
      </SearchFilters>

      <div class=" grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardMission
          v-for="mission in queryResult.data"
          :key="mission.id"
          class="cursor-pointer"
          :mission="mission"
          show-state
          @click.native="drawerMissionId = mission.id"
        />
      </div>

      <Pagination
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import { object, string } from 'yup'
import FormErrors from '@/mixins/form/errors'
import QueryBuilder from '@/mixins/query-builder'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import CardMission from '@/components/card/CardMission.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'

export default {
  components: {
    SearchFilters,
    CardMission,
    DrawerMission
  },
  mixins: [FormErrors, QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  async asyncData ({ $axios, store, error }) {
    const { data: activities } = await $axios.get('/activities?pagination=999')
    return {
      activities: activities.data
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/missions',
      queryParams: {
        'filter[hasActivity]': 0,
        'filter[hasTemplate]': 0,
        sort: '-places_left'
      },
      showAlert: false,
      form: {},
      formSchema: object({
        activity_id: string().nullable().required('Vous devez sélectionner une activité')
      }),
      drawerMissionId: null,
      showModal: false,
      autocompleteOptionsOrga: [],
      autocompleteOptionsReseau: []
    }
  },
  methods: {
    async handleConfirmSubmit () {
      this.loading = true
      this.resetErrors()
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          console.log('handleConfirmSubmit', this.form)
          console.log('this.queryParams', this.queryParams)

          await this.$axios.get(`/scripts/activites-missions-libres/${this.form.activity_id}`, {
            params: { ...this.queryParams, ...this.$route.query }
          }).then(() => {
            this.$toast.success('Le transfert a été effectué !')
            this.showModal = false
            this.$fetch()
          }).catch(() => {})
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async onFetchSuggestionsOrga (value) {
      const res = await this.$axios.get('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20
        }
      })
      this.autocompleteOptionsOrga = res.data.data
    },
    async onFetchSuggestionsReseau (value) {
      const res = await this.$axios.get('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 20
        }
      })
      this.autocompleteOptionsReseau = res.data.data
    }
  }
}
</script>

<style>

</style>
