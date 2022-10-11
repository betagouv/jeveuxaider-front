<template>
  <div>
    <div class="flex gap-4">
      <SelectAdvanced
        v-model="form.year"
        prefix-label="Année :"
        name="role"
        placeholder="Année"
        :options="[
          {'key': 2022,'label': 2022},
          {'key': 2021,'label': 2021},
          {'key': 2020,'label': 2020},
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
