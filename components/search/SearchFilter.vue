<template>
  <div class="flex space-x-2 items-center">
    <SearchIcon class="text-gray-900 h-5 w-5" />
    <input
      type="text"
      placeholder="Recherche..."
      class="pl-0 flex-1 border-0 w-full bg-transparent py-0 focus:ring-0"
      :value="searchValue"
      @input="handleInput"
    >
    <XIcon
      v-if="searchValue"
      class="text-gray-500 h-5 w-5 cursor-pointer hover:text-gray-900"
      @click="reset"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
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

<style>

</style>
