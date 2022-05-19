<template>
  <div>
    <div class="group flex justify-between items-center cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen">
        Localisation slot
      </slot>
      <ChevronDownIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
    </div>
    <div v-if="isOpen" v-click-outside="onClickOutside">
      <div class="mt-2 absolute z-40 bg-white border shadow-xl rounded-xl text-[15px] max-w-[375px] w-full">
        <div class="divide-y">
          <div class="p-4">
            <div class="font-medium">
              {{ label }}
            </div>
          </div>
          <div class="flex space-x-1 items-center bg-gray-50 px-4 py-2">
            <SearchIcon class="text-gray-500 h-5 w-5" />
            <input v-model="searchValue" type="text" placeholder="Votre ville" class="border-0 w-full bg-transparent">
            <XIcon v-if="searchValue" class="text-gray-500 h-5 w-5" @click="reset" />
          </div>
          <div class="p-4 flex flex-col space-y-1">
            <div v-for="suggestion,i in suggestions" :key="i" class="p-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
              {{ suggestion.name }}
            </div>
          </div>
        </div>
        <!-- <div class="border-t px-6 py-4 flex justify-between">
          <div v-if="activeValues.length > 0" class="text-gray-600 cursor-pointer" @click="deleteFacet()">
            Effacer
          </div>
          <div class="ml-auto text-jva-blue-500 cursor-pointer" @click="isOpen = false">
            Valider
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    ipLatLng: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isOpen: false,
      searchValue: null,
      fetchSuggestions: [],
      initialSuggestions: [
        {
          name: 'Paris',
          aroundLatLng: '48.859,2.347'
        },
        {
          name: 'Lyon',
          aroundLatLng: '45.758,4.835'
        },
        {
          name: 'Marseille',
          aroundLatLng: '43.282,5.405'
        }
      ]
    }
  },
  //   async mounted () {
  //     if (this.ipLatLng) {
  //       const [lat, lng] = this.ipLatLng.split(',')
  //       const res = await this.$axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${lng}&lat=${lat}`)
  //       this.ipCity = res.data?.features[0]?.properties?.city
  //     }
  //   },
  computed: {
    suggestions () {
      return this.fetchSuggestions.length ? this.fetchSuggestions : this.initialSuggestions
    }
  },
  methods: {
    reset () {
      this.searchValue = null
    },
    onClickOutside () {
      this.isOpen = false
    }
  }
}
</script>

<style>

</style>
