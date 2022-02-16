<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Informations générales
        </Heading>
        <div class="space-y-10">
          <FormControl
            label="Nom de votre organisation"
            html-for="name"
            required
            :error="errors.name"
          >
            <Input
              v-model="form.name"
              name="name"
              placeholder="Nom de votre organisation"
              @blur="validate('name')"
            />
          </FormControl>
          <FormControl label="Statut juridique" html-for="statut_juridique" required :error="errors.statut_juridique">
            <SelectAdvanced
              key="statut_juridique"
              v-model="form.statut_juridique"
              name="statut_juridique"
              placeholder="Sélectionnez votre statut juridique"
              :options="$labels.structure_legal_status"
              @blur="validate('statut_juridique')"
            />
          </FormControl>
          <FormControl
            v-if="form.statut_juridique == 'Association'"
            label="Disposez vous d'agréments ?"
            html-for="association_types"
          >
            <SelectAdvancedMultiple
              v-model="form.association_types"
              name="association_types"
              placeholder="Sélectionnez vos agréments"
              :options="$labels.association_types"
              clearable
            />
          </FormControl>
          <FormControl
            v-if="form.statut_juridique == 'Organisation publique'"
            label="Type de votre organisation publique"
            html-for="structure_publique_type"
          >
            <SelectAdvanced
              key="structure_publique_type"
              v-model="form.structure_publique_type"
              name="structure_publique_type"
              placeholder="Sélectionnez le type de votre organisation publique"
              :options="$labels.structure_publique_types"
              clearable
            />
          </FormControl>

          <FormControl
            v-if="
              form.statut_juridique == 'Organisation publique' &&
                (form.structure_publique_type == 'Service de l\'Etat' ||
                  form.structure_publique_type == 'Etablissement public')
            "
            :label="form.structure_publique_type"
            html-for="structure_publique_etat_type"
          >
            <SelectAdvanced
              key="structure_publique_etat_type"
              v-model="form.structure_publique_etat_type"
              name="structure_publique_etat_type"
              placeholder="Choisissez une option"
              :options="$labels.structure_publique_etat_types"
              clearable
            />
          </FormControl>

          <FormControl
            v-if="form.statut_juridique == 'Organisation privée'"
            label="Type de votre organisation privée"
            html-for="structure_privee_type"
          >
            <SelectAdvanced
              key="structure_privee_type"
              v-model="form.structure_privee_type"
              name="structure_privee_type"
              placeholder="Sélectionnez le type de votre organisation privée"
              :options="$labels.structure_privee_types"
              clearable
            />
          </FormControl>

          <FormControl label="Domaines d'action" html-for="domaines" required :error="errors.domaines">
            <CheckboxGroup
              v-model="form.domaines"
              name="domaines"
              variant="button"
              :options="$labels.domaines"
              is-model
            />
          </FormControl>
          <FormControl label="Publics bénéficiaires" html-for="publics_beneficiaires" required :error="errors.publics_beneficiaires">
            <CheckboxGroup
              v-model="form.publics_beneficiaires"
              name="publics_beneficiaires"
              variant="button"
              :options="$labels.mission_publics_beneficiaires"
            />
          </FormControl>
          <Heading :level="3" class="mb-8">
            Votre organisation en quelques mots
          </Heading>
          <FormControl
            label="À propos de votre organisation"
            html-for="description"
            required
            :error="errors.description"
          >
            <FormHelperText class="pb-4">
              Cette description doit expliquer votre raison d'être et susciter le désir d'engagement des milliers bénévoles découvrant votre organisation sur la plateforme JeVeuxAider. Cette description apparaîtra sur votre future page vitrine et sur l'ensemble de vos missions de bénévolat publiées sur la plateforme.
            </FormHelperText>
            <Textarea
              v-model="form.description"
              name="name"
              placeholder="Dites-nous tout à propos de votre organisation..."
              :rows="10"
              @blur="validate('description')"
            />
          </FormControl>
          <Heading :level="3" class="mb-8">
            Votre organisation sur Internet
          </Heading>
          <div class="grid grid-cols-2 gap-4">
            <FormControl
              label="Email public"
              html-for="email"
              :error="errors.email"
            >
              <Input
                v-model="form.email"
                name="email"
                placeholder="contact@mon-organisation.fr"
                @blur="validate('email')"
              />
            </FormControl>
            <FormControl
              label="Téléphone public"
              html-for="phone"
              :error="errors.phone"
            >
              <Input
                v-model="form.phone"
                name="phone"
                placeholder="01 23 45 67 89"
                @blur="validate('phone')"
              />
            </FormControl>
            <FormControl
              label="Site internet"
              html-for="website"
              :error="errors.website"
            >
              <Input
                v-model="form.website"
                name="website"
                placeholder="https://www.votresite.fr"
                @blur="validate('website')"
              />
            </FormControl>
            <FormControl
              label="Page Facebook"
              html-for="facebook"
              :error="errors.facebook"
            >
              <Input
                v-model="form.facebook"
                name="facebook"
                placeholder="https://facebook.com/votrepage"
                @blur="validate('facebook')"
              />
            </FormControl>
            <FormControl
              label="Page Twitter"
              html-for="twitter"
              :error="errors.twitter"
            >
              <Input
                v-model="form.twitter"
                name="twitter"
                placeholder="https://twitter.com/votrepage"
                @blur="validate('twitter')"
              />
            </FormControl>
            <FormControl
              label="Page Instagram"
              html-for="instagram"
              :error="errors.instagram"
            >
              <Input
                v-model="form.instagram"
                name="instagram"
                placeholder="https://instagram.com/votrepage"
                @blur="validate('instagram')"
              />
            </FormControl>
            <FormControl
              label="URL de donation"
              html-for="donation"
              :error="errors.donation"
            >
              <Input
                v-model="form.donation"
                name="donation"
                placeholder="URL de votre page Helloasso, Microdon, Ulule, etc..."
                @blur="validate('donation')"
              />
            </FormControl>
          </div>
        </div>
      </Box>
    </div>
    <div class="lg:col-span-2 space-y-8">
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Adresse de l'organisation
        </Heading>
        <div class="space-y-6">
          <FormControl label="Département de votre organisation" html-for="department" required :error="errors.department">
            <SelectAdvanced
              key="department"
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez votre département"
              :options="$labels.departments.map((item) => { return {key: item.key, label: `${item.key} - ${item.label}`}})"
              @blur="validate('department')"
            />
          </FormControl>
          <FormControl label="Saisissez l'adresse de votre organisation" html-for="autocomplete" required :error="errors.address">
            <InputAutocomplete
              icon="LocationMarkerIcon"
              name="autocomplete"
              label="Autocomplete"
              placeholder="Ex: 14 rue de Rivoli, Paris"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              @selected="handleSelectedGeo"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
          </FormControl>
          <FormControl
            label="Addresse"
            html-for="address"
            required
          >
            <Input
              v-model="form.address"
              name="address"
              disabled
              placeholder="Ex: 14 rue de Rivoli"
            />
          </FormControl>
          <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <FormControl
              label="Code postal"
              html-for="zip"
              required
            >
              <Input
                v-model="form.zip"
                name="zip"
                placeholder="Ex: 75001"
                disabled
              />
            </FormControl>
            <FormControl
              label="Ville"
              html-for="city"
              required
            >
              <Input
                v-model="form.city"
                name="city"
                disabled
                placeholder="Ex: Paris"
              />
            </FormControl>
          </div>
        </div>
      </Box>
      <Box v-if="form.statut_juridique !== 'Collectivité'" padding="sm">
        <Heading :level="3" class="mb-4">
          Réseau national ou territorial
        </Heading>
        <FormHelperText class="mb-6">
          Si votre organisation est membre d'un réseau national ou territorial qui figure dans le menu déroulant du champ ci-dessous, sélectionnez-le. Vous permettrez à la tête de réseau de visualiser les missions et bénévoles rattachés à votre organisation. Vous faciliterez également la validation de votre organisation par les autorités territoriales lors de votre inscription.
        </FormHelperText>
        <FormControl
          label="Faites-vous partie d'un réseau national ?"
          html-for="tete_de_reseau_id"
          required
        >
          <InputAutocomplete
            name="autocomplete"
            label="Autocomplete"
            placeholder="Choisissez un réseau"
            :options="autocompleteReseauxOptions"
            @selected="handleSelectedReseau"
            @fetch-suggestions="onFetchReseauxSuggestions"
          />
        </FormControl>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Visuels d'illustration de l'organisation
        </Heading>
        <div class="space-y-8">
          @todo
        </div>
      </Box>
    </div>
    <div class="flex lg:hidden flex-col gap-2 flex-shrink-0 items-end justify-end">
      <Button size="xl" variant="green" @click.native="$refs.formMission.handleSubmit()">
        Enregistrer
      </Button>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import inputGeo from '@/mixins/input-geo'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [inputGeo, FormErrors],
  props: {
    structure: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        ...this.structure
      },
      formSchema: object({
        name: string().required('Un nom est requis'),
        statut_juridique: string().required('Un statut juridique est requis'),
        department: string().nullable().required('Un département est requis'),
        address: string().nullable().required('Une adresse est requise'),
        domaines: array().min(1, 'Au moins 1 domaine d\'action'),
        publics_beneficiaires: array().min(1, 'Au moins 1 public bénéficiaire'),
        description: string().nullable().min(200, 'La description doit contenir au moins 200 caractères').required('Une description est requise'),
        email: string().nullable().email("Le format de l'email public est incorrect"),
        website: string().nullable().url(),
        facebook: string().nullable().url(),
        twitter: string().nullable().url(),
        instagram: string().nullable().url(),
        donation: string().nullable().url(),
        phone: string().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').required()
      }),
      autocompleteReseauxOptions: []
    }
  },
  methods: {
    handleSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          const { data: structure } = await this.$axios.put(`/structures/${this.structure.id}`, this.form)
          this.$router.push(`/admin/organisations/${structure.id}`)
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async onFetchReseauxSuggestions (value) {
      const res = await this.$axios.get('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 6
        }
      })
      this.autocompleteReseauxOptions = res.data.data
    },
    handleSelectedReseau (reseau) {
      this.form.tete_de_reseau_id = reseau ? reseau.id : null
    }
  }
}
</script>
