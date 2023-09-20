<template>
  <BaseRadioGroup v-model="value" :options="options" @update:modelValue="handleClickTab" />
</template>

<script>
export default defineNuxtComponent({
  setup() {
    const { addFilter } = useAlgoliaMissionsQueryBuilder()
    return {
      addFilter,
    }
  },
  data() {
    return {
      options: [
        { key: 'Mission en présentiel', label: 'Près de chez moi' },
        { key: 'Mission à distance', label: 'Depuis chez moi' },
      ],
      value: this.$route?.query?.type ?? 'Mission en présentiel',
    }
  },
  watch: {
    '$route.query.type'(newVal) {
      if (!newVal) {
        this.value = 'Mission en présentiel'
      } else {
        this.value = newVal
      }
    },
  },
  methods: {
    handleClickTab(payload) {
      if (payload == 'Mission à distance') {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            type: payload,
            page: undefined,
            city: undefined,
            aroundLatLng: undefined,
            department_name: undefined,
            is_autonomy: undefined,
          },
        })
      } else {
        this.addFilter('type', payload)
      }
    },
  },
})
</script>
