<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Description de la mission
        </Heading>
        <div class="space-y-10">
          <div>
            <div class="text-sm mb-4">
              <div class="text-xs uppercase mb-1 font-semibold text-gray-700">
                ℹ️  Information
              </div>
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
          </div>
          <div class="grid grid-cols-2 gap-4">
            <FormControl
              label="Domaine d'action principal"
              html-for="domaine_id"
              required
            >
              <SelectAdvanced
                v-model="form.domaine_id"
                name="domaine"
                placeholder="Sélectionner un domaine"
                :options="domaines"
                :disabled="Boolean(mission.template)"
              />
            </FormControl>
            <FormControl
              label="Domaine d'action secondaire"
              html-for="domaine_id"
            >
              <SelectAdvanced
                v-model="form.domaine_secondaire"
                name="domaine"
                placeholder="Sélectionner un domaine"
                :options="domaines.filter(
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
          >
            <CheckboxGroup
              v-model="form.publics_beneficiaires"
              name="publics_beneficiaires"
              variant="button"
              :options="mission_publics_beneficiaires"
            />
          </FormControl>
          <FormControl
            label="Présentation de la mission"
            html-for="objectif"
            placeholder="Décrivez la mission en quelques mots..."
            required
          >
            <Textarea
              v-model="form.objectif"
              name="objectif"
              :disabled="Boolean(mission.template)"
            />
          </FormControl>
          <FormControl
            label="Précisions"
            html-for="description"
            placeholder="Précisez les détails et spécificités de la mission"
          >
            <Textarea
              v-model="form.description"
              name="description"
              :disabled="Boolean(mission.template)"
            />
          </FormControl>
          <FormControl
            label="Quelques mots pour motiver les bénévoles à participer"
            html-for="information"
            placeholder="Incitez les bénévoles à candidater ..."
          >
            <Textarea
              v-model="form.information"
              name="information"
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
              :options="mission_publics_volontaires"
            />
          </FormControl>
        </div>
      </Box>
    </div>
    <div class="lg:col-span-2 space-y-8">
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Paramètres
        </Heading>
        <div class="space-y-12">
          <div class="grid grid-cols-2 gap-4">
            <FormControl
              label="Début de la mission"
              html-for="start_date"
              required
            >
              <Input
                v-model="form.start_date"
                name="start_date"
                type="datetime-local"
              />
            </FormControl>
            <FormControl
              label="Début de fin"
              html-for="end_date"
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
            >
              <SelectAdvanced
                v-model="form.commitment__duration"
                name="commitment__duration"
                placeholder="Durée"
                :options="duration"
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
                :options="time_period"
              />
            </FormControl>
          </div>
          <FormControl
            label="Nombre de bénévoles recherchés"
            html-for="participations_max"
            required
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
          Présentiel / à distance
          <br>
          <FormControl
            label="Département"
            html-for="department"
            required
          >
            <SelectAdvanced
              v-model="form.department"
              name="department"
              placeholder="Département"
              :options="departments"
            />
          </FormControl>
          <FormControl
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
              @selected="handleSelectedAdress"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
          </FormControl>
          <div class="grid grid-cols-12 gap-2">
            <FormControl
              class="col-span-5"
              label="Adresse"
              html-for="address"
            >
              <Input
                v-model="form.address"
                name="address"
                disabled
              />
            </FormControl>
            <FormControl
              class="col-span-3"
              label="Code postal"
              html-for="zip"
            >
              <Input
                v-model="form.zip"
                name="zip"
                disabled
              />
            </FormControl>
            <FormControl
              class="col-span-4"
              label="Ville"
              html-for="city"
            >
              <Input
                v-model="form.city"
                name="city"
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
          <FormControl
            label="compétences recherchées pour cette mission"
            html-for="autocomplete-skills"
          >
            <FormHelperText>Sélectionnez jusqu’à 3 compétences</FormHelperText>
            <InputAutocomplete
              name="autocomplete-skills"
              placeholder="Ex: Communication, Action sociale, accompagnement..."
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              @selected="handleSelectedAdress"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
          </FormControl>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import labels from '@/utils/labels.json'
import inputGeo from '@/mixins/input-geo'

export default {
  mixins: [inputGeo],
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      domaines: labels.domaines,
      mission_publics_beneficiaires: labels.mission_publics_beneficiaires,
      mission_publics_volontaires: labels.mission_publics_volontaires,
      duration: labels.duration,
      time_period: labels.time_period,
      departments: labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } }),
      form: {
        name: this.mission.template?.title,
        participations_max: '1',
        skills: [],
        state: 'Brouillon',
        type: 'Mission en présentiel',
        domaine_id: this.mission.template?.domaine_id,
        objectif: this.mission.template?.objectif,
        description: this.mission.template?.description,
        ...this.mission
      }
    }
  },
  computed: {
    mode () {
      return this.mission.id ? 'edit' : 'add'
    }
  },
  methods: {
    handleSelectedAdress (item) {
      if (!item) {
        this.clearAddress()
        return
      }
      this.$set(this.form, 'address', item.name != item.city ? item.name : null)
      this.$set(this.form, 'zip', item.postcode)
      this.$set(this.form, 'city', item.city)
      this.$set(this.form, 'latitude', item.coordinates[1])
      this.$set(this.form, 'longitude', item.coordinates[0])
    },
    clearAddress () {
      this.form.address = ''
      this.form.zip = ''
      this.form.city = ''
      this.form.latitude = ''
      this.form.longitude = ''
    }
  }
}
</script>
