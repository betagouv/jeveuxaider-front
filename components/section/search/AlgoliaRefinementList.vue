<template>
  <AisRefinementList
    :ref="name"
    :key="name"
    :attribute="name"
    show-more
    :limit="4"
    :show-more-limit="100"
    :sort-by="dataSortBy"
  >
    <div
      slot-scope="{
        items,
        isShowingMore,
        canToggleShowMore,
        refine,
        toggleShowMore,
        searchForItems,
      }"
    >
      <div class="h-7 flex justify-between items-center mb-3">
        <span v-if="!isSearching" class="font-black text-[#171725]">
          {{ label }}
        </span>

        <input
          v-else
          ref="facet-search"
          v-model="search"
          class="border border-cool-gray-300 rounded-sm px-2 py-1 text-sm w-full"
          label="Recherche"
          clearable
          autocomplete="off"
          @input="searchForItems(search)"
        >

        <template v-if="isSearchable">
          <SearchIcon class="h-5 w-5 cursor-pointer ml-4" @click="onSearchClick" />
        </template>
      </div>

      <div v-if="!items.length" class="text-sm text-gray-600">
        -
      </div>

      <div
        v-for="(item, key) in items"
        :key="item.value"
        class="algolia-facet flex justify-between items-center mb-3"
      >
        <input
          :id="`${name}_${key}`"
          :name="`${name}_${key}`"
          :value="item.isRefined"
          type="checkbox"
          tabindex="-1"
          :checked="item.isRefined"
          @change="onChange(refine, item)"
        >
        <label
          :for="`${name}_${key}`"
          :class="[{ 'is-refined': item.isRefined }]"
        >
          <span class="truncate">{{ item.value }}</span>
          <span class="count">
            {{ item.count.toLocaleString() }}
          </span>
        </label>
      </div>

      <button
        v-if="canToggleShowMore"
        class="uppercase text-xs font-bold text-[#171725] mt-2"
        style="margin-left: 30px"
        @click="toggleShowMore"
      >
        {{ !isShowingMore ? 'Plus' : 'Moins' }}
      </button>
    </div>
  </AisRefinementList>
</template>

<script>
import { AisRefinementList } from 'vue-instantsearch'

export default {
  components: {
    AisRefinementList
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    isSearchable: {
      type: Boolean,
      default: false
    },
    sortBy: {
      type: Array,
      default: () => {
        return ['isRefined', 'count:desc', 'name:asc']
      }
    }
  },
  data () {
    return {
      isSearching: false,
      search: '',
      // See https://github.com/algolia/vue-instantsearch/issues/718
      dataSortBy: this.sortBy
    }
  },
  methods: {
    onSearchClick () {
      this.isSearching = !this.isSearching
      if (this.isSearching) {
        this.$nextTick(() => {
          this.$refs['facet-search'].focus()
        })
      }
    },
    onChange (refine, item) {
      this.search = ''
      this.isSearching = false

      refine(item.value)
      this.$emit('toggle-facet', {
        active: !item.isRefined,
        name: this.name,
        value: item.value
      })
    }
  }
}
</script>
