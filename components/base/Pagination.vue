<template>
  <nav v-if="totalRows" class="border-t border-gray-200 px-2 flex items-center justify-between">
    <div class="-mt-px w-0 flex-1 flex">
      <button
        v-if="currentPage > 1"
        class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        @click="$emit('page-change', currentPage - 1)"
      >
        <RiArrowLeftSLine class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Précédent
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <template v-if="withFirstPage && showFirstPage">
        <button
          :class="[
            'border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium',
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
          @click="$emit('page-change', 1)"
        >
          1
        </button>
        <div class="pt-[12px] px-4 text-gray-500">...</div>
      </template>

      <button
        v-for="page in pages"
        :key="page"
        :class="[
          'border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium',
          currentPage == page
            ? 'border-jva-blue-500 text-jva-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        ]"
        @click="$emit('page-change', page)"
      >
        {{ page }}
      </button>

      <template v-if="withLastPage && showLastPage">
        <div class="pt-[12px] px-4 text-gray-500">...</div>
        <button
          :class="[
            'border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium',
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
          @click="$emit('page-change', totalPages)"
        >
          {{ totalPages }}
        </button>
      </template>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <button
        v-if="currentPage < totalRows / perPage"
        class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        @click="$emit('page-change', currentPage + 1)"
      >
        Suivant
        <RiArrowRightSLine class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<script>
export default defineNuxtComponent({
  props: {
    currentPage: {
      default: 1,
      type: [Number, String],
    },
    totalRows: {
      default: 0,
      type: [Number, String],
    },
    perPage: {
      default: 15,
      type: Number,
    },
    maxPages: {
      default: 5,
      type: Number,
    },
    withFirstPage: {
      type: Boolean,
      default: true,
    },
    withLastPage: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalRows / this.perPage)
    },
    maxPagesBeforeCurrentPage() {
      return Math.floor(this.maxPages / 2)
    },
    maxPagesAfterCurrentPage() {
      return Math.ceil(this.maxPages / 2) - 1
    },
    startPage() {
      let startPage = 1
      if (this.currentPage <= this.maxPagesBeforeCurrentPage) {
        return startPage
      } else if (this.currentPage + this.maxPagesAfterCurrentPage >= this.totalPages) {
        // current page near the end
        startPage = this.totalPages - this.maxPages + 1
      } else {
        // current page somewhere in the middle
        startPage = this.currentPage - this.maxPagesBeforeCurrentPage
      }
      return startPage <= 0 ? 1 : startPage
    },
    endPage() {
      if (this.currentPage <= this.maxPagesBeforeCurrentPage) {
        if (this.totalRows / this.perPage < this.maxPages) {
          return Math.ceil(this.totalRows / this.perPage)
        }
        return this.maxPages
      } else if (this.currentPage + this.maxPagesAfterCurrentPage >= this.totalPages) {
        // current page near the end
        return this.totalPages
      } else {
        // current page somewhere in the middle
        return this.currentPage + this.maxPagesAfterCurrentPage
      }
    },
    pages() {
      return Array.from(Array(this.endPage + 1 - this.startPage).keys()).map(
        (i) => this.startPage + i
      )
    },
    showFirstPage() {
      return this.maxPages - this.endPage < 0
    },
    showLastPage() {
      return this.endPage - this.totalPages < 0
    },
  },
})
</script>
