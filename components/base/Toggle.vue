<template>
  <div>
    <div class="flex items-start gap-4">
      <div
        class="flex items-start cursor-pointer"
        :class="[{ 'flex-row-reverse': position === 'right' }, { 'gap-4': label }, wrapperClass]"
        @click="onToggleSwitch"
      >
        <div :class="['flex flex-col w-[70px]', buttonWrapperClass]">
          <button
            type="button"
            class="relative inline-flex flex-shrink-0 border rounded-full transition-colors ease-in-out duration-200"
            :class="[
              modelValue ? 'bg-jva-blue-500 border-jva-blue-500' : 'bg-white  border-jva-blue-500',
              { 'h-6 w-10': size === 'md' },
              { 'h-6 w-10': size === 'lg' },
              { 'h-8 w-12': size === 'xl' },
            ]"
            role="switch"
          >
            <span
              aria-hidden="true"
              class="relative top-[-1px] left-[-1px] pointer-events-none inline-flex items-center justify-center bg-white border border-jva-blue-500 rounded-full transform ring-0 transition ease-in-out duration-200"
              :class="[
                modelValue ? 'translate-x-4' : 'translate-x-0',
                { 'h-6 w-6': size === 'md' },
                { 'h-6 w-6': size === 'lg' },
                { 'h-8 w-8': size === 'xl' },
              ]"
            >
              <RiCheckLine
                v-if="modelValue"
                class="text-jva-blue-500 fill-current leading-none"
                :class="[
                  { 'h-3': size === 'md' },
                  { 'h-3': size === 'lg' },
                  { 'h-5': size === 'xl' },
                ]"
              />
            </span>
          </button>
          <div :class="['text-jva-blue-500 text-xs leading-none mt-1.5 mx-0.5', buttonLabelClass]">
            {{ modelValue ? buttonLabels.on : buttonLabels.off }}
          </div>
        </div>

        <div class="flex-1 flex flex-col">
          <div
            v-if="label"
            class="block relative text-base text-gray-700"
            :class="[
              { 'text-base': size === 'md' },
              { 'text-base': size === 'lg' },
              { 'text-xl': size === 'xl' },
              labelClass,
            ]"
            v-html="label"
          />
        </div>
      </div>

      <slot name="right"></slot>
    </div>

    <div
      v-if="description"
      id="availability-description"
      class="mt-2 text-gray-600"
      :class="[
        { 'text-xs': size === 'md' },
        { 'text-xs': size === 'lg' },
        { 'text-base': size === 'xl' },
      ]"
      v-html="description"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue', 'checked', 'unchecked'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: 'left',
    },
    size: {
      type: String,
      default: 'lg',
    },
    labelClass: {
      type: String,
      default: null,
    },
    wrapperClass: {
      type: String,
      default: null,
    },
    buttonWrapperClass: {
      type: String,
      default: null,
    },
    buttonLabelClass: {
      type: String,
      default: null,
    },
    buttonLabels: {
      type: Object,
      default: () => {
        return { on: 'Activé', off: 'Désactivé' }
      },
    },
  },
  methods: {
    onToggleSwitch() {
      const newVal = !this.modelValue
      this.$emit('update:modelValue', newVal)
      if (newVal) {
        this.$emit('checked')
      } else {
        this.$emit('unchecked')
      }
    },
  },
})
</script>
