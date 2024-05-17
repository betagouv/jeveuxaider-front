<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Publier une mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">En quoi consiste votre mission ?</h2>
      <CustomTips class="mb-10">
        Consultez cet article pour découvrir nos astuces pour rédiger une mission qui donne envie
        aux bénévoles de proposer leur aide.
      </CustomTips>

      <div class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BaseFormControl
            label="Domaine d'action principal"
            html-for="domaine_id"
            :error="errors.domaine_id"
            required
          >
            <DsfrSelect
              id="domaine_id"
              name="domaine_id"
              v-model="form.domaine_id"
              placeholder="Sélectionner un domaine"
              :options="$labels.domaines"
              :disabled="Boolean(mission.template)"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Domaine d'action secondaire"
            html-for="domaine_secondary_id"
            :error="errors.domaine_secondary_id"
            required
          >
            <DsfrSelect
              id="domaine_secondary_id"
              name="domaine_secondary_id"
              v-model="form.domaine_secondary_id"
              placeholder="Sélectionner un domaine"
              :options="$labels.domaines.filter((domaine) => domaine.key != form.domaine_id)"
              :disabled="Boolean(mission.template)"
            />
          </BaseFormControl>
        </div>

        <BaseFormControl
          label="Publics aidés"
          html-for="publics_beneficiaires"
          :error="errors.publics_beneficiaires"
          required
        >
          <DsfrTagsGroup
            v-model="form.publics_beneficiaires"
            name="publics_beneficiaires"
            :options="$labels.mission_publics_beneficiaires"
            class="mt-4"
          />
        </BaseFormControl>
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
import { string, object, array } from 'yup'

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
        publics_beneficiaires: array()
          .transform((v) => (!v ? [] : v))
          .min(1, 'Sélectionnez au moins 1 public bénéficiaire')
          .required('Sélectionnez au moins 1 public bénéficiaire'),
      }),
    }
  },
  computed: {
    // form() {
    //   return { ...this.$stores.formMission.mission }
    // },
    mission() {
      return this.$stores.formMission.mission
    },
  },
  methods: {
    async onValidateClick() {
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/missions/${this.form.id}/description`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              this.$stores.formMission.setMission(mission)
              //this.$router.push(`/admin/missions/${mission.id}/visuel`)
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
