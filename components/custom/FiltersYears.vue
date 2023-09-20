<template>
  <div>
    <div class="flex gap-4">
      <BaseSelectAdvanced
        v-model="form.year"
        prefix-label="Année :"
        name="role"
        placeholder="Année"
        :options="[
          { key: 2022, label: 2022 },
          { key: 2021, label: 2021 },
          { key: 2020, label: 2020 },
        ]"
        @changed="generate"
      />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {},
  data() {
    return {
      loading: false,
      form: { ...this.$stores.statistics.params },
    }
  },
  computed: {},
  methods: {
    generate() {
      this.$stores.statistics.setParams({ ...this.form })
      this.$emit('refetch')
    },
  },
})
</script>
