<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Description de la mission
        </Heading>
        <div class="space-y-10">
          <FormControl
            html-for="name"
            :label="Boolean(mission.template) ? 'ℹ️  Information' : 'Titre de la mission'"
            :required="!Boolean(mission.template)"
            :error="errors.name"
          >
            <div v-if="Boolean(mission.template)" class="text-sm mb-4">
              <div class="text-gray-500">
                Ce modèle de mission vient pré-remplir certaines informations.
                Ils ne sont donc pas éditables. Si vous souhaitez les éditer, préférez une <span class="underline">mission libre ›</span>
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
              :domaine-ids="[form.domaine_id]"
              :defaults="form.illustrations"
              @change="onMediaPickerChange($event, 'illustrations')"
            />
          </FormControl>
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
              <Input
                v-model="form.start_date"
                name="start_date"
                type="datetime-local"
              />
            </FormControl>
            <FormControl
              label="Fin de la mission"
              html-for="end_date"
              :error="errors.end_date"
            >
              <Input
                v-model="form.end_date"
                name="end_date"
                type="datetime-local"
              />
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
              html-for="commitment_frequency"
            >
              <SelectAdvanced
                v-model="form.commitment_frequency"
                name="commitment_frequency"
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
            <SelectAdvanced
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez un département"
              :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
            />
          </FormControl>
          <FormControl
            v-if="isPresentiel"
            label="Rechercher l'adresse du lieu de la mission"
            html-for="autocomplete-place"
            required
          >
            <FormHelperText>Si l'adresse n'est pas reconnue veuillez saisir le nom de la ville.</FormHelperText>
            <InputAutocomplete
              icon="LocationMarkerIcon"
              name="autocomplete-place"
              label="Autocomplete"
              placeholder="Commencer à taper une adresse"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              @selected="handleSelectedGeo"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
          </FormControl>
          <div v-if="isPresentiel" class="grid grid-cols-12 gap-2">
            <FormControl
              class="col-span-5"
              label="Adresse"
              html-for="address"
              :error="errors.address"
            >
              <Input
                v-model="form.address"
                name="address"
                placeholder="..."
                disabled
              />
            </FormControl>
            <FormControl
              class="col-span-3"
              label="Code postal"
              html-for="zip"
              :error="errors.zip"
            >
              <Input
                v-model="form.zip"
                name="zip"
                placeholder="..."
                disabled
              />
            </FormControl>
            <FormControl
              class="col-span-4"
              label="Ville"
              html-for="city"
              :error="errors.city"
            >
              <Input
                v-model="form.city"
                name="city"
                placeholder="..."
                disabled
              />
            </FormControl>
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
    <Box class="lg:col-span-5">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-3 lg:mr-8">
          <Heading :level="3" class="mb-6">
            Contact principal de la mission
          </Heading>
          <div class="font-bold mb-3 text-sm">
            Les notifications lors de la prise de contact d'un bénévole concernant cette mission seront envoyées à cette personne.
          </div>
          <div class="text-sm">
            Vous pouvez également <a class="underline opacity-25" href="/todo">
              ajouter un nouveau membre
            </a> à votre équipe.
          </div>
        </div>
        <div class="lg:col-span-2 space-y-12">
          <FormControl
            label="Contact principal"
            class="lg:mt-10"
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
</template>

<script>
import { string, object, number, date, array } from 'yup'
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
        start_date: date().nullable().required('La date de début est requise').transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        end_date: date().nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)).when(
          'start_date',
          (startDate, schema) => startDate && schema.min(startDate, 'La date de fin doit être supérieur à la date de début')),
        commitment__duration: string().nullable().required("La durée minimum d'engagement est requise"),
        participations_max: number().min(1, 'Le nombre de bénévole recherché doit être supérieur à 1').required('Le nombre de bénévole recherché est requis'),
        department: string().nullable().required('Le département est requis'),
        address: string().nullable().when('type', {
          is: 'Mission en présentiel',
          then: schema => schema.required("L'adresse est requise"),
          otherwise: schema => schema.nullable()
        }),
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
        responsable_id: number().nullable().required('Le contact de la mission doit être renseigné')
      })
    }
  },
  computed: {
    structureId () {
      return this.$route.params.id
    },
    isAdding () {
      return !this.mission.id
    },
    isPresentiel () {
      return this.form.type == 'Mission en présentiel'
    }
  },
  methods: {
    handleTypeChange () {
      if (this.form.type === 'Mission à distance') {
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
            const { data: mission } = await this.$axios.post(`/structures/${this.structureId}/missions`, this.form)
            this.$router.push(`/admin/missions/${mission.id}`)
          } else {
            const { data: mission } = await this.$axios.put(`/missions/${this.mission.id}`, this.form)
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
