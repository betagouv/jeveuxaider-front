<template>
  <div class="relative">
    <client-only>
      <portal
        to="sidebar"
      >
        <div class="text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <Steps
          :steps="steps"
        />
      </portal>
    </client-only>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        À propos de
        <span class="font-bold">{{ form.name }}</span> !
      </h1>
    </div>
    <div class="max-w-xl mx-auto">
      <div
        class="px-8 py-6 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Complétez les informations suivantes liés à votre organisation
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
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
              v-model="form.statut_juridique"
              name="statut_juridique"
              placeholder="Sélectionnez votre statut juridique"
              :options="options.structure_legal_status"
              disabled
              @blur="validate('statut_juridique')"
            />
          </FormControl>
          <FormControl
            v-if="form.statut_juridique == 'Association'"
            label="Disposez vous d'agréments ?"
            html-for="association_types"
          >
            <SelectAdvanced
              v-model="form.association_types"
              name="association_types"
              placeholder="Sélectionnez votre agrément"
              :options="options.association_types"
              clearable
            />
          </FormControl>
          <FormControl
            v-if="form.statut_juridique == 'Organisation publique'"
            label="Type de votre organisation publique"
            html-for="structure_publique_type"
          >
            <SelectAdvanced
              v-model="form.structure_publique_type"
              name="structure_publique_type"
              placeholder="Sélectionnez le type de votre organisation publique"
              :options="options.structure_publique_types"
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
              v-model="form.structure_publique_etat_type"
              name="structure_publique_etat_type"
              placeholder="Choisissez une option"
              :options="options.structure_publique_etat_types"
              clearable
            />
          </FormControl>
          <FormControl
            v-if="form.statut_juridique == 'Organisation privée'"
            label="Type de votre organisation privée"
            html-for="structure_privee_type"
          >
            <SelectAdvanced
              v-model="form.structure_privee_type"
              name="structure_privee_type"
              placeholder="Sélectionnez le type de votre organisation publique"
              :options="options.structure_privee_types"
              clearable
            />
          </FormControl>
          <FormControl label="Choisissez les domaines que couvre votre organisation" html-for="domaines" required :error="errors.domaines">
            <CheckboxGroup
              v-model="form.domaines"
              name="domaines"
              variant="button"
              :options="options.domaines"
            />
          </FormControl>
          <FormControl label="Choisissez les publics bénéficiaires de vos missions" html-for="publics_beneficiaires" required :error="errors.publics_beneficiaires">
            <CheckboxGroup
              v-model="form.publics_beneficiaires"
              name="publics_beneficiaires"
              variant="button"
              :options="options.mission_publics_beneficiaires"
            />
          </FormControl>
          <FormControl label="Département de votre organisation" html-for="department" required :error="errors.department">
            <SelectAdvanced
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez votre département"
              :options="options.departments.map((item) => { return {key: item.key, label: `${item.key} - ${item.label}`}})"
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

          <FormControl
            v-if="form.statut_juridique !== 'Collectivité'"
            label="Faites-vous partie d'un réseau national ?"
            html-for="tete_de_reseau_id"
            required
          >
            <InputAutocomplete
              name="autocomplete"
              label="Autocomplete"
              placeholder="Choisissez un territoire"
              :options="autocompleteReseauxOptions"
              @selected="handleSelectedReseau"
              @fetch-suggestions="onFetchReseauxSuggestions"
            />
          </FormControl>

          <Button
            type="submit"
            size="xl"
            variant="green"
            full
            :loading="loading"
            @click="onSubmit"
          >
            Continuer
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import MixinForm from '@/mixins/form'
import labels from '@/utils/labels.json'
import MixinInputGeo from '@/mixins/input-geo'

export default {
  mixins: [MixinForm, MixinInputGeo],
  layout: 'register-steps',
  async asyncData ({ $axios, store, error }) {
    if (
      !store.getters.currentRole || store.getters.currentRole.contextable_type !== 'structure'
    ) {
      return error({ statusCode: 403 })
    }
    const { data: organisation } = await $axios.get(`/structure/${store.getters.currentRole.contextable_id}`)
    return {
      form: organisation
    }
  },
  data () {
    return {
      loading: false,
      options: labels,
      formSchema: object({
        name: string().required('Un nom est requis'),
        statut_juridique: string().required('Un statut juridique est requis'),
        department: string().nullable().required('Un département est requis'),
        address: string().nullable().required('Une adresse est requise'),
        domaines: array().min(1, 'Au moins 1 domaine d\'action'),
        publics_beneficiaires: array().min(1, 'Au moins 1 public bénéficiaire')
      }),
      autocompleteReseauxOptions: []
    }
  },
  computed: {
    steps () {
      return [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/responsable/step/profile'
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/responsable/step/profile'
        },
        {
          name: 'Informations sur l\'organisation',
          status: 'current'
        },
        {
          name: 'Quelques mots sur l\'organisation',
          status: 'upcoming'
        },
        this.form.statut_juridique === 'Collectivité'
          ? {
              name: 'Informations sur la collectivité',
              status: 'upcoming'
            }
          : {
              name: 'Votre organisation en images',
              status: 'upcoming'
            }
      ]
    }
  },
  methods: {
    handleSelectedGeo (item) {
      this.form.address = item.name
      this.form.zip = item.postcode
      this.form.city = item.city
      this.form.longitude = item.coordinates[0]
      this.form.latitude = item.coordinates[1]
      this.validate('address')
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
    },
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          await this.$axios.post(`/structure/${this.form.id}`, this.form)
          window.plausible &&
                  window.plausible(
                    'Inscription responsable - Étape 3 - Informations sur l’organisation'
                  )
          this.$router.push('/inscription/responsable/step/organisation-details')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

}
</script>

<style>

</style>
