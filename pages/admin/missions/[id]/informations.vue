<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[22px] lg:text-[28px] font-bold leading-9 mb-6 lg:mb-10">
        En quoi consiste votre mission ?
      </h2>
      <CustomTips v-if="!$stores.formMission.mission.template_id" class="mb-10">
        <p>
          Consultez
          <a
            class="underline"
            href="https://reserve-civique.crisp.help/fr/article/comment-bien-rediger-une-mission-1dizodt/"
            target="_blank"
            >cet article</a
          >
          pour découvrir nos astuces pour rédiger une mission qui donne envie aux bénévoles de
          proposer leur aide.
        </p>
      </CustomTips>
      <template v-if="form.template_id">
        <div class="space-y-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DsfrFormControl
              label="Domaine d'action principal"
              html-for="domaine_id"
              :error="errors.domaine_id"
              required
            >
              <DsfrSelect
                required
                name="domaine_id"
                :modelValue="form.domaine_id"
                placeholder="Sélectionner un domaine"
                :options="$labels.domaines"
                :disabled="Boolean(form.template_id && form.template?.domaine_id)"
                @update:modelValue="form.domaine_id = $event ? Number($event) : null"
              />
            </DsfrFormControl>
            <DsfrFormControl
              label="Domaine d'action secondaire"
              html-for="domaine_secondary_id"
              :error="errors.domaine_secondary_id"
            >
              <DsfrSelect
                name="domaine_secondary_id"
                :modelValue="form.domaine_secondary_id"
                placeholder="Sélectionner un domaine"
                :options="
                  $labels.domaines.map((domaine) =>
                    domaine.key === form.domaine_id ? { ...domaine, disabled: true } : domaine
                  )
                "
                :disabled="Boolean(form.template_id && form.template?.domaine_secondary_id)"
                @update:modelValue="form.domaine_secondary_id = $event ? Number($event) : null"
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
              :modelValue="form.publics_beneficiaires"
              name="publics_beneficiaires"
              :options="$labels.mission_publics_beneficiaires"
              class="mt-4"
              @update:modelValue="onUpdatePublicBeneficiaires"
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

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DsfrFormControl
              label="Activité principale"
              html-for="activity_id"
              :error="errors.activity_id"
              required
            >
              <DsfrSelect
                required
                name="activity_id"
                :modelValue="form.activity_id"
                placeholder="Sélectionner une activité"
                :options="
                  activities.map((activity) =>
                    activity.id === form.activity_secondary_id
                      ? { ...activity, disabled: true }
                      : activity
                  )
                "
                :disabled="Boolean(form.template_id && form.template?.activity_id)"
                @update:modelValue="form.activity_id = $event ? Number($event) : null"
              />
            </DsfrFormControl>
            <DsfrFormControl
              label="Activité secondaire"
              html-for="activity_secondary_id"
              :error="errors.activity_secondary_id"
            >
              <DsfrSelect
                name="activity_secondary_id"
                :modelValue="form.activity_secondary_id"
                placeholder="Sélectionner une activité"
                :options="
                  activities.map((activity) =>
                    activity.id === form.activity_id ? { ...activity, disabled: true } : activity
                  )
                "
                :disabled="Boolean(form.template_id && form.template?.activity_secondary_id)"
                @update:modelValue="form.activity_secondary_id = $event ? Number($event) : null"
              />
            </DsfrFormControl>
            <BaseFormInfo class="lg:col-span-2 !mt-0"
              >Nous vous suggérons automatiquement une activité adaptée au contenu de votre
              mission ! Astuce : les pourcentages indiquent le niveau de pertinence de la
              recommandation</BaseFormInfo
            >
          </div>

          <CustomTips class="mb-6 lg:mb-10">
            <p>
              Les informations ci-dessous seront visibles sur la fiche de votre mission. Vous ne
              pouvez pas les modifier car elles sont propres au modèle que vous avez choisi pour
              créer cette mission.
            </p>
          </CustomTips>

          <DsfrFormControl
            label="Présentation de la mission"
            html-for="objectif"
            :error="errors.objectif"
            required
          >
            <DsfrRichEditor
              name="objectif"
              v-model="form.objectif"
              :disabled="Boolean(form.template_id)"
            />
          </DsfrFormControl>

          <DsfrFormControl
            label="Précisions"
            html-for="description"
            :error="errors.description"
            required
          >
            <DsfrRichEditor
              name="description"
              v-model="form.description"
              :disabled="Boolean(form.template_id)"
            />
          </DsfrFormControl>
        </div>
      </template>
      <template v-else>
        <div class="space-y-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DsfrFormControl
              label="Domaine d'action principal"
              html-for="domaine_id"
              :error="errors.domaine_id"
              required
            >
              <DsfrSelect
                required
                name="domaine_id"
                :modelValue="form.domaine_id"
                placeholder="Sélectionner un domaine"
                :options="
                  $labels.domaines.map((domaine) =>
                    domaine.key === form.domaine_secondary_id
                      ? { ...domaine, disabled: true }
                      : domaine
                  )
                "
                :disabled="Boolean(form.template_id && form.template?.domaine_id)"
                @update:modelValue="form.domaine_id = $event ? Number($event) : null"
              />
            </DsfrFormControl>
            <DsfrFormControl
              label="Domaine d'action secondaire"
              html-for="domaine_secondary_id"
              :error="errors.domaine_secondary_id"
            >
              <DsfrSelect
                name="domaine_secondary_id"
                :modelValue="form.domaine_secondary_id"
                placeholder="Sélectionner un domaine"
                :options="
                  $labels.domaines.map((domaine) =>
                    domaine.key === form.domaine_id ? { ...domaine, disabled: true } : domaine
                  )
                "
                :disabled="Boolean(form.template_id && form.template?.domaine_secondary_id)"
                @update:modelValue="form.domaine_secondary_id = $event ? Number($event) : null"
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
              :modelValue="form.publics_beneficiaires"
              name="publics_beneficiaires"
              :options="$labels.mission_publics_beneficiaires"
              class="mt-4"
              @update:modelValue="onUpdatePublicBeneficiaires"
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
              :disabled="Boolean(form.template_id)"
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
              :disabled="Boolean(form.template_id)"
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

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DsfrFormControl
              label="Activité principale"
              html-for="activity_id"
              :error="errors.activity_id"
              required
            >
              <DsfrSelect
                required
                name="activity_id"
                :modelValue="form.activity_id"
                placeholder="Sélectionner une activité"
                :options="
                  activities.map((activity) =>
                    activity.id === form.activity_secondary_id
                      ? { ...activity, disabled: true }
                      : activity
                  )
                "
                :disabled="Boolean(form.template_id && form.template?.activity_id)"
                @update:modelValue="form.activity_id = $event ? Number($event) : null"
              />
            </DsfrFormControl>
            <DsfrFormControl
              label="Activité secondaire"
              html-for="activity_secondary_id"
              :error="errors.activity_secondary_id"
            >
              <DsfrSelect
                name="activity_secondary_id"
                :modelValue="form.activity_secondary_id"
                placeholder="Sélectionner une activité"
                :options="
                  activities.map((activity) =>
                    activity.id === form.activity_id ? { ...activity, disabled: true } : activity
                  )
                "
                :disabled="Boolean(form.template_id && form.template?.activity_secondary_id)"
                @update:modelValue="form.activity_secondary_id = $event ? Number($event) : null"
              />
            </DsfrFormControl>
            <BaseFormInfo class="lg:col-span-2 !mt-0"
              >Nous vous suggérons automatiquement une activité adaptée au contenu de votre
              mission ! Astuce : les pourcentages indiquent le niveau de pertinence de la
              recommandation</BaseFormInfo
            >
          </div>
        </div>
      </template>
    </div>
    <template #footer>
      <DsfrButton
        :loading="loading"
        :disabled="!$stores.formMission.isDraft && !isFormDirty"
        @click="onValidateClick"
      >
        {{ $stores.formMission.isDraft ? 'Enregistrer et continuer' : 'Enregistrer' }}
      </DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import FormMission from '@/mixins/form/mission'
import { string, object, array, number } from 'yup'
import activities from '@/assets/activities.json'
import activitiesClassifierMixin from '@/mixins/activitiesClassifier'

export default defineNuxtComponent({
  async setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors, FormMission, activitiesClassifierMixin],
  components: {
    FormMissionWrapper,
  },
  data() {
    return {
      loading: false,
      activities,
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
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/dates`)
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
    onUpdatePublicBeneficiaires($event) {
      this.form.publics_beneficiaires = $event.sort((a, b) =>
        a.localeCompare(b, 'fr', { numeric: true })
      )
    },
  },
  async created() {
    await this.fetchActivitiesClassifier()
  },
})
</script>
