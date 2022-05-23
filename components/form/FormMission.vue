<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-8">
      <Box>
        <Heading :level="3" class="mb-8">
          Description de la mission
        </Heading>
        <div class="space-y-10">
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
              placeholder="Décrivez l'action du bénévole en une phrase"
              :disabled="Boolean(mission.template)"
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
          <template v-if="['admin'].includes($store.getters.contextRole)">
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
          </template>
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
              class="grid sm:grid-cols-2 gap-8"
              collection="domaine__illustrations_mission"
              :domaine-ids="mediaPickerDomaineIds"
              :defaults="form.illustrations"
              @change="onMediaPickerChange($event, 'illustrations')"
            />
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
                :options="structure.members.map((member) => {return {key: member.id, label: member.full_name}})"
              />
            </FormControl>
          </div>
        </div>
      </Box>
    </div>
    <div class="lg:col-span-2 space-y-8 flex flex-col">
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Paramètres
        </Heading>
        <div class="space-y-12">
          <Toggle
            v-if="$store.getters.contextRole === 'admin'"
            v-model="form.is_priority"
            :label="form.is_priority ? 'Prioritaire' : 'Non prioritaire'"
            description="Pour rendre la mission prioritaire"
          />
          <div class="grid grid-cols-2 gap-4">
            <FormControl
              label="Début de la mission"
              html-for="start_date"
              required
              :error="errors.start_date"
            >
              <InputDate v-model="form.start_date" required name="start_date" />
              <!-- <Input
                v-model="form.start_date"
                name="start_date"
                type="datetime-local"
              /> -->
            </FormControl>
            <FormControl
              label="Fin de la mission"
              html-for="end_date"
              :error="errors.end_date"
            >
              <InputDate v-model="form.end_date" name="end_date" />
              <!-- <Input
                v-model="form.end_date"
                name="end_date"
                type="datetime-local"
              /> -->
            </FormControl>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <FormControl
              label="Durée d'engagement min."
              html-for="commitment__duration"
              required
              :error="errors.commitment__duration"
            >
              <SelectAdvanced
                v-model="form.commitment__duration"
                name="commitment__duration"
                placeholder="Durée"
                :options="$labels.duration"
              />
            </FormControl>
            <FormControl
              label="Fréquence"
              html-for="commitment__time_period"
            >
              <SelectAdvanced
                v-model="form.commitment__time_period"
                name="commitment__time_period"
                placeholder="Fréquence"
                :options="$labels.time_period"
              />
            </FormControl>
          </div>
          <FormControl
            label="Nombre de bénévoles recherchés"
            html-for="participations_max"
            required
            :error="errors.participations_max"
          >
            <Input
              v-model="form.participations_max"
              name="participations_max"
              type="number"
              suffix="bénévoles"
            />
          </FormControl>
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Lieu de la mission
        </Heading>
        <div class="space-y-8">
          <div>
            <RadioGroup v-model="form.type" :options="$labels.mission_types" variant="tabs" @updated="handleTypeChange" />
            <FormHelperText v-if="isPresentiel" class="mt-4">
              Recruter au plus près du lieu de mission et des bénéficiaires permet de faciliter l'engagement des bénévoles. Vous avez la possibilité de dupliquer cette mission sur plusieurs lieux.
            </FormHelperText>
          </div>
          <FormControl
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
          </FormControl>
          <FormControl
            v-if="isPresentiel"
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
              @selected="handleSelectedGeo"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
          </FormControl>

          <div v-if="isPresentiel" class="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
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
  </div>
</template>

<script>
import { string, object, number, date, array, ref } from 'yup'
import inputGeo from '@/mixins/input-geo'
import FormErrors from '@/mixins/form/errors'
import AlgoliaSkillsInput from '@/components/section/search/AlgoliaSkillsSearch'

export default {
  components: {
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
        activity_id: this.mission.template?.activity_id || this.mission.activity_id,
        objectif: this.mission.template?.objectif || this.mission.objectif,
        description: this.mission.template?.description || this.mission.description,
        illustrations: this.mission.illustrations || []
      },
      formSchema: object({
        name: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        domaine_id: number().nullable().required('Le domaine principal est requis'),
        objectif: string().required("L'objectif est requis"),
        description: string().required('La description est requise'),
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
        commitment__duration: string().nullable().required("La durée minimum d'engagement est requise"),
        participations_max: number().min(1, 'Le nombre de bénévole(s) recherché(s) doit être supérieur à 0').required('Le nombre de bénévole(s) recherché(s) est requis'),
        department: string().nullable().required('Le département est requis'),
        address: string().nullable(),
        zip: string().nullable().when('type', {
          is: 'Mission en présentiel',
          then: schema => schema.required('Le code postal est requis'),
          otherwise: schema => schema.nullable()
        }),
        city: string().nullable().when('type', {
          is: 'Mission en présentiel',
          then: schema => schema.required('La ville est requise'),
          otherwise: schema => schema.nullable()
        }),
        responsable_id: number().nullable().required('Le contact de la mission doit être renseigné'),
        snu_mig_places: number().nullable().when('is_snu_mig_compatible', {
          is: true,
          then: schema => schema.min(1, 'Le nombre de volontaire(s) recherché(s) est incorrect (minimum: 1)').required('Le nombre de volontaire(s) recherché(s) est requis')
        })
        // latitude: string().nullable().when(['state', 'type'], {
        //   is: (state, type) => state == 'Validée' && type == 'Mission en présentiel',
        //   then: schema => schema.required('La latitude est obligatoire'),
        //   otherwise: schema => schema.nullable()
        // }),
        // longitude: string().nullable().when(['state', 'type'], {
        //   is: (state, type) => state == 'Validée' && type == 'Mission en présentiel',
        //   then: schema => schema.required('La longitude est obligatoire'),
        //   otherwise: schema => schema.nullable()
        // })
      }),
      activities: []
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: activities } = await this.$axios.get('/activities?pagination=0')
    this.activities = activities.data.filter(item => item.is_published || item.id === this.mission.activity_id)
  },
  computed: {
    structureId () {
      return this.form.structure_id ? this.form.structure_id : this.$route.params.id
    },
    isAdding () {
      return !this.mission.id
    },
    isPresentiel () {
      return this.form.type == 'Mission en présentiel'
    },
    mediaPickerDomaineIds () {
      return [this.form.domaine_id]
    },
    isGeoFieldsDisabled () {
      if (['admin'].includes(this.$store.getters.contextRole)) {
        return false
      }

      // Hack - Dom Tom (Nouvelle Calédonie & Polynésie française)
      if (['responsable'].includes(this.$store.getters.contextRole)) {
        const organisation = this.$store.getters.profile?.structures.find(structure => structure.id == this.$store.getters.contextableId)
        if (['987', '988'].includes(organisation?.department)) {
          return false
        }
      }

      return true
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
    onMediaPickerChange (payload, field) {
      this.form[field].splice(payload.index, 1, payload.media)
    }
  }
}
</script>
