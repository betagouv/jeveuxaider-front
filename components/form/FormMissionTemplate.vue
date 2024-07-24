<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl html-for="title" label="Titre" required :error="errors.title">
              <BaseFormHelperText>
                Il s'agit du titre principal affiché sur la page de la mission.
              </BaseFormHelperText>
              <BaseInput v-model="form.title" name="title" />
            </BaseFormControl>
            <BaseFormControl
              html-for="subtitle"
              label="Titre court"
              required
              :error="errors.subtitle"
            >
              <BaseFormHelperText>
                Le titre court sera utilisé comme libellé pour le filtre "Type de mission" dans la
                recherche.
              </BaseFormHelperText>
              <BaseInput v-model="form.subtitle" name="subtitle" />
            </BaseFormControl>
            <div class="grid grid-cols-2 gap-4">
              <BaseFormControl
                label="Domaine d'action principal"
                html-for="domaine_id"
                :error="errors.domaine_id"
                required
              >
                <BaseSelectAdvanced
                  v-model="form.domaine_id"
                  name="domaine"
                  placeholder="Sélectionner un domaine"
                  :options="$labels.domaines"
                />
              </BaseFormControl>
              <BaseFormControl label="Domaine d'action secondaire" html-for="domaine_secondary_id">
                <BaseSelectAdvanced
                  v-model="form.domaine_secondary_id"
                  name="domaine"
                  placeholder="Sélectionner un domaine"
                  :options="$labels.domaines.filter((domaine) => domaine.key != form.domaine_id)"
                  clearable
                />
              </BaseFormControl>
            </div>
            <BaseFormControl
              label="Description"
              html-for="description"
              :error="errors.description"
              required
            >
              <BaseRichEditor
                v-model="form.description"
                placeholder="Décrivez la mission en quelques mots..."
              />
            </BaseFormControl>
            <BaseFormControl label="Objectif" html-for="objectif" :error="errors.objectif" required>
              <BaseRichEditor
                v-model="form.objectif"
                placeholder="Décrivez la mission en quelques mots..."
              />
            </BaseFormControl>
            <template v-if="activities.length">
              <div class="grid grid-cols-2 gap-4">
                <BaseFormControl
                  v-if="activities.length"
                  label="Activité principale"
                  html-for="activity_id"
                >
                  <ComboboxActivities
                    v-model="form.activity_id"
                    name="activity_id"
                    :options="activities"
                    :loading="activitiesClassifierLoading"
                    :activities-classifier="activitiesClassifier"
                    @update:modelValue="onInputActivity"
                  />
                </BaseFormControl>
                <BaseFormControl
                  v-if="activities.length"
                  label="Activité secondaire"
                  html-for="activity_secondary_id"
                >
                  <ComboboxActivities
                    ref="comboboxSecondaryActivity"
                    v-model="form.activity_secondary_id"
                    name="activity_secondary_id"
                    :options="activities.filter((option) => option.id != form.activity_id)"
                    :loading="activitiesClassifierLoading"
                    :activities-classifier="activitiesClassifier"
                  />
                </BaseFormControl>
              </div>
              <BaseFormHelperText class="!mt-4">
                <span>Veuillez sélectioner le type d'activité principal.</span>
                <span v-if="activitiesClassifier?.code === 200">
                  Le pourcentage indique le degré de pertinence en fonction des champs déjà
                  remplis.</span
                >
              </BaseFormHelperText>
            </template>
          </div>
        </BaseBox>

        <BaseBox>
          <BaseHeading :level="3" class="mb-8">Aide à la création de mission</BaseHeading>
          <p class="text-[#666666]">
            Indiquez la configuration la plus probable d’une mission utilisant ce modèle. Cela sera
            ajouté sous la forme de recommandation lors de la création de missions avec ce modèle.
          </p>
          <p class="mt-4 font-bold">Les missions de ce modèle seront-elles le plus souvent :</p>

          <div class="mt-10 space-y-10">
            <BaseFormControl
              label="Régulières ou ponctuelles ?"
              html-for="recommendation_date_type"
              :error="errors.recommendation_date_type"
              required
            >
              <BaseSelectAdvanced
                v-model="form.recommendation_date_type"
                name="recommendation_date_type"
                :options="[
                  { key: null, label: 'Ça dépend' },
                  { key: 'ponctual', label: 'Ponctuelles' },
                  { key: 'recurring', label: 'Régulières' },
                ]"
              />
            </BaseFormControl>
            <BaseFormControl
              v-if="form.recommendation_date_type === 'ponctual'"
              label="Avec ou sans jours et créneaux fixes ?"
              html-for="recommendation_with_dates"
              :error="errors.recommendation_with_dates"
              required
            >
              <BaseSelectAdvanced
                v-model="form.recommendation_with_dates"
                name="recommendation_with_dates"
                :options="[
                  { key: null, label: 'Ça dépend' },
                  { key: true, label: 'Avec créneaux' },
                  { key: false, label: 'Sans créneaux' },
                ]"
              />
            </BaseFormControl>
            <BaseFormControl
              label="En présentiel ou à distance ?"
              html-for="recommendation_type"
              :error="errors.recommendation_type"
              required
            >
              <BaseSelectAdvanced
                v-model="form.recommendation_type"
                name="recommendation_type"
                :options="[
                  { key: null, label: 'Ça dépend' },
                  { key: 'onsite', label: 'En présentiel' },
                  { key: 'remote', label: 'À distance' },
                ]"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <BaseBox v-if="['admin'].includes($stores.auth.contextRole)" padding="sm">
          <BaseHeading :level="3" class="mb-8"> Paramètres </BaseHeading>
          <div class="space-y-12">
            <BaseToggle
              v-model="form.published"
              :label="form.published ? 'En ligne' : 'Hors ligne'"
              description="Pour rendre le modèle accessible"
            />
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Image </BaseHeading>
          <div class="space-y-12">
            <BaseFormControl label="Carte mission" html-for="photo" class="col-span-2">
              <BaseImageCrop
                :default-value="form.photo"
                :ratio="300 / 143"
                :min-width="300"
                :preview-width="235"
                :upload-max-size="2000000"
                @add="
                  addFiles({
                    files: [$event],
                    collection: 'mission_template__photo',
                  })
                "
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox v-if="$stores.auth.contextRole === 'admin'" padding="sm">
          <BaseHeading :level="3" class="mb-8"> Tags </BaseHeading>
          <div class="space-y-8">
            <BaseFormControl
              label="Ajouter les tags liés à ce modèle de mission"
              html-for="algolia-search-tags"
            >
              <AlgoliaInputAutocomplete
                index="termsIndex"
                attribute-right-label="group"
                :search-parameters="{
                  facetFilters: [['vocabulary_name:Missions']],
                  hitsPerPage: 6,
                }"
                @selected="handleSelectedTag"
              />
              <div>
                <div v-if="form.tags.length" class="mt-6">
                  <div class="flex flex-wrap gap-2">
                    <BaseTagFormItem
                      v-for="item in form.tags"
                      :key="item.id"
                      :tag="item"
                      @removed="onRemovedTag"
                    >
                      {{ item.name }}
                    </BaseTagFormItem>
                  </div>
                </div>
              </div>
            </BaseFormControl>
          </div>
        </BaseBox>
      </div>
    </div>
    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <ButtonsSubmitFormMissionTemplate
          class="flex"
          :mission-template="form"
          :loading="loading"
          @submitted="handleSubmit($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import ButtonsSubmitFormMissionTemplate from '@/components/custom/ButtonsSubmitFormMissionTemplate.vue'
