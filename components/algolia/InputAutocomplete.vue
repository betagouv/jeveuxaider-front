<template>
  <BaseInputAutocomplete
    icon="RiSearchLine"
    name="autocomplete"
    :placeholder="placeholder"
    :options="hits"
    :attribute-key="attributeKey"
    :attribute-label="attributeLabel"
    :attribute-right-label="attributeRightLabel"
    :reset-value-on-select="true"
    :min-value-length="3"
    @selected="onSelected"
    @keyup.enter="onEnter"
    @fetch-suggestions="onFetchSuggestions"
  />
</template>

<script>
export default defineNuxtComponent({
  emits: ['selected'],

  props: {
    index: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Recherche par mots clés...',
    },
    searchParameters: {
      type: Object,
      required: true,
    },
    attributeKey: {
      type: String,
      default: 'id',
    },
    attributeLabel: {
      type: String,
      default: 'name',
    },
    attributeRightLabel: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      autocompleteOptions: [],
      hits: [],
    }
  },
  methods: {
    onSelected(payload) {
      if (payload) {
        this.$emit('selected', payload)
      }
    },
    async onFetchSuggestions(payload) {
      const response = await this.$algolia[this.index].search(payload, this.searchParameters)
      this.hits = response.hits
    },
    onEnter(payload) {
      //   console.log('onEnter', payload)
    },
  },
})
</script>
