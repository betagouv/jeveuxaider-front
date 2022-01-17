<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Mission prioritaires' },
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
          <SectionHeading title="Mission prioritaires">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <Button type="submit" variant="green" size="xl" :loading="loading" @click.native="onSubmit">
                  Ajouter
                </Button>
              </div>
            </template>
          </Sectionheading>

          <Input
            class="mt-8"
            name="search"
            placeholder="Recherche par mots clés..."
            icon="SearchIcon"
            variant="transparent"
            :value="$route.query['filter[search]']"
            @input="changeFilter('filter[search]', $event)"
          />

          <!-- <Box>
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
          </Box> -->

          <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardMission
              v-for="mission in queryResult.data"
              :key="mission.id"
              class="cursor-pointer"
              :mission="mission"
              @click.native="drawerMissionId = mission.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuAdmin from '@/components/section/admin/MenuAdmin'
// import FormErrors from '@/mixins/form/errors'
import CardMission from '@/components/card/CardMission'
import QueryBuilder from '@/mixins/query-builder'

export default {
  components: {
    MenuAdmin,
    CardMission
  },
  mixins: [QueryBuilder],
  asyncData ({ store, error }) {
    if (
      !['admin'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/missions/prioritaires',
      autocompleteOptionsMissions: []
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
      // this.form.missions_prioritaires.push(event.id)
    },
    onSubmit () {
      // this.formSchema
      //   .validate(this.form, { abortEarly: false })
      //   .then(async () => {
      //     this.loading = true
      //     console.log('this.form', this.form)
      //     this.$toast.success('Modifications enregistrées')
      //   })
      //   .catch((errors) => {
      //     this.setErrors(errors)
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    }
  }
}
</script>

<style>

</style>
