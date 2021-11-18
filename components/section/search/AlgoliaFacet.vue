<template>
  <div class="z-100 text-[#171725]">
    <AisRefinementList
      :ref="name"
      :key="name"
      class="facet-list"
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
        <div class="h-7 flex justify-between mb-3">
          <span v-if="!isSearching" class="font-black text-[#171725]">
            {{ label }}
          </span>

          <input
            v-else
            ref="facet-search"
            v-model="search"
            class="facet-search"
            label="Recherche"
            clearable
            autocomplete="new-password"
            @input="searchForItems(search)"
          >

          <template v-if="isSearchable">
            <img
              src="/images/search-facet.svg"
              class="cursor-pointer ml-4"
              width="16px"
              height="28px"
              alt="Filtrer"
              @click="onSearchClick"
            >
          </template>
        </div>

        <div v-if="!items.length" class="text-sm text-gray-600">
          -
        </div>
        <div
          v-for="item in items"
          :key="item.value"
        >
          <input
            class="!w-full !text-sm !cursor-pointer !mb-3"
            :value="item.isRefined"
            type="checkbox"
            tabindex="-1"
            @change="onChange(refine, item)"
          >
          <div class="facet-value flex justify-between">
            <label
              :max-lines="1"
              class="w-full mr-2 relative"
              :class="[
                { 'text-[#171725] font-bold': item.isRefined },
                { 'text-gray-600': !item.isRefined },
              ]"
            >
              {{ item.value }}
            </label>

            <span v-if="showCount" class="count text-gray-600">
              {{ item.count.toLocaleString() }}
            </span>
          </div>
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
  </div>
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
    },
    showCount: {
      type: Boolean,
      default: true
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

<style lang="postcss" scoped>
.facet-list ::v-deep .facet-value {
  > * {
    transition: all 0.25s;
  }
  &:hover {
    .label {
      color: #27303f !important;
    }
  }
}

.facet-list .el-checkbox {
  @apply flex items-center whitespace-normal;

  ::v-deep .el-checkbox__label {
    @apply w-full;
  }

  ::v-deep .el-checkbox__input {
    &.is-focus {
      .el-checkbox__inner {
        border-color: #070191 !important;
      }
    }
    &.is-checked {
      .el-checkbox__inner {
        background-color: #e6eaf5 !important;
        border-color: #e6eaf5 !important;
      }
    }
  }

  ::v-deep .el-checkbox__inner {
    width: 20px !important;
    height: 20px !important;
    border-color: white !important;
    border-radius: 4px !important;
    &::after {
      border: 2px solid #5b71b9 !important;
      border-left: 0 !important;
      border-top: 0 !important;
      height: 10px !important;
      left: 6px !important;
      top: 1px !important;
      width: 4px !important;
    }
  }
}

.facet-search {
  ::v-deep .el-input__inner {
    height: 28px;
    border-color: #ede8e9;
    color: #171725;
    padding: 0 30px 0 8px;
    line-height: 1;
    @apply text-base;
    @screen md {
      font-size: 14px;
    }
  }
  ::v-deep .el-input__icon {
    line-height: 28px;
  }
}
</style>
