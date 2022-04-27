<template>
  <div class="container">
    <AlertDialog
      v-if="form.origin && form.destination"
      theme="danger"
      title="Êtes-vous sûrs ?"
      :text="`Vous êtes sur le point de transférer les missions de « ${form.origin.name} #${form.origin.id} » vers « ${form.destination.name} #${form.destination.id} ».`"
      :is-open="showAlert"
      button-label="Oui, je confirme"
      @confirm="handleConfirmSubmit()"
      @cancel="showAlert = false"
    />

    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Scripts' },
        { label: 'Transfert de missions' }
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <SecondaryMenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading title="Transfert de missions" secondary-title-bottom="Permet de transférer des missions et leurs responsables d'une organisation à une autre">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
                  Exécuter le script
                </Button>
              </div>
            </template>
          </SectionHeading>
          <div class="">
            <Box>
              <div class="max-w-xl space-y-10">
                <FormControl
                  html-for="origin"
                  label="Organisation d'origine"
                  required
                  :error="errors.origin"
                >
                  <InputAutocomplete
                    v-if="!form.origin"
                    :value="$route.query['filter[structure.name]']"
                    icon="SearchIcon"
                    name="autocomplete"
                    placeholder="Recherche par mots clés..."
                    :options="autocompleteOptionsOrga"
                    clear-after-selected
                    show-key-in-options
                    @fetch-suggestions="onFetchSuggestionsOrga"
                    @selected="handleSelected($event,'origin')"
                  />
                  <div v-else class="flex">
                    <TagFormItem
                      :tag="form.origin"
                      @removed="handleRemoveOrigin"
                    >
                      <div class="truncate">
                        #{{ form.origin.id }} {{ form.origin.name }}
                      </div>
                      <div class="text-gray-500 text-xs font-normal">
                        <div>
                          {{ form.origin.state }}
                        </div>
                        <div>
                          {{ form.origin.missions_count }} mission(s)
                        </div>
                      </div>
                    </TagFormItem>
                  </div>
                </FormControl>
                <FormControl
                  v-if="form.origin"
                  html-for="missions"
                  :label="`Missions de « ${form.origin.name} » à transférer`"
                  :error="errors.missions"
                >
                  <FormHelperText class="pb-2">
                    Laissez vide si vous voulez transférer toutes les missions.
                  </FormHelperText>
                  <InputAutocomplete
                    :value="$route.query['filter[search]']"
                    icon="SearchIcon"
                    name="autocomplete"
                    placeholder="Recherche par mots clés..."
                    :options="autocompleteOptionsMissions"
                    clear-after-selected
                    show-key-in-options
                    @fetch-suggestions="onFetchSuggestionsMissions"
                    @selected="handleSelectMission"
                  />
                  <div v-if="form.missions.length">
                    <div class="flex flex-wrap gap-2 mt-4">
                      <TagFormItem
                        v-for="mission in form.missions"
                        :key="mission.id"
                        :tag="mission"
                        @removed="onRemovedMission"
                      >
                        <div class="truncate">
                          #{{ mission.id }} {{ mission.name }}
                        </div>
                        <div class="text-gray-500 text-xs font-normal">
                          <div>
                            {{ mission.state }}
                          </div>
                          <div>
                            {{ mission.participations_count }} participation(s)
                          </div>
                        </div>
                      </TagFormItem>
                    </div>
                  </div>
                </FormControl>
                <FormControl
                  html-for="destination"
                  label="Organisation de destination"
                  required
                  :error="errors.destination"
                >
                  <InputAutocomplete
                    v-if="!form.destination"
                    :value="$route.query['filter[structure.name]']"
                    icon="SearchIcon"
                    name="autocomplete"
                    placeholder="Recherche par mots clés..."
                    :options="autocompleteOptionsOrga"
                    clear-after-selected
                    show-key-in-options
                    @fetch-suggestions="onFetchSuggestionsOrga"
                    @selected="handleSelected($event,'destination')"
                  />
                  <div v-else class="flex">
                    <TagFormItem
                      :tag="form.destination"
                      @removed="form.destination = null"
                    >
                      <div class="truncate">
                        #{{ form.destination.id }} {{ form.destination.name }}
                      </div>
                      <div class="text-gray-500 text-xs font-normal">
                        <div>
                          {{ form.destination.state }}
                        </div>
                        <div>
                          {{ form.destination.missions_count }} mission(s)
                        </div>
                      </div>
                    </TagFormItem>
                  </div>
                </FormControl>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { object } from 'yup'
import SecondaryMenuAdmin from '@/components/menu/SecondaryMenuAdmin'
import FormErrors from '@/mixins/form/errors'

export default {
  components: {
    SecondaryMenuAdmin
  },
  mixins: [FormErrors],
  middleware: 'admin',
  data () {
    return {
      loading: false,
      showAlert: false,
      form: {
        missions: []
      },
      formSchema: object({
        origin: object().nullable().required(),
        destination: object().nullable().required()
      }),
      autocompleteOptionsOrga: [],
      autocompleteOptionsMissions: []
    }
  },
  methods: {
    handleRemoveOrigin () {
      this.form.origin = null
      this.form.missions = []
    },
    handleSelected (event, field) {
      if (event) {
        this.$set(this.form, field, event)
        this.validate(field)
      }
    },
    async onFetchSuggestionsOrga (value) {
      const res = await this.$axios.get('/structures', {
        params: {
          include: 'missionsCount',
          'filter[search]': value,
          pagination: 7
        }
      })
      this.autocompleteOptionsOrga = res.data.data
    },
    async onFetchSuggestionsMissions (value) {
      const res = await this.$axios.get('/missions', {
        params: {
          include: 'participationsCount',
          'filter[structure.id]': this.form.origin?.id,
          'filter[search]': value,
          pagination: 7
        }
      })
      this.autocompleteOptionsMissions = res.data.data
    },
    handleSelectMission (mission) {
      if (mission) {
        const index = this.form.missions.findIndex(item => item.id == mission.id)
        if (index === -1) {
          this.$set(this.form, 'missions', [...this.form.missions, mission])
        }
      }
    },
    onRemovedMission (mission) {
      this.form.missions = this.form.missions.filter(item => item.id !== mission.id)
    },
    async handleSubmit () {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.showAlert = true
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
        })
    },
    async handleConfirmSubmit () {
      this.showAlert = false
      this.loading = true
      await this.$axios.post('/scripts/migrate-organisation-missions', this.form).then(() => {
        this.$toast.success('Le transfert a été effectué !')
        this.$router.push(`/admin/organisations/${this.form.destination.id}`)
      }).catch(() => {})
      this.loading = false
    }
  }
}
</script>

<style>

</style>
