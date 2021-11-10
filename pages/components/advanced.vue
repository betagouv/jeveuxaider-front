<template>
  <div>
    <Box>
      <form id="form" class="space-y-8" @submit="onSubmit">
        <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
          Forms advanced
        </Heading>
        <InputAutocomplete
          name="autocomplete"
          label="Autocomplete"
          description="Sélectionnez un territoire depuis notre base de données"
          placeholder="Choisissez un territoire"
          required
          :options="autocompleteOptions"
          @selected="handleSelected"
          @fetch-suggestions="onFetchSuggestions"
        />
        <SelectAdvanced
          v-model="form.select_advanced"
          name="state"
          label="Select with themed options"
          placeholder="Choisissez une option"
          description="Options avec des keys et des labels"
          required
          :options="[
            {key: 'draft', label:'Brouillon'},
            {key: 'waiting', label:'En attente de validation'},
            {key: 'validated', label:'Validée'}
          ]"
          clearable
        />
        <SelectAdvanced
          v-model="form.select_advanced_id"
          name="responsable"
          label="Select with themed options based on model"
          description="Options avec des ids et des name (props attribute-key & attribute-label)"
          placeholder="Choisissez une option"
          required
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
      const res = await this.$api.fetchTerritoires({
        'filter[search]': value,
        pagination: 6
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
