<template>
  <div>
    <Box>
      <form id="form" class="space-y-8" @submit="onSubmit">
        <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
          Selects
        </Heading>
        <div>
          <FormLabel html-for="state">
            Select native
          </FormLabel>
          <Select
            v-model="form.state"
            name="state"
            placeholder="Statut de la mission"
            :options="[
              {key: 'draft', label:'Brouillon'},
              {key: 'waiting', label:'En attente de validation'},
              {key: 'validated', label:'Validée'}
            ]"
          />
        </div>
        <div>
          <FormLabel html-for="state2">
            Select with themed options
          </FormLabel>
          <FormHelperText>Options avec key => label</FormHelperText>
          <SelectAdvanced
            v-model="form.select_advanced"
            name="state2"
            placeholder="Choisissez une option"
            :options="[
              {key: 'draft', label:'Brouillon'},
              {key: 'waiting', label:'En attente de validation'},
              {key: 'validated', label:'Validée'}
            ]"
            clearable
          />
        </div>
        <div>
          <FormLabel html-for="responsable">
            Select with themed options based on model
          </FormLabel>
          <FormHelperText>Options avec id => name (props attribute-key & attribute-label)</FormHelperText>
          <SelectAdvanced
            v-model="form.select_advanced_id"
            icon="UserIcon"
            name="responsable"
            placeholder="Choisissez une option"
            :options="[
              {id: 1, name: 'Jérémy Pinto'},
              {id: 2, name: 'Nicolas Vaissaud'},
              {id: 3, name: 'Kevin Vaissaud'},
              {id: 4, name: 'John Doe'},
            ]"
            attribute-key="id"
            attribute-label="name"
            clearable
          />
        </div>
        <div>
          <FormLabel html-for="state2">
            Select with descriptions
          </FormLabel>
          <SelectWithDescription :options="$labels.mission_workflow_states" value="Validée" />
        </div>
        <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
          Autocomplete
        </Heading>
        <div>
          <FormLabel html-for="responsable">
            Autocomplete
          </FormLabel>
          <FormHelperText>Sélectionnez un territoire depuis notre base de données</FormHelperText>
          <InputAutocomplete
            name="autocomplete"
            label="Autocomplete"
            placeholder="Choisissez un territoire"
            :options="autocompleteOptions"
            @selected="handleSelected"
            @fetch-suggestions="onFetchSuggestions"
          />
        </div>
        <div>
          <FormLabel html-for="responsable">
            Geo Autocomplete
          </FormLabel>
          <FormHelperText>Commencez par taper votre adresse</FormHelperText>
          <InputAutocomplete
            icon="LocationMarkerIcon"
            name="autocomplete"
            label="Autocomplete"
            placeholder="Ex: 14 rue rivoli, Paris"
            :options="autocompleteOptions"
            attribute-key="id"
            attribute-label="label"
            attribute-right-label="typeLabel"
            @selected="handleSelectedGeo"
            @fetch-suggestions="onFetchGeoSuggestions"
          />
          <div v-if="geoSelected" class="bg-gray-100 p-4 rounded-lg text-sm text-gray-900 mt-2">
            <code>
              <pre>{{ geoSelected }}</pre>
            </code>
          </div>
        </div>
      </form>
    </Box>
    <div class="flex mt-12 space-x-6 justify-end">
      <Button variant="white">
        Save as draft
      </Button>
      <Button type="submit" variant="green" form="form">
        Submit
      </Button>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'design-system',
  data () {
    return {
      form: {
        firstname: 'Nicolas',
        state: 'validated',
        notifications: ['comments'],
        domaines: [1, 5],
        select_advanced: 'waiting',
        select_advanced_id: 4
      },
      geoSelected: null,
      autocompleteOptions: []
    }
  },
  methods: {
    async onFetchSuggestions (value) {
      const res = await this.$axios.get('/territoires', {
        params: {
          'filter[search]': value,
          pagination: 6
        }
      })
      this.autocompleteOptions = res.data.data
    },
    async onFetchGeoSuggestions (value) {
      if (!value) { return [] }
      const { data } = await this.$axios.get('https://api-adresse.data.gouv.fr/search', {
        params: {
          q: value,
          limit: 15
        }
      })

      const formatOptions = data.features.map((option) => {
        return {
          ...option.properties,
          coordinates: option.geometry.coordinates,
          typeLabel: this.$options.filters.label(option.properties.type, 'geoType')
        }
      })
      this.autocompleteOptions = formatOptions
    },
    handleSelectedGeo (item) {
      this.geoSelected = item
    },
    handleSelected (item) {
      console.log('handleSelected', item)
    },
    onSubmit (e) {
      e.preventDefault()
    }
  }
}
</script>
