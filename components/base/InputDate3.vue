<template>
  <input
    v-model="val"
    type="date"
    :required="required"
    class="appearance-none px-6 py-3 text-sm block w-full placeholder-gray-text-400 border border-gray-300 overflow-ellipsis"
    @blur="$emit('blur', $event.target.value)"
    @input="$emit('update:modelValue', $event.target.value)"
    inputmode="numeric"
  />
</template>

<script>
export default defineNuxtComponent({
  emits: ['update:modelValue', 'blur'],
  props: {
    modelValue: {
      type: [String, Date],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: '',
    }
  },
})
</script>
