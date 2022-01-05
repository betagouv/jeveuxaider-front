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
        Validez ou complétez les informations suivantes
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
          <FormControl label="Choisissez les domaines que couvrent votre organisation" html-for="domaines" required :error="errors.domaines">
            <CheckboxGroup
              v-model="form.domaines"
              name="domaines"
              variant="button"
              :options="domaines_options"
            />
          </FormControl>
          <FormControl label="Choisissez les publics bénéficiaires de vos missions" html-for="publics_beneficiaires" required :error="errors.publics_beneficiaires">
            <CheckboxGroup
              v-model="form.publics_beneficiaires"
              name="publics_beneficiaires"
              variant="button"
              :options="publics_benificiaires_options"
            />
          </FormControl>
          <FormControl label="Département de votre organisation" html-for="department" required :error="errors.department">
            <SelectAdvanced
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez votre département"
              :options="departments_options.map((item) => { return {key: item.key, label: `${item.key} - ${item.label}`}})"
            />
          </FormControl>
          <FormControl label="Saisissez l'adresse de votre organisation" html-for="autocomplete" required :error="errors.department">
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
            :error="errors.address"
          >
            <Input
              v-model="form.address"
              name="address"
              disabled
              placeholder="Ex: 14 rue de Rivoli"
              @blur="validate('address')"
            />
          </FormControl>
          <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <FormControl
              label="Code postal"
              html-for="zip"
              required
              :error="errors.zip"
            >
              <Input
                v-model="form.zip"
                name="zip"
                placeholder="Ex: 75001"
                disabled
                @blur="validate('zip')"
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
                disabled
                placeholder="Ex: Paris"
                @blur="validate('city')"
              />
            </FormControl>
          </div>

          <FormControl
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
      steps: [
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
        {
          name: 'Votre organisation en images',
          status: 'upcoming'
        }
      ],
      domaines_options: labels.domaines,
      publics_benificiaires_options: labels.mission_publics_beneficiaires,
      departments_options: labels.departments,
      formSchema: object({
        name: string().required(),
        domaines: array().min(1, 'Merci de sélectionner au moins 1 domaine d\'action'),
        publics_beneficiaires: array().min(1, 'Merci de sélectionner au moins 1 public bénéficiaire')
      }),
      autocompleteReseauxOptions: []

    }
  },
  methods: {
    handleSelectedGeo (item) {
      console.log('handleSelectedGeo', item)
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
          console.log('this.form', this.form)
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
