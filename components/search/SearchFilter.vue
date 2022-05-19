<template>
  <div class="flex space-x-2 items-center">
    <SearchIcon class="text-gray-900 h-5 w-5" />
    <input :value="searchValue" type="text" placeholder="Recherche..." class="flex-1 border-0 w-full bg-transparent py-0" @input="handleInput">
    <XIcon v-if="searchValue" class="text-gray-500 h-5 w-5" @click="reset" />
  </div>
</template>

<script>
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
      this.addFilter('search', evt.target.value)
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
