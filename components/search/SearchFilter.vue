<template>
  <div class="flex-1 flex space-x-2 items-center group">
    <RiSearchEyeFill class="text-gray-900 h-4 w-4 transition-opacity opacity-25 group-hover:opacity-100" />
    <input
      type="text"
      :placeholder="placeholder"
      :class="['pl-0 flex-1 border-0 w-full bg-transparent py-0 !outline-none', {'font-bold': searchValue}]"
      :value="searchValue"
      @input="handleInput"
    >
    <button v-if="searchValue" @click="reset">
      <RiCloseFill class="text-gray-500 fill-current h-5 w-5 cursor-pointer hover:text-gray-900" />
    </button>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  props: {
    placeholder: {
      type: String,
      default: 'Mots clés'
    }
  },
  data () {
    return {
      searchValue: this.$route.query.search
    }
  },
  watch: {
    '$route.query.search' (newVal) {
      this.searchValue = newVal
    }
  },
  methods: {
    handleInput (evt) {
      this.searchTerm = evt.target.value
      this.showOptions = true
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        this.addFilter('search', evt.target.value)
      }, 275)
      this.timeout()
    },
    reset () {
      this.searchValue = null
      this.deleteFilter('search')
    }
  }
}
</script>
