<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[22px] lg:text-[28px] font-bold leading-9 mb-6 lg:mb-10">
        Quel type d’engagement attendez-vous ?
      </h2>
      <CustomTips v-if="$stores.formMission.isStepDatesWarning" variant="warning" class="mb-10">
        <p>La mission n'a plus de date disponible. Vous pouvez :</p>
        <ul class="list-disc mt-2 pl-5">
          <li>Ajouter de nouvelles dates</li>
          <li>Modifier la date de fin de la mission</li>
          <li v-if="form.state === 'Validée'">Terminer la mission</li>
        </ul>
      </CustomTips>

      <div class="space-y-10">
        <DsfrFormControl
          label="Le bénévole s’engage de manière :"
          html-for="date_type"
          :error="errors.date_type"
          required
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CustomOptionCard
              @click="onPonctualClick"
              :is-selected="form.date_type === 'ponctual'"
              title="Ponctuelle"
              subtitle="Une activité courte ou un événement particulier"
              description="Ex : 2 jours les 4 et 5 mai, 2 heures le 9 août, 3 demi-journées en juin, etc."
            />
            <CustomOptionCard
              @click="onRecurringClick"
              :is-selected="form.date_type === 'recurring'"
              title="Régulière"
              subtitle="Un engagement dans la durée (plusieurs mois)"
              description=" Ex : 2 heures par semaine, 1 jour par mois pendant 6 mois etc."
            />
          </div>
        </DsfrFormControl>

        <DsfrFormControl
          v-if="form.date_type === 'ponctual'"
          label="Durée de l’engagement"
          html-for="commitment__duration"
          :error="errors.commitment__duration"
          required
        >
          <DsfrSelect
            required
            id="commitment__duration"
            name="commitment__duration"
            v-model="form.commitment__duration"
            placeholder="Sélectionner une durée"
            :options="$labels.duration"
          />
        </DsfrFormControl>

        <div v-if="form.date_type === 'recurring'" class="space-y-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DsfrFormControl
              label="Fréquence d’engagement"
              html-for="commitment__duration"
              :error="errors.commitment__duration"
              required
            >
              <DsfrSelect
                required
                id="commitment__duration"
                name="commitment__duration"
                v-model="form.commitment__duration"
                placeholder="Sélectionner une durée"
                :options="$labels.duration"
                @input="validate('commitment__duration')"
              />
            </DsfrFormControl>
            <DsfrFormControl
              label=""
              html-for="commitment__time_period"
              :error="errors.commitment__time_period"
              class="lg:mt-6"
            >
              <DsfrSelect
                required
                id="commitment__time_period"
                name="commitment__time_period"
                v-model="form.commitment__time_period"
                placeholder="Sélectionner une fréquence"
                :options="[
                  { key: 'week', label: 'par semaine' },
                  { key: 'month', label: 'par mois' },
                ]"
                @input="validate('commitment__time_period')"
              />
            </DsfrFormControl>
          </div>
          <DsfrFormControl
            label="Durée d’engagement minimum"
            html-for="commitment__duration_min"
            :error="errors.commitment__duration_min"
            required
          >
            <DsfrSelect
              required
              id="commitment__duration_min"
              name="commitment__duration_min"
              v-model="form.commitment__duration_min"
              placeholder="Sélectionner une durée"
              :options="$labels.commitment_duration_min"
              @input="validate('commitment__duration_min')"
            />
          </DsfrFormControl>
        </div>

        <template v-if="form.date_type">
          <template v-if="form.date_type === 'ponctual'">
            <CustomTips>
              <p class="mb-2">
                Vous voulez gagner du temps et obtenir plus de proposition d’aide de la part des
                bénévoles ? <strong>Précisez la date de votre mission ! </strong>
              </p>
              <p class="">
                Vous permettrez aux bénévoles d’indiquez leurs disponibilités et de s’organiser en
                conséquence !
              </p>
            </CustomTips>

            <DsfrFormControl
              label="Quand la mission se déroule-t-elle ?"
              html-for="with_dates"
              :error="errors.with_dates"
              required
            >
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomOptionCard
                  :is-selected="form.with_dates === 'yes'"
                  title="Sur des jours définis"
                  description="Ex : tous les premiers mercredis du mois, tous les mardis et jeudis, etc."
                  @click="form.with_dates = 'yes'"
                />
                <CustomOptionCard
                  :is-selected="form.with_dates === 'no'"
                  title="C’est à définir"
                  description="Vous ne savez pas encore quand la mission aura lieu, ou bien c’est à adapter aux disponibilités du bénévole."
                  @click="form.with_dates = 'no'"
                />
              </div>
            </DsfrFormControl>
          </template>

          <template v-if="form.with_dates === 'yes'">
            <div class="flex justify-between items-center border-b py-4">
              <div class="font-bold text-xl">
                <template v-if="formNextDates"> Dates</template>
                <template v-else> Aucune date à venir</template>
              </div>
              <DsfrButton size="sm" type="secondary" @click="showModalAddDates = true"
                >Ajouter des dates</DsfrButton
              >
            </div>
            <template v-if="formNextDates.length === 0">
              <div class="text-center text-gray-500">
                <p v-if="form.dates?.length > 0">
                  {{ $filters.pluralize(formPreviousDates.length, 'date passée', 'dates passées') }}
                </p>
                <p>Aucune date à venir</p>
              </div>
            </template>
            <template v-else>
              <div class="mt-6 grid grid-cols-1 gap-4">
                <div
                  class="flex justify-between items-center"
                  v-for="date in formNextDates"
                  :key="date.id"
                >
                  <div>
                    <div class="first-letter:uppercase">
                      {{ $dayjs(date.id).format('dddd D MMMM YYYY') }}
                    </div>
                    <div class="text-sm text-gray-500 font-medium">
                      {{ date.slots.map((slot) => $filters.label(slot, 'slots')).join(', ') }}
                    </div>
                  </div>
                  <DsfrButton
                    icon-only
                    size="xs"
                    type="tertiary"
                    icon="RiDeleteBinLine"
                    icon-class="text-[#CE0500]"
                    @click="onRemovedDate(date)"
                  />
                </div>
              </div>
            </template>
          </template>

          <template v-if="form.with_dates === 'no'">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DsfrFormControl
                label="Date de début"
                html-for="start_date"
                :error="errors.start_date"
                required
              >
                <DsfrInput type="date" v-model="form.start_date" name="start_date" />
              </DsfrFormControl>
              <DsfrFormControl label="Date de fin" html-for="end_date" :error="errors.end_date">
                <DsfrInput type="date" v-model="form.end_date" name="end_date" />
              </DsfrFormControl>
            </div>
          </template>
          <DsfrFormControl
            label="Précisez les créneaux horaires"
            html-for="recurrent_description"
            :error="errors.recurrent_description"
            v-if="form.date_type === 'recurring'"
          >
            <template #description>
              <div class="text-xs text-[#666666]">
                Vous pouvez préciser des horaires, les jours obligatoires, etc.
              </div>
            </template>
            <DsfrInput
              v-model="form.recurrent_description"
              name="recurrent_description"
              placeholder="Exemple : de 11h à 13h, 1 jour à choisir entre le lundi et le mardi, etc."
            />
          </DsfrFormControl>
        </template>
      </div>

      <ModalFormMissionAddDates
        v-if="showModalAddDates"
        :is-open="showModalAddDates"
        @cancel="showModalAddDates = false"
        @submit="onAddDatesSubmitted"
      />
    </div>
    <template #footer>
      <DsfrButton :loading="loading" :disabled="!isFormDirty" @click="onValidateClick">{{
        $stores.formMission.isDraft ? 'Enregistrer et continuer' : 'Enregistrer'
      }}</DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object, date, array, ref } from 'yup'
