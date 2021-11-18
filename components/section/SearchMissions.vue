<template>
  <div class="component--search-missions bg-gray-100">
    <AisInstantSearchSsr ref="AisInstantSearchSsr">
      <AisConfigure
        ref="aisConfigure"
        :hits-per-page.camel="hitsPerPage ? hitsPerPage : type ? 18 : 17"
        :around-lat-lng.camel="aroundLatLng"
        :around-lat-lng-via-i-p.camel="
          aroundLatLng || type == 'Mission à distance' ? false : true
        "
        :around-radius.camel="aroundRadius"
        :around-precision.camel="2000"
        :get-ranking-info.camel="true"
        :filters.camel="aisFilters"
      />

      <!-- Header -->
      <div
        v-if="!noHeader"
        ref="header"
        class="header pt-4 lg:pt-7 pb-8 text-white"
        :class="[
          domainBgColor(domainId),
          { 'custom-color': $options.propsData.thematique },
        ]"
      >
        <div class="container mx-auto">
          <div class="px-4">
            <div class="flex flex-wrap justify-between items-center -m-2">
              <div class="m-2">
                <h1
                  v-if="titleTag == 'h1'"
                  class="text-xl sm:text-2xl lg:text-3xl font-black"
                >
                  Trouver une mission de bénévolat
                </h1>
                <h2
                  v-else-if="titleTag == 'h2'"
                  class="text-xl sm:text-2xl lg:text-3xl font-black"
                >
                  Trouver une mission de bénévolat
                </h2>
                <AisStateResults>
                  <template slot-scope="{ nbHits }">
                    <div>
                      {{ nbHits | formatNumber }}
                      {{ nbHits | pluralize('mission de bénévolat disponible','missions de bénévolat disponibles',false) }}
                    </div>
                  </template>
                </AisStateResults>
              </div>

              <div class="w-full lg:w-auto m-2">
                <div class="flex flex-col lg:flex-row items-center">
                  <div
                    class="toggle-filters w-full p-2 pr-3 lg:hidden border border-white rounded-lg flex items-center justify-center"
                    @click="showFilters = !showFilters"
                  >
                    <img
                      class="flex-none mr-4"
                      src="/images/filter.svg"
                      alt="Filtrer"
                      width="18px"
                      height="23px"
                    >
                    <span>Précisez votre recherche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AisInstantSearchSsr>
  </div>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisStateResults,
  AisConfigure,
  // AisHits,
  // AisPagination,
  // AisClearRefinements,
  // AisSearchBox,
  createServerRootMixin
} from 'vue-instantsearch'

import algoliasearch from 'algoliasearch/lite'
import { debounce } from 'lodash'
import qs from 'qs'
import MixinColorsDomaines from '@/mixins/colors-domaines'

const searchClient = algoliasearch(
  process.env.algolia.appId,
  process.env.algolia.searchKey
)

function parseQuery (query) {
  return qs.parse(query)
}

function stringifyQuery (query) {
  const result = qs.stringify(query)
  return result ? '?' + result : ''
}

// remove indexName
function removeIndex (routeState) {
  if (`${process.env.algolia.missionsIndex}` in routeState) { routeState = routeState[`${process.env.algolia.missionsIndex}`] }

  return routeState
}

// restore indexName
function addIndex (routeState) {
  routeState = {
    [`${process.env.algolia.missionsIndex}`]: routeState
  }
  return routeState
}

function nuxtRouter (vueRouter) {
  return {
    read () {
      return addIndex(parseQuery(vueRouter.currentRoute.query))
    },
    write (routeState) {
      // Nothing here, we do our own logic
    },
    createURL (routeState) {
      routeState = removeIndex(routeState)
      const url = vueRouter.resolve({
        query: routeState
      }).href
      return url
    },
    onUpdate (cb) {
      if (typeof window === 'undefined') { return }
      this._onPopState = (event) => {
        cb(this.read())
      }
      window.addEventListener('popstate', this._onPopState)
    },
    dispose () {
      if (typeof window === 'undefined') { return }
      window.removeEventListener('popstate', this._onPopState)
    }
  }
}

