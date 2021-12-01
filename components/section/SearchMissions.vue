<template>
  <div class="component--search-missions bg-cool-gray-100">
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
          $options.filters.label(domainId, 'domaines', 'bg'),
          { 'custom-color': $options.propsData.thematique },
        ]"
      >
        <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl">
          <div class="flex flex-wrap justify-between items-center -m-2">
            <div class="m-2">
              <h1
                v-if="titleTag == 'h1'"
                class="text-xl sm:text-2xl lg:text-3xl font-black"
              >
                Trouver une mission de bénévolat test
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
                    {{ nbHits | pluralize('mission de bénévolat disponible', 'missions de bénévolat disponibles', false) }}
                  </div>
                </template>
              </AisStateResults>
            </div>

            <div class="w-full lg:w-auto m-2">
              <div class="flex flex-col lg:flex-row items-center">
                <LieuSwitcher
                  class="w-full my-4 lg:my-0"
                  :initial-type="type"
                  :initial-place="placeLabel"
                  :initial-around-radius="aroundRadius"
                  :color="$options.propsData.color ? color : null"
                  :thematique="thematique"
                  @selected="onPlaceSelect($event)"
                  @clear="onPlaceClear()"
                  @typeChanged="onTypeChanged($event)"
                  @typeRemoved="onTypeRemoved()"
                  @change-radius="onChangeRadius($event)"
                />

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

      <!-- Content -->
      <div class="px-4 max-w-3xl mx-auto lg:ma max-w-7xl">
        <div ref="contentWrapper" class="pt-8">
          <div class="flex">
            <!-- Filtres -->
            <transition name="fade">
              <div
                v-if="!noFilters"
                v-show="showFilters"
                class="facets--wrapper flex-none mb-8 w-full lg:w-64 lg:mr-8"
              >
                <div class="border-b lg:hidden">
                  <div class="p-2 flex items-center justify-between">
                    <div class="p-2">
                      <AisStateResults>
                        <template slot-scope="{ nbHits }">
                          <span class="font-bold">
                            {{ nbHits | formatNumber }}
                          </span>
                          <span class="font-light">
                            {{ nbHits | pluralize('mission disponible','missions disponibles', false) }}
                          </span>
                        </template>
                      </AisStateResults>
                    </div>

                    <Button class="p-2 right-0 top-0" @click.native="showFilters = false">
                      Afficher les résultats
                    </Button>
                  </div>
                </div>

                <div
                  v-scroll-lock="showFilters && isMobile"
                  class="px-4 pt-8 pb-32 lg:p-0 overflow-y-auto lg:overflow-visible flex flex-col flex-1"
                >
                  <client-only>
                    <AisClearRefinements :excluded-attributes="clearExcludes">
                      <div slot-scope="{ canRefine, refine }">
                        <div
                          v-if="canRefine"
                          class="clear-refinements"
                          @click.prevent="onClearRefinements(refine)"
                        >
                          <span class="mr-auto">
                            Effacer tous les filtres
                          </span>
                          <div
                            class="ml-3 rounded-full bg-gray-100 w-6 h-6 relative flex items-center justify-center"
                          >
                            <XIcon class="clear-refinement--icon h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </AisClearRefinements>
                  </client-only>

                  <div class="font-black text-[#171725] mb-2 lg:hidden">
                    Mots clés
                  </div>

                  <AisSearchBox ref="searchbox" class="mb-8">
                    <div slot-scope="{ refine }">
                      <Input
                        v-model="routeState.query"
                        name="search-query"
                        placeholder="Recherche par mots-clés"
                        clearable
                        autocomplete="new-password"
                        @input="onQueryInput(refine, $event)"
                      />
                    </div>
                  </AisSearchBox>

                  <AlgoliaToggleRefinement
                    v-if="facets.includes('is_priority')"
                    attribute="is_priority"
                    label="Missions prioritaires"
                    class="mb-6"
                    @toggle-facet="onToggleRefinement($event)"
                  />

                  <AlgoliaRefinementList
                    v-if="facets.includes('domaines')"
                    name="domaines"
                    label="Domaines d'action"
                    class="mb-6"
                    @toggle-facet="onToggleFacet($event)"
                  />

                  <AlgoliaRefinementList
                    v-if="facets.includes('template_subtitle')"
                    name="template_subtitle"
                    label="Type de mission"
                    is-searchable
                    class="mb-6"
                    @toggle-facet="onToggleFacet($event)"
                  />

                  <AlgoliaRefinementList
                    v-if="facets.includes('department_name')"
                    name="department_name"
                    label="Département"
                    is-searchable
                    class="mb-6"
                    :sort-by="['isRefined', 'name:asc']"
                    @toggle-facet="onToggleFacet($event)"
                  />

                  <AlgoliaRefinementList
                    v-if="facets.includes('structure.name')"
                    name="structure.name"
                    label="Organisations"
                    is-searchable
                    class="mb-6"
                    @toggle-facet="onToggleFacet($event)"
                  />
                </div>
              </div>
            </transition>

            <!-- Résultats -->
            <AisStateResults class="w-full mb-16">
              <template slot-scope="{ nbHits }">
                <div v-show="nbHits > 0">
                  <AisHits
                    :class-names="{
                      'ais-Hits-list': 'flex flex-wrap',
                    }"
                    :transform-items="addRemoteMissionsBanner"
                  >
                    <div
                      slot="item"
                      slot-scope="{ item }"
                      class="flex flex-col flex-1 h-full"
                    >
                      <nuxt-link
                        v-if="item.isBannerRemoteMissions"
                        to="/missions-benevolat?refinementList[type][0]=Mission à distance"
                        class="banner-remote relative h-auto flex flex-col flex-1 bg-white rounded-lg overflow-hidden cursor-pointer group"
                      >
                        <img
                          src="/images/missions/banner_a_distance.jpg"
                          srcset="/images/missions/banner_a_distance@2x.jpg 2x"
                          alt="Engagez-vous à distance"
                          class="background absolute object-cover w-full h-full transition duration-300 ease-in-out"
                        >

                        <div
                          class="foreground text-white relative flex flex-col h-full items-center text-center px-4 py-8"
                        >
                          <img
                            src="/images/icons/computer.svg"
                            alt="Télébénévolat"
                            class="my-4"
                          >
                          <div
                            class="text-3xl font-extrabold leading-none mb-4"
                          >
                            Engagez-vous<br>à distance
                          </div>
                          <div class="text-xl font-bold mt-auto">
                            Près de 1000 missions de télébénévolat disponibles
                          </div>

                          <div
                            class="text-center px-4 py-2 rounded-full text-white shadow-md cursor-pointer bg-jva-green group-hover:bg-[#0e9f6e] transition mt-6 font-extrabold inline-flex justify-center items-center"
                            style="width: 212px; height: 45px"
                          >
                            Missions à distance
                          </div>
                        </div>
                      </nuxt-link>

                      <template v-else>
                        <nuxt-link
                          class="flex flex-col flex-1 hover:bg-gray-50 focus:bg-gray-50 transition rounded-[10px]"
                          :to="
                            item.provider == 'api_engagement'
                              ? `/missions-benevolat/${item.id}`
                              : `/missions-benevolat/${item.id}/${item.slug}`
                          "
                          @click.native="handleClickCard"
                        >
                          <CardMission :mission="item" />
                        </nuxt-link>
                      </template>
                    </div>
                  </AisHits>

                  <AisPagination
                    v-if="!noPagination"
                    class="mt-6"
                    @page-change="scrollToTop"
                  >
                    <ul
                      slot-scope="{
                        currentRefinement,
                        pages,
                        isFirstPage,
                        isLastPage,
                        refine,
                      }"
                      class="flex lg:ml-3"
                    >
                      <li
                        tabindex="0"
                        class="mr-auto"
                        :class="[
                          { 'cursor-not-allowed': isFirstPage },
                          { 'cursor-pointer': !isFirstPage },
                        ]"
                        @keyup.enter="!isFirstPage ? refine(currentRefinement - 1) : null"
                        @click.prevent="!isFirstPage ? refine(currentRefinement - 1) : null"
                      >
                        <span>Précédent</span>
                      </li>

                      <li
                        v-for="pageItem in pages"
                        :key="pageItem"
                        tabindex="0"
                        class="page-number cursor-pointer"
                        :class="[{active: currentRefinement === pageItem}]"
                        @keyup.enter="currentRefinement !== pageItem ? refine(pageItem) : null"
                        @click.prevent="currentRefinement !== pageItem ? refine(pageItem) : null"
                      >
                        {{ pageItem + 1 }}
                      </li>
                      <li
                        tabindex="0"
                        class="ml-auto"
                        :class="[
                          { 'cursor-not-allowed': isLastPage },
                          { 'cursor-pointer': !isLastPage },
                        ]"
                        @keyup.enter="!isLastPage ? refine(currentRefinement + 1) : null"
                        @click.prevent="!isLastPage ? refine(currentRefinement + 1) : null"
                      >
                        <span>Suivant</span>
                      </li>
                    </ul>
                  </AisPagination>
                </div>

                <div
                  v-show="!nbHits"
                  class="w-full mb-16 bg-white rounded-lg shadow px-4 py-8 sm:p-8 lg:p-12 xl:p-16"
                >
                  Pas de résultats.
                </div>
              </template>
            </AisStateResults>
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
  AisHits,
  AisPagination,
  AisClearRefinements,
  AisSearchBox
} from 'vue-instantsearch'

