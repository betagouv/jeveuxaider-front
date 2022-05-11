<template>
  <div>
    <div class="flex gap-4">
      <SelectAdvanced
        v-model="form.period"
        name="role"
        placeholder="Période"
        :options="$labels.statistics_period"
        @changed="generate"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {

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