export default {
  components: {
    AisInstantSearchSsr,
    AisConfigure,
    // AisHits,
    AisStateResults
    // AisPagination,
    // AisClearRefinements,
    // AisSearchBox
  },
  mixins: [MixinColorsDomaines],
  provide () {
    return {
      // Provide the InstantSearch instance for SSR
      $_ais_ssrInstantSearchInstance: this.instantsearch
    }
  },
  props: {
    thematique: {
      type: Object,
      default: null
    },
    titleTag: {
      type: String,
      default: 'h1'
    },
    facets: {
      type: Array,
      default: () => {
        return [
          'is_priority',
          'domaines',
          'template_subtitle',
          'department_name',
          'structure.name'
        ]
      }
    },
    filters: {
      type: [String, Boolean],
      default: false
    },
    defaultRadius: {
      type: Number,
      default: 25000
    },
    initialGeoSearch: {
      type: [Object, Boolean],
      default: null
    },
    hitsPerPage: {
      type: Number,
      default: null
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    noFilters: {
      type: Boolean,
      default: false
    },
    noPagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // Create it in `data` to access the Vue Router
    const mixin = createServerRootMixin({
      indexName: process.env.algolia.missionsIndex,
      searchClient,
      routing: {
        router: nuxtRouter(this.$router)
      }
    })

    return {
      ...mixin.data(),
      templatesPlaces: {
        value: (suggestion) => {
          return `${suggestion.postcode} ${suggestion.name}`
        },
        suggestion: (suggestion) => {
          const details = [suggestion.county, suggestion.administrative]
          let detailsOutput = ''
          details.forEach((element) => {
            if (element) {
              detailsOutput += ` - <span>${element}</span>`
            }
          })
          return (
            `<div class="text-black font-bold">${suggestion.highlight.name}</div>` +
            '<div class="text-[#242526] text-xs font-light">' +
            `<span>${suggestion.postcode}</span>${detailsOutput}` +
            '</div>'
          )
        }
      },
      showFilters: false,
      isMobile: true,
      clearExcludes: ['type'],
      geoSearch: this.initialGeoSearch,
      routeState: {
        query: this.$route.query.query
      }
    }
  },
  computed: {
    aroundRadius () {
      return this.routeState && this.routeState.aroundRadius
        ? !isNaN(parseInt(this.routeState.aroundRadius))
            ? parseInt(this.routeState.aroundRadius)
            : this.routeState.aroundRadius
        : 'all'
    },
    placeLabel () {
      return this.routeState && this.routeState.place
        ? this.routeState.place
        : undefined
    },
    type () {
      return this.routeState &&
        this.routeState.refinementList &&
        this.routeState.refinementList.type
        ? this.routeState.refinementList.type[0]
        : null
    },
    aroundLatLng () {
      return this.routeState && this.routeState.aroundLatLng
        ? this.routeState.aroundLatLng
        : undefined
    },
    aisFilters () {
      const filters = []
      if (this.type) {
        filters.push(`type:"${this.type}"`)
      }
      if (this.filters) {
        filters.push(`${this.filters}`)
      }

      return filters.join(' AND ')
    }
  },
  watch: {
    '$route.query' () {
      this.readUrl()
      this.handleGeoSearch()
      this.scrollToTop()
    }
  },
  serverPrefetch () {
    return this.instantsearch.findResultsState(this).then((algoliaState) => {
      // @Bug -> Si décommenté impossible de faire marcher les props dans AisConfigure sans un hot reload...
      // ... et si commenté, warnings The client-side rendered virtual DOM tree is not matching server-rendered content
      // this.$ssrContext.nuxt.algoliaState = algoliaState
    })
  },
  created () {
    this.readUrl()
    this.handleGeoSearch()
  },
  beforeMount () {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState

    this.instantsearch.hydrate(results)

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState
    delete window.__NUXT__.algoliaState
  },
  mounted () {
    this.sizeListener()
    window.onresize = () => {
      this.sizeListener()
    }
  },
  methods: {
    scrollToTop () {
      if (window && window.scrollY > 290) {
        this.$refs.header.scrollIntoView()
      }
    },
    sizeListener () {
      if (window.innerWidth >= 1024) {
        this.showFilters = true
        this.isMobile = false
      } else {
        this.isMobile = true
      }
    },
    onClearRefinements (refine) {
      if (this.type) {
        const { type } = this.routeState.refinementList
        this.$set(this.routeState, 'refinementList', { type })
      } else {
        this.$delete(this.routeState, 'refinementList')
      }

      this.$delete(this.routeState, 'query')
      this.$delete(this.routeState, 'toggle')
      refine()
      this.writeUrl()
    },
    onQueryInput (refine, $event) {
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        refine($event)
        this.writeUrl()
      }, 400)
      this.timeout()
    },
    onQueryClear () {
      this.$delete(this.routeState, 'query')
      this.writeUrl()
    },
    onPlaceSelect ($event) {
      this.$set(
        this.routeState,
        'aroundLatLng',
        `${$event.latlng.lat},${$event.latlng.lng}`
      )
      this.$set(this.routeState, 'place', $event.value)
      this.writeUrl()
    },
    onPlaceClear () {
      this.$delete(this.routeState, 'aroundRadius')
      this.$delete(this.routeState, 'aroundLatLng')
      this.$delete(this.routeState, 'place')
      this.writeUrl()
    },
    onTypeChanged (type) {
      this.setTypeAndHandleRadius(type)
      if (!this.geoSearch) {
        this.$delete(this.routeState, 'aroundLatLng')
        this.$delete(this.routeState, 'place')
      }
      this.writeUrl()
    },
    onTypeRemoved () {
      this.$delete(this.routeState.refinementList, 'type')
      this.$delete(this.routeState, 'aroundRadius')
      if (!this.geoSearch) {
        this.$delete(this.routeState, 'aroundLatLng')
        this.$delete(this.routeState, 'place')
      }
      this.writeUrl()
    },
    setTypeAndHandleRadius (type) {
      if (!this.routeState.refinementList) {
        this.$set(this.routeState, 'refinementList', {})
      }
      this.$set(this.routeState.refinementList, 'type', [type])
      if (type === 'Mission en présentiel') {
        this.$set(this.routeState, 'aroundRadius', this.defaultRadius)
      } else {
        this.$delete(this.routeState, 'aroundRadius')
      }
    },
    handleGeoSearch () {
      if (this.geoSearch && !this.routeState.aroundLatLng) {
        this.$set(this, 'routeState', {
          ...this.routeState,
          ...this.geoSearch
        })
        this.setTypeAndHandleRadius('Mission en présentiel')
      }
    },
    onChangeRadius ($event) {
      this.$set(this.routeState, 'aroundRadius', $event)
      this.writeUrl()
    },
    onToggleFacet ($event) {
      if ($event.active) {
        this.addFacet($event)
      } else {
        this.deleteFacet($event)
      }
      this.writeUrl()
    },
    onToggleRefinement ($event) {
      if ($event.active) {
        this.addToggleRefinement($event)
      } else {
        this.deleteToggleRefinement($event)
      }
      this.writeUrl()
    },
    addToggleRefinement ($event) {
      if (!this.routeState.toggle) {
        this.$set(this.routeState, 'toggle', {})
      }
      this.$set(this.routeState.toggle, $event.name, $event.value)
    },
    addFacet ($event) {
      if (!this.routeState.refinementList) {
        this.$set(this.routeState, 'refinementList', {})
      }
      const values = this.routeState.refinementList[$event.name]
        ? [...this.routeState.refinementList[$event.name], $event.value]
        : [$event.value]
      this.$set(this.routeState.refinementList, $event.name, values)
    },
    deleteFacet ($event) {
      this.routeState.refinementList[$event.name]?.splice(
        this.routeState.refinementList[$event.name].findIndex((i) => {
          return i === $event.value
        }),
        1
      )
      if (this.routeState.refinementList[$event.name]?.length === 0) {
        this.$delete(this.routeState.refinementList, $event.name)
      }
    },
    deleteToggleRefinement ($event) {
      this.$delete(this.routeState.toggle, $event.name)
    },
    readUrl () {
      const routeState = qs.parse(this.$router.currentRoute.query)
      this.$set(this, 'routeState', routeState)
    },
    writeUrl () {
      this.$router.push(stringifyQuery(this.routeState))
    },
    addRemoteMissionsBanner (items) {
      if (!this.type && items.length >= 7) {
        items.splice(7, 0, { isBannerRemoteMissions: true })
      }

      // Hack to prevent banner displayed twice
      if (items[8] && items[8].isBannerRemoteMissions) {
        items.splice(8, 1)
      }
      return items
    },
    handleClickCard () {
      window.plausible &&
        window.plausible('Click Card Missions - Liste résultat', {
          props: { isLogged: this.$store.getters.isLogged }
        })
    },
    onChange () {
      this.$refs.searchbox_input.blur()
    }
  }
}
</script>

