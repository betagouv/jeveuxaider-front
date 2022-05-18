<template>
  <div class="shadow-xl rounded-xl overflow-hidden">
    <div class="flex">
      <div v-for="tab,i in tabs" :key="i" class="">
        <div
          :class="[
            'flex px-8 py-6 cursor-pointer space-x-2',
            isActiveFilter(filterName, tab.filterValue) || !$route.query[filterName] ? 'bg-white' : 'shadow-inner'
          ]"
          @click="addFilter(filterName, tab.filterValue)"
        >
          <component
            :is="tab.icon"
            v-if="tab.icon"
            :class="[
              isActiveFilter(filterName, tab.filterValue) || !$route.query[filterName] ? 'text-jva-green-500' : 'text-gray-400 group-hover:text-gray-500', 'h-5 w-5']"
            aria-hidden="true"
          />
          <span class="font-bold text-gray-700 ">{{ tab.label || tab.filterValue }}<span /></span>
        </div>
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
  }
}
</script>

<style>

</style>
