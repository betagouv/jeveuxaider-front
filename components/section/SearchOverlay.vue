<template>
  <div class="fixed inset-0 w-full h-full z-50">
    <div
      id="search-overlay"
      ref="searchOverlay"
      class="w-full h-full flex flex-col items-center justify-center"
    >
      <div class="flex flex-col w-full h-full px-4">
        <button
          class="p-4 -mr-4 lg:m-0 lg:p-8 cursor-pointer ml-auto lg:absolute lg:right-0"
          @click="onClose"
        >
          <XIcon class="text-white h-10 w-10" />
        </button>

        <div
          v-scroll-lock="true"
          class="overflow-y-auto flex-1 flex flex-col lg:justify-center"
        >
          <div class="pb-32 lg:pb-0">
            <div class="title text-center text-white font-extrabold mb-6 lg:-mt-32">
              Trouver une mission de bénévolat
            </div>

            <div class="flex flex-wrap flex-col lg:flex-row items-stretch justify-center">
              <div
                v-for="(item, index) in radios"
                :key="item.value"
                class="flex flex-col lg:flex-row"
                :class="[{'lg:border-l': index == 1}]"
              >
                <div
                  class="item w-full lg:w-auto lg:h-full flex items-center bg-white rounded-full lg:rounded-none transition m-0 mb-4 lg:mb-0 py-6 px-10 cursor-pointer"
                  :class="[{ 'lg:rounded-l-full': index == 0 }]"
                  @click="$refs[`radio-${index}`][0].click()"
                >
                  <input
                    :id="`radio-${index}`"
                    :ref="`radio-${index}`"
                    v-model="radio"
                    type="radio"
                    :value="item.value"
                    name="mission-type"
                    class="hidden"
                    :class="[{ '!opacity-25': radio && radio != item.value }]"
                    @keyup.space="handleSpaceRadio($event, item.value)"
                    @hook:mounted="focusKeyboard"
                  >
                  <span
                    class="w-6 h-6 flex items-center justify-center border-gray-300 border transition-all rounded-full mr-2"
                    :class="[{'bg-cool-gray-300' : radio == item.value }, {'bg-gray-100' : radio != item.value }]"
                  >
                    <img :src="radio == item.value ? '/images/icons/check-primary.svg' : '/images/icons/check-gray.svg'">
                  </span>
                  <label class="text-base font-extrabold text-black cursor-pointer" :for="`radio-${index}`">{{ item.label }}</label>
                </div>

                <transition name="fade-in">
                  <div v-if="index == 0 && radio == 'Mission en présentiel'" class="relative bg-white rounded-full transition m-0 mb-4 lg:mb-0 lg:rounded-none py-2 px-10">
                    <label class="text-sm text-gray-500" for="place">Votre ville</label>
                    <InputAutocomplete
                      id="overlay-autocomplete"
                      name="autocomplete-place-overlay"
                      placeholder="Ex: Paris"
                      :options="autocompleteOptions"
                      attribute-key="id"
                      attribute-label="label"
                      attribute-right-label="typeLabel"
                      class-options="pr-1 py-1"
                      class-options-ul="custom-scrollbar"
                      style-input="width: calc(100% - 38px)"
                      @selected="onPlaceSelect"
                      @fetch-suggestions="onFetchGeoSuggestions"
                      @mounted="onInitializedAutocomplete"
                    />
                  </div>
                </transition>
              </div>

              <div class="submit py-6 px-10 cursor-pointer transition rounded-r-full" @click="onSubmit">
                <button class="mx-auto flex items-center justify-center relative text-white font-extrabold">
                  <SpinIcon
                    v-if="loading"
                    class="animate-spin h-6 w-6"
                  />
                  <SearchIcon class="flex-none" :class="[{ 'opacity-0': loading }]" />
                  <span class="ml-2">Rechercher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import SpinIcon from '@/components/icon/SpinIcon'

export default {
  name: 'SearchOverlay',
  components: {
    SpinIcon
  },
  data () {
    return {
      radio: null,
      radios: [
        { value: 'Mission en présentiel', label: 'Près de chez moi' },
        { value: 'Mission à distance', label: 'À distance' }
      ],
      routeState: {},
      autocompleteOptions: [],
      loading: false
    }
  },
  watch: {
    radio (newVal, oldVal) {
      this.$set(this.routeState, 'refinementList', { type: [newVal] })
      this.$nextTick(() => {
        if (newVal === 'Mission à distance') {
          this.fakeSubmit()
        }
      })
    }
  },
  methods: {
    focusKeyboard () {
      const radio = document.getElementById('radio-0')
      radio.focus()
      radio.blur()
    },
    async onFetchGeoSuggestions (value) {
      if (!value) { return [] }
      const { data } = await this.$axios.get('https://api-adresse.data.gouv.fr/search', {
        params: {
          q: value,
          limit: 15,
          type: 'municipality'
        }
      })

      const formatOptions = data.features.map((option) => {
        return {
          ...option.properties,
          coordinates: option.geometry.coordinates,
          typeLabel: this.$options.filters.label(option.properties.type, 'geoType')
        }
      })
      this.autocompleteOptions = formatOptions
    },
    handleSpaceRadio (event, val) {
      if (this.radio === val) {
        this.radio = null
        this.$delete(this.routeState, 'refinementList')
      }
    },
    onClose () {
      this.reset()
      this.$store.commit('toggleSearchOverlay')
    },
    onSubmit () {
      this.$router.push(
        `/missions-benevolat${this.stringifyQuery(this.routeState)}`
      )
      this.reset()
      this.$store.commit('toggleSearchOverlay')
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
      this.$set(this.routeState, 'place', place.label)
      this.$set(this.routeState, 'aroundRadius', 25000)
      this.fakeSubmit()
    },
    reset () {
      this.routeState = {}
      this.radio = null
    },
    stringifyQuery (query) {
      const string = qs.stringify(query)
      return string ? '?' + string : ''
    },
    fakeSubmit () {
      this.loading = true
      setTimeout(() => {
        this.onSubmit()
      }, 550)
    },
    onInitializedAutocomplete () {
      document.querySelector('#autocomplete-place-overlay')?.focus()
    }
  }
}
</script>

<style lang="postcss" scoped>
#search-overlay {
  background-color: rgba(25, 22, 130, 0.95);

  .title {
    font-size: 24px;
    @screen lg {
      font-size: 50px;
      letter-spacing: -1px;
    }
  }

  .submit {
    background-color: #30c48d;
    &:hover {
      background-color: #39aa80;
    }
    @apply rounded-full w-full;
    @screen lg {
      @apply w-auto rounded-none rounded-r-full;
    }
  }
}

::v-deep #autocomplete-place-overlay {
  border: none;
  @apply border-none py-0 px-0 ring-0 outline-none h-8 font-bold text-base;
}

#overlay-autocomplete {
  ::v-deep .options-wrapper {
    width: calc(100vw - 2rem);
    left: -40px;
    margin-top: 1rem;
    margin-bottom: 2rem;
    @screen lg {
      width: calc(100% + 200px);
      left: -100px;
    }
    .options-wrapper-ul {
      max-height: 210px;
      overflow: auto;
    }
  }
}

</style>
