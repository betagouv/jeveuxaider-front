<template>
  <div>
    <div class="flex gap-4">
      <BaseCombobox
        v-if="filters.includes('department') && !['referent'].includes($stores.auth.contextRole)"
        v-model="form.department"
        name="department"
        placeholder="Tous les départements"
        :options="
          $labels.departments.map((option) => {
            return { key: option.key, label: `${option.key} - ${option.label}` }
          })
        "
        @update:modelValue="onChanged"
      />
      <DaterangePicker v-if="filters.includes('daterange')" @changed="onChangedDaterange" />
    </div>
  </div>
</template>

<script>
import DaterangePicker from '@/components/custom/DaterangePicker.vue'

export default defineNuxtComponent({
  components: {
    DaterangePicker,
  },
  props: {
    filters: {
      type: Array,
      default: () => {
        return ['department', 'daterange']
      },
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.$stores.statistics.params },
    }
  },
  methods: {
    onChangedDaterange(payload) {
      this.form = { ...this.form, ...payload }
      this.$stores.statistics.setParams({ ...this.form })
      this.$emit('refetch')
    },
    onChanged() {
      this.$stores.statistics.setParams({ ...this.form })
      this.$emit('refetch')
    },
  },
})
</script>
