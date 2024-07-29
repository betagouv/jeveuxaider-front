<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Filtres de recherche"
        :prevent-click-outside="true"
        container-class="overflow-visible"
        @close="$emit('cancel')"
      >
        <form id="form-filters" @submit.prevent="handleSubmit" class="py-6 flex flex-col gap-6">
          <div v-if="filters.includes('daterange')">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DsfrFormControl label="À partir du" html-for="start_date" :error="errors.start_date">
                <DsfrInput type="date" v-model="form.start_date" name="start_date" />
              </DsfrFormControl>
              <DsfrFormControl label="Jusqu'au" html-for="end_date" :error="errors.end_date">
                <DsfrInput
                  type="date"
                  v-model="form.end_date"
                  name="end_date"
                  @change="validate('end_date')"
                />
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

          <DsfrFormControl
            v-if="filters.includes('reseau')"
            label="Réseau"
            html-for="reseau"
            :error="errors.reseau"
          >
            <DsfrInputAutocomplete
              icon="RiSearchLine"
              name="reseau"
              placeholder="Recherche par mots clés..."
              :options="autocompleteOptionsReseaux"
              option-key-attribute="id"
              option-label-attribute="name"
              :show-key-in-options="true"
              :reset-value-on-select="true"
              :min-value-length="3"
              @selected="handleSelectedReseau"
              @fetch-suggestions="onFetchSuggestionsReseaux($event)"
            />
            <div v-if="form.reseau" class="mt-4">
              <DsfrTag
                as="button"
                size="md"
                context="deletable"
                :is-active="!!form.reseau"
                @click.native="
                  () => {
                    form.reseau = null
                    form.reseau_name = null
                  }
                "
              >
                {{ form.reseau }} - {{ form.reseau_name }}
              </DsfrTag>
            </div>
          </DsfrFormControl>

          <DsfrFormControl
            v-if="filters.includes('structure')"
            label="Organisation"
            html-for="structure"
            :error="errors.structure"
          >
            <DsfrInputAutocomplete
              icon="RiSearchLine"
              name="structure"
              placeholder="Recherche par mots clés..."
              :options="autocompleteOptionsOrganisations"
              option-key-attribute="id"
              option-label-attribute="name"
              :show-key-in-options="true"
              :reset-value-on-select="true"
              :min-value-length="3"
              @selected="handleSelectedOrganisation"
              @fetch-suggestions="onFetchSuggestionsOrganisations($event)"
            />
            <div v-if="form.structure" class="mt-4">
              <DsfrTag
                as="button"
                size="md"
                context="deletable"
                :is-active="!!form.structure"
                @click.native="
                  () => {
                    form.structure = null
                    form.structure_name = null
                  }
                "
              >
                {{ form.structure }} - {{ form.structure_name }}
              </DsfrTag>
            </div>
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
import MixinSuggestionsFilters from '@/mixins/suggestions-filters'

export default defineNuxtComponent({
  emits: ['submitted', 'cancel'],
  mixins: [FormErrors, MixinSuggestionsFilters],
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
        reseau: this.$route.query['reseau'] || null,
        reseau_name: this.$route.query['reseau_name'] || null,
        structure: this.$route.query['structure'] || null,
        structure_name: this.$route.query['structure_name'] || null,
      },
      formSchema: object().shape({
        start_date: date()
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
        end_date: date()
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
          .when(['start_date'], {
            is: (startDate) => !!startDate,
            then: (schema) => schema.required(),
          }),
      }),
      datePrefilters: [
        { key: 'last_12_months', label: 'Les 12 derniers mois' },
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
        case 'last_12_months':
          this.form.start_date = this.$dayjs().subtract(12, 'month').format('YYYY-MM-DD')
          this.form.end_date = this.$dayjs().format('YYYY-MM-DD')
          break
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
    handleSelectedReseau(selected) {
      this.form.reseau = selected.id
      this.form.reseau_name = selected.name
    },
    handleSelectedOrganisation(selected) {
      this.form.structure = selected.id
      this.form.structure_name = selected.name
    },
  },
})
</script>
