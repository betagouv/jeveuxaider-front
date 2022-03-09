<template>
  <div class="container">
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
          <SectionHeading title="Transfert de missions">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
                  Exécuter le transfert
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
                    @fetch-suggestions="onFetchSuggestionsOrga"
                    @selected="handleSelected($event,'origin')"
                  />
                  <div v-else class="flex">
                    <TagFormItem
                      :tag="form.origin"
                      @removed="form.origin = null"
                    >
                      {{ form.origin.name }}  #{{ form.origin.id }}
                    </TagFormItem>
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
                    @fetch-suggestions="onFetchSuggestionsOrga"
                    @selected="handleSelected($event,'destination')"
                  />
                  <div v-else class="flex">
                    <TagFormItem
                      :tag="form.destination"
                      @removed="form.destination = null"
                    >
                      {{ form.destination.name }}  #{{ form.destination.id }}
                    </TagFormItem>
                  </div>
                </FormControl>
                <FormControl
                  v-if="form.origin"
                  html-for="missions"
                  label="Missions à transférer"
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
                        {{ mission.name }}  #{{ mission.id }}
                      </TagFormItem>
                    </div>
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
      form: {
        missions: []
      },
      formSchema: object({
        origin: object().required(),
        destination: object().required()
      }),
      autocompleteOptionsOrga: [],
      autocompleteOptionsMissions: []
    }
  },
  methods: {
    handleSelected (event, field) {
      if (event) {
        this.$set(this.form, field, event)
        this.validate(field)
      }
    },
    async onFetchSuggestionsOrga (value) {
      const res = await this.$axios.get('/structures', {
        params: {
          'filter[search]': value,
          pagination: 7
        }
      })
      this.autocompleteOptionsOrga = res.data.data
    },
    async onFetchSuggestionsMissions (value) {
      const res = await this.$axios.get('/missions', {
        params: {
          'filter[structure.id]': this.form.origin?.id,
          'filter[search]': value,
          pagination: 7
        }
      })
      this.autocompleteOptionsMissions = res.data.data
    },
    handleSelectMission (mission) {
      if (mission) {
        this.$set(this.form, 'missions', [...this.form.missions, mission])
      }
    },
    onRemovedMission (mission) {
      this.form.missions = this.form.missions.filter(item => item.id !== mission.id)
    },
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$axios.post('/scripts/migrate-organisation-missions', this.form).then(() => {
            this.$toast.success('OKI')
          }).catch(() => {})
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
