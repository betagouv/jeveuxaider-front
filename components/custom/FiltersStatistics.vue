<template>
  <div>
    <div class="flex gap-4">
      <SelectAdvanced
        v-model="form.period"
        name="role"
        placeholder="Période"
        :options="[
          {key : 'current_year', label: 'Cette année'},
          {key : 'last_year', label: 'L\'année dernière'},
          {key : 'current_month', label: 'Ce mois-ci'},
          {key : 'last_month', label: 'Le mois dernier'},
          {key : 'all', label: 'Depuis le début'},
        ]"
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
