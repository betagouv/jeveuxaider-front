<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-8">
      <Box>
        <Heading :level="3" class="mb-8">
          Description de la mission
        </Heading>
        <div class="space-y-10">
          <Alert>
            Consultez <a class="font-semibold underline" href="https://reserve-civique.crisp.help/fr/article/comment-bien-rediger-une-mission-1dizodt/" target="_blank">cet article</a> <ExternalLinkIcon class="h-3 w-3 inline" /> pour découvrir nos astuces pour rédiger une mission impactante.
          </Alert>
          <FormControl
            html-for="name"
            :label="Boolean(mission.template) ? 'ℹ️   Information' : 'Titre de la mission'"
            :required="!Boolean(mission.template)"
            :error="errors.name"
          >
            <div v-if="Boolean(mission.template)" class="text-sm mb-4">
              <div class="text-gray-500">
                Vous avez choisi d’utiliser un modèle de mission : certaines informations sont complétées par défaut et ne peuvent être modifiées.
                Si vous souhaitez adapter les contenus, nous vous recommandons de publier une <span class="underline">mission personnalisée</span>.
              </div>
            </div>
            <Input
              v-model="form.name"
              name="name"
              placeholder="Merci de rédiger le titre de votre mission à la première personne du singulier"
              :disabled="Boolean(mission.template)"
            />
            <Toggle
              v-if="$store.getters.contextRole === 'admin'"
              v-model="form.is_priority"
              :label="form.is_priority ? 'Prioritaire' : 'Non prioritaire'"
              description="Pour rendre la mission prioritaire"
            />
          </FormControl>
          <div class="grid grid-cols-2 gap-4">
            <FormControl
              label="Domaine d'action principal"
              html-for="domaine_id"
              :error="errors.domaine_id"
              required
            >
              <SelectAdvanced
                v-model="form.domaine_id"
                name="domaine"
                placeholder="Sélectionner un domaine"
                :options="$labels.domaines"
                :disabled="Boolean(mission.template)"
              />
            </FormControl>
            <FormControl
              label="Domaine d'action secondaire"
              html-for="domaine_secondary_id"
            >
              <SelectAdvanced
                v-model="form.domaine_secondary_id"
                name="domaine"
                placeholder="Sélectionner un domaine"
                :options="$labels.domaines.filter(
                  (domaine) => domaine.key != form.domaine_id
                )"
                :disabled="Boolean(mission.template)"
                clearable
              />
            </FormControl>
          </div>
          <FormControl
            v-if="activities.length"
            label="Activité"
            html-for="activity_id"
          >
            <Combobox
              v-model="form.activity_id"
              :value="form.activity_id"
              name="activity_id"
              placeholder="Sélectionner une activité"
              :options="activities"
              clearable
              attribute-key="id"
              attribute-label="name"
              :disabled="Boolean(mission.template)"
            />
          </FormControl>
          <FormControl
            label="Publics aidés"
            html-for="publics_beneficiaires"
            :error="errors.publics_beneficiaires"
            required
          >
            <CheckboxGroup
              v-model="form.publics_beneficiaires"
              name="publics_beneficiaires"
              variant="button"
              :options="$labels.mission_publics_beneficiaires"
            />
          </FormControl>
          <FormControl
            label="Présentation de la mission"
            html-for="objectif"
            :error="errors.objectif"
            required
          >
            <RichEditor
              v-model="form.objectif"
              placeholder="Décrivez la mission en quelques mots..."
              :disabled="Boolean(mission.template)"
            />
          </FormControl>
          <FormControl
            label="Précisions"
            html-for="description"
            required
            :error="errors.description"
          >
            <RichEditor
              v-model="form.description"
              placeholder="Précisez les détails et spécificités de la mission"
              :disabled="Boolean(mission.template)"
            />
          </FormControl>
          <FormControl
            label="Quelques mots pour motiver les bénévoles à participer"
            html-for="information"
            :error="errors.information"
          >
            <RichEditor
              v-model="form.information"
              placeholder="Incitez les bénévoles à candidater ..."
            />
          </FormControl>
          <FormControl
            label="Mission ouverte également aux"
            html-for="publics_volontaires"
          >
            <CheckboxGroup
              v-model="form.publics_volontaires"
              name="publics_volontaires"
              variant="button"
              :options="$labels.mission_publics_volontaires"
            />
          </FormControl>

          <FormControl
            v-if="!Boolean(mission.template)"
            label="Visuel d'illustration"
            html-for="illustrations"
          >
            <MediaPickerDomaine
              :class="[{'grid sm:grid-cols-2 gap-8': form.illustrations.length}]"
              collection="domaine__illustrations_mission"
              :domaine-ids="mediaPickerDomaineIds"
              :defaults="form.illustrations"
              :hide-pencil="!form.illustrations.length"
              @change="onMediaPickerChange($event, 'illustrations')"
            >
              <template #empty>
                <div class="grid md:grid-cols-2 group">
                  <div class="min-h-[120px] overflow-hidden rounded-t-lg md:rounded-tr-none md:rounded-l-lg">
                    <img
                      srcset="/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x"
                      alt="default"
                      class="w-full h-[143px] object-cover"
                    >
                  </div>
                  <div class="min-h-[120px] rounded-b-lg md:rounded-bl-none md:rounded-r-lg cursor-pointer border md:border-l-0 transition group-hover:border-jva-blue-500 flex items-center justify-center">
                    <div class="flex flex-col space-y-4 items-center">
                      <img src="/images/icons/icon_add_picture.svg" alt="Ajouter une image" width="36" height="36">
                      <div class="text-sm text-center text-jva-blue-500 font-bold">
                        Selectionnez un visuel<br>pour illustrer votre mission
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </MediaPickerDomaine>
          </FormControl>
        </div>
      </Box>

      <Box>
        <div class="grid gap-8">
          <div>
            <Heading :level="3" class="mb-6">
              Responsable de la mission
            </Heading>
            <div class="font-bold mb-3 text-sm">
              Le responsable de la mission est la personne qui sera en contact avec les bénévoles et qui sera chargé de les accompagner dans leur intégration dans la structure.
            </div>
            <div class="text-sm">
              Vous pouvez <nuxt-link class="underline" :to="`/admin/organisations/${structureId}#membres`">
                ajouter un nouveau membre
              </nuxt-link> à votre équipe pour vous répartir la publication de mission.
            </div>
          </div>
          <div>
            <FormControl
              label="Responsable de la mission"
              class=""
              html-for="contact_principal"
              required
              :error="errors.responsable_id"
            >
              <SelectAdvanced
                v-model="form.responsable_id"
                name="contact_principal"
                placeholder="Sélectionnez un responsable"
                :options="structure.members.map((member) => {return {key: member.profile.id, label: member.profile.full_name}})"
              />
            </FormControl>
          </div>
        </div>
      </Box>
    </div>
    <div class="lg:col-span-2 space-y-8 flex flex-col">
      <FormMissionParameters :initial-form="form" :errors="errors" @change="handleParametersChanged" />
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Lieu de la mission
        </Heading>
        <div class="space-y-8">
          <div>
            <RadioGroup v-model="form.type" :options="$labels.mission_types" variant="tabs" @updated="handleTypeChange" />
            <template v-if="isDistance">
              <div class="text-sm text-gray-600 leading-relaxed mt-4">
                <p><strong>Les missions à distance sont visibles par les bénévoles de toute la France, quelle que soit leur position géographique.</strong></p>
              </div>
              <FormHelperText class="mt-4">
                <p>Si votre mission porte sur un territoire spécifique, nous vous recommandons de proposer votre mission en présentiel et de cocher la case “En autonomie”.</p>
              </FormHelperText>
            </template>
          </div>

          <!-- <a class='text-jva-blue-500 hover:underline' href='/'>En savoir plus</a> -->
          <Toggle
            v-if="isPresentiel"
            v-model="form.is_autonomy"
            label="Mission à réaliser en autonomie"
            description="Le bénévole peut réaliser la mission sans l’encadrement du responsable."
          />

          <FormControl
            v-if="isPresentiel"
            label="Département"
            html-for="department"
            required
            :error="errors.department"
          >
            <Combobox
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez un département"
              :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
            />

            <FormHelperText v-if="isAutonomy" class="mt-4">
              <p>Pour une mission donnée, les zones d’intervention doivent se situer sur le même département. Si votre mission a lieu sur plusieurs départements, il vous faut créer une mission par département.</p>
            </FormHelperText>
          </FormControl>

          <template v-if="isPresentiel && isAutonomy">
            <FormControl
              label="Codes postaux de la zone d'intervention (jusqu'à 20)"
              html-for="autonomy_zips"
              :error="errors.autonomy_zips"
            >
              <InputAutocomplete
                key="input_autocomplete_autonomy"
                icon="LocationMarkerIcon"
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
                  <TagFormItem
                    v-for="item in form.autonomy_zips"
                    :key="item.zip"
                    :tag="item"
                    @removed="onRemovedTagItem"
                  >
                    {{ item.zip }}
                  </TagFormItem>
                </div>
              </div>
            </FormControl>

            <FormControl
              label="Précisions sur la zone d'intervention (villes, lieux, etc.)"
              html-for="autonomy_precisions"
              :error="errors.autonomy_precisions"
            >
              <RichEditor
                v-model="form.autonomy_precisions"
                placeholder="Précisez en quelques mots les zones d'intervention du bénévole en autonomie"
                class="autonomy_precisions_wrapper"
              />
            </FormControl>
          </template>

          <FormControl
            v-if="isPresentiel && !isAutonomy"
            label="Rechercher l'adresse du lieu de la mission"
            html-for="adress"
            required
          >
            <FormHelperText>Si l'adresse n'est pas reconnue veuillez saisir le nom de la ville.</FormHelperText>
            <InputAutocomplete
              icon="LocationMarkerIcon"
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
          </FormControl>

          <div v-if="isPresentiel && !isAutonomy" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FormControl
              class="lg:col-span-2"
              label="Adresse"
              html-for="address"
              :error="errors.address"
            >
              <Input
                v-model="form.address"
                name="address"
                placeholder="..."
                :disabled="isGeoFieldsDisabled"
              />
            </FormControl>

            <FormControl
              label="Code postal"
              html-for="zip"
              required
              :error="errors.zip"
            >
              <Input
                v-model="form.zip"
                name="zip"
                placeholder="..."
                :disabled="isGeoFieldsDisabled"
              />
            </FormControl>
            <FormControl
              label="Ville"
              html-for="city"
              required
              :error="errors.city"
            >
              <Input
                v-model="form.city"
                name="city"
                placeholder="..."
                :disabled="isGeoFieldsDisabled"
              />
            </FormControl>
            <template v-if="!isGeoFieldsDisabled">
              <FormControl
                label="Latitude"
                html-for="latitude"
                :error="errors.latitude"
              >
                <Input
                  v-model="form.latitude"
                  name="latitude"
                  placeholder="..."
                />
              </FormControl>
              <FormControl
                label="Longitude"
                html-for="longitude"
                :error="errors.longitude"
              >
                <Input
                  v-model="form.longitude"
                  name="longitude"
                  placeholder="..."
                />
              </FormControl>
            </template>
          </div>
        </div>
      </Box>
      <Box v-if="form.type === 'Mission en présentiel'" :padding="false">
        <div class="px-6 py-8 xl:py-10 xl:px-8">
          <div class="flex space-x-6">
            <img
              src="@/assets/images/snu-logo.png"
              alt="SNU"
              title="SNU"
              class="hidden lg:block h-10 lg:mt-2"
              data-not-lazy
            >
            <Heading :level="3" class="mb-8">
              Proposer cette mission aux jeunes volontaires du Service National Universel
            </Heading>
          </div>
          <div class="space-y-8">
            <Toggle
              v-model="form.is_snu_mig_compatible"
              label="Accueillir des <strong>bénévoles de 15 à 18 ans</strong> pour cette mission"
              @checked="onSNUChecked"
            />
            <FormControl
              v-if="form.is_snu_mig_compatible"
              label="Nombre de volontaires du snu acceptés"
              html-for="snu_mig_places"
              required
              :error="errors.snu_mig_places"
            >
              <Input
                v-model="form.snu_mig_places"
                name="snu_mig_places"
                type="number"
                suffix="volontaires"
              />
            </FormControl>
          </div>
        </div>
        <div class="bg-gray-50 rounded-b-lg">
          <div class="flex divide-x">
            <div class="py-5 w-1/2 text-center">
              <Link
                to="https://www.youtube.com/watch?v=2LlYM9C693E"
                icon="VideoCameraIcon"
                icon-class="h-5 mr-2"
                icon-position="left"
                class="flex justify-center !text-gray-900 text-sm"
                target="_blank"
                external
              >
                Le SNU en 30 secondes
              </Link>
            </div>
            <div class="py-5 w-1/2">
              <Link
                to="https://www.snu.gouv.fr/le-service-national-universel-29"
                target="_blank"
                external
                icon="LinkIcon"
                icon-class="h-5 mr-2"
                icon-position="left"
                class="flex justify-center !text-gray-900 text-sm"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Compétences recherchées
        </Heading>
        <div class="space-y-8">
          <FormControl label="compétences recherchées pour cette mission" html-for="algolia-search">
            <FormHelperText>Sélectionnez jusqu’à 3 compétences</FormHelperText>
            <AlgoliaSkillsInput
              :items="form.skills"
              @add-item="handleSelectedSkill"
            />
            <div>
              <div v-if="form.skills.length" class="mt-6">
                <div class="flex flex-wrap gap-2">
                  <TagFormItem
                    v-for="item in form.skills"
                    :key="item.id"
                    :tag="item"
                    @removed="onRemovedSkill"
                  >
                    {{ item.name }}
                  </TagFormItem>
                </div>
              </div>
            </div>
          </FormControl>
        </div>
      </Box>
    </div>
    <AlertDialog
      :is-open="showSNUModal"
      title="Point de vigilance"
      button-label="Je confirme"
      cancel-label="Je ne propose pas ma mission pour le SNU"
      theme="warning"
      @cancel="handleSNUCancel"
      @confirm="handleSNUConfirm"
    >
      <div class="text-sm text-gray-500 pr-4">
        <p class="mb-2">
          Avant de proposer votre mission sur la plateforme du Service National Universel (SNU), merci de vous assurer que :
        </p>
        <ul class="">
          <li>- Votre mission est adaptée pour l’accueil de volontaires de 15 à 18 ans</li>
          <li>- Un tuteur sera présent durant la mission pour accompagner les volontaires du SNU</li>
        </ul>
      </div>
    </AlertDialog>
  </div>
