<template>
  <div class="relative">
    <BaseInputAutocomplete
      icon="RiSearchLine"
      name="autocomplete"
      :placeholder="placeholder"
      :options="hits"
      attribute-key="_id"
      attribute-label="name"
      attribute-right-label="rna"
      :reset-value-on-select="true"
      :min-value-length="2"
      @selected="onSelected"
      @keyup.enter="onEnter"
      @fetch-suggestions="onFetchSuggestions"
      @update:modelValue="onInput"
    />

    <BaseButton
      v-if="showAddButton && modelValue && modelValue.length > 1"
      :loading="loadingAddButton"
      size="sm"
      class="absolute z-10 right-[7px] top-[8px]"
      @click.native="$emit('added', modelValue)"
      @keyup.enter="$emit('added', modelValue)"
    >
      Ajouter
    </BaseButton>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['selected', 'update:modelValue', 'added'],
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    showAddButton: {
      type: Boolean,
      default: true,
    },
    loadingAddButton: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Recherche par mots clés...',
    },
  },
  data() {
    return {
      autocompleteOptions: [],
      hits: [],
      loading: false,
    }
  },
  methods: {
    onInput(payload) {
      this.$emit('update:modelValue', payload)
    },
    onSelected(payload) {
      if (payload) {
        this.$emit('selected', payload)
      }
    },
    async onFetchSuggestions(payload) {
      if (!payload) {
        this.hits = []
        return
      }

      apiFetch('/api-engagement/associations/search', {
        method: 'POST',
        body: {
          name: payload,
        },
      })
        .then((res) => {
          this.hits = res.data
        })
        .catch((err) => {
          console.log('onFetchSuggestions api engagement', err)
        })
    },
    onEnter(payload) {
      //   console.log('onEnter', payload)
    },
  },
})
</script>
