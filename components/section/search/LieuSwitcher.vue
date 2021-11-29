<template>
  <div class="flex flex-col lg:flex-row switch-items">
    <div
      v-for="(item, index) in radios"
      :key="item.value"
      class="flex w-full lg:w-auto border  py-5 px-8  border-jva-blue-400 cursor-pointer items-center space-x-3"
      :class="[
        {'text-jva-blue-500 font-semibold bg-white': item.value == radio},
        {'text-jva-blue-400': item.value != radio},
        {'rounded-t-lg border-b-0 lg:border-b lg:rounded-tr-none lg:rounded-l-lg lg:border-r-0': index == 0},
        {'rounded-b-lg lg:rounded-bl-none lg:rounded-r-lg': index == (radios.length - 1)}]
      "
      @click.prevent="onClick(item.value)"
    >
      <input
        :id="`radio-${index}`"
        v-model="radio"
        type="radio"
        :value="item.value"
        name="mission-type"
        class="hidden"
      >
      <span
        class="h-5 w-5 flex items-center justify-center rounded-full"
        :class="[{'bg-gray-200': item.value == radio}, {'bg-jva-blue-400': item.value != radio}]"
      >
        <img src="/images/icons/check-primary.svg">
      </span>
      <label
        class="cursor-pointer"
        :for="`radio-${index}`"
        :class="[{'hidden': index == 0 && radio == 'Mission en présentiel'}]"
      >{{ item.label }}</label>

      <div
        v-if="index == 0 && radio == 'Mission en présentiel'"
      >
        <label for="code_postal">Votre code postal</label>
        <InputAutocomplete
          id="code_postal"
          name="autocomplete-place"
          label="Autocomplete"
          placeholder="Ex: Paris"
          :options="autocompleteOptions"
          attribute-key="id"
          attribute-label="label"
          attribute-right-label="typeLabel"
          class-options="lg:w-96 lg:-left-28"
          @selected="$emit('selected', $event)"
          @fetch-suggestions="onFetchGeoSuggestions"
          @mounted="onInitializedAutocomplete"
        />
        <!-- <AlgoliaRadiusFilter
            :initial-value="aroundRadius"
            @selected="$emit('change-radius', $event)"
          /> -->
      </div>
    </div>
  </div>
</template>

<script>
import MixinColorsDomaines from '@/mixins/colors-domaines'
import InputGeo from '@/mixins/input-geo'

export default {
  name: 'AlgoliaLieuSwitcher',
  mixins: [MixinColorsDomaines, InputGeo],
  props: {
    initialType: {
      type: [String, Boolean],
      default: null
    },
    initialPlace: {
      type: [String, Boolean],
      default: undefined
    },
    aroundRadius: {
      type: [Number, String],
      default: 'all'
    },
    color: {
      type: [String, Boolean],
      default: null
    }
  },
  data () {
    return {
      radio: this.initialType,
      radios: [
        { value: 'Mission en présentiel', label: 'Près de chez moi' },
        { value: 'Mission à distance', label: 'À distance' }
      ],
      doFocus: false
    }
  },
  watch: {
    initialType (newVal) {
      this.radio = newVal
    }
  },
  methods: {
    onClick (val) {
      this.$emit('click', val)
      this.doFocus = true
      if (this.radio === val) {
        this.radio = null
        this.$emit('typeRemoved')
      } else {
        this.radio = val
        this.$emit('typeChanged', val)
      }
    },
    onInit () {
      if (this.doFocus) {
        document.querySelector('#algolia-lieu-switcher--places-input').focus()
      }
    }
  }
}
</script>
