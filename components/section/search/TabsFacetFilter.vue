<template>
  <div class="flex items-center">
    <div
      v-for="tab,i in tabs"
      :key="i"
      :class="[
        'flex-grow flex flex-col sm:flex-row justify-center items-center px-4 py-3 sm:px-8 sm:py-6 cursor-pointer sm:space-x-2',
        isActiveFilter(filterName, tab.filterValue) || tab.current ? 'bg-white shadow-xl' : 'shadow-inner-xl',
        {'rounded-l-xl': i == 0},
        {'rounded-r-xl': i == tabs.length - 1},
      ]"
      @click="handleClickTab(tab)"
    >
      <component
        :is="tab.icon"
        v-if="tab.icon"
        :class="[
          isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-jva-green-500' : 'text-gray-400',
          'h-7 w-7 sm:h-5 sm:w-5 mb-2 sm:mb-0'
        ]"
        aria-hidden="true"
      />
      <span
        class="text-center sm:text-left"
        :class="[isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-gray-700 font-bold': 'text-gray-400 font-normal']"
      >
        {{ tab.label || tab.filterValue }}
      </span>
    </div>
  </div>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  props: {
    filterName: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleClickTab (tab) {
      if (tab.filterValue == 'Mission à distance') {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, [this.filterName]: tab.filterValue, page: undefined, city: undefined, aroundLatLng: undefined }
        })
      } else {
        this.addFilter(this.filterName, tab.filterValue)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.shadow-inner-xl {
    box-shadow: inset 0px 1px 10px rgba(0, 0, 0, 0.15);
}

</style>
