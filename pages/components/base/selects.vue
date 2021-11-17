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
            name="autocomplete"
            label="Autocomplete"
            placeholder="Ex: 14 rue rivoli, Paris"
            :options="autocompleteOptions"
            @selected="handleSelected"
            @fetch-suggestions="onFetchSuggestions"
          />
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
  layout: 'components',
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
    handleSelected (item) {
      console.log('handleSelected', item)
    },
    onSubmit (e) {
      e.preventDefault()
      console.log('onSubmit', this.form)
    }
  }
}
</script>
