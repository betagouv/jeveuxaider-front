<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Titre de votre mission</h2>
      <CustomTips class="mb-10">
        Rédigez le titre de votre mission à la première personne du singulier du point de vue du
        bénévole
      </CustomTips>
      <DsfrInput
        v-model="form.name"
        label="Titre de la mission"
        size="lg"
        placeholder="Exemple : Je contribue au déroulé d’un événement sportif le jour J"
      />
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">Valider</DsfrButton>
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
  },
  data() {
    return {
      loading: false,
      form: null,
      formSchema: object({
        name: string().required('Le titre est requis'),
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
          await apiFetch(`/missions/${this.form.id}/title`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              this.$stores.formMission.setMission(mission)
              this.$router.push(`/admin/missions/${mission.id}/visuel`)
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
