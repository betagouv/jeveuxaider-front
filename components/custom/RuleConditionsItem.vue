<template>
  <div class="flex gap-4 items-center">
    <div v-if="!isFirst" class="text-gray-500">
      {{ form.type }}
    </div>
    <FormControl
      html-for="field"
    >
      <SelectAdvanced
        v-model="form.field"
        placeholder="Champ"
        name="field"
        :options="fields"
        @input="onInput"
      />
    </FormControl>
    <FormControl
      html-for="operand"
      class="max-w-[110px]"
    >
      <SelectAdvanced
        v-model="form.operand"
        name="operand"
        :options="[
          {key: '=', label: '='},
          {key: '!=', label: '!='},
          {key: 'in', label: 'in'},
          {key: 'not in', label: 'not in'}
        ]"
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
    condition: {
      type: Object,
      default: null
    },
    isFirst: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: { ...this.condition }
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
