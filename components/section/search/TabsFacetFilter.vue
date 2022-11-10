<template>
  <div class="flex items-center">
    <button
      v-for="tab,i in tabs"
      :key="i"
      :class="[
        'flex-grow flex flex-col sm:flex-row justify-center items-center px-4 py-3 sm:px-8 sm:py-6 sm:space-x-2 transition',
        isActiveFilter(filterName, tab.filterValue) || tab.current ? 'bg-white shadow-active cursor-default' : 'shadow-inactive cursor-pointer bg-[#E3E3FD] hover:bg-[#C1C1FB] active:bg-[#ADADF9]'
      ]"
      @click="handleClickTab(tab)"
    >
      <component
        :is="tab.icon"
        v-if="tab.icon"
        :class="[
          'fill-current h-7 w-7 sm:h-5 sm:w-5 mb-2 sm:mb-0 transition',
          isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-jva-blue-500' : 'text-gray-900',
        ]"
        aria-hidden="true"
      />
      <span
        :class="[
          'text-center sm:text-left transition',
          isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-gray-700 font-bold': 'font-normal text-gray-900',
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
.shadow-inactive {
    box-shadow: inset -5px -5px 10px 0px #e4e4ff, inset 5px 5px 10px 0px #9996c273;
    &:hover {
      box-shadow: inset 0 0 0 0 transparent;
    }
}

.shadow-active {
  box-shadow: -5px -5px 10px 0px rgba(255, 255, 255, 0.15), 5px 5px 10px 0px rgba(0, 0, 0, 0.15);
}
</style>
