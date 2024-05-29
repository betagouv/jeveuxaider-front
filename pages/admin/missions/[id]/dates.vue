<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Quel type d’engagement attendez-vous ?</h2>
      <CustomTips v-if="$stores.formMission.isStepDatesWarning" variant="warning" class="mb-10">
        <p>La mission n'a plus de date disponible. Vous pouvez :</p>
        <ul class="list-disc mt-2 pl-5">
          <li>Ajouter de nouvelles dates</li>
          <li>Modifier la date de fin de la mission</li>
          <li v-if="mission.state === 'Validée'">Terminer la mission</li>
        </ul>
      </CustomTips>
      <CustomTips v-else class="mb-10">
        <p>Vous avez des doutes sur le type d’engagement souhaité ?</p>
        <ul class="list-disc mt-2 pl-5">
          <li>Exemples de missions ponctuelles</li>
          <li>Exemples de missions régulières</li>
        </ul>
      </CustomTips>

      <div class="space-y-10">
        <DsfrFormControl
          label="Le bénévole doit s’engager de manière :"
          html-for="date_type"
          :error="errors.date_type"
          required
        >
          <div class="grid grid-cols-2 gap-4">
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
              subtitle="Demande un engagement dans la durée (plusieurs mois)"
              description=" Ex : 2 heures par semaine, 1 jour par mois pendant 6 mois etc."
            />
          </div>
        </DsfrFormControl>

        <DsfrFormControl
          v-if="form.date_type === 'ponctual'"
          label="Durée de l’activité"
          html-for="commitment__duration"
          :error="errors.commitment__duration"
          required
        >
          <DsfrSelect
            id="commitment__duration"
            name="commitment__duration"
            v-model="form.commitment__duration"
            placeholder="Sélectionner une durée"
            :options="$labels.duration"
          />
        </DsfrFormControl>

        <div v-if="form.date_type === 'recurring'" class="space-y-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DsfrFormControl
              label="Fréquence d’engagement"
              html-for="commitment__duration"
              :error="errors.commitment__duration"
              required
            >
              <DsfrSelect
                id="commitment__duration"
                name="commitment__duration"
                v-model="form.commitment__duration"
                placeholder="Sélectionner une durée"
                :options="$labels.duration"
              />
            </DsfrFormControl>
            <DsfrFormControl
              label=""
              html-for="commitment__time_period"
              :error="errors.commitment__time_period"
              class="lg:mt-6"
            >
              <DsfrSelect
                id="commitment__time_period"
                name="commitment__time_period"
                v-model="form.commitment__time_period"
                placeholder="Sélectionner une fréquence"
                :options="[
                  { key: 'week', label: 'par semaine' },
                  { key: 'month', label: 'par mois' },
                ]"
              />
            </DsfrFormControl>
          </div>
          <DsfrFormControl
            label="Précisez les créneaux horaires"
            html-for="recurrent_description"
            :error="errors.recurrent_description"
            info=" Précisez en une ligne la disponibilité attendue. Par exemple “Le samedi matin”, “En
              soirée, le lundi et le jeudi”"
            required
          >
            <DsfrInput
              v-model="form.recurrent_description"
              name="recurrent_description"
              placeholder="les mardis ou jeudis"
            />
          </DsfrFormControl>
        </div>

        <template v-if="form.date_type">
          <CustomTips>
            <p class="mb-2">
              En précisant des dates, vous permettez aux bénévoles d’indiquer leurs disponibilités
              lorsqu’ils proposent leur aide, vous gagnez du temps !
            </p>
            <p class="font-bold">
              Les missions avec dates obtiennent en moyenne 25% de plus de participations.
            </p>
          </CustomTips>

          <DsfrFormControl
            label="Quand la mission se déroule-t-elle ?"
            html-for="with_dates"
            :error="errors.with_dates"
            required
          >
            <div class="grid grid-cols-2 gap-4">
              <CustomOptionCard
                :is-selected="form.with_dates === 'yes'"
                title="Sur des jours définis"
                description="Ex : tous les premiers mercredis du mois, tous les mardis et jeudis, etc."
                @click="form.with_dates = 'yes'"
              />
              <CustomOptionCard
                :is-selected="form.with_dates === 'no'"
                title="C’est à définir"
                description="Vous ne savez pas encore ou c’est à discuter avec le bénévole"
                @click="form.with_dates = 'no'"
              />
            </div>
          </DsfrFormControl>

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
                <p>
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
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      <DsfrButton :loading="loading" @click="onValidateClick">{{
        $stores.formMission.isDraft ? 'Continuer' : 'Sauvegarder'
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

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors, MixinMission],
  components: {
    FormMissionWrapper,
    ModalFormMissionAddDates,
  },
  mounted() {
    this.form = _cloneDeep(this.$stores.formMission.mission)

    if (this.form.start_date) {
      this.form.with_dates = this.form.dates?.length > 0 ? 'yes' : 'no'
    }

    console.log('mounted', this.form.dates)
  },
  data() {
    return {
      loading: false,
      form: null,
      formSchema: object({
        date_type: string().required('Le type d’engagement est requis'),
        commitment__duration: string().nullable().required("La durée d'engagement est requise"),
        commitment__time_period: string()
          .nullable()
          .when(['date_type'], {
            is: (dateType) => dateType == 'recurring',
            then: (schema) => schema.required('La fréquence est requise'),
          }),
        recurrent_description: string()
          .nullable()
          .when(['date_type'], {
            is: (dateType) => dateType == 'recurring',
            then: (schema) => schema.required('Précisez les créneaux horaires pour le bénévole'),
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
    mission() {
      return this.$stores.formMission.mission
    },
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

      console.log('onValidateClick', this.form)
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
                'commitment__period',
                'start_date',
                'end_date',
                'dates',
                'commitment__time_period',
                'recurrent_description',
              ])
              this.$toast.success('Mission modifiée avec succès')
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/lieux`)
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