import { debounce } from 'lodash'
import MixinMission from '@/mixins/mission'
import MixinSearchRouter from '@/mixins/search-router'
import AlgoliaRefinementList from '@/components/section/search/AlgoliaRefinementList.vue'
import AlgoliaToggleRefinement from '@/components/section/search/AlgoliaToggleRefinement.vue'
import LieuSwitcher from '@/components/section/search/LieuSwitcher.vue'
import CardMission from '@/components/card/CardMission.vue'

export default {
  components: {
    AisInstantSearchSsr,
    AisConfigure,
    AisHits,
    AisStateResults,
    AisPagination,
    AisClearRefinements,
    AisSearchBox,
    AlgoliaRefinementList,
    AlgoliaToggleRefinement,
    CardMission,
    LieuSwitcher
  },
  mixins: [MixinMission, MixinSearchRouter],
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
    return {
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
      geoSearch: this.initialGeoSearch
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
  created () {
    this.readUrl()
    this.handleGeoSearch()
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
      if (this.routeState.query === '') {
        this.$delete(this.routeState, 'query')
        this.writeUrl()
      }
      this.timeout = debounce(() => {
        refine(this.routeState.query)
        this.writeUrl()
      }, 100)
      this.timeout()
    },
    onPlaceSelect (place) {
      if (!place) {
        return
      }
      this.$set(
        this.routeState,
        'aroundLatLng',
        `${place.coordinates[1]},${place.coordinates[0]}`
      )
      this.$set(this.routeState, 'place', place.city)
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
    }
  }
}
</script>

<style lang="postcss" scoped>
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
