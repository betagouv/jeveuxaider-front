<template>
  <div>
    <Box>
      <form id="form" class="space-y-8" @submit="onSubmit">
        <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
          Forms advanced
        </Heading>
        <InputAutocomplete
          name="territoire_id"
          label="Territoire"
          description="Sélectionnez un territoire depuis notre base de données"
          placeholder="Choisissez un territoire"
          required
          :options="autocompleteOptions"
          @chosen="handleChosen"
          @search="onSearch"
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
import Box from '@/components/custom/Box.vue'

export default {
  components: {
    Box
  },
  layout: 'components',
  data () {
    return {
      form: {
        firstname: 'Nicolas',
        state: 'validated',
        notifications: ['comments'],
        domaines: [1, 5]
      },
      autocompleteOptions: []
    }
  },
  methods: {
    async onSearch (value) {
      const res = await this.$api.fetchTerritoires({
        'filter[search]': value,
        pagination: 6
      })
      this.autocompleteOptions = res.data.data
    },
    handleChosen (item) {
      console.log('handleChosen', item)
    },
    onSubmit (e) {
      e.preventDefault()
      console.log('onSubmit', this.form)
    }
  }
}
</script>
