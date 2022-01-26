<template>
  <div class="relative">
    <client-only>
      <portal
        to="sidebar"
      >
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
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
        Complétez les informations liées à votre collectivité
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl
            label="Nom de votre collectivité"
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
          <FormControl label="Département de votre collectivté" html-for="department" required :error="errors.department">
            <SelectAdvanced
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez votre département"
              :options="$labels.departments.map((item) => { return {key: item.key, label: `${item.key} - ${item.label}`}})"
            />
          </FormControl>
          <FormControl label="Ajouter les codes postaux" html-for="autocomplete" required :error="errors.zips">
            <FormHelperText>
              En tant que collectivité, vous aurez accès au statistiques des
              organisations enregistrées avec vos codes postaux. <br>Vous
              aurez aussi la possibilité de gérer la page de votre collectivité
              qui listera toutes les missions dans votre collectivité. Par
              exemple pour Bayonne :
              <a
                href="https://jeveuxaider.gouv.fr/territoires/bayonne"
                target="_blank"
              >https://jeveuxaider.gouv.fr/territoires/bayonne</a>
            </FormHelperText>
            <InputAutocomplete
              icon="LocationMarkerIcon"
              name="autocomplete"
              label="Autocomplete"
              placeholder="Ex: Recherche par mots clés"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              @selected="handleSelectedGeo"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
            <div v-if="form.zips.length">
              <div class="flex flex-wrap gap-2 mt-4">
                <TagFormItem
                  v-for="zip in form.zips"
                  :key="zip"
                  :tag="zip"
                  @removed="onRemovedTagItem"
                >
                  {{ zip }}
                </TagFormItem>
              </div>
            </div>
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
import FormErrors from '@/mixins/form/errors'
import MixinInputGeo from '@/mixins/input-geo'

export default {
  mixins: [FormErrors, MixinInputGeo],
  layout: 'register-steps',
  async asyncData ({ $axios, store, error }) {
    if (
      !store.getters.currentRole || store.getters.currentRole.contextable_type !== 'structure'
    ) {
      return error({ statusCode: 403 })
    }
    const { data: organisation } = await $axios.get(`/structures/${store.getters.currentRole.contextable_id}`)

    return {
      form: {
        ...organisation.territoire,
        zips: organisation.territoire.zips ? organisation.territoire.zips : [],
        department: !organisation.territoire.department ? organisation.department : organisation.territoire.department
      }
    }
  },
  data () {
    return {
      loading: false,
      formSchema: object({
        name: string().required(),
        department: string().required(),
        zips: array().min(1, 'Merci de renseigner au moins 1 code postal')
      })
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
          status: 'complete',
          href: '/inscription/responsable/step/organisation'
        },
        {
          name: 'Quelques mots sur l\'organisation',
          status: 'complete',
          href: '/inscription/responsable/step/organisation-details'

        },
        {
          name: 'Informations sur la collectivité',
          status: 'current'
        }
      ]
    }
  },
  methods: {
    onRemovedTagItem (value) {
      this.form.zips = this.form.zips.filter(item => item !== value)
    },
    handleSelectedGeo (item) {
      if (item && !this.form.zips.includes(item)) {
        this.form.zips.push(item.postcode)
      }
    },
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          await this.$axios.post(`/territoire/${this.form.id}`, this.form)
          this.$router.push('/inscription/responsable/step/collectivite-confirmation')
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
