<template>
  <div>
    <div class="flex gap-4">
      <!-- <BaseCombobox
        v-if="filters.includes('department') && ['admin'].includes($stores.auth.contextRole)"
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
      <DaterangePicker v-if="filters.includes('daterange')" @changed="onChangedDaterange" /> -->
      <DsfrButton icon="RiFilterLine" type="secondary" @click="showFilters = true"
        >Filtrer</DsfrButton
      >
      <ModalStatisticsFilters
        v-if="showFilters"
        :is-open="showFilters"
        @cancel="showFilters = false"
        @submitted="onFiltersSubmitted"
      />
    </div>
  </div>
</template>

<script>
import DaterangePicker from '@/components/custom/DaterangePicker.vue'
import ModalStatisticsFilters from '@/components/modal/ModalStatisticsFilters.vue'

export default defineNuxtComponent({
  components: {
    DaterangePicker,
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
      form: { ...this.$stores.statistics.params },
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
