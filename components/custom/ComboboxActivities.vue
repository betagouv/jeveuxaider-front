<template>
  <BaseCombobox
    ref="combobox"
    :modelValue="modelValue"
    :name="name"
    placeholder="Sélectionner une activité"
    :options="options"
    clearable
    attribute-key="id"
    attribute-label="name"
    :disabled="disabled"
    :loading="loading"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template
      v-if="activitiesClassifier?.code === 200"
      #option="{ item, attributeLabel, selectedOption, highlightIndex, index }"
    >
      <div class="w-full flex justify-between">
        <div>{{ item[attributeLabel] }}</div>
        <DsfrTag
          size="sm"
          class="ml-2 !transition-none"
          :class="[
            {
              '!bg-jva-blue-500 !text-white':
                selectedOption?.id === item.id || highlightIndex == index,
            },
            {
              'text-[#161616] bg-[#EEEEEE] group-hover:bg-jva-blue-500 group-hover:text-white':
                selectedOption?.id !== item.id,
            },
          ]"
          :custom-theme="true"
        >
          {{ item.formattedScore }}
        </DsfrTag>
      </div>
    </template>
  </BaseCombobox>
</template>

<script>
export default defineNuxtComponent({
  props: {
    modelValue: { type: [String, Number], default: null },
    name: { type: String, default: 'activity_id' },
    options: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    activitiesClassifier: { type: Object, default: null },
  },
})
</script>
