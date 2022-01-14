<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Paramètres' },
        { label: 'Édito' },
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading title="Édito">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <Button type="submit" variant="green" size="xl" :loading="loading" @click.native="onSubmit">
                  Enregistrer
                </Button>
              </div>
            </template>
          </Sectionheading>

          <Box>
            <Heading :level="3" class="mb-8">
              Gérer les missions prioritaires
            </Heading>
            <FormControl label="Ajouter une mission en prioritaire" html-for="autocomplete" :error="errors.missions_prioritaires">
              <InputAutocomplete
                name="autocomplete"
                placeholder="Recherche par mots clés ou IDs"
                :options="autocompleteOptionsMissions"
                @fetch-suggestions="onFetchSuggestionsMissions"
                @selected="handleSelected"
              />
            </FormControl>
          </Box>

          <div class="flex flex-wrap gap-12">
            <CardMission
              v-for="mission in missions"
              :key="mission.id"
              :mission="mission"
              class="!h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { object, array } from 'yup'
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import FormErrors from '@/mixins/form/errors'
import CardMission from '@/components/card/CardMission'

export default {
  components: {
    MenuAdmin,
    CardMission
  },
  mixins: [FormErrors],
  async asyncData ({ $axios }) {
    const { data: settings } = await $axios.get('/settings/edito')
    const { data: missions } = await $axios.get('/missions/prioritaires')

    return {
      form: settings,
      missions
    }
  },
  data () {
    return {
      loading: false,
      autocompleteOptionsMissions: [],
      formSchema: object({
        missions_prioritaires: array().min(1)
      })
    }
  },
  methods: {
    async onFetchSuggestionsMissions (value) {
      const res = await this.$axios.get('/missions', {
        params: {
          'filter[search]': value,
          pagination: 20
        }
      })
      this.autocompleteOptionsMissions = res.data.data
    },
    handleSelected (event) {
      console.log('handle', event)
      this.form.missions_prioritaires.push(event.id)
    },
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          console.log('this.form', this.form)
          await this.$axios.post('/settings/edito', this.form)
          this.$toast.success('Modifications enregistrées')
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
