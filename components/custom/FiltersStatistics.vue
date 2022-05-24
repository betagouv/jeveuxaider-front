<template>
  <div>
    <div class="flex gap-4">
      <SelectAdvanced
        v-if="!noPeriod"
        v-model="form.period"
        prefix-label="Période :"
        name="role"
        placeholder="Période"
        :options="$labels.statistics_period"
        @changed="generate"
      />
      <Combobox
        v-model="form.department"
        name="department"
        placeholder="Tous les départements"
        :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
        @input="generate"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    noPeriod: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.$store.state.statistics.params }
    }
  },
  computed: {

  },
  methods: {
    generate () {
      this.$store.commit('statistics/setParams', { ...this.form })
      this.$emit('refetch')
    }
  }
}
</script>
