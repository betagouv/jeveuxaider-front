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

            <div class="items-wrapper flex flex-wrap items-stretch justify-center">
              <div
                v-for="(item, index) in radios"
                :key="item.value"
                class="item w-full lg:w-auto lg:h-full flex items-center py-6 px-10 transition bg-white rounded-full m-0 mb-4"
                :class="[{ 'lg:flex': index == 0 }]"
              >
                <input
                  :id="`radio-${index}`"
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
                  class="w-6 h-6 flex items-center justify-center  border-gray-300 border transition-all rounded-full mr-2"
                  :class="[{'bg-cool-gray-300' : radio == item.value }, {'bg-gray-100' : radio != item.value }]"
                >
                  <img :src="radio == item.value ? '/images/icons/check-primary.svg' : '/images/icons/check-gray.svg'">
                </span>
                <label class="text-base font-extrabold text-black" :for="`radio-${index}`">{{ item.label }}</label>

                <transition name="fade-in">
                  <div v-if="index == 0 && radio == 'Mission en présentiel'" class="relative">
                    <img
                      src="/images/chevron_gray.svg"
                      class="chevron hidden lg:block z-10"
                      alt="Chevron"
                    >
                    <client-only placeholder="Rechercher par ville">
                      <AlgoliaPlacesInput
                        ref="alogoliaInput"
                        selector="search-overlay--places-input"
                        class="zipcode"
                        :label="false"
                        :description="false"
                        type="city"
                        :limit="4"
                        :templates="templatesPlaces"
                        placeholder="Ex: 75001"
                        @selected="onPlaceSelect($event)"
                        @clear="onPlaceClear"
                        @initialized="onInitialized"
                      />
                    </client-only>
                  </div>
                </transition>
              </div>

              <div class="submit py-6 px-10 cursor-pointer transition rounded-r-full" @click="onSubmit">
                <button class="mx-auto flex items-center justify-center relative text-white font-extrabold">
                  <!-- <ClipLoader
                    v-if="loading"
                    :loading="loading"
                    size="20px"
                    color="white"
                    class="flex absolute left-0"
                  /> -->

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
// import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'SearchOverlay',
  components: {
    // ClipLoader,
  },
  data () {
    return {
      radio: null,
      radios: [
        { value: 'Mission en présentiel', label: 'Près de chez moi' },
        { value: 'Mission à distance', label: 'À distance' }
      ],
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
      routeState: {},
      loading: false
    }
  },
  watch: {
    radio (newVal, oldVal) {
      this.$set(this.routeState, 'refinementList', { type: [newVal] })
      this.onPlaceClear()
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
    onPlaceSelect ($event) {
      this.$set(
        this.routeState,
        'aroundLatLng',
        `${$event.latlng.lat},${$event.latlng.lng}`
      )
      this.$set(this.routeState, 'place', $event.value)
      this.$set(this.routeState, 'aroundRadius', 25000)
      this.fakeSubmit()
    },
    onPlaceClear () {
      this.$delete(this.routeState, 'aroundLatLng')
      this.$delete(this.routeState, 'place')
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
    onInitialized () {
      document.querySelector('#search-overlay--places-input').focus()
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

.items-wrapper {
  @screen lg {
    .item {
      @apply bg-white;
      &:nth-child(1) {
        @apply rounded-l-full border-r;
      }
    }
  }
}

.zipcode {
  position: relative;
  @apply m-0 mb-4 h-full;
  @screen lg {
    @apply mb-0;
  }
  &::after {
    content: 'Votre code postal';
    position: absolute;
    pointer-events: none;
    left: 40px;
    top: 10px;
    font-size: 12px;
    color: #908e8e;
    letter-spacing: -0.1px;
    line-height: 18px;
    @screen lg {
      left: 15px;
    }
  }
  ::v-deep {
    .algolia-places {
      @apply bg-white rounded-full;
      @screen lg {
        max-height: 72px;
        @apply rounded-none h-full;
      }
    }
    .ap-dropdown-menu {
      border-radius: 8px;
    }
    .ap-suggestion {
      padding: 5px 15px;
      line-height: normal;
      height: inherit;
    }
    .ap-input {
      width: 100%;
      height: 68px;
      border: 1px solid white;
      color: black;
      font-weight: bold;
      background-color: transparent;
      border: none;
      top: 10px;
      @apply truncate py-6 px-10;
      @screen lg {
        width: 250px;
        height: calc(100% - 10px);
        padding: 0 15px;
      }
    }
    .ap-icon-pin {
      position: relative;
      pointer-events: none;
      svg {
        display: none;
      }
      &::after {
        content: '';
        position: absolute;
        width: 22px;
        height: 23px;
        background: url('/images/picker.svg');
        top: 7px;
        right: 0px;
      }
    }
    .ap-icon-clear {
      width: 20px;
      height: 20px;
      margin: auto;
      display: flex;
      align-items: center;
      svg {
        right: 4px;
      }
    }
  }
}

.chevron {
  left: -12px;
  @apply absolute top-0 bottom-0 m-auto;
}

::v-deep #search-overlay--places-input {
  box-shadow: none !important;
}
</style>