<style lang="postcss" scoped>
.search-input {
  ::v-deep input {
    border-radius: 8px;
    border-color: #ede8e9;
    height: 46px;
    color: #171725;
    @apply text-base;
    @screen md {
      font-size: 14px;
    }
  }
}

::v-deep .ais-Hits-list {
  height: max-content;
  @screen sm {
    @apply -m-3 justify-center;
  }
  @screen lg {
    @apply ml-auto justify-start;
  }
}

::v-deep .ais-Hits-item {
  width: 100%;
  @apply border-0 shadow-none p-0 mb-6;
  @screen sm {
    width: 292px;
    @apply m-3;
  }
  @screen lg {
    width: 300px;
    @apply flex flex-col;
  }
}

.ais-Pagination {
  ::v-deep ul {
    li {
      color: black;
      transition: all 0.25s;
      @apply p-2 border-b-2 border-transparent text-sm;
      &.cursor-not-allowed {
        color: #908e8e;
      }
      &:hover:not(.cursor-not-allowed),
      &.active {
        @apply border-jva-blue-500;
      }
    }

    .page-number {
      @apply mx-2 font-light hidden;
      @screen md {
        @apply inline-block;
      }
      &.active {
        @apply font-bold inline-block;
      }
    }
  }
}

.sort {
  width: 180px;
  ::v-deep {
    .el-input__prefix {
      pointer-events: none;
      left: 15px;
      top: 10px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      letter-spacing: -0.1px;
      line-height: 18px;
    }
    input {
      height: 60px;
      padding: 0 15px;
      background-color: transparent;
      color: white;
      letter-spacing: -0.1px;
      font-size: 14px;
      font-weight: bold;
      border: none;
      position: relative;
      top: 10px;
    }
    .el-input {
      border: 1px solid white;
      border-radius: 8px;
      cursor: pointer;
    }
    .el-select__caret {
      color: white;
      font-weight: bold;
      font-size: 12px;
      position: relative;
      right: 10px;
    }
  }
}

