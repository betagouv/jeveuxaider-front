<template>
  <section>
    <div class="pt-12 pb-28 bg-white">
      <div class="container">
        <h2 class="text-center">
          <p class="uppercase text-jva-red-500 font-extrabold text-sm mb-4">
            Trouver une mission
          </p>

          <p
            class="text-3xl lg:text-4xl leading-none font-extrabold tracking-[-1px] lg:tracking-[-2px]"
          >
            Parmi les dernières missions <br class="hidden md:block">de
            bénévolat {{ territoire.suffix_title }}
          </p>
        </h2>
      </div>
    </div>

    <hr class="opacity-25">

    <div
      class="pb-24 bg-[#fafaff]"
    >
      <AlgoliaSearch
        :initial-filters="filters"
        :initial-hits-per-page="6"
        :initial-around-lat-lng="geoSearch ? geoSearch.aroundLatLng : null"
        no-header
        no-filters
        no-pagination
        class="transform -translate-y-24 -mb-24"
      />

      <div class="container mx-auto px-4">
        <div v-if="moreLink" class="text-center mt-6">
          <nuxt-link :to="moreLink">
            <button
              class="leading-none uppercase shadow-lg text-xs font-extrabold rounded-full text-gray-500 bg-white py-4 px-8 hover:scale-105 transform transition will-change-transform"
            >
              Plus de missions
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AlgoliaSearch from '~/components/section/search/missions/AlgoliaSearch.vue'

export default {
  components: {
    AlgoliaSearch
  },
  props: {
    territoire: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    moreLink () {
      let link = null
      switch (this.territoire.type) {
        case 'department':
          link = `/missions-benevolat?department_name=${this.departmentName}`
          break
        case 'city':
          link = `/missions-benevolat?type=Mission en présentiel&aroundLatLng=${this.territoire.latitude},${this.territoire.longitude}&city=${this.territoire.name}`
          break
      }
      return link
    },
    filters () {
      if (this.territoire.type === 'department') {
        return `department_name:"${this.departmentName}"`
      }

      return ''
    },
    geoSearch () {
      // Departements
      if (this.territoire.type === 'department') {
        return null
      }

      // Villes
      return {
        aroundLatLng: `${this.territoire.latitude}, ${this.territoire.longitude}`
      }
    },
    departmentName () {
      return `${this.territoire.department} - ${this.$options.filters.label(this.territoire.department, 'departments')}`
    }
  }
}
</script>

<style lang="postcss" scoped>
.component--search-missions {
  background-color: unset;

  ::v-deep {
    .ais-Hits-item {
      @screen sm {
        width: 292px;
      }
      @screen md {
        width: 330px;
      }
      @screen lg {
        width: 308px;
      }
      @screen xl {
        width: 330px;
      }
    }

    .ais-Hits-list {
      justify-content: center;
    }

    .ais-StateResults {
      @apply mb-4;
    }
  }
}
</style>
