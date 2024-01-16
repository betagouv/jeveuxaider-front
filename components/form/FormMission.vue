<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-8">
      <BaseBox>
        <BaseHeading :level="3" class="mb-8"> Description de la mission </BaseHeading>
        <div class="space-y-10">
          <BaseAlert>
            Consultez
            <DsfrLink
              to="https://reserve-civique.crisp.help/fr/article/comment-bien-rediger-une-mission-1dizodt/"
              :is-external="true"
              :icon-size="14"
            >
              cet article
            </DsfrLink>
            pour découvrir nos astuces pour rédiger une mission impactante.
          </BaseAlert>
          <BaseFormControl
            html-for="name"
            :label="Boolean(mission.template) ? 'ℹ️   Information' : 'Titre de la mission'"
            :required="!Boolean(mission.template)"
            :error="errors.name"
          >
            <div v-if="Boolean(mission.template)" class="text-sm mb-4">
              <div class="text-gray-500">
                Vous avez choisi d’utiliser un modèle de mission : certaines informations sont
                complétées par défaut et ne peuvent être modifiées. Si vous souhaitez adapter les
                contenus, nous vous recommandons de publier une
                <span class="underline">mission personnalisée</span>.
              </div>
            </div>
            <BaseInput
              v-model="form.name"
              name="name"
              placeholder="Merci de rédiger le titre de votre mission à la première personne du singulier"
              :disabled="Boolean(mission.template)"
            />
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
                :disabled="Boolean(mission.template)"
              />
            </BaseFormControl>
            <BaseFormControl label="Domaine d'action secondaire" html-for="domaine_secondary_id">
              <BaseSelectAdvanced
                v-model="form.domaine_secondary_id"
                name="domaine"
                placeholder="Sélectionner un domaine"
                :options="$labels.domaines.filter((domaine) => domaine.key != form.domaine_id)"
                :disabled="Boolean(mission.template)"
                clearable
              />
            </BaseFormControl>
          </div>
          <BaseFormControl
            label="Publics aidés"
            html-for="publics_beneficiaires"
            :error="errors.publics_beneficiaires"
            required
          >
            <BaseCheckboxGroup
              v-model="form.publics_beneficiaires"
              name="publics_beneficiaires"
              variant="button"
              :options="$labels.mission_publics_beneficiaires"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Présentation de la mission"
            html-for="objectif"
            :error="errors.objectif"
            required
          >
            <BaseRichEditor
              v-model="form.objectif"
              placeholder="Décrivez la mission en quelques mots..."
              :disabled="Boolean(mission.template)"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Précisions"
            html-for="description"
            required
            :error="errors.description"
          >
            <BaseRichEditor
              v-model="form.description"
              placeholder="Précisez les détails et spécificités de la mission"
              :disabled="Boolean(mission.template)"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Quelques mots pour motiver les bénévoles à participer"
            html-for="information"
            :error="errors.information"
          >
            <BaseRichEditor
              v-model="form.information"
              placeholder="Incitez les bénévoles à candidater ..."
            />
          </BaseFormControl>
          <template v-if="activities.length">
            <div class="grid grid-cols-2 gap-4">
              <BaseFormControl label="Activité principale" html-for="activity_id">
                <ComboboxActivities
                  v-model="form.activity_id"
                  name="activity_id"
                  :options="activities"
                  :disabled="Boolean(mission.template)"
                  :loading="activitiesClassifierLoading"
                  :activities-classifier="activitiesClassifier"
                  @update:modelValue="onInputActivity"
                />
              </BaseFormControl>
              <BaseFormControl label="Activité secondaire" html-for="activity_secondary_id">
                <ComboboxActivities
                  ref="comboboxSecondaryActivity"
                  v-model="form.activity_secondary_id"
                  name="activity_secondary_id"
                  :options="activities.filter((option) => option.id != form.activity_id)"
                  :disabled="Boolean(mission.template)"
                  :loading="activitiesClassifierLoading"
                  :activities-classifier="activitiesClassifier"
                />
              </BaseFormControl>
            </div>
            <BaseFormHelperText class="!mt-4">
              <span
                >Nous vous suggérons automatiquement une activité adaptée au contenu de votre
                mission !</span
              >
              <span v-if="activitiesClassifier?.code === 200">
                Astuce : les pourcentages indiquent le niveau de pertinence de la recommandation
              </span>
            </BaseFormHelperText>
          </template>

          <BaseFormControl
            label="Pré-requis pour réaliser la mission"
            html-for="prerequisites"
            :error="errors.prerequisites"
          >
            <template #afterLabel>
              <div class="inline-flex flex-wrap">
                <span class="!font-normal">(3 max.)</span>
                <span class="absolute right-0 hidden sm:block !font-normal"
                  >100 caractéres max.</span
                >
              </div>
            </template>
            <PrerequisitesInput
              :initial-value="form.prerequisites"
              @update="form.prerequisites = $event"
            />
          </BaseFormControl>
          <BaseFormControl label="Mission ouverte également aux" html-for="publics_volontaires">
            <BaseCheckboxGroup
              v-model="form.publics_volontaires"
              name="publics_volontaires"
              variant="button"
              :options="$labels.mission_publics_volontaires"
            />
          </BaseFormControl>

          <BaseFormControl
            v-if="!Boolean(mission.template)"
            label="Visuel d'illustration"
            html-for="illustrations"
          >
            <BaseMediaPickerDomaine
              :class="[{ 'grid sm:grid-cols-2 gap-8': form.illustrations.length }]"
              collection="domaine__illustrations_mission"
              :domaine-ids="mediaPickerDomaineIds"
              :defaults="form.illustrations"
              :hide-pencil="!form.illustrations.length"
              @change="onMediaPickerChange($event, 'illustrations')"
            >
              <template #empty>
                <div class="grid md:grid-cols-2 group">
                  <div class="min-h-[120px] overflow-hidden">
                    <img
                      srcset="
                        /images/card-thumbnail-default.jpg,
                        /images/card-thumbnail-default@2x.jpg 2x
                      "
                      alt="default"
                      class="w-full h-[143px] object-cover"
                    />
                  </div>
                  <div
                    class="min-h-[120px] cursor-pointer border md:border-l-0 transition group-hover:border-jva-blue-500 flex items-center justify-center"
                  >
                    <div class="flex flex-col space-y-4 items-center">
                      <img
                        src="/images/icons/icon_add_picture.svg"
                        alt="Ajouter une image"
                        width="36"
                        height="36"
                      />
                      <div class="text-sm text-center text-jva-blue-500 font-bold">
                        Selectionnez un visuel<br />pour illustrer votre mission
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </BaseMediaPickerDomaine>
          </BaseFormControl>
        </div>
      </BaseBox>

      <BaseBox>
        <div class="grid gap-8">
          <div>
            <BaseHeading :level="3" class="mb-6"> Responsable de la mission </BaseHeading>
            <div class="font-bold mb-3 text-sm">
              Le responsable de la mission est la personne qui sera en contact avec les bénévoles et
              qui sera chargé de les accompagner dans leur intégration dans la structure.
            </div>
            <div class="text-sm">
              Vous pouvez
              <nuxt-link
                no-prefetch
                class="underline"
                :to="`/admin/organisations/${structureId}#membres`"
              >
                ajouter un nouveau membre
              </nuxt-link>
              à votre équipe pour vous répartir la publication de mission.
            </div>
          </div>
          <div>
            <BaseFormControl
              label="Responsable de la mission"
              html-for="contact_principal"
              required
              :error="errors.responsable_id"
            >
              <BaseSelectAdvanced
                v-model="form.responsable_id"
                name="contact_principal"
                placeholder="Sélectionnez un responsable"
                :options="
                  structure.members.map((member) => {
                    return {
                      key: member.profile.id,
                      label: member.profile.full_name,
                    }
                  })
                "
              />
            </BaseFormControl>
          </div>
        </div>
      </BaseBox>
    </div>
    <div class="lg:col-span-2 space-y-8 flex flex-col">
      <FormMissionParameters
        :initial-form="form"
        :errors="errors"
        :with-slots="withSlots"
        @withSlotChange="withSlots = $event"
        @change="handleParametersChanged"
      />
      <BaseBox padding="sm">
        <BaseHeading :level="3" class="mb-8"> Lieu de la mission </BaseHeading>
        <div class="space-y-8">
          <div>
            <BaseRadioGroup
              v-model="form.type"
              :options="$labels.mission_types"
              variant="tabs"
              @update:modelValue="handleTypeChange"
            />
            <template v-if="isDistance">
              <div class="text-sm text-gray-600 leading-relaxed mt-4">
                <p>
                  <strong
                    >Les missions à distance sont visibles par les bénévoles de toute la France,
                    quelle que soit leur position géographique.</strong
                  >
                </p>
              </div>
              <BaseFormHelperText class="mt-4">
                <p>
                  Si votre mission porte sur un territoire spécifique, nous vous recommandons de
                  proposer votre mission en présentiel et de cocher la case “En autonomie”.
                </p>
              </BaseFormHelperText>
            </template>
          </div>

          <!-- <a class='text-jva-blue-500 hover:underline' href='/'>En savoir plus</a> -->
          <BaseToggle
            v-if="isPresentiel"
            v-model="form.is_autonomy"
            label="Mission à réaliser en autonomie"
            description="Le bénévole peut réaliser la mission sans l’encadrement du responsable."
          />

          <BaseFormControl
            v-if="isPresentiel"
            label="Département"
            html-for="department"
            required
            :error="errors.department"
          >
            <BaseCombobox
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez un département"
              :options="
                $labels.departments.map((option) => {
                  return {
                    key: option.key,
                    label: `${option.key} - ${option.label}`,
                  }
                })
              "
            />

            <BaseFormHelperText v-if="isAutonomy" class="mt-4">
              <p>
                Pour une mission donnée, les zones d’intervention doivent se situer sur le même
                département. Si votre mission a lieu sur plusieurs départements, il vous faut créer
                une mission par département.
              </p>
            </BaseFormHelperText>
          </BaseFormControl>

          <template v-if="isPresentiel && isAutonomy">
            <BaseFormControl
              label="Codes postaux de la zone d'intervention (jusqu'à 20)"
              html-for="autonomy_zips"
              :error="errors.autonomy_zips"
            >
              <BaseInputAutocomplete
                key="input_autocomplete_autonomy"
                icon="RiMapPinLine"
                name="autocomplete"
                label="Autocomplete"
                placeholder="Recherche par ville ou code postal"
                :options="autocompleteOptions"
                attribute-key="id"
                attribute-label="label"
                attribute-right-label="typeLabel"
                :reset-value-on-select="true"
                :min-value-length="3"
                @selected="handleSelectedAutonomyZip"
                @keyup.enter="onEnter"
                @fetch-suggestions="onFetchGeoSuggestions"
              />
              <div v-if="form.autonomy_zips && form.autonomy_zips.length">
                <div class="flex flex-wrap gap-2 mt-4">
                  <BaseTagFormItem
                    v-for="item in form.autonomy_zips"
                    :key="item.zip"
                    :tag="item"
                    @removed="onRemovedTagItem"
                  >
                    {{ item.zip }}
                  </BaseTagFormItem>
                </div>
              </div>
            </BaseFormControl>

            <BaseFormControl
              label="Précisions sur la zone d'intervention (villes, lieux, etc.)"
              html-for="autonomy_precisions"
              :error="errors.autonomy_precisions"
            >
              <ClientOnly>
                <BaseTextareaAutosize
                  v-model="form.autonomy_precisions"
                  name="Autonomie - Précisions"
                  placeholder="Précisez en quelques mots les zones d'intervention du bénévole en autonomie"
                  class="w-full placeholder-gray-text-400 border border-gray-300 text-sm px-6 py-3"
                  maxlength="700"
                  @keydown.enter.native.prevent
                />
              </ClientOnly>
            </BaseFormControl>
          </template>

          <BaseFormControl
            v-if="isPresentiel && !isAutonomy"
            label="Rechercher l'adresse du lieu de la mission"
            html-for="adress"
            required
          >
            <BaseFormHelperText
              >Si l'adresse n'est pas reconnue veuillez saisir le nom de la
              ville.</BaseFormHelperText
            >
            <BaseInputAutocomplete
              icon="RiMapPinLine"
              name="adress"
              placeholder="Renseignez une adresse"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              :min-value-length="3"
              @selected="handleSelectedGeo"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
          </BaseFormControl>

          <div v-if="isPresentiel && !isAutonomy" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BaseFormControl
              class="lg:col-span-2"
              label="Adresse"
              html-for="address"
              :error="errors.address"
            >
              <BaseInput
                v-model="form.address"
                name="address"
                placeholder="..."
                :disabled="isGeoFieldsDisabled"
              />
            </BaseFormControl>

            <BaseFormControl label="Code postal" html-for="zip" required :error="errors.zip">
              <BaseInput
                v-model="form.zip"
                name="zip"
                placeholder="..."
                :disabled="isGeoFieldsDisabled"
              />
            </BaseFormControl>
            <BaseFormControl label="Ville" html-for="city" required :error="errors.city">
              <BaseInput
                v-model="form.city"
                name="city"
                placeholder="..."
                :disabled="isGeoFieldsDisabled"
              />
            </BaseFormControl>
            <template v-if="!isGeoFieldsDisabled">
              <BaseFormControl label="Latitude" html-for="latitude" :error="errors.latitude">
                <BaseInput v-model="form.latitude" name="latitude" placeholder="..." />
              </BaseFormControl>
              <BaseFormControl label="Longitude" html-for="longitude" :error="errors.longitude">
                <BaseInput v-model="form.longitude" name="longitude" placeholder="..." />
              </BaseFormControl>
            </template>
          </div>
        </div>
      </BaseBox>
      <BaseBox v-if="form.type === 'Mission en présentiel'" :padding="false">
        <div class="px-6 py-8 xl:py-10 xl:px-8">
          <div class="flex items-center space-x-6 mb-8">
            <img
              src="@/assets/images/snu-logo.png"
              alt="SNU"
              title="SNU"
              class="hidden lg:block h-10"
              data-not-lazy
            />
            <BaseHeading :level="3" class="">
              Proposer cette mission aux jeunes volontaires du Service National Universel
            </BaseHeading>
          </div>
          <div class="space-y-8">
            <BaseToggle
              v-model="form.is_snu_mig_compatible"
              label="Accueillir des <strong>bénévoles de 15 à 18 ans</strong> pour cette mission"
              @checked="onSNUChecked"
            />
            <BaseFormControl
              v-if="form.is_snu_mig_compatible"
              label="Nombre de volontaires du snu acceptés"
              html-for="snu_mig_places"
              required
              :error="errors.snu_mig_places"
            >
              <BaseInput
                v-model="form.snu_mig_places"
                name="snu_mig_places"
                type="number"
                suffix="volontaires"
              />
            </BaseFormControl>
          </div>
          <div class="flex justify-between mt-10">
            <DsfrButton
              to="https://www.youtube.com/watch?v=2LlYM9C693E"
              icon="RiPlayCircleLine"
              type="secondary"
              is-external
              >Le SNU en 30 secondes</DsfrButton
            >
            <DsfrButton
              icon="RiExternalLinkLine"
              type="secondary"
              is-external
              to="https://www.snu.gouv.fr/le-service-national-universel-29"
              >En savoir plus</DsfrButton
            >
          </div>
        </div>
      </BaseBox>
      <BaseBox :padding="false">
        <div class="px-6 py-8 xl:py-10 xl:px-8">
          <BaseHeading :level="3" class="mb-8"> Motivation du bénévole </BaseHeading>
          <div class="space-y-8">
            <BaseToggle
              v-model="form.is_motivation_required"
              label="Rendre obligatoire la rédaction d‘un <strong>message personnel de motivation</strong> lors de la participation (100 caractères minimum)"
              description=""
            />
          </div>
        </div>
      </BaseBox>
      <BaseBox padding="sm">
        <BaseHeading :level="3" class="mb-8"> Compétences recherchées </BaseHeading>
        <div class="space-y-8">
          <BaseFormControl
            label="compétences recherchées pour cette mission"
            html-for="algolia-search"
          >
            <BaseFormHelperText>Sélectionnez jusqu’à 3 compétences</BaseFormHelperText>
            <AlgoliaInputAutocomplete
              index="termsIndex"
              :search-parameters="{
                facetFilters: [['vocabulary_name:Skills']],
                hitsPerPage: 6,
              }"
              @selected="handleSelectedSkill"
            />
            <div>
              <div v-if="form.skills.length" class="mt-6">
                <div class="flex flex-wrap gap-2">
                  <BaseTagFormItem
                    v-for="item in form.skills"
                    :key="item.id"
                    :tag="item"
                    @removed="onRemovedSkill"
                  >
                    {{ item.name }}
                  </BaseTagFormItem>
                </div>
              </div>
            </div>
          </BaseFormControl>
        </div>
      </BaseBox>
      <BaseBox v-if="$stores.auth.contextRole === 'admin'" padding="sm">
        <BaseHeading :level="3" class="mb-8"> Tags </BaseHeading>
        <div class="space-y-8">
          <BaseFormControl
            label="Ajouter les tags liés à cette mission"
            html-for="algolia-search-tags"
          >
            <AlgoliaInputAutocomplete
              index="termsIndex"
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
    <BaseAlertDialog
      :is-open="showSNUModal"
      title="Point de vigilance"
      button-label="Je confirme"
      cancel-label="Je ne propose pas ma mission pour le SNU"
      theme="warning"
      @cancel="handleSNUCancel"
      @confirm="handleSNUConfirm"
    >
      <p>
        Avant de proposer votre mission sur la plateforme du Service National Universel (SNU), merci
        de vous assurer que :
      </p>
      <ul>
        <li>- Votre mission est adaptée pour l’accueil de volontaires de 15 à 18 ans</li>
        <li>- Un tuteur sera présent durant la mission pour accompagner les volontaires du SNU</li>
      </ul>
    </BaseAlertDialog>
  </div>
