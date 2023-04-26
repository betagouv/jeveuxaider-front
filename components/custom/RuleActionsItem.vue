<template>
  <div class="flex gap-4 items-center">
    <FormControl
      html-for="field"
    >
      <SelectAdvanced
        v-model="form.action"
        placeholder="Champ"
        name="field"
        :options="fields"
        @input="onInput"
      />
    </FormControl>
    <FormControl
      html-for="value"
    >
      <Input
        v-model="form.value"
        placeholder="Valeur"
        name="value"
        @input="onInput"
      />
    </FormControl>
    <XIcon class="flex-none hover:text-red-600 h-4 w-4 cursor-pointer" @click="onRemove" />
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    action: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: { ...this.action }
    }
  },
  methods: {
    onRemove () {
      this.$emit('remove', this.form)
    },
    onInput () {
      this.$emit('update', this.form)
    }
  }
}
</script>
