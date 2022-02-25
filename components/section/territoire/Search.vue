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
      class="pb-12 bg-[#fafaff]"
      :class="[{ 'pb-44': territoire.type != 'city' }]"
    >
      <SearchMissions
        :facets="[]"
        :filters="filters"
        :title-tag="'h2'"
        :hits-per-page="6"
        :default-radius="35000"
        :initial-geo-search="geoSearch"
        no-header
        no-filters
        no-pagination
        class="flex flex-wrap justify-center transform -translate-y-24 -mb-24"
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

    <hr v-if="territoire.type != 'city'" class="opacity-25">
  </section>
</template>

<script>
import SearchMissions from '~/components/section/SearchMissions.vue'

export default {
  components: {
    SearchMissions
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
          link = `/missions-benevolat?refinementList[department_name][0]=${this.$options.filters.label(
            this.territoire.department, 'departments'
          )}`
          break
        case 'city':
          link = `/missions-benevolat?refinementList[type][0]=Mission en présentiel&aroundLatLng=${this.territoire.latitude},${this.territoire.longitude}&place=${this.territoire.zips[0]}&aroundRadius=35000`
          break
      }
      return link
    },
    filters () {
      if (this.territoire.type === 'department') {
        const departmentName = `${this.territoire.department} - ${this.$options.filters.label(this.territoire.department, 'departments')}`
        return `department_name:"${departmentName}"`
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
