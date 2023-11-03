<template>
  <div class="flex flex-col space-y-4">
    <BaseFormControl
      v-for="(field, index) in schema"
      :key="index"
      :label="field.label"
      :html-for="field.key"
    >
      <template v-if="field.type === 'richtext'">
        <BaseRichEditor
          v-model="form[field.key]"
          :placeholder="field.placeholder"
          :name="field.key"
          @update:modelValue="onInput"
        />
      </template>

      <template v-if="field.type === 'text'">
        <BaseInput
          v-model="form[field.key]"
          :placeholder="field.placeholder"
          :name="field.key"
          @update:modelValue="onInput"
        />
      </template>
      <template v-if="field.type === 'select'">
        <BaseSelectAdvanced
          v-model="form[field.key]"
          :placeholder="field.placeholder"
          :options="field.options"
          :name="field.key"
          @update:modelValue="onInput"
        />
      </template>
      <template v-if="field.type === 'textarea'">
        <BaseTextarea
          v-model="form[field.key]"
          :placeholder="field.placeholder"
          :name="field.key"
          @update:modelValue="onInput"
        />
      </template>
    </BaseFormControl>
    <div class="flex justify-end">
      <BaseButton variant="red" size="sm" icon="RiDeleteBinLine" @click.native="onRemove">
        Supprimer
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    schema: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: { ...this.item },
    }
  },
  methods: {
    onRemove() {
      this.$emit('remove', this.form)
    },
    onInput() {
      this.$emit('update', this.form)
    },
    onAutocompleteChange(payload) {
      this.$emit('update', payload)
    },
  },
})
</script>
