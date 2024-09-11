<template>
  <div class="relative">
    <client-only>
      <ClientOnly>
        <Teleport to="#teleport-sidebar">
          <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
            Ça ne devrait pas prendre plus de 3 minutes 😉
          </div>
          <BaseSteps :steps="steps" />
        </Teleport>
      </ClientOnly>
    </client-only>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        À propos de
        <span class="font-bold">{{ form.name }}</span> !
      </h1>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-6 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Complétez les informations liées à votre collectivité territoriale
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseFormControl
            label="Nom de votre collectivité territoriale"
            html-for="name"
            required
            :error="errors.name"
          >
            <BaseInput
              v-model="form.name"
              name="name"
              placeholder="Nom de votre organisation"
              @blur="validate('name')"
            />
          </BaseFormControl>
          <!-- <BaseFormControl
            html-for="suffix_title"
            label="Devenez bénévole ..."
            required
            :error="errors.suffix_title"
          >
            <BaseFormHelperText>
              Complétez la phrase pour votre page publique. Ex: Devenez bénévole à Bayonne
            </BaseFormHelperText>
            <BaseInput
              v-model="form.suffix_title"
              name="suffix_title"
            />
          </BaseFormControl> -->
          <BaseFormControl
            label="Département de votre collectivité territoriale"
            html-for="department"
            required
            :error="errors.department"
          >
            <BaseCombobox
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez votre département"
              :options="
                $labels.departments.map((item) => {
                  return { key: item.key, label: `${item.key} - ${item.label}` }
                })
              "
            />
          </BaseFormControl>
          <BaseFormControl
            label="Ajouter les codes postaux"
            html-for="autocomplete"
            required
            :error="errors.zips"
          >
            <BaseFormHelperText>
              En tant que collectivité territoriale, vous aurez accès aux statistiques des
              organisations enregistrées avec vos codes postaux. Vous aurez aussi la possibilité de
              gérer la page de votre collectivité territoriale qui listera toutes les missions
              présentes sur votre territoire. Par exemple pour Bayonne :
              <a href="https://jeveuxaider.gouv.fr/territoires/bayonne" target="_blank"
                >https://jeveuxaider.gouv.fr/territoires/bayonne</a
              >
            </BaseFormHelperText>
            <BaseInputAutocomplete
              icon="RiSearchLine"
              name="autocomplete"
              label="Autocomplete"
              placeholder="Recherche de vos codes postaux"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              clear-after-selected
              :min-value-length="3"
              @selected="handleSelectedGeo"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
            <div v-if="form.zips.length">
              <div class="flex flex-wrap gap-2 mt-4">
                <BaseTagFormItem
                  v-for="zip in form.zips"
                  :key="zip"
                  :tag="zip"
                  @removed="onRemovedTagItem"
                >
                  {{ zip }}
                </BaseTagFormItem>
              </div>
            </div>
          </BaseFormControl>

          <DsfrButton size="lg" class="w-full" :loading="loading" @click.native.prevent="onSubmit">
            Continuer
          </DsfrButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import MixinInputGeo from '@/mixins/input-geo'

export default defineNuxtComponent({
  mixins: [FormErrors, MixinInputGeo],
  async setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
      layout: 'register-steps',
    })

    const { $stores } = useNuxtApp()
    const route = useRouter().currentRoute.value

    if (!$stores.auth.currentRole || $stores.auth.currentRole.contextable_type !== 'structure') {
      return showError({ statusCode: 403 })
    }
    const organisation = await apiFetch(`/structures/${$stores.auth.currentRole.contextable_id}`)

    if (!organisation.territoire) {
      return await navigateTo('/dashboard')
    }

    return {
      form: toRef({
        ...organisation.territoire,
        zips: organisation.territoire?.zips?.length
          ? organisation.territoire.zips
          : organisation.zip
          ? [organisation.zip]
          : [],
        department: !organisation.territoire.department
          ? organisation.department
          : organisation.territoire.department,
      }),
    }
  },
  data() {
    return {
      loading: false,
      formSchema: object({
        name: string().required('Le nom est requis'),
        department: string().nullable().required('Un département est requis'),
        zips: array().min(1, 'Merci de renseigner au moins 1 code postal'),
      }),
    }
  },
  computed: {
    steps() {
      return [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/responsable/step/profile',
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/responsable/step/profile',
        },
        {
          name: "Informations sur l'organisation",
          status: 'complete',
          href: '/inscription/responsable/step/organisation',
        },
        {
          name: "Quelques mots sur l'organisation",
          status: 'complete',
          href: '/inscription/responsable/step/organisation-details',
        },
        {
          name: 'Informations sur la collectivité territoriale',
          status: 'current',
        },
      ]
    },
  },
  methods: {
    onRemovedTagItem(value) {
      this.form.zips = this.form.zips.filter((item) => item !== value)
    },
    handleSelectedGeo(item) {
      if (!item) {
        return
      }

      const zips = item.id.includes('all_zips')
        ? item.postcodes.flatMap((p) => p.zip.split(','))
        : item.postcode.split(',')
      zips.forEach((zip) => {
        if (!this.form.zips.includes(zip)) {
          this.form.zips.push(zip)
        }
      })
    },
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/territoires/${this.form.id}`, {
            method: 'PUT',
            body: this.form,
          })
          this.$router.push('/inscription/responsable/step/collectivite-confirmation')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async onFetchGeoSuggestions(payload) {
      this.autocompleteOptions = await useGeolocationFetch(payload, {
        context: 'input',
        inputGeoType: 'municipality',
      })
    },
  },
})
</script>