.facets--wrapper {
  @media screen and (max-width: 1023px) {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    flex-direction: column;
    @apply inset-0 bg-gray-100;
  }
}

.clear-refinements {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);
  @apply bg-white px-4 py-2 pr-3 rounded-lg text-black text-sm font-semibold mb-8 flex items-center cursor-pointer;
  .clear-refinement--icon {
    transition: opacity 0.15s;
    @apply absolute m-auto opacity-50;
  }
  &:hover {
    .clear-refinement--icon {
      @apply opacity-100;
    }
  }
}

.header.custom-color {
  ::v-deep .el-radio {
    color: white;
    border-color: white;
    .el-radio__label {
      color: currentColor;
    }
    .el-radio__input {
      .el-radio__inner {
        background: currentColor;
        border-color: currentColor;
        &::after {
          filter: grayscale(1) invert(1) contrast(0.5);
        }
      }
    }
    .el-radio__input.is-checked {
      .el-radio__inner::after {
        filter: grayscale(1) invert(1);
      }
    }
  }
}

::v-deep .banner-remote {
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  &:hover {
    .background {
      transform: scale(1.05);
    }
  }
  .foreground {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 53.08%,
      rgba(0, 0, 0, 0.3) 100%
    );
    @apply h-full;
  }
}
</style>
