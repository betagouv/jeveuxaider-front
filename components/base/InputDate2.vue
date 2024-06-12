<template>
  <input
    v-model="val"
    v-maska
    :data-maska="mask"
    data-maska-eager
    :placeholder="placeholder"
    type="text"
    inputmode="numeric"
    :pattern="pattern"
    :required="required"
    class="px-6 py-3 text-sm block w-full placeholder-gray-text-400 border border-gray-300 overflow-ellipsis"
    @blur="$emit('blur', $event.target.value)"
    @maska="onMaska"
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
    dateFormat: {
      type: String,
      default: 'DD/MM/YYYY',
    },
    mask: {
      type: String,
      default: '##/##/####',
    },
    placeholder: {
      type: String,
      default: 'jj/mm/aaaa',
    },
    pattern: {
      type: String,
      default: '\d{2}/\d{2}/\d{4}',
    },
  },
  data() {
    return {
      val: '',
    }
  },
  methods: {
    onMaska(event) {
      const date = this.$dayjs(event.detail.masked, this.dateFormat, true)
      date.isValid()
        ? this.$emit('update:modelValue', date.toDate())
        : this.$emit('update:modelValue', event.detail.masked)
    },
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.val = newVal instanceof Date ? newVal.toLocaleDateString('fr') : newVal
      },
      immediate: true,
    },
  },
})
</script>
