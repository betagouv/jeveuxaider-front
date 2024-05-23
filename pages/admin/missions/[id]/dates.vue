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
                :is-selected="withDates === 'yes'"
                title="Sur des jours définis"
                description="Ex : tous les premiers mercredis du mois, tous les mardis et jeudis, etc."
                @click="withDates = 'yes'"
              />
              <CustomOptionCard
                :is-selected="withDates === 'no'"
                title="C’est à définir"
                description="Vous ne savez pas encore ou c’est à discuter avec le bénévole"
                @click="withDates = 'no'"
              />
            </div>
          </DsfrFormControl>

          <template v-if="withDates === 'yes'">
            <div class="flex justify-between items-center border-b py-4">
              <div class="font-bold text-xl">
                <template v-if="formNextDates">
                  {{ $filters.pluralize(formNextDates.length, 'date') }} à venir</template
                >
                <template v-else> Aucune date à venir</template>
              </div>
              <DsfrButton size="sm" type="secondary" @click="showModalAddDates = true"
                >Ajouter des dates</DsfrButton
              >
            </div>
            <div v-if="form.dates && form.dates.length" class="mt-6 grid grid-cols-1 gap-4">
              <div
                class="flex justify-between items-center"
                v-for="date in form.dates"
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

          <template v-if="withDates === 'no'">
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
      <DsfrButton :loading="loading" @click="onValidateClick">Sauvegarder</DsfrButton>
    </template>
  </FormMissionEditWrapper>
</template>

<script>
import FormMissionEditWrapper from '@/components/form/FormMissionEditWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object } from 'yup'
import MixinMission from '@/mixins/mission'
import ModalFormMissionAddDates from '@/components/modal/ModalFormMissionAddDates'

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission-edit',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors, MixinMission],
  components: {
    FormMissionEditWrapper,
    ModalFormMissionAddDates,
  },
  mounted() {
    this.form = _cloneDeep(this.$stores.formMission.mission)

    if (this.form.start_date) {
      this.withDates = this.form.dates?.length > 0 ? 'yes' : 'no'
    }
    console.log('mounted', this.form.dates)
  },
  data() {
    return {
      loading: false,
      form: null,
      formSchema: object({
        date_type: string().required('Le type d’engagement est requis'),
      }),
      withDates: null,
      showModalAddDates: false,
    }
  },
  computed: {
    mission() {
      return this.$stores.formMission.mission
    },
    formNextDates() {
      return this.form.dates.filter(
        (date) =>
          this.$dayjs(date.id).isAfter(this.$dayjs()) ||
          this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      )
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
      this.form.dates = this.form.dates.concat(payload).sort((a, b) => a.id.localeCompare(b.id))
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
