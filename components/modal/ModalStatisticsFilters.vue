<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Filtres de recherche"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <form id="form-filters" @submit.prevent="handleSubmit" class="py-6 flex flex-col gap-6">
          <div v-if="filters.includes('daterange')">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DsfrFormControl label="À partir du" html-for="start_date" :error="errors.start_date">
                <DsfrInput type="date" v-model="form.start_date" name="start_date" />
              </DsfrFormControl>
              <DsfrFormControl label="Jusqu'au" html-for="end_date" :error="errors.end_date">
                <DsfrInput type="date" v-model="form.end_date" name="end_date" />
              </DsfrFormControl>
            </div>
            <div class="flex flex-wrap gap-2 mt-4">
              <DsfrTag
                v-for="(datePrefilter, i) in datePrefilters"
                :key="i"
                size="sm"
                class="py-1 cursor-pointer text-gray-600 hover:text-jva-blue-500"
                @click="onPrefiltersDatesClick(datePrefilter.key)"
              >
                {{ datePrefilter.label }}
              </DsfrTag>
            </div>
          </div>

          <DsfrFormControl
            v-if="filters.includes('department')"
            label="Département"
            html-for="department"
            :error="errors.department"
          >
            <DsfrSelect
              required
              id="department"
              name="department"
              v-model="form.department"
              placeholder="Sélectionner un département"
              :options="
                $labels.departments.map((option) => {
                  return { key: option.key, label: `${option.key} - ${option.label}` }
                })
              "
            />
          </DsfrFormControl>
        </form>

        <template #footer>
          <DsfrButton type="secondary" @click="$emit('cancel')"> Annuler </DsfrButton>
          <DsfrButton is-submit form="form-filters"> Rechercher </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'
import { string, object, array, date, ref } from 'yup'

export default defineNuxtComponent({
  emits: ['submitted', 'cancel'],
  mixins: [FormErrors],
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Array,
      default: () => {
        return ['department', 'daterange']
      },
    },
  },
  data() {
    return {
      form: {
        department: this.$route.query['department'] || null,
        start_date: this.$route.query['start_date'] || null,
        end_date: this.$route.query['end_date'] || null,
      },
      formSchema: object().shape({
        start_date: date().nullable(),
        end_date: date().nullable(),
      }),
      datePrefilters: [
        { key: 'current_year', label: 'Cette année' },
        { key: 'last_year', label: "L'année dernière" },
        { key: 'current_month', label: 'Ce mois-ci' },
        { key: 'last_month', label: 'Le mois dernier' },
        { key: 'current_week', label: 'Cette semaine' },
        { key: 'last_week', label: 'La semaine dernière' },
        { key: 'all', label: 'Depuis le début' },
      ],
    }
  },
  computed: {},
  methods: {
    onPrefiltersDatesClick(filter) {
      switch (filter) {
        case 'current_year':
          this.form.start_date = this.$dayjs().startOf('year').format('YYYY-MM-DD')
          this.form.end_date = this.$dayjs().format('YYYY-MM-DD')
          break
        case 'last_year':
          this.form.start_date = this.$dayjs()
            .subtract(1, 'year')
            .startOf('year')
            .format('YYYY-MM-DD')
          this.form.end_date = this.$dayjs().startOf('year').subtract(1, 'day').format('YYYY-MM-DD')
          break
        case 'current_month':
          this.form.start_date = this.$dayjs().startOf('month').format('YYYY-MM-DD')
          this.form.end_date = this.$dayjs().format('YYYY-MM-DD')
          break
        case 'last_month':
          this.form.start_date = this.$dayjs()
            .subtract(1, 'month')
            .startOf('month')
            .format('YYYY-MM-DD')
          this.form.end_date = this.$dayjs()
            .startOf('month')
            .subtract(1, 'day')
            .format('YYYY-MM-DD')
          break
        case 'current_week':
          this.form.start_date = this.$dayjs().startOf('week').format('YYYY-MM-DD')
          this.form.end_date = this.$dayjs().format('YYYY-MM-DD')
          break
        case 'last_week':
          this.form.start_date = this.$dayjs()
            .subtract(1, 'week')
            .startOf('week')
            .format('YYYY-MM-DD')
          this.form.end_date = this.$dayjs().startOf('week').subtract(1, 'day').format('YYYY-MM-DD')
          break
        case 'all':
          this.form.start_date = '2020-01-01'
          this.form.end_date = this.$dayjs().format('YYYY-MM-DD')
          break
      }
    },
    handleSubmit() {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.$emit('submitted', this.form)
        })
        .catch((errors) => {
          console.log('errors', errors)
          this.setErrors(errors)
        })
    },
  },
})
</script>
