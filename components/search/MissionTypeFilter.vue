<template>
  <RadioGroup v-model="value" :options="options" @input="handleClickTab" />
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  props: {},
  data () {
    return {
      options: [
        { key: 'Mission en présentiel', label: 'Près de chez moi' },
        { key: 'Mission à distance', label: 'Depuis chez moi' }
      ],
      value: this.$route?.query?.type ?? 'Mission en présentiel'
    }
  },
  methods: {
    handleClickTab (payload) {
      if (payload == 'Mission à distance') {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, type: payload, page: undefined, city: undefined, aroundLatLng: undefined, department_name: undefined, is_autonomy: undefined }
        })
      } else {
        this.addFilter('type', payload)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
