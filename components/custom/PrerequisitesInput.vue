<template>
  <div class="space-y-2">
    <BaseInput
      v-for="n in 3"
      :key="n"
      v-model="value[n - 1]"
      name="prerequisites"
      maxlength="100"
      :placeholder="placeholders[n - 1] || '…'"
      @update:modelValue="onPrerequisitesInput"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    initialValue: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      value: this.initialValue || [undefined, undefined, undefined],
      placeholders: [
        'ex : Parler anglais couramment',
        'ex : Avoir le permis de conduire',
        'ex : Avoir plus de 18 ans',
      ],
    }
  },
  methods: {
    onPrerequisitesInput(value) {
      const normalizedValue = this.value.filter((v) => v)
      this.$emit('update', normalizedValue.length ? normalizedValue : null)
    },
  },
})
</script>
