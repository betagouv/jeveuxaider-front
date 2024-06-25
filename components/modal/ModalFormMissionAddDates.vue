<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Ajouter une ou plusieurs dates"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <form id="form-mission-add-dates" @submit.prevent="handleSubmit" class="py-6 space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CustomOptionCard
              @click="mode = 'single'"
              :is-selected="mode === 'single'"
              title="Une seule date"
              description="Sélectionnez une date à la fois"
            />
            <CustomOptionCard
              @click="mode = 'multiple'"
              :is-selected="mode === 'multiple'"
              title="Plusieurs dates"
              description="Séléctionnez une période et les jours de la semaine souhaités"
            />
          </div>

          <template v-if="mode === 'single'">
            <DsfrFormControl label="Date" html-for="date" :error="errors.date" required>
              <DsfrInput type="date" v-model="form.date" name="date" />
            </DsfrFormControl>

            <DsfrFormControl
              label="Choisissez les créneaux pour cette date"
              html-for="creneaux"
              required
              :error="errors.slots"
            >
              <DsfrTagsGroup v-model="form.slots" name="slots" :options="$labels.slots" />
            </DsfrFormControl>
          </template>

          <template v-if="mode === 'multiple'">
            <!-- <DsfrFormControl label="Récurrence" html-for="recurring" :error="errors.recurring">
              <DsfrSelect
                id="recurring"
                name="recurring"
                v-model="recurring"
                placeholder="Sélectionner une récurrence"
                :options="[
                  { key: 'daily', label: 'Tous les jours' },
                  { key: 'weekly', label: 'Toutes les semaines' },
                ]"
              />
            </DsfrFormControl> -->
            <div class="grid grid-cols-2 gap-4">
              <DsfrFormControl
                label="À partir du"
                html-for="start_date"
                :error="errors.start_date"
                required
              >
                <DsfrInput type="date" v-model="form.start_date" name="start_date" />
              </DsfrFormControl>
              <DsfrFormControl
                label="Jusqu'au"
                html-for="end_date"
                :error="errors.end_date"
                required
              >
                <DsfrInput type="date" v-model="form.end_date" name="end_date" />
              </DsfrFormControl>
            </div>
            <DsfrFormControl
              label="Choisissez vos jours"
              html-for="days"
              required
              :error="errors.days"
            >
              <DsfrTagsGroup
                v-model="form.days"
                name="slots"
                :options="[
                  { key: 1, label: 'Lundi' },
                  { key: 2, label: 'Mardi' },
                  { key: 3, label: 'Mercredi' },
                  { key: 4, label: 'Jeudi' },
                  { key: 5, label: 'Vendredi' },
                  { key: 6, label: 'Samedi' },
                  { key: 0, label: 'Dimanche' },
                ]"
              />
            </DsfrFormControl>

            <DsfrFormControl
              label="Choisissez les créneaux pour cette date"
              html-for="creneaux"
              required
              :error="errors.slots"
            >
              <DsfrTagsGroup v-model="form.slots" name="slots" :options="$labels.slots" />
            </DsfrFormControl>
          </template>
        </form>

        <template #footer>
          <DsfrButton type="secondary" @click="$emit('cancel')"> Annuler </DsfrButton>
          <DsfrButton is-submit form="form-mission-add-dates"> Valider </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'
import { string, object, array, date, ref } from 'yup'

export default defineNuxtComponent({
  mixins: [FormErrors],
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        date: null,
        start_date: new Date().toISOString().split('T')[0],
        days: [],
        slots: [],
      },
      mode: 'single',
      recurring: 'daily',
    }
  },
  computed: {
    formSchema() {
      if (this.mode === 'single') {
        return object({
          date: string().required('La date est obligatoire'),
          slots: array()
            .min(1, 'Il faut sélectionner au moins un créneau.')
            .required('Les créneaux sont obligatoires'),
        })
      }
      if (this.mode === 'multiple') {
        return object({
          start_date: date().required('La date de début est obligatoire'),
          end_date: date()
            .required('La date de fin est obligatoire')
            .when('start_date', {
              is: (startDate) => startDate instanceof Date,
              then: (schema) =>
                schema
                  .min(ref('start_date'), 'La date de fin doit être supérieure à celle du début')
                  .max(
                    this.$dayjs(this.form.start_date).add(1, 'year').format('YYYY-MM-DD'),
                    "La date de fin ne doit pas être à plus d'une année d'écart"
                  ),
            }),
          days: array()
            .min(1, 'Il faut sélectionner au moins un jour.')
            .required('Les jours sont obligatoires'),
          slots: array()
            .min(1, 'Il faut sélectionner au moins un créneau.')
            .required('Les créneaux sont obligatoires'),
        })
      }
    },
  },
  methods: {
    getRecomputedDatas() {
      if (this.mode === 'single') {
        return {
          id: this.$dayjs(this.form.date).utc().format('YYYY-MM-DDTHH:mm:ssZ'),
          date: this.$dayjs(this.form.date).format('YYYY-MM-DDTHH:mm:ssZ'),
          slots: this.form.slots,
        }
      }
      if (this.mode === 'multiple') {
        let dates = []
        let start = this.$dayjs(this.form.start_date)
        const end = this.$dayjs(this.form.end_date)
        const days = this.form.days
        const slots = this.form.slots
        while (start.isBefore(end)) {
          if (days.includes(start.day())) {
            dates.push({
              id: start.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
              date: start.format('YYYY-MM-DDTHH:mm:ssZ'),
              slots: slots,
            })
          }
          start = start.add(1, 'day')
        }
        return dates
      }
    },
    handleSubmit() {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.$emit('submit', this.getRecomputedDatas())
          this.$emit('cancel')
        })
        .catch((errors) => {
          console.log('errors', errors)
          this.setErrors(errors)
        })
    },
  },
})
</script>
