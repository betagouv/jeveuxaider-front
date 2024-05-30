<template>
  <FormMissionWrapper>
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
        >
          <template #description>
            <div class="text-xs text-[#666666]">
              Pourquoi faire du bénévolat avec vous ? Incitez les bénévoles à proposer leur aide
            </div>
          </template>
          <DsfrRichEditor name="information" v-model="form.information" />
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
      <DsfrButton :loading="loading" @click="onValidateClick">
        {{ $stores.formMission.isDraft ? 'Continuer' : 'Sauvegarder' }}
      </DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object, array, number } from 'yup'
import activities from '@/assets/activities.json'
export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors],
  components: {
    FormMissionWrapper,
  },
  mounted() {
    // this.form = _cloneDeep(this.$stores.formMission.mission)

    this.form.domaine_id = this.mission.template?.domaine_id || this.mission.domaine_id
    this.form.domaine_secondary_id =
      this.mission.template?.domaine_secondary_id || this.mission.domaine_secondary_id
    this.form.activity_id = this.mission.template?.activity_id || this.mission.activity_id
    this.form.activity_secondary_id =
      this.mission.template?.activity_secondary_id || this.mission.activity_secondary_id
  },
  data() {
    return {
      loading: false,
      activities,
      form: { ...this.$stores.formMission.mission },
      formSchema: object({
        domaine_id: number().nullable().required('Le domaine principal est requis'),
        activity_id: number().nullable().required('L’activité principale est requise'),
        publics_beneficiaires: array()
          .transform((v) => (!v ? [] : v))
          .min(1, 'Sélectionnez au moins 1 public bénéficiaire')
          .required('Sélectionnez au moins 1 public bénéficiaire'),
        objectif: string()
          .required('La présentation est requise')
          .test(
            'test-contains-email',
            "La présentation ne doit pas contenir d'email",
            (objectif) => {
              return !this.stringContainsEmail(objectif)
            }
          )
          .test(
            'test-contains-url',
            'La présentation ne doit pas contenir de liens.',
            (objectif) => {
              return !this.stringContainsUrl(objectif)
            }
          )
          .test(
            'test-contains-phone',
            'La présentation ne doit pas contenir de téléphone.',
            (objectif) => {
              return !this.stringContainsPhone(objectif)
            }
          ),
        description: string()
          .required('Les précisions sont requises')
          .test(
            'test-contains-email',
            "Les précisions ne doivent pas contenir d'email",
            (description) => {
              return !this.stringContainsEmail(description)
            }
          )
          .test(
            'test-contains-url',
            'Les précisions ne doivent pas contenir de liens.',
            (description) => {
              return !this.stringContainsUrl(description)
            }
          )
          .test(
            'test-contains-phone',
            'Les précisions ne doivent pas contenir de téléphone.',
            (description) => {
              return !this.stringContainsPhone(description)
            }
          ),
        information: string()
          .nullable()
          .test('test-contains-email', "Ce champ ne doit pas contenir d'email", (information) => {
            return !this.stringContainsEmail(information)
          })
          .test('test-contains-url', 'Ce champ ne doit pas contenir de liens', (information) => {
            return !this.stringContainsUrl(information)
          })
          .test(
            'test-contains-phone',
            'Ce champ ne doit pas contenir de téléphone',
            (information) => {
              return !this.stringContainsPhone(information)
            }
          ),
      }),
    }
  },
  computed: {
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
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/dates`)
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