import MixinMission from '@/mixins/mission'
import ModalFormMissionAddDates from '@/components/modal/ModalFormMissionAddDates'
import FormMission from '@/mixins/form/mission'

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors, FormMission],
  components: {
    FormMissionWrapper,
    ModalFormMissionAddDates,
  },
  data() {
    return {
      loading: false,
      formSchema: object({
        date_type: string().required('Le type d’engagement est requis'),
        commitment__duration: string().nullable().required("La durée d'engagement est requise"),
        commitment__time_period: string()
          .nullable()
          .when(['date_type'], {
            is: (dateType) => dateType == 'recurring',
            then: (schema) => schema.required('La fréquence est requise'),
          }),
        commitment__duration_min: string()
          .nullable()
          .when(['date_type'], {
            is: (dateType) => dateType == 'recurring',
            then: (schema) => schema.required("Précisez l'engagement minimum requis"),
          }),
        with_dates: string().required('Le type de dates est requis'),
        start_date: date()
          .nullable()
          .when('with_dates', {
            is: (value) => value == 'no',
            then: (schema) =>
              schema
                .required('La date de début est requise')
                .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
          }),
        end_date: date()
          .nullable()
          .when('start_date', {
            is: (startDate) => startDate instanceof Date,
            then: (schema) =>
              schema
                .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
                .min(ref('start_date'), 'La date de fin doit être supérieure à celle du début'),
          }),
        dates: array()
          .nullable()
          .when('with_dates', {
            is: (withDates) => withDates === 'yes',
            then: (schema) =>
              schema
                .min(1, 'Veuillez ajouter au moins une date')
                .required('Veuillez ajouter au moins une date'),
          }),
      }),
      showModalAddDates: false,
    }
  },
  computed: {
    formNextDates() {
      if (!this.form.dates) return []
      return this.form.dates?.filter(
        (date) =>
          this.$dayjs(date.id).isAfter(this.$dayjs()) ||
          this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      )
    },
    formPreviousDates() {
      if (!this.form.dates) return []
      return this.form.dates?.filter((date) => this.$dayjs(date.id).isBefore(this.$dayjs()))
    },
  },
  methods: {
    onPonctualClick() {
      this.form.date_type = 'ponctual'
    },
    onRecurringClick() {
      this.form.date_type = 'recurring'
      this.form.with_dates = 'no'
    },
    onRemovedDate(date) {
      this.form.dates = this.form.dates.filter((item) => item.id !== date.id)
    },
    onAddDatesSubmitted(payload) {
      if (!this.form.dates) {
        this.form.dates = []
      }
      this.form.dates = this.form.dates.concat(payload).sort((a, b) => a.id.localeCompare(b.id))
    },
    async onValidateClick() {
      this.loading = true
      // if (!this.form.with_dates) {
      //   this.form.with_dates = 'no'
      // }
      console.log('form with_dates', this.form.with_dates)
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/missions/${this.form.id}/dates`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              this.$stores.formMission.updateFields(mission, [
                'date_type',
                'commitment__duration',
                'commitment__duration_min',
                'start_date',
                'end_date',
                'dates',
                'commitment__time_period',
                'recurrent_description',
              ])

              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/lieux`)
              } else {
                this.$toast.success('Mission modifiée avec succès')
              }
            })
            .catch(() => {})
        })
        .catch((errors) => {
          console.log('catch errors', errors)
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
