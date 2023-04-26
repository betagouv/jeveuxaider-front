<template>
  <div class="flex flex-col space-y-4">
    <FormControl
      v-for="(field, index) in schema"
      :key="index"
      :label="field.label"
      :html-for="field.key"
    >
      <component
        :is="component(field.type)"
        v-model="form[field.key]"
        :placeholder="field.placeholder"
        :name="field.key"
        @input="onInput"
      />
    </FormControl>
    <div class="flex justify-end">
      <Button variant="red" size="sm" icon="TrashIcon" @click.native="onRemove">
        Supprimer
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schema: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: { ...this.item }
    }
  },
  methods: {
    onRemove () {
      this.$emit('remove', this.form)
    },
    onInput () {
      this.$emit('update', this.form)
    },
    onAutocompleteChange (payload) {
      this.$emit('update', payload)
    },
    component (fieldType) {
      let component
      switch (fieldType) {
        case 'text':
          component = 'Input'
          break
        case 'textarea':
          component = 'TexteArea'
          break
        case 'richtext':
          component = 'RichEditor'
          break
      }
      return component
    }
  }
}
</script>
