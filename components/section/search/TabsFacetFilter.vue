<template>
  <div class="flex items-center">
    <button
      v-for="tab,i in tabs"
      :key="i"
      :class="[
        'flex-grow flex flex-col sm:flex-row justify-center items-center px-4 py-3 sm:px-8 sm:py-6 sm:space-x-2 group',
        isActiveFilter(filterName, tab.filterValue) || tab.current ? 'bg-white shadow-xl cursor-default' : 'shadow-inner-xl cursor-pointer'
      ]"
      @click="handleClickTab(tab)"
    >
      <component
        :is="tab.icon"
        v-if="tab.icon"
        :class="[
          'h-7 w-7 sm:h-5 sm:w-5 mb-2 sm:mb-0 transition-colors',
          isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-jva-green-500' : 'text-gray-400 lg:group-hover:text-gray-900',
        ]"
        aria-hidden="true"
      />
      <span
        :class="[
          'text-center sm:text-left transition-colors',
          isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-gray-700 font-bold': 'text-gray-400 font-normal lg:group-hover:text-gray-900',
        ]"
      >
        {{ tab.label || tab.filterValue }}
      </span>
    </button>
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
          query: { ...this.$route.query, [this.filterName]: tab.filterValue, page: undefined, city: undefined, aroundLatLng: undefined, department_name: undefined, is_autonomy: undefined }
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
