<template>
  <div>
    <div class="flex gap-4">
      <DsfrButton icon="RiFilterLine" type="secondary" @click="showFilters = true"
        >Filtrer</DsfrButton
      >
      <ModalStatisticsFilters
        v-if="showFilters"
        :filters="filters"
        :is-open="showFilters"
        @cancel="showFilters = false"
        @submitted="onFiltersSubmitted"
      />
    </div>
  </div>
</template>

<script>
import ModalStatisticsFilters from '@/components/modal/ModalStatisticsFilters.vue'

export default defineNuxtComponent({
  components: {
    ModalStatisticsFilters,
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
      showFilters: false,
      form: { ...this.$route.query },
    }
  },
  methods: {
    onFiltersSubmitted(payload) {
      console.log('onFiltersSubmitted', payload)
      this.showFilters = false
      this.$router.push({
        path: this.$route.path,
        query: {
          ...payload,
        },
      })
      this.$emit('refetch')
    },
    // onChangedDaterange(payload) {
    //   this.form = { ...this.form, ...payload }
    //   this.$stores.statistics.setParams({ ...this.form })
    //   this.$emit('refetch')
    // },
    // onChanged() {
    //   this.$stores.statistics.setParams({ ...this.form })
    //   this.$emit('refetch')
    // },
  },
})
</script>
