<template>
  <div class="relative-gray">
    <div class="inline-flex shadow-sm rounded-md divide-x divide-gray-200">
      <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-200">
        <div class="relative inline-flex items-center bg-gray-50 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
          <CheckSolidIcon class="h-5 w-5 text-gray-800" />
          <p class="ml-2.5 text-sm font-medium text-gray-800">
            {{ selected.label }}
          </p>
        </div>
        <button
          type="button"
          class="relative inline-flex items-center bg-gray-50 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-gray-200 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          @click="show = !show"
        >
          <ChevronDownSolidIcon class="h-5 w-5 text-gray-800" />
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
        class="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
          @click="option.key != value ? $emit('selected', option) : null"
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
      type: String,
      default: ''
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
  }

}
</script>

<style scoped>
-gray {

}
</style>
