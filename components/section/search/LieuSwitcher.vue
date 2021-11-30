<template>
  <div class="flex flex-col lg:flex-row switch-items">
    <div
      v-for="(item, index) in radios"
      :key="item.value"
      class="flex w-full lg:w-auto border px-6 py-5 border-jva-blue-400 cursor-pointer items-center space-x-3"
      :class="[
        {'text-jva-blue-500 font-semibold bg-white': item.value == radio},
        {'!py-2': item.value == radio && index == 0},
        {'text-jva-blue-400 ': item.value != radio},
        {'rounded-t-lg border-b-0 lg:border-b lg:rounded-tr-none lg:rounded-l-lg lg:border-r-0': index == 0},
        {'rounded-b-lg lg:rounded-bl-none lg:rounded-r-lg': index == (radios.length - 1)}]
      "
      @click.prevent="onClickRadio(item.value)"
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
        class="flex w-full"
        @click.stop="onClickGeoInput()"
      >
        <div class="border-r border-dashed w-full">
          <label for="code_postal" class="text-gray-800 font-semibold text-xs">Votre code postal</label>
          <InputAutocomplete
            id="code_postal"
            name="autocomplete-place"
            class="-mt-1"
            label="Autocomplete"
            placeholder="Ex: Paris"
            :value="initialPlace"
            :options="autocompleteOptions"
            attribute-key="id"
            attribute-label="label"
            attribute-right-label="typeLabel"
            class-options="lg:w-96 lg:-left-28 text-gray-800 font-medium"
            @selected="$emit('selected', $event)"
            @fetch-suggestions="onFetchGeoSuggestions"
            @mounted="onInitializedAutocomplete"
          />
        </div>
        <div class="pl-4" @click.stop="onClickRadius()">
          <label for="radius" class="text-gray-800 font-semibold text-xs">Rayon</label>
          <select
            id="radius"
            v-model="aroundRadius"
            name="radius"
            :value="aroundRadius"
            class="text-sm appearance-none  block  placeholder-gray-text-400 focus:outline-none border-0 py-0 pl-0 text-gray-800 cursor-pointer"
            @change="$emit('change-radius', aroundRadius)"
          >
            <option v-for="option in aroundRadiusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinInputGeo from '@/mixins/input-geo'

export default {
  name: 'AlgoliaLieuSwitcher',
  mixins: [MixinInputGeo],
  props: {
    initialType: {
      type: [String, Boolean],
      default: null
    },
    initialPlace: {
      type: [String, Boolean],
      default: undefined
    },
    initialAroundRadius: {
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
      aroundRadius: this.initialAroundRadius,
      aroundRadiusOptions: [
        { value: 'all', label: 'Aucun' },
        { value: 1000, label: '1km' },
        { value: 5000, label: '5km' },
        { value: 25000, label: '25km' },
        { value: 35000, label: '35km' },
        { value: 50000, label: '50km' }
      ]
    }
  },
  watch: {
    initialType (newVal) {
      this.radio = newVal
    }
  },
  methods: {
    onClickRadio (val) {
      this.$emit('click', val)
      if (this.radio === val) {
        this.radio = null
        this.$emit('typeRemoved')
      } else {
        this.radio = val
        this.$emit('typeChanged', val)
      }
    },
    onClickGeoInput () {
      document.querySelector('#code_postal input').focus()
    },
    onClickRadius () {
      // prevent default
    }
  }
}
</script>

<style lang="postcss" scoped>
  ::v-deep #autocomplete-place {
    border: none;
    @apply border-none py-0 px-0 ring-0 outline-none h-8 font-bold text-base;
  }
</style>
