<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">En quoi consiste votre mission ?</h2>
      <CustomTips class="mb-10">
        Consultez cet article pour découvrir nos astuces pour rédiger une mission qui donne envie
        aux bénévoles de proposer leur aide.
      </CustomTips>

      <div class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DsfrFormControl
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
              :disabled="Boolean(form.template)"
            />
          </DsfrFormControl>
          <DsfrFormControl
            label="Domaine d'action secondaire"
            html-for="domaine_secondary_id"
            :error="errors.domaine_secondary_id"
          >
            <DsfrSelect
              id="domaine_secondary_id"
              name="domaine_secondary_id"
              v-model="form.domaine_secondary_id"
              placeholder="Sélectionner un domaine"
              :options="$labels.domaines.filter((domaine) => domaine.key != form.domaine_id)"
              :disabled="Boolean(form.template)"
            />
          </DsfrFormControl>
        </div>

        <DsfrFormControl
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
        </DsfrFormControl>

        <DsfrFormControl
          label="Présentation de la mission "
          html-for="objectif"
          :error="errors.objectif"
          required
        >
          <template #description>
            <div class="text-xs text-[#666666]">
              Décrivez la mission en quelques lignes pour que le bénévole comprenne ce que vous
              attendez
            </div>
          </template>
          <DsfrRichEditor
            name="objectif"
            v-model="form.objectif"
            :disabled="Boolean(form.template)"
          />
        </DsfrFormControl>

        <DsfrFormControl
          label="Précisions"
          html-for="description"
          :error="errors.description"
          required
        >
          <template #description>
            <div class="text-xs text-[#666666]">
              Précisez les détails et spécificités de la mission
            </div>
          </template>
          <DsfrRichEditor
            name="description"
            v-model="form.description"
            :disabled="Boolean(form.template)"
          />
        </DsfrFormControl>
        <DsfrFormControl
          label="Quelques mots pour motiver les bénévoles à participer"
          html-for="information"
          :error="errors.information"
          required
        >
          <template #description>
            <div class="text-xs text-[#666666]">
              Pourquoi faire du bénévolat avec vous ? Incitez les bénévoles à proposer leur aide
            </div>
          </template>
          <DsfrRichEditor
            name="information"
            v-model="form.information"
            :disabled="Boolean(form.template)"
          />
        </DsfrFormControl>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DsfrFormControl
            label="Activité principale"
            html-for="activity_id"
            :error="errors.activity_id"
            required
          >
            <DsfrSelect
              id="activity_id"
              name="activity_id"
              v-model="form.activity_id"
              placeholder="Sélectionner une activité"
              :options="activities"
              :disabled="Boolean(form.template)"
            />
          </DsfrFormControl>
          <DsfrFormControl
            label="Activité secondaire"
            html-for="activity_secondary_id"
            :error="errors.activity_secondary_id"
          >
            <DsfrSelect
              id="activity_secondary_id"
              name="activity_secondary_id"
              v-model="form.activity_secondary_id"
              placeholder="Sélectionner un activité"
              :options="activities"
              :disabled="Boolean(form.template)"
            />
          </DsfrFormControl>
          <BaseFormInfo class="col-span-2 !mt-0"
            >Remplissez l’activité secondaire pour que votre mission apparaissent plus souvent dans
            les résultats de recherche</BaseFormInfo
          >
        </div>
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
import { string, object, array } from 'yup'
import activities from '@/assets/activities.json'
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
      activities,
      form: null,
      formSchema: object({
        publics_beneficiaires: array()
          .transform((v) => (!v ? [] : v))
          .min(1, 'Sélectionnez au moins 1 public bénéficiaire')
          .required('Sélectionnez au moins 1 public bénéficiaire'),
      }),
    }
  },
  computed: {},
  methods: {
    async onValidateClick() {
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/missions/${this.form.id}/informations`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              this.$stores.formMission.updateFields(mission, [
                'publics_beneficiaires',
                'information',
                'objectif',
                'description',
                'activity_id',
                'activity_secondary_id',
                'domaine_id',
                'domaine_secondary_id',
              ])
              this.$toast.success('Mission modifiée avec succès')

              this.$router.push(`/admin/missions/${mission.id}/dates`)
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
