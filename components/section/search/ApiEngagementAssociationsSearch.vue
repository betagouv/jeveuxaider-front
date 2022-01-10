<template>
  <div>
    <vue-autosuggest
      ref="autocompleterna"
      v-model="query"
      :suggestions="suggestions"
      :get-suggestion-value="getSuggestionValue"
      :input-props="{
        placeholder,
        autocomplete: 'off',
        class: `focus:!border-jva-blue-500 focus:!ring-jva-blue-500`,
      }"
      class="relative w-full leading-none"
      :limit="5"
      :loading="renderSuggestions"
      @input="onInputChange"
      @selected="onSelected"
      @keydown.tab="onTab"
      @focus="onFocus"
    >
      <template slot="before-section-default">
        <div
          class="text-xs text-gray-700 p-4 px-6 font-bold uppercase border-b"
        >
          Suggestions
        </div>
      </template>

      <template slot-scope="{ suggestion }">
        <div class="mb-2 font-semibold">
          {{ suggestion.item.name }}
        </div>
        <div class="text-sm text-gray-500">
          RNA {{ suggestion.item.rna }}
        </div>
        <div
          v-if="suggestion.item.coordonnees.adresse"
          class="text-sm text-gray-500 mt-2"
        >
          {{ suggestion.item.coordonnees.adresse.nom_complet }}
        </div>
      </template>
      <slot slot="after-input">
        <Button
          v-if="showAddButton && query && query.length > 0"
          :loading="loadingAddButton"
          style="right: 7px; top: 7px"
          size="sm"
          class="absolute z-10"
          @click.native="$emit('added', query)"
          @keyup.enter="$emit('added', query)"
        >
          Ajouter
        </Button>

        <SearchIcon
          v-else
          class="absolute z-10 w-5 h-5 text-[#d2d6dc]"
          style="right: 15px; top: 13px"
        />
      </slot>
    </vue-autosuggest>
  </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'

export default {
  components: {
    VueAutosuggest
  },
  props: {
    placeholder: {
      type: String,
      default: 'Nom de votre organisation'
    },
    showAddButton: {
      type: Boolean,
      required: false,
      default: true
    },
    loadingAddButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      query: null,
      selected: null,
      suggestions: [],
      renderSuggestions: true
    }
  },
  methods: {
    onSelected (item) {
      if (item) {
        this.selected = item.item
        this.$emit('change', this.selected.name)
        this.$emit('selected', this.selected)
      }
    },
    onInputChange (text) {
      this.$emit('input', text)
      this.$emit('change', text)
      this.$emit('clear')
      this.search()
    },
    onFocus () {
      document.getElementById(
        'autosuggest-autosuggest__results'
      ).style.display = 'block'
    },
    onTab () {
      this.$refs.autocompleterna.listeners.selected(true)
      document.getElementById(
        'autosuggest-autosuggest__results'
      ).style.display = 'none'
    },
    getSuggestionValue (suggestion) {
      return suggestion.item.name
    },
    async search () {
      this.loading = true
      const res = await this.$axios
        .post(
          'https://api.api-engagement.beta.gouv.fr/v1/association/search',
          {
            name: this.query
          },
          {
            headers: {
              apikey: this.$config.apiEngagement.key
            }
          }
        )
        .catch(() => (this.loading = false))
      if (res.data) {
        this.loading = false
        this.suggestions = [{ data: res.data.data }]
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
::v-deep #autosuggest {
  input {
    @apply w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 text-sm;
  }
}

::v-deep .ais-Highlight-highlighted {
  background: transparent;
  @apply text-[#070191] font-semibold;
}

::v-deep .autosuggest__results-container {
  .autosuggest__results ul {
    max-width: 480px;
    @apply w-full rounded-lg absolute z-50 bg-white mt-1 overflow-hidden border border-gray-200;
  }
  .autosuggest__results-item {
    @apply px-6 py-4;
    &:not(:last-child) {
      @apply border-b border-gray-100;
    }
    &.autosuggest__results-item--highlighted {
      @apply cursor-pointer bg-gray-50 text-gray-700;
    }
  }
}
</style>
