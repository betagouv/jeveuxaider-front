<template>
  <div class="flex flex-col sm:flex-row">
    <div v-for="tab,i in tabs" :key="i" class="flex-none">
      <div
        :class="[
          'flex justify-center items-center px-4 py-3 sm:px-8 sm:py-6 cursor-pointer space-x-2',
          isActiveFilter(filterName, tab.filterValue) || tab.current ? 'bg-white shadow-xl' : 'shadow-inner-xl',
          {'rounded-t-xl sm:rounded-t-none sm:rounded-l-xl': i == 0},
          {'rounded-b-xl sm:rounded-b-none sm:rounded-r-xl': i == tabs.length - 1},
        ]"
        @click="handleClickTab(tab)"
      >
        <component
          :is="tab.icon"
          v-if="tab.icon"
          :class="[
            isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-jva-green-500' : 'text-gray-400 group-hover:text-gray-500', 'h-5 w-5']"
          aria-hidden="true"
        />
        <span
          class=""
          :class="[isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-gray-700 font-bold': 'text-gray-400 font-normal']"
        >
          {{ tab.label || tab.filterValue }}
        </span>
      </div>
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