</template>

<script>
import { string, object, number, date, array, ref } from 'yup'
import inputGeo from '@/mixins/input-geo'
import FormErrors from '@/mixins/form/errors'
import AlgoliaSkillsInput from '@/components/section/search/AlgoliaSkillsSearch'
import FormMissionParameters from '~/components/form/FormMissionParameters.vue'

export default {
  components: {
    FormMissionParameters,
    AlgoliaSkillsInput
  },
  mixins: [inputGeo, FormErrors],
  props: {
    mission: {
      type: Object,
      required: true
    },
    structure: {
      type: Object,
      default: () => {}
    }
  },
  data () {
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
        domaine_secondary_id: this.mission.template?.domaine_secondary_id || this.mission.domaine_secondary_id,
        activity_id: this.mission.template?.activity_id || this.mission.activity_id,
        objectif: this.mission.template?.objectif || this.mission.objectif,
        description: this.mission.template?.description || this.mission.description,
        illustrations: this.mission.illustrations || [],
        autonomy_zips: this.mission.autonomy_zips || []
      },
      formSchema: object({
        name: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        domaine_id: number().nullable().required('Le domaine principal est requis'),
        objectif: string().required('La présentation est requise')
          .test(
            'test-contains-email',
            'La présentation ne doit pas contenir d\'email',
            (objectif) => {
              return !this.stringContainsEmail(objectif)
            }
          ).test(
            'test-contains-url',
            'La présentation ne doit pas contenir de liens.',
            (objectif) => {
              return !this.stringContainsUrl(objectif)
            }
          ).test(
            'test-contains-phone',
            'La présentation ne doit pas contenir de téléphone.',
            (objectif) => {
              return !this.stringContainsPhone(objectif)
            }
          ),
        description: string().required('Les précisions sont requises')
          .test(
            'test-contains-email',
            'Les précisions ne doivent pas contenir d\'email',
            (description) => {
              return !this.stringContainsEmail(description)
            }
          ).test(
            'test-contains-url',
            'Les précisions ne doivent pas contenir de liens.',
            (description) => {
              return !this.stringContainsUrl(description)
            }
          ).test(
            'test-contains-phone',
            'Les précisions ne doivent pas contenir de téléphone.',
            (description) => {
              return !this.stringContainsPhone(description)
            }
          ),
        information: string().nullable()
          .test(
            'test-contains-email',
            'Ce champ ne doit pas contenir d\'email',
            (information) => {
              return !this.stringContainsEmail(information)
            }
          ).test(
            'test-contains-url',
            'Ce champ ne doit pas contenir de liens',
            (information) => {
              return !this.stringContainsUrl(information)
            }
          ).test(
            'test-contains-phone',
            'Ce champ ne doit pas contenir de téléphone',
            (information) => {
              return !this.stringContainsPhone(information)
            }
          ),
        autonomy_precisions: string().nullable()
          .test(
            'test-contains-email',
            'Les précisions sur la zone d\'intervention ne doivent pas contenir d\'email',
            // eslint-disable-next-line camelcase
            (autonomy_precisions) => {
              return !this.stringContainsEmail(autonomy_precisions)
            }
          ).test(
            'test-contains-url',
            'Les précisions sur la zone d\'intervention ne doivent pas contenir de liens',
            // eslint-disable-next-line camelcase
            (autonomy_precisions) => {
              return !this.stringContainsUrl(autonomy_precisions)
            }
          ).test(
            'test-contains-phone',
            'Les précisions sur la zone d\'intervention ne doivent pas contenir de téléphone',
            // eslint-disable-next-line camelcase
            (autonomy_precisions) => {
              return !this.stringContainsPhone(autonomy_precisions)
            }
          ),
        publics_beneficiaires: array().transform(v => (!v ? [] : v)).min(1, 'Sélectionnez au moins 1 public bénéficiaire').required('Sélectionnez au moins 1 public bénéficiaire'),
        start_date: date()
          .required('La date de début est requise')
          .nullable()
          .transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        end_date: date().nullable().when(
          'start_date', {
            is: startDate => startDate instanceof Date,
            then: schema => schema.transform(v => (v instanceof Date && !isNaN(v) ? v : null)).min(ref('start_date'), 'La date de fin doit être supérieur à la date de début')
          }
        ),
        commitment__duration: string().nullable().required("La durée d'engagement est requise"),
        commitment__time_period: string().nullable().when(['date_type'], {
          is: dateType => dateType == 'recurring',
          then: schema => schema.required('La fréquence est requise')
        }),
        recurrent_description: string().nullable().when(['date_type'], {
          is: dateType => dateType == 'recurring',
          then: schema => schema.required('Précisez les créneaux horaires pour le bénévole')
        }),
        participations_max: number().min(1, 'Le nombre de bénévole(s) recherché(s) doit être supérieur à 0').required('Le nombre de bénévole(s) recherché(s) est requis'),
        department: string().nullable().when(['type'], {
          is: type => type == 'Mission en présentiel',
          then: schema => schema.required('Le département est requis')
        }),
        address: string().nullable(),
        zip: string()
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy && this.form.zip && this.form.department,
            then: schema => schema.test(
              'test-zip',
              'Le code postal et le département ne correspondent pas',
              () => {
                const department = ['2A', '2B'].includes(this.form.department) ? '20' : this.form.department
                return this.form.zip && this.form.zip.startsWith(department)
              })
          })
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy,
            then: schema => schema.nullable().required('Le code postal est requis'),
            otherwise: schema => schema.nullable()
          }),
        city: string().nullable().when(['type', 'is_autonomy'], {
          // eslint-disable-next-line camelcase
          is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy,
          then: schema => schema.required('La ville est requise'),
          otherwise: schema => schema.nullable()
        }),
        responsable_id: number().nullable().required('Le contact de la mission doit être renseigné'),
        snu_mig_places: number().nullable().when('is_snu_mig_compatible', {
          is: true,
          then: schema => schema.min(1, 'Le nombre de volontaire(s) recherché(s) est incorrect (minimum: 1)').required('Le nombre de volontaire(s) recherché(s) est requis')
        }),
        autonomy_zips: array()
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => !is_autonomy || type !== 'Mission en présentiel',
            then: schema => schema.nullable()
          })
          .when(['type', 'is_autonomy'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy) => type == 'Mission en présentiel' && is_autonomy,
            then: schema => schema.min(1, 'Au moins un code postal requis').max(20, '20 codes postaux maximum')
          })
          .when(['type', 'is_autonomy', 'department'], {
            // eslint-disable-next-line camelcase
            is: (type, is_autonomy, department) => type == 'Mission en présentiel' && is_autonomy && department,
            then: schema => schema.test(
              'test-zips',
              'Les codes postaux et le département ne correspondent pas',
              // eslint-disable-next-line camelcase
              (autonomy_zips) => {
                const zips = autonomy_zips.map(i => i.zip)
                const department = ['2A', '2B'].includes(this.form.department) ? '20' : this.form.department
                return zips.every(zip => zip.startsWith(department))
              }
            ),
            otherwise: schema => schema.nullable()
          })

      }),
      activities: [],
      showSNUModal: false
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: activities } = await this.$axios.get('/activities?pagination=999')
    this.activities = activities.data.filter(item => item.is_published || item.id === this.mission.activity_id)
  },
  computed: {
    structureId () {
      return this.form.structure_id ? this.form.structure_id : this.$route.params.id
    },
    isAdding () {
      return !this.mission.id
    },
    isDistance () {
      return this.form.type == 'Mission à distance'
    },
    isPresentiel () {
      return this.form.type == 'Mission en présentiel'
    },
    isAutonomy () {
      return this.form.is_autonomy
    },
    mediaPickerDomaineIds () {
      return [this.form.domaine_id]
    },
    isGeoFieldsDisabled () {
      if (['admin'].includes(this.$store.getters.contextRole)) {
        return false
      }

      return true
    },
    inputGeoType () {
      return this.isAutonomy ? 'municipality' : undefined
    }
  },
  watch: {
    isAutonomy (val) {
      this.autocompleteOptions = []
    }
  },
  methods: {
    handleTypeChange () {
      if (this.form.type === 'Mission à distance') {
        this.form.is_snu_mig_compatible = false
        this.form.snu_mig_places = null
        this.clearAddress()
      }
    },
    handleSelectedSkill (item) {
      this.$set(this.form, 'skills', [...this.form.skills, item])
    },
    onRemovedSkill (item) {
      this.form.skills = this.form.skills.filter(skill => skill.id !== item.id)
    },
    onSNUChecked () {
      this.showSNUModal = true
    },
    handleSNUCancel () {
      this.form.is_snu_mig_compatible = false
      this.form.snu_mig_places = null
      this.showSNUModal = false
    },
    handleSNUConfirm () {
      this.showSNUModal = false
      if (!this.form.publics_volontaires) {
        this.form.publics_volontaires = ['Mineurs']
      } else if (!this.form.publics_volontaires.includes('Mineurs')) {
        this.form.publics_volontaires.push('Mineurs')
      }
    },
    async handleSubmit (attributes) {
      if (this.loading) {
        return
      }
      this.loading = true

      if (attributes) {
        this.form = {
          ...this.form,
          ...attributes
        }
      }

      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.isAdding) {
            const { data: mission } = await this.$axios.post(`/structures/${this.structureId}/missions`, this.form).catch(() => {})
            this.$router.push(`/admin/missions/${mission.id}`)
          } else {
            const { data: mission } = await this.$axios.put(`/missions/${this.mission.id}`, this.form).catch(() => {})
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
    handleParametersChanged (formDates) {
      this.form = { ...this.form, ...formDates }
    },
    onMediaPickerChange (payload, field) {
      this.form[field].splice(payload.index, 1, payload.media)
    },
    handleSelectedAutonomyZip (selectedItem) {
      if (!this.form.autonomy_zips) {
        this.form.autonomy_zips = []
      }
      if (selectedItem && !this.form.autonomy_zips.find(item => item.zip == selectedItem.postcode)) {
        this.form.autonomy_zips.push({
          zip: selectedItem.postcode,
          latitude: selectedItem.coordinates[1],
          longitude: selectedItem.coordinates[0],
          city: selectedItem.city
        })
      }
    },
    onRemovedTagItem (value) {
      this.form.autonomy_zips = this.form.autonomy_zips.filter(item => item.zip !== value.zip)
    },
    stringContainsEmail (string) {
      return (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/si).test(string)
    },
    stringContainsUrl (string) {
      return (/(http|ftp|mailto|www)/).test(string)
    },
    stringContainsPhone (string) {
      return (/(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}/).test(string)
    }
  }
}
</script>

<style lang="postcss" scoped>
.autonomy_precisions_wrapper {
  :deep(.ck-editor__editable) {
    min-height: 80px;
  }
}

</style>
