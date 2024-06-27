<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="$stores.formMission.mission">
      <h2 class="text-[22px] lg:text-[28px] font-bold leading-9 mb-6 lg:mb-10">
        Trouvez un titre accrocheur pour votre mission
      </h2>
      <CustomTips class="mb-6 lg:mb-10">
        Rédigez le titre de votre mission à la première personne du singulier
        <strong>du point de vue du bénévole</strong>
      </CustomTips>
      <DsfrFormControl label="Titre de votre mission" html-for="name" :error="errors.name" required>
        <template #description>
          <div class="text-xs text-[#666666]">Exemple : Je collecte des produits alimentaires</div>
        </template>
        <DsfrInput
          v-model="form.name"
          label="Titre de la mission"
          size="lg"
          placeholder="Je ..."
          :disabled="Boolean(form.template_id)"
        />
      </DsfrFormControl>
    </div>
    <template #footer>
      <DsfrButton :loading="loading" :disabled="!isFormDirty" @click="onValidateClick">
        {{ $stores.formMission.isDraft ? 'Sauvegarder et continuer' : 'Sauvegarder' }}
      </DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object } from 'yup'
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
  },
  data() {
    return {
      loading: false,
      formSchema: object({
        name: string()
          .min(3, 'Le titre est trop court')
          .max(254, 'Le titre est trop long')
          .matches(/^(Je|J'|J‘|J’)/, 'Le titre de la mission doit commencer par "Je" ou "J‘"')
          .required('Le titre est requis'),
      }),
    }
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
              this.$stores.formMission.updateFields(mission, ['name'])
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/visuel`)
              } else {
                this.$toast.success('Mission modifiée avec succès')
              }
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
