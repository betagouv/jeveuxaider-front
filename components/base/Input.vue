<template>
  <div class="relative">
    <label v-if="label" :for="name" class="block text-xs uppercase font-bold text-jva-gray-text-dark">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="text-jva-blue-light">{{
        labelSuffix
      }}</span>
    </label>
    <div v-if="description" class="text-xs text-jva-gray-text-light mt-2">
      {{ description }}
    </div>
    <div class="mt-2">
      <div class="flex items-center relative w-full">
        <input
          :id="name"
          v-model="inputValue"
          :name="name"
          :type="typeValue"
          :placeholder="placeholder"
          class="
            px-6
            py-3
            text-sm
            appearance-none
            rounded-xl
            block
            w-full
            placeholder-jva-gray-text-lightest
            focus:outline-none
            border border-jva-gray-border
            focus:ring-jva-blue-primary focus:border-jva-blue-primary
          "
          :class=" [{ 'border-jva-red-primary': error, 'pr-8': suffix }]"
          autocomplete="new-password"
        >
        <div v-if="type == 'password' && inputValue" class="absolute right-3">
          <EyeIcon
            v-if="typeValue == 'password'"
            class="h-5 text-jva-gray-text-lighter hover:text-jva-gray-text-light cursor-pointer"
            @click="typeValue = 'text'"
          />
          <EyeOffIcon
            v-if="typeValue == 'text'"
            class="h-5 text-jva-gray-text-lighter hover:text-jva-gray-text-light cursor-pointer"
            @click="typeValue = 'password'"
          />
        </div>
        <div v-if="suffix" class="absolute right-3">
          <div class="text-jva-gray-text-lighter text-sm">
            {{ suffix }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="text-xs text-red-500 absolute">
      {{ error }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: String, default: null },
    placeholder: { type: String, default: null },
    suffix: { type: String, default: null },
    label: { type: String, default: null },
    labelSuffix: { type: String, default: null },
    name: { type: String, required: true },
    error: { type: String, default: null },
    description: { type: String, default: null },
    clearable: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'text',
      validator: s =>
        ['text', 'email', 'password', 'date', 'number'].includes(s)
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
  }
}
</script>

<style></style>
