<template>
  <div class="relative">
    <div class="inline-flex border border-[#DDDDDD] divide-x divide-gray-100">
      <div class="relative z-0 inline-flex divide-x divide-gray-100">
        <div
          :class="[
            'text-inherit relative inline-flex items-center bg-white border border-transparent',
            { 'pl-2 pr-3': size === 'sm' },
            { 'py-2 pl-3 pr-4': size === 'md' },
          ]"
        >
          <RiCheckLine
            :class="[{ 'h-4 w-4 text-sm': size === 'sm' }, { 'h-5 w-5 text-base': size === 'md' }]"
          />
          <p class="ml-2.5 font-medium leading-4 truncate">
            {{ selected.label }}
          </p>
        </div>
        <button
          type="button"
          class="relative inline-flex items-center bg-white p-2.5 text-sm font-medium text-white hover:bg-gray-100 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
          :class="[{ 'p-1': size === 'sm' }, { 'p-2': size === 'md' }]"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          @click="show = !show"
        >
          <RiArrowDownSLine :class="['text-cool-gray-700 h-5 w-5']" />
        </button>
      </div>
    </div>

    <transition
      enter-active-class=""
      enter-from-class=""
      enter-to-class=""
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-if="show"
        v-click-outside="() => (show = false)"
        class="absolute z-10 mt-2 w-72 shadow-lg bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[500px] overscroll-contain overflow-auto"
        :class="[
          { 'origin-top-left left-0': orientation === 'left' },
          { 'origin-top-right right-0': orientation === 'right' },
        ]"
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
          @click="option.key != modelValue ? handleSelected(option) : null"
        >
          <div class="flex flex-col">
            <div class="flex justify-between">
              <p
                :class="[
                  option.key == modelValue
                    ? 'font-semibold text-jva-blue-500'
                    : 'group-hover:font-semibold',
                ]"
              >
                {{ option.label }}
              </p>
              <span v-if="option.key == modelValue" class="text-jva-blue-500">
                <RiCheckLine class="h-5 w-5" />
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
export default defineNuxtComponent({
  emits: ['selected'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Boolean],
      default: '',
    },
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['sm', 'md'].includes(s),
    },
    orientation: {
      type: String,
      default: 'left',
      validator: (s) => ['left', 'right'].includes(s),
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    selected() {
      return this.options.find((option) => option.key == this.modelValue)
    },
  },
  methods: {
    handleSelected(option) {
      this.$emit('selected', option)
      this.show = false
    },
  },
})
</script>
