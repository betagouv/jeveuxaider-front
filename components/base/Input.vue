<template>
  <div class="relative">
    <label v-if="label" class="block text-xs uppercase font-bold text-jva-gray-text-dark">
      {{ label }}
      <span v-if="required" class="text-[#E2011C]">
        *
      </span>
      <span v-if="labelSuffix" class="text-jva-blue-light">{{
        labelSuffix
      }}</span>
    </label>
    <div class="mt-2">
      <div class="flex items-center relative w-full">
        <input
          :id="name"
          v-model="inputValue"
          :name="name"
          :type="type"
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
    required: { type: Boolean, default: false },
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
  }
}
</script>

<style></style>
