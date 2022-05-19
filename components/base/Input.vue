<template>
  <div>
    <div class="flex items-center relative w-full">
      <div v-if="icon" class="absolute left-4">
        <component
          :is="icon"
          class="h-4 w-4 text-gray-400"
        />
      </div>
      <input
        :id="name"
        v-model="inputValue"
        :name="name"
        :type="typeValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        :min="typeValue == 'number' && min"
        :max="typeValue == 'number' && max"
        :required="required"
        :class="[
          ' text-sm appearance-none block w-full placeholder-gray-text-400 focus:outline-none border border-gray-200 focus:ring-jva-blue-500 focus:border-jva-blue-500 overflow-ellipsis',
          {'pr-8': suffix , 'pl-10': icon, 'bg-gray-100 cursor-not-allowed': disabled},
          {'!pr-3 !pl-4': ['date','datetime-local'].includes(typeValue), '!text-gray-400': ['date','datetime-local'].includes(typeValue) && !Boolean(inputValue)},
          {'hide-picker': hidePicker},
          {'bg-transparent': variant == 'transparent' && !value},
          {'bg-white': variant == 'transparent' && value},
          {'px-6 py-3 rounded-xl': variant != 'facet'},
          {'px-3 py-2 rounded-md': variant == 'facet'},
        ]"
        autocomplete="off"
        @blur="handleBlur"
      >
      <div v-if="type == 'password' && inputValue" class="absolute right-3">
        <EyeIcon
          v-if="typeValue == 'password'"
          class="h-5 text-gray-400 hover:gray-text-500 cursor-pointer"
          @click="typeValue = 'text'"
        />
        <EyeOffIcon
          v-if="typeValue == 'text'"
          class="h-5 text-gray-400 hover:gray-text-500 cursor-pointer"
          @click="typeValue = 'password'"
        />
      </div>
      <div v-if="clearable" class="absolute right-3">
        <XIcon
          v-if="clearable && inputValue"
          class="h-5 text-gray-400 hover:text-gray-500 cursor-pointer"
          @click="reset()"
        />
      </div>
      <div v-if="suffix" class="absolute" :class="type =='number' ? 'right-14' : 'right-3'">
        <div class="text-gray-400 text-sm">
          {{ suffix }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: [String, Number], default: null },
    placeholder: { type: String, default: null },
    maxlength: { type: [String, Number], default: null },
    suffix: { type: String, default: null },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    variant: { type: String, default: null }, // transparent, facet
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    min: { type: Number, default: 1 },
    max: { type: Number, default: null },
    required: { type: Boolean, default: false },
    hidePicker: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'text',
      validator: s =>
        ['text', 'email', 'password', 'date', 'number', 'datetime-local', 'tel'].includes(s)
    }
  },
  data () {
    return {
      typeValue: this.type
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    reset () {
      this.inputValue = ''
      this.$emit('input', null)
    },
    handleBlur () {
      if (this.inputValue !== null) {
        this.$emit('blur')
      }
    }
  }
}
</script>
