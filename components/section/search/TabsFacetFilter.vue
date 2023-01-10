<template>
  <div class="flex items-stretch">
    <button
      v-for="tab,i in tabs"
      :key="i"
      :class="[
        'flex-grow flex flex-col sm:flex-row justify-center items-center px-4 py-4 sm:px-8 sm:space-x-2 transition ',
        isActiveFilter(filterName, tab.filterValue) || tab.current ? 'bg-white shadow-active cursor-default border-t-4 border-jva-blue-500' : 'cursor-pointer bg-transparent hover:bg-[#F3EDE5] active:bg-[#e3d5c5] border-[#C6C6C6] border border-t'
      ]"
      @click="handleClickTab(tab)"
    >
      <component
        :is="tab.icon"
        v-if="tab.icon"
        :class="[
          'fill-current h-7 w-7 sm:h-5 sm:w-5 mb-2 sm:mb-0 transition',
          isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-jva-blue-500' : 'text-gray-600',
        ]"
        aria-hidden="true"
      />

      <div class="text-center sm:text-left flex flex-col">
        <span
          :class="[
            'transition font-bold',
            isActiveFilter(filterName, tab.filterValue) || tab.current ? 'text-gray-700': 'text-gray-600',
          ]"
        >
          {{ tab.label || tab.filterValue }}
        </span>

        <span v-if="tab.sublabel" class="text-center sm:text-left text-[#929292] text-xs leading-none mt-[2px]">
          {{ tab.sublabel }}
        </span>
      </div>
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
