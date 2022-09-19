<template>
  <div>
    <div class="flex gap-4">
      <Combobox
        v-if="filters.includes('department')"
        v-model="form.department"
        name="department"
        placeholder="Tous les départements"
        :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
        @input="onChanged"
      />
      <DaterangePicker
        v-if="filters.includes('daterange')"
        @changed="onChangedDaterange"
      />
    </div>
  </div>
</template>

<script>
import DaterangePicker from '@/components/custom/DaterangePicker.vue'

export default {
  components: {
    DaterangePicker
  },
  props: {
    filters: {
      type: Array,
      default: () => {
        return ['department', 'daterange']
      }
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.$store.state.statistics.params }
    }
  },
  methods: {
    onChangedDaterange (payload) {
      this.$store.commit('statistics/setParams', { ...payload })
      this.$emit('refetch')
    },
    onChanged () {
      this.$store.commit('statistics/setParams', { ...this.form })
      this.$emit('refetch')
    }
  }
}
</script>
