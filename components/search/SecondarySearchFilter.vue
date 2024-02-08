<template>
  <div class="relative">
    <button
      :aria-expanded="isOpen || 'false'"
      class="flex w-full"
      @click="isOpen = !isOpen"
      @keydown.esc="isOpen = false"
    >
      <slot name="button" :isOpen="isOpen" :activeValue="activeValue"> Search component </slot>
    </button>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="() => (isOpen = false)"
        class="mt-2 absolute left-0 z-20 bg-white border shadow-xl w-[376px]"
        @keydown.esc="isOpen = false"
      >
        <div class="flex flex-col p-4 space-y-4">
          <FacetSearch
            ref="keywordsSearch"
            v-model="searchValue"
            :aria-labelledby="`label-search`"
            @update:modelValue="handleInput"
            @clear="showSearch = false"
          />
        </div>

        <div class="border-t px-8 py-4 flex justify-end">
          <button
            class="text-sm"
            :class="[
              { 'text-gray-400 pointer-events-none': !activeValue },
              {
                'text-jva-blue-500 cursor-pointer hover:underline': activeValue,
              },
            ]"
            :disabled="!activeValue"
            @click="reset()"
          >
            Effacer
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FacetSearch from '@/components/section/search/FacetSearch.vue'

export default defineNuxtComponent({
  components: {
    FacetSearch,
  },
  props: {
    placeholder: {
      type: String,
      default: 'Mots clés',
    },
  },
  setup() {
    const { addFilter, deleteFilter } = useAlgoliaQueryBuilder()
    return {
      addFilter,
      deleteFilter,
    }
  },
  data() {
    return {
      isOpen: false,
      searchValue: this.$route.query.search,
    }
  },
  watch: {
    '$route.query.search'(newVal) {
      this.searchValue = newVal
    },
    async isOpen(newVal) {
      if (newVal) {
        await this.$nextTick()
        this.$refs.keywordsSearch.$refs?.input?.focus()
      }
    },
  },
  computed: {
    activeValue() {
      return this.searchValue
    },
  },
  methods: {
    handleInput(value) {
      console.log('handleInput', value)
      // this.searchTerm = value
      // this.showOptions = true
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(() => {
        this.addFilter('search', value)
      }, 275)
      this.timeout()
    },
    reset() {
      this.searchValue = null
      this.isOpen = false
      this.deleteFilter('search')
    },
  },
})
</script>
