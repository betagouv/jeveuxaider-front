<template>
  <div class="sticky top-[-46px] z-10 sm:hidden">
    <Tabs
      ref="mobileFilters"
      name="Près de chez moi ou depuis chez moi"
      :tabs="[
        { key: 'onsite', content: 'Prés de chez moi', slug: 'onsite' },
        { key: 'remote', content: 'Depuis chez moi', slug: 'remote' },
      ]"
      :tabpanel-class="['py-4 bg-white tab-panel', {'!border-white': isPinned}]"
      tabswrapper-class="!px-2 !text-[15px] xs:!px-3 xs:!text-base"
      :selected-tab-key="selectedTabKey"
      :class="[{'full-bleed shadow-xl': isPinned}]"
      @selected="onTabSelect"
    >
      <div slot="tab-onsite">
        <div class="flex items-center divide-x">
          <LocalisationSuggestions
            class="w-full pr-4 mr-auto"
            @geolocFilterActiveStateToggle="isGeolocFilterActive = $event"
          />
          <transition
            enter-active-class="ease-out duration-200 delay-200"
            enter-class="opacity-0 translate-x-4 sm:translate-x-0 sm:scale-95"
            enter-to-class="opacity-100 translate-x-0 sm:scale-100"
          >
            <div>
              <button
                v-show="!isGeolocFilterActive"
                ref="buttonFilterOnsite"
                class="flex-none p-2 ml-4 relative rounded-lg"
                @click="isFiltersOpen = true"
              >
                <RiEqualizerFill class="text-jva-blue-500 fill-current w-6 h-6" />
                <div v-if="nbMobileSecondaryFilters > 0" class="absolute -top-1.5 -right-1 bg-[#A1A1F8] px-1.5 py-0.5 rounded-full text-white font-bold text-xs min-w-[22px] !leading-[18px] inline-flex justify-center">
                  {{ nbMobileSecondaryFilters }}
                </div>
              </button>
            </div>
          </transition>
        </div>
      </div>

      <div slot="tab-remote">
        <div class="flex items-center divide-x">
          <div class="w-full pr-4 mr-auto">
            <div class="text-[#7B7B7B] mb-1">
              Localisation
            </div>
            <div class="flex space-x-3 items-center">
              <RiComputerFill class="h-5 w-5 flex-none fill-current text-gray-400" />
              <span class="font-bold">Depuis chez moi</span>
            </div>
          </div>
          <div>
            <button
              v-show="!isGeolocFilterActive"
              ref="buttonFilterRemote"
              class="flex-none p-2 ml-4 relative rounded-lg"
              @click="isFiltersOpen = true"
            >
              <RiEqualizerFill class="text-jva-blue-500 fill-current w-6 h-6" />
              <div v-if="nbMobileSecondaryFilters > 0" class="absolute -top-1.5 -right-1 bg-[#A1A1F8] px-1.5 py-0.5 rounded-full text-white font-bold text-xs min-w-[22px] !leading-[18px] inline-flex justify-center">
                {{ nbMobileSecondaryFilters }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </Tabs>

    <DrawerSearchMissionsFilters
      v-if="$store.state.algoliaSearch.results"
      :is-open="isFiltersOpen"
      @close="handleClose"
    />
  </div>
</template>

<script>
import Tabs from '@/components/dsfr/Tabs.vue'
import DrawerSearchMissionsFilters from '@/components/drawer/DrawerSearchMissionsFilters.vue'
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'
import LocalisationSuggestions from '@/components/search/LocalisationSuggestions.vue'

export default {
  components: {
    Tabs,
    DrawerSearchMissionsFilters,
    LocalisationSuggestions
  },
  mixins: [AlgoliaMissionsQueryBuilder],
  data () {
    return {
      isFiltersOpen: false,
      isGeolocFilterActive: false,
      isPinned: false,
      tabswrapperEl: undefined
    }
  },
  computed: {
    selectedTabKey () {
      return this.$route.query.type === 'Mission à distance' ? 'remote' : 'onsite'
    }
  },
  mounted () {
    this.tabswrapperEl = this.$refs.mobileFilters.$el.querySelector('ul[role="tablist"]')
    this.onScroll()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onTabSelect (tab) {
      if (tab.slug === 'remote') {
        this.onRemoteTabClick()
      } else if (tab.slug === 'onsite') {
        this.onsiteTabClick()
      }
    },
    onsiteTabClick () {
      this.addFilter('type', 'Mission en présentiel')
    },
    onRemoteTabClick () {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, type: 'Mission à distance', page: undefined, city: undefined, aroundLatLng: undefined, department_name: undefined, is_autonomy: undefined }
      })
    },
    async handleClose () {
      this.isFiltersOpen = false
      await this.$nextTick()
      const button = this.selectedTab === 0 ? this.$refs.buttonFilterOnsite : this.$refs.buttonFilterRemote
      button.focus()
    },
    onScroll () {
      this.isPinned = this.tabswrapperEl.getBoundingClientRect().y === -46
    }
  }
}
</script>

<style lang="postcss" scoped>
.full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.tab-panel > div {
  max-width: 309px;
  margin: auto;
  @screen xs {
    max-width: 359px;
  }
}
</style>