</template>

<script>
import { string, object, number, date, array, ref } from 'yup'
import inputGeo from '@/mixins/input-geo'
import FormErrors from '@/mixins/form/errors'
import FormMissionParameters from '@/components/form/FormMissionParameters.vue'
import activitiesClassifierMixin from '@/mixins/activitiesClassifier'
import PrerequisitesInput from '@/components/custom/PrerequisitesInput.vue'
import ComboboxActivities from '@/components/custom/ComboboxActivities.vue'

export default defineNuxtComponent({
  components: {
    FormMissionParameters,
    PrerequisitesInput,
    ComboboxActivities,
  },
  mixins: [inputGeo, FormErrors, activitiesClassifierMixin],
  props: {
    mission: {
      type: Object,
      required: true,
    },
    structure: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      form: {
        ...this.mission,
        participations_max: this.mission.participations_max || '1',
        skills: this.mission.skills || [],
        state: this.mission.state || 'Brouillon',
        type: this.mission.type || 'Mission en présentiel',
        name: this.mission.template?.title || this.mission.name,
        template_id: this.mission.template?.id,
        domaine_id: this.mission.template?.domaine_id || this.mission.domaine_id,
        domaine_secondary_id:
          this.mission.template?.domaine_secondary_id || this.mission.domaine_secondary_id,
        activity_id: this.mission.template?.activity_id || this.mission.activity_id,
        activity_secondary_id:
          this.mission.template?.activity_secondary_id || this.mission.activity_secondary_id,
        objectif: this.mission.template?.objectif || this.mission.objectif,
        description: this.mission.template?.description || this.mission.description,
        illustrations: this.mission.illustrations || [],
        autonomy_zips: this.mission.autonomy_zips || [],
        tags: this.mission?.tags?.length ? this.mission?.tags : this.mission.template?.tags || [],
        date_type: this.mission.date_type || 'ponctual',
        is_online: this.mission.is_online ?? false,
      },
      formSchema: object({
        name: string()
          .min(3, 'Le titre est trop court')
          .matches(/^(Je|J'|J‘|J’)/, 'Le titre de la mission doit commencer par "Je" ou "J‘"')
          .required('Le titre est requis'),
        domaine_id: number().nullable().required('Le domaine principal est requis'),
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
        autonomy_precisions: string()
          .nullable()
          .test(
            'test-contains-email',
            "Les précisions sur la zone d'intervention ne doivent pas contenir d'email",
            // eslint-disable-next-line camelcase
            (autonomy_precisions) => {
              return !this.stringContainsEmail(autonomy_precisions)
            }
          )
          .test(
            'test-contains-url',
            "Les précisions sur la zone d'intervention ne doivent pas contenir de liens",
            // eslint-disable-next-line camelcase
            (autonomy_precisions) => {
              return !this.stringContainsUrl(autonomy_precisions)
            }
          )
          .test(
            'test-contains-phone',
            "Les précisions sur la zone d'intervention ne doivent pas contenir de téléphone",
            // eslint-disable-next-line camelcase
            (autonomy_precisions) => {
              return !this.stringContainsPhone(autonomy_precisions)
            }
          ),
        publics_beneficiaires: array()
          .transform((v) => (!v ? [] : v))
          .min(1, 'Sélectionnez au moins 1 public bénéficiaire')
          .required('Sélectionnez au moins 1 public bénéficiaire'),
        start_date: date()
          .required('La date de début est requise')
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
        end_date: date()
          .nullable()
          .when('start_date', {
            is: (startDate) => startDate instanceof Date,
            then: (schema) =>
              schema
                .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
                .min(ref('start_date'), 'La date de fin doit être supérieur à la date de début'),
          }),
        commitment__duration: string().nullable().required("La durée d'engagement est requise"),
        commitment__time_period: string()
          .nullable()
          .when(['date_type'], {
            is: (dateType) => dateType == 'recurring',
            then: (schema) => schema.required('La fréquence est requise'),
          }),
        recurrent_description: string()
          .nullable()
          .when(['date_type'], {
            is: (dateType) => dateType == 'recurring',
            then: (schema) => schema.required('Précisez les créneaux horaires pour le bénévole'),
          }),
        participations_max: number()
          .min(1, 'Le nombre de bénévole(s) recherché(s) doit être supérieur à 0')
          .required('Le nombre de bénévole(s) recherché(s) est requis'),
        department: string()
          .nullable()
          .when(['type'], {
            is: (type) => type == 'Mission en présentiel',
            then: (schema) => schema.required('Le département est requis'),
          }),
        address: string().nullable(),
        zip: string()
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) =>
              type == 'Mission en présentiel' &&
              !is_autonomy &&
              this.form.zip &&
              this.form.department,
            then: (schema) =>
              schema.test(
                'test-zip',
                'Le code postal et le département ne correspondent pas',
                () => {
                  const department = ['2A', '2B'].includes(this.form.department)
                    ? '20'
                    : this.form.department
                  return this.form.zip && this.form.zip.startsWith(department)
                }
              ),
          })
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy,
            then: (schema) => schema.nullable().required('Le code postal est requis'),
            otherwise: (schema) => schema.nullable(),
          }),
        city: string()
          .nullable()
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy,
            then: (schema) => schema.required('La ville est requise'),
            otherwise: (schema) => schema.nullable(),
          }),
        responsable_id: number()
          .nullable()
          .required('Le contact de la mission doit être renseigné'),
        snu_mig_places: number()
          .nullable()
          .when('is_snu_mig_compatible', {
            is: true,
            then: (schema) =>
              schema
                .min(1, 'Le nombre de volontaire(s) recherché(s) est incorrect (minimum: 1)')
                .required('Le nombre de volontaire(s) recherché(s) est requis'),
          }),
        autonomy_zips: array()
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => !is_autonomy || type !== 'Mission en présentiel',
            then: (schema) => schema.nullable(),
          })
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => type == 'Mission en présentiel' && is_autonomy,
            then: (schema) =>
              schema.min(1, 'Au moins un code postal requis').max(20, '20 codes postaux maximum'),
          })
          .when(['type', 'is_autonomy', 'department'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy, department) =>
              type == 'Mission en présentiel' && is_autonomy && department,
            then: (schema) =>
              schema.test(
                'test-zips',
                'Les codes postaux et le département ne correspondent pas',
                // eslint-disable-next-line camelcase
                (autonomy_zips) => {
                  const zips = autonomy_zips.map((i) => i.zip)
                  const department = ['2A', '2B'].includes(this.form.department)
                    ? '20'
                    : this.form.department
                  return zips.every((zip) => zip.startsWith(department))
                }
              ),
            otherwise: (schema) => schema.nullable(),
          }),
        prerequisites: array()
          .nullable()
          .test(
            'test-contains-email',
            "Les pré-requis ne doivent pas contenir d'email",
            (prerequisites) => {
              return (
                !prerequisites ||
                prerequisites.every((prerequisite) => !this.stringContainsEmail(prerequisite))
              )
            }
          )
          .test(
            'test-contains-url',
            'Les pré-requis ne doivent pas contenir de liens.',
            (prerequisites) => {
              return (
                !prerequisites ||
                prerequisites.every((prerequisite) => !this.stringContainsUrl(prerequisite))
              )
            }
          )
          .test(
            'test-contains-phone',
            'Les pré-requis ne doivent pas contenir de téléphone.',
            (prerequisites) => {
              return (
                !prerequisites ||
                prerequisites.every((prerequisite) => !this.stringContainsPhone(prerequisite))
              )
            }
          ),
        dates: array()
          .nullable()
          .test(
            'test-should-have-one-slot',
            'Il faut sélectionner au moins un créneau.',
            (dates) => {
              return this.form?.date_type === 'ponctual' && this.withSlots
                ? dates?.length > 0
                : true
            }
          ),
      }),
      activities: [],
      showSNUModal: false,
      withSlots: !((this.mission.start_date || this.mission.end_date) && !this.mission.dates),
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    structureId() {
      return this.form.structure_id ? this.form.structure_id : this.$route.params.id
    },
    isAdding() {
      return !this.mission.id
    },
    isDistance() {
      return this.form.type == 'Mission à distance'
    },
    isPresentiel() {
      return this.form.type == 'Mission en présentiel'
    },
    isAutonomy() {
      return this.form.is_autonomy
    },
    mediaPickerDomaineIds() {
      return [this.form.domaine_id]
    },
    isGeoFieldsDisabled() {
      if (['admin'].includes(this.$stores.auth.contextRole)) {
        return false
      }

      return true
    },
    inputGeoType() {
      return this.isAutonomy ? 'municipality' : undefined
    },
  },
  watch: {
    isAutonomy(val) {
      this.autocompleteOptions = []
    },
  },
  methods: {
    async fetch() {
      const promises = [this.fetchActivities()]
      if (!this.mission.template) {
        promises.push(this.fetchActivitiesClassifier())
      }
      await Promise.all(promises)
    },
    async fetchActivities() {
      const activities = await apiFetch('/activities?pagination=999')
      this.activities = activities.data
        .filter((item) => item.is_published || item.id === this.mission.activity_id)
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
    },
    handleTypeChange() {
      if (this.form.type === 'Mission à distance') {
        this.form.is_snu_mig_compatible = false
        this.form.snu_mig_places = null
        this.form.is_autonomy = false
        this.clearAddress()
      }
    },
    handleSelectedSkill(item) {
      this.form.skills = [...this.form.skills, item]
    },
    onRemovedSkill(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
    },
    handleSelectedTag(item) {
      this.form.tags = [...this.form.tags, item]
    },
    onRemovedTag(item) {
      this.form.tags = this.form.tags.filter((skill) => skill.id !== item.id)
    },
    onSNUChecked() {
      this.showSNUModal = true
    },
    handleSNUCancel() {
      this.form.is_snu_mig_compatible = false
      this.form.snu_mig_places = null
      this.showSNUModal = false
    },
    handleSNUConfirm() {
      this.showSNUModal = false
      if (!this.form.publics_volontaires) {
        this.form.publics_volontaires = ['Mineurs']
      } else if (!this.form.publics_volontaires.includes('Mineurs')) {
        this.form.publics_volontaires.push('Mineurs')
      }
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
          if (this.isAdding) {
            const mission = await apiFetch(`/structures/${this.structureId}/missions`, {
              method: 'POST',
              body: this.form,
            }).catch(() => {})
            if (this.$stores.auth.contextRole === 'responsable') {
              await this.$stores.auth.fetchUser()
            }
            this.$router.push(`/admin/missions/${mission.id}`)
          } else {
            const mission = await apiFetch(`/missions/${this.mission.id}`, {
              method: 'PUT',
              body: this.form,
            }).catch(() => {})
            this.$router.push(`/admin/missions/${mission.id}`)
          }
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleParametersChanged(formDates) {
      this.form = { ...this.form, ...formDates }
    },
    onMediaPickerChange(payload, field) {
      this.form[field].splice(payload.index, 1, payload.media)
    },
    handleSelectedAutonomyZip(selectedItem) {
      if (!this.form.autonomy_zips) {
        this.form.autonomy_zips = []
      }
      if (
        selectedItem &&
        !this.form.autonomy_zips.find((item) => item.zip == selectedItem.postcode)
      ) {
        this.form.autonomy_zips.push({
          zip: selectedItem.postcode,
          latitude: selectedItem.coordinates[1],
          longitude: selectedItem.coordinates[0],
          city: selectedItem.city,
        })
      }
    },
    onRemovedTagItem(value) {
      this.form.autonomy_zips = this.form.autonomy_zips.filter((item) => item.zip !== value.zip)
    },
    stringContainsEmail(string) {
      return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/is.test(string)
    },
    stringContainsUrl(string) {
      return /(http|ftp|mailto|www)/.test(string)
    },
    stringContainsPhone(string) {
      return /(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}/.test(
        string
      )
    },
    onInputActivity(payload) {
      if (payload && this.form.activity_secondary_id === payload) {
        this.$refs.comboboxSecondaryActivity?.$refs?.combobox?.reset()
      }
    },
    onEnter(payload) {
      //   console.log('onEnter', payload)
    },
  },
})
</script>
