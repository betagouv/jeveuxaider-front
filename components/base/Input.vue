<template>
  <div class="space-y-1 relative">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="labelSuffix" class="text-xs text-gray-400">{{
        labelSuffix
      }}</span>
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="flex items-center relative w-full">
        <input
          :id="name"
          v-model="inputValue"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          class="
            px-1
            py-2
            appearance-none
            rounded-md
            block
            w-full

            placeholder-gray-400
               focus:outline-none
            border border-gray-300
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            text-sm
          "
          :class=" [{ 'border-red-500': error, 'pr-8': suffix }]"
          autocomplete="off"
        >
        <!-- <div v-if="togglePassword && value" class="absolute right-3">
          <EyeIcon
            v-if="state.type == 'password'"
            class="h-5 text-gray-400 cursor-pointer"
            @click="state.type = 'text'"
          />
          <EyeOffIcon
            v-if="state.type == 'text'"
            class="h-5 text-gray-400 cursor-pointer"
            @click="state.type = 'password'"
          />
        </div> -->
        <div v-if="suffix" class="absolute right-3">
          <div class="text-gray-400 text-sm">
            {{ suffix }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="description" class="text-xs text-gray-400">
      {{ description }}
    </div>
    <div v-if="error" class="text-xs text-red-500 absolute">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: { type: String, default: null },
    suffix: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    name: { type: String, required: true },

    error: { type: String, default: null },
    description: { type: String, default: null },
    clearable: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'text',
      validator: s =>
        ['text', 'email', 'password', 'date', 'number'].includes(s)
    }
  },
  data () {
    return {}
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
    handleChange (e) {
      console.log('handleChange', e)
    }
  }
}
</script>

<style></style>
