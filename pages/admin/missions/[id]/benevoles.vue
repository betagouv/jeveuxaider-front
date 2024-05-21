<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Combien de bénévoles recherchez-vous ?</h2>
      <CustomTips class="mb-10">
        Vous pourrez modifier le nombre de bénévoles recherchés en fonction des demandes de
        participation reçues et de vos besoins s’ils évoluent !
      </CustomTips>
      <DsfrInput
        v-model="form.participations_max"
        label="Nombre de bénévoles recherchés"
        type="number"
        size="lg"
      />
      <div class="mt-2 text-[#666666]">
        {{
          $filters.pluralize(
            $stores.formMission.mission.places_left,
            'place restante',
            'places restantes'
          )
        }}
      </div>
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">Valider</DsfrButton>
    </template>
  </FormMissionEditWrapper>
</template>

<script>
import FormMissionEditWrapper from '@/components/form/FormMissionEditWrapper'
import FormErrors from '@/mixins/form/errors'
import { number, object } from 'yup'

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
  },
  data() {
    return {
      loading: false,
      form: null,
      formSchema: object({
        participations_max: number()
          .min(1, 'Le nombre de bénévole(s) recherché(s) doit être supérieur à 0')
          .required('Le nombre de bénévole(s) recherché(s) est requis'),
      }),
    }
  },
  computed: {
    // mission() {
    //   return this.$stores.formMission.mission
    // },
  },
  methods: {
    async onValidateClick() {
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/missions/${this.form.id}/benevoles`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              // this.$stores.formMission.setMission(mission)
              this.$stores.formMission.updateFields(mission, ['participations_max', 'places_left'])

              this.$router.push(`/admin/missions/${mission.id}/benevoles-informations`)
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