import activitiesClassifierMixin from '@/mixins/activitiesClassifier'
import ComboboxActivities from '@/components/custom/ComboboxActivities.vue'

export default defineNuxtComponent({
  components: {
    ButtonsSubmitFormMissionTemplate,
    ComboboxActivities,
  },
  mixins: [FormErrors, FormUploads, activitiesClassifierMixin],
  props: {
    missionTemplate: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.missionTemplate },
      formSchema: object({
        title: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        subtitle: string()
          .min(3, 'Le titre court est trop court')
          .required('Le titre court est requis'),
        description: string().required('La description est requise'),
        objectif: string().required("L'objectif est requis"),
        domaine_id: string().required('Le domaine est requis'),
      }),
      activities: [],
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const activities = await apiFetch('/activities?pagination=999')
      this.activities = activities.data
        .filter((item) => item.is_published || item.id === this.missionTemplate.activity_id)
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
      this.fetchActivitiesClassifier()
    },
    handleSelectedTag(item) {
      this.form.tags = [...this.form.tags, item]
    },
    onRemovedTag(item) {
      this.form.tags = this.form.tags.filter((skill) => skill.id !== item.id)
    },
    async handleSubmit(attributes) {
      if (this.loading) {
        return
      }
      this.loading = true

      if (attributes) {
        this.form = {
          ...this.form,
          ...attributes,
        }
      }

      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.id) {
            await apiFetch(`/mission-templates/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            const missionTemplate = await apiFetch('/mission-templates', {
              method: 'POST',
              body: this.form,
            })
            this.form.id = missionTemplate.id
          }
          await this.uploadFiles('mission_template', this.form.id)

          this.$toast.success('Modifications enregistrées')
          this.$router.push('/admin/contenus/modeles-mission')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onInputActivity(payload) {
      if (payload && this.form.activity_secondary_id === payload) {
        this.$refs.comboboxSecondaryActivity?.$refs?.combobox?.reset()
      }
    },
  },
})
</script>
