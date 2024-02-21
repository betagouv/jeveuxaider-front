<template>
  <nav
    v-if="totalRows"
    role="navigation"
    class="fr-pagination flex"
    aria-label="Pagination"
    :class="[{ 'flex justify-end': align === 'right' }]"
  >
    <div :class="[{ 'flex-1': variant === 'full' }]">
      <button
        :class="[
          'fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label',
          { '!text-[#929292] pointer-events-none': currentPage === 1 },
        ]"
        :aria-disabled="currentPage === 1"
        :disabled="currentPage === 1"
        role="link"
        @click="onPageChange(currentPage - 1)"
      >
        <template v-if="variant === 'full'"> Précédent </template>
      </button>
    </div>

    <div class="flex">
      <template v-if="withFirstPage && showFirstPage">
        <button
          class="fr-pagination__link !hidden md:!inline"
          :aria-current="currentPage === 1"
          title="Page 1"
          @click="onPageChange(1)"
        >
          1
        </button>

        <button
          class="fr-pagination__link !text-[#929292] pointer-events-none !hidden md:!inline"
          disabled="true"
        >
          ...
        </button>
      </template>

      <button
        v-for="page in pages"
        :key="page"
        class="fr-pagination__link"
        :class="{ '!hidden md:!inline': !mobileVisiblePages.includes(page) }"
        :title="`Page ${page}`"
        :aria-current="currentPage === page"
        :disabled="currentPage === page"
        @click="onPageChange(page)"
      >
        {{ page }}
      </button>

      <template v-if="withLastPage && showLastPage">
        <button
          class="fr-pagination__link !text-[#929292] pointer-events-none !hidden md:!inline"
          disabled="true"
        >
          ...
        </button>

        <button
          class="fr-pagination__link !hidden md:!inline"
          :aria-current="currentPage === totalPages"
          :title="`Page ${totalPages}`"
          @click="onPageChange(totalPages)"
        >
          {{ totalPages }}
        </button>
      </template>
    </div>

    <div class="flex justify-end" :class="[{ 'flex-1': variant === 'full' }]">
      <button
        :class="[
          'fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label',
          { '!text-[#929292] pointer-events-none': currentPage >= totalRows / perPage },
        ]"
        role="link"
        :aria-disabled="currentPage >= totalRows / perPage"
        :disabled="currentPage >= totalRows / perPage"
        @click="onPageChange(currentPage + 1)"
      >
        <template v-if="variant === 'full'"> Suivant </template>
      </button>
    </div>
  </nav>
</template>

<script>
import '@gouvfr/dsfr/dist/component/pagination/pagination.main.min.css'

export default defineNuxtComponent({
  props: {
    variant: {
      type: String,
      default: 'full',
    },
    align: {
      type: String,
      default: 'center',
    },
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
    anchorContentId: {
      type: String,
      default: 'contenuprincipal',
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
    mobileVisiblePages() {
      if (this.currentPage === 1) {
        return [1, 2, 3]
      }
      if (this.currentPage === this.totalPages) {
        return [this.totalPages, this.totalPages - 1, this.totalPages - 2]
      }

      return [this.currentPage - 1, this.currentPage, this.currentPage + 1]
    },
  },
  methods: {
    onPageChange(page) {
      this.$emit('page-change', page)
      window.scrollTo({
        top: document.getElementById(this.anchorContentId)?.offsetTop ?? 0,
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
.fr-pagination__link {
  @apply hover:underline;
}
.fr-pagination__link[aria-current='true'] {
  @apply text-white bg-jva-blue-500 hover:bg-jva-blue-800 active:bg-jva-blue-900;
}

/* override */
.fr-pagination__link[aria-current]:not([href]) {
  cursor: pointer;
  pointer-events: initial;
}
</style>
