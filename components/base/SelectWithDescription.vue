<template>
  <div class="relative">
    <div class="inline-flex border border-cool-gray-300 rounded-md divide-x divide-gray-100">
      <div class="relative z-0 inline-flex rounded-md divide-x divide-gray-100">
        <div
          :class="[
            'relative inline-flex items-center bg-white border border-transparent rounded-l-md text-white',
            { 'py-2 pl-3 pr-4' : size === 'sm'},
            { 'py-2 pl-3 pr-4' : size === 'md'}
          ]"
        >
          <CheckSolidIcon
            :class="[
              'text-cool-gray-700',
              { 'h-4 w-4' : size === 'sm'},
              { 'h-5 w-5' : size === 'md'}
            ]"
          />
          <p class="ml-2.5 text-sm font-bold text-cool-gray-700 leading-4">
            {{ selected.label }}
          </p>
        </div>
        <button
          type="button"
          class="relative inline-flex items-center bg-white p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-gray-100 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          @click="show = !show"
        >
          <ChevronDownSolidIcon
            :class="[
              'text-cool-gray-700 h-5 w-5'
            ]"
          />
        </button>
      </div>
    </div>

    <transition
      enter-active-class=""
      enter-class=""
      enter-to-class=""
      leave-active-class="transition ease-in duration-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-if="show"
        v-click-outside="() => show = false"
        class="origin-top-left absolute z-10 left-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-0"
      >
        <li
          v-for="option in options"
          id="listbox-option-0"
          :key="option.key"
          class="text-gray-900 select-none relative p-4 text-sm group hover:bg-gray-50 cursor-pointer"
          role="option"
          @click="option.key != value ? handleSelected(option) : null"
        >
          <div class="flex flex-col">
            <div class="flex justify-between">
              <p :class="[option.key == value ? 'font-semibold text-jva-blue-500' : 'group-hover:font-semibold']">
                {{ option.label }}
              </p>
              <span v-if="option.key == value" class="text-jva-blue-500">
                <CheckSolidIcon class="h-5 w-5" />
              </span>
            </div>
            <p class="text-gray-500 mt-2">
              {{ option.description }}
            </p>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Boolean],
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: s => ['sm', 'md'].includes(s)
    }
  },

  data () {
    return {
      show: false
    }
  },
  computed: {
    selected () {
      return this.options.find(option => option.key == this.value)
    }
  },
  methods: {
    handleSelected (option) {
      this.$emit('selected', option)
      this.show = false
    }
  }
}
</script>
