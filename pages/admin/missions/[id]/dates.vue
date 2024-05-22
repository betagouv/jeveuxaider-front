<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Quel type d’engagement attendez-vous ?</h2>
      <CustomTips class="mb-10">
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

        <div v-if="form.date_type === 'recurring'" class="flex items-end gap-4">
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
            html-for="date_type"
            :error="errors.date_type"
            required
          >
            <div class="grid grid-cols-2 gap-4">
              <CustomOptionCard
                :is-selected="form.with_creneaux === 'oui'"
                title="Sur des jours définis"
                description="Ex : tous les premiers mercredis du mois, tous les mardis et jeudis, etc."
                @click="form.with_creneaux = 'oui'"
              />
              <CustomOptionCard
                :is-selected="form.with_creneaux === 'non'"
                title="C’est à définir"
                description="Vous ne savez pas encore ou c’est à discuter avec le bénévole"
                @click="form.with_creneaux = 'non'"
              />
            </div>
          </DsfrFormControl>

          <template v-if="form.with_creneaux === 'non'">
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
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">Sauvegarder</DsfrButton>
    </template>
  </FormMissionEditWrapper>
</template>

<script>
import FormMissionEditWrapper from '@/components/form/FormMissionEditWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object } from 'yup'

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission-edit',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors],
  components: {
    FormMissionEditWrapper,
  },
  mounted() {
    this.form = { ...this.$stores.formMission.mission }

    if (this.form.start_date) {
      this.form.with_creneaux = this.form.dates?.length > 0 ? 'oui' : 'non'
    }
  },
  data() {
    return {
      loading: false,
      form: null,

      formSchema: object({
        date_type: string().required('Le type d’engagement est requis'),
      }),
      withDates: null,
    }
  },
  computed: {
    // mission() {
    //   return this.$stores.formMission.mission
    // },
  },
  methods: {
    onPonctualClick() {
      this.form.date_type = 'ponctual'
    },
    onRecurringClick() {
      this.form.date_type = 'recurring'
    },
    async onValidateClick() {
      this.loading = true
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
              ])
              this.$router.push(`/admin/missions/${mission.id}/lieux`)
            })
            .catch(() => {})
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
