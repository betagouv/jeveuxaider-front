<template>
  <div class="relative">
    <ClientOnly>
      <Teleport to="#teleport-sidebar">
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <BaseSteps :steps="steps" />
      </Teleport>
    </ClientOnly>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        À propos de
        <span class="font-bold">{{ form.name }}</span> !
      </h1>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-6 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Complétez les informations suivantes liés à votre organisation
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseFormControl
            label="Nom de votre organisation"
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
          <BaseFormControl
            label="Statut juridique"
            html-for="statut_juridique"
            required
            :error="errors.statut_juridique"
          >
            <BaseSelectAdvanced
              key="statut_juridique"
              v-model="form.statut_juridique"
              name="statut_juridique"
              placeholder="Sélectionnez votre statut juridique"
              :options="$labels.structure_legal_status"
              :disabled="form.reseaux.length === 0"
              @blur="validate('statut_juridique')"
            />
          </BaseFormControl>

          <BaseFormControl
            label="SIRET"
            html-for="siret"
            :required="form.statut_juridique === 'Organisation privée'"
          >
            <BaseInput v-model="form.siret" name="siret" placeholder="Ex: 784 671 695 00087" />
          </BaseFormControl>

          <BaseFormControl
            v-if="form.statut_juridique == 'Association'"
            label="Renseignez votre numéro RNA"
            html-for="rna"
            :error="errors.rna"
            required
          >
            <BaseFormHelperText>
              <span>Consultez le </span>
              <DsfrLink
                class="font-medium"
                to="https://www.journal-officiel.gouv.fr/pages/associations-recherche/?reinitrefine=1&sort=cronosort&disjunctive.source"
                :is-external="true"
                :icon-size="12"
              >
                répertoire national des associations
              </DsfrLink>
              <span>
                sur la plateforme ouverte des données publiques data.gouv.fr pour retrouver votre
                numéro RNA.</span
              >
            </BaseFormHelperText>
            <BaseInput
              v-model="form.rna"
              name="rna"
              :placeholder="form.is_alsace_moselle ? 'Non applicable' : 'W123456789'"
              :disabled="form.is_alsace_moselle"
            />
            <BaseCheckboxBoolean
              v-model="form.is_alsace_moselle"
              name="is_alsace_moselle"
              size="xs"
              class="mt-1"
              @checked="form.rna = null"
            >
              Je n’ai pas de numéro RNA car je suis une association de droit local (Alsace-Moselle)
            </BaseCheckboxBoolean>
          </BaseFormControl>

          <BaseFormControl
            v-if="form.statut_juridique == 'Association'"
            label="Disposez vous d'agréments ?"
            html-for="association_types"
          >
            <BaseSelectAdvancedMultiple
              v-model="form.association_types"
              name="association_types"
              placeholder="Sélectionnez vos agréments"
              :options="$labels.association_types"
              clearable
            />
          </BaseFormControl>
          <BaseFormControl
            v-if="
              ['Association', 'Collectivité', 'Organisation publique'].includes(
                form.statut_juridique
              )
            "
            label="Quel est votre rôle au sein de l'organisation ?"
            html-for="responsable_fonction"
          >
            <BaseSelectAdvanced
              v-model="form.responsable_fonction"
              name="responsable_fonction"
              placeholder="Sélectionnez votre rôle"
              :options="
                $labels.responsable_fonction.filter(
                  (role) => role.statut_juridique == form.statut_juridique
                )
              "
              clearable
            />
          </BaseFormControl>
          <BaseFormControl
            v-if="form.statut_juridique == 'Organisation publique'"
            label="Type de votre organisation publique"
            html-for="structure_publique_type"
          >
            <BaseSelectAdvanced
              key="structure_publique_type"
              v-model="form.structure_publique_type"
              name="structure_publique_type"
              placeholder="Sélectionnez le type de votre organisation publique"
              :options="$labels.structure_publique_types"
              clearable
            />
          </BaseFormControl>

          <BaseFormControl
            v-if="
              form.statut_juridique == 'Organisation publique' &&
              (form.structure_publique_type == 'Service de l\'Etat' ||
                form.structure_publique_type == 'Etablissement public')
            "
            :label="form.structure_publique_type"
            html-for="structure_publique_etat_type"
          >
            <BaseSelectAdvanced
              key="structure_publique_etat_type"
              v-model="form.structure_publique_etat_type"
              name="structure_publique_etat_type"
              placeholder="Choisissez une option"
              :options="$labels.structure_publique_etat_types"
              clearable
            />
          </BaseFormControl>

          <BaseFormControl
            v-if="form.statut_juridique == 'Organisation privée'"
            label="Type de votre organisation privée"
            html-for="structure_privee_type"
          >
            <BaseSelectAdvanced
              key="structure_privee_type"
              v-model="form.structure_privee_type"
              name="structure_privee_type"
              placeholder="Sélectionnez le type de votre organisation privée"
              :options="$labels.structure_privee_types"
              clearable
            />
          </BaseFormControl>

          <BaseFormControl
            v-if="form.statut_juridique != 'Collectivité'"
            label="Choisissez les domaines que couvre votre organisation"
            html-for="domaines"
            required
            :error="errors.domaines"
          >
            <DsfrTagsGroup v-model="form.domaines" :options="$labels.domaines" is-model />
          </BaseFormControl>
          <BaseFormControl
            v-if="form.statut_juridique != 'Collectivité'"
            label="Choisissez les publics bénéficiaires de vos missions"
            html-for="publics_beneficiaires"
            required
            :error="errors.publics_beneficiaires"
          >
            <DsfrTagsGroup
              v-model="form.publics_beneficiaires"
              :options="$labels.mission_publics_beneficiaires"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Département de votre organisation"
            html-for="department"
            required
            :error="errors.department"
          >
            <BaseCombobox
              key="department"
              v-model="form.department"
              name="department"
              placeholder="Sélectionnez votre département"
              :options="
                $labels.departments.map((item) => {
                  return { key: item.key, label: `${item.key} - ${item.label}` }
                })
              "
              @blur="validate('department')"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Saisissez l'adresse de votre organisation"
            html-for="autocomplete"
            required
            :error="errors.address"
          >
            <BaseInputAutocomplete
              icon="RiMapPinLine"
              name="autocomplete"
              label="Autocomplete"
              placeholder="Ex: 14 rue de Rivoli, Paris"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              :min-value-length="3"
              @selected="handleSelectedGeo"
              @fetch-suggestions="onFetchGeoSuggestions"
            />
          </BaseFormControl>
          <BaseFormControl label="Adresse" html-for="address" required>
            <BaseInput v-model="form.address" name="address" disabled placeholder="..." />
          </BaseFormControl>
          <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <BaseFormControl label="Code postal" html-for="zip" required :error="errors.zip">
              <BaseInput v-model="form.zip" name="zip" placeholder="..." disabled />
            </BaseFormControl>
            <BaseFormControl label="Ville" html-for="city" required :error="errors.city">
              <BaseInput v-model="form.city" name="city" disabled placeholder="..." />
            </BaseFormControl>
          </div>

          <BaseFormControl
            v-if="!['Collectivité'].includes(form.statut_juridique)"
            label="Faites-vous partie d'un réseau national ?"
            html-for="tete_de_reseau_id"
          >
            <div>
              <BaseFormHelperText class="mb-4">
                Si votre organisation est membre d'un réseau national ou territorial qui figure dans
                le menu déroulant du champ ci-dessous, sélectionnez-le. Vous permettrez à la tête de
                réseau de visualiser les missions et bénévoles rattachés à votre organisation. Vous
                faciliterez également la validation de votre organisation par les autorités
                territoriales lors de votre inscription.
              </BaseFormHelperText>
            </div>
            <BaseInputAutocomplete
              name="autocomplete"
              label="Autocomplete"
              placeholder="Choisissez un réseau"
              icon="RiSearchLine"
              clear-after-selected
              :options="autocompleteReseauxOptions"
              @selected="handleSelectedReseau"
              @fetch-suggestions="onFetchReseauxSuggestions"
            />
            <div v-if="form.reseaux && form.reseaux.length">
              <div class="flex flex-wrap gap-2 mt-4">
                <BaseTagFormItem
                  v-for="reseau in form.reseaux"
                  :key="reseau.id"
                  :tag="reseau"
                  @removed="onRemovedReseau"
                >
                  {{ reseau.name }}
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
      layout: 'register-steps',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()

    if (!$stores.auth.currentRole || $stores.auth.currentRole.contextable_type !== 'structure') {
      return showError({ statusCode: 403 })
    }

    const organisation = await apiFetch(`/structures/${$stores.auth.currentRole.contextable_id}`)

    return {
      form: toRef({
        ...organisation,
        responsable_fonction: organisation.members[0].pivot.fonction,
      }),
    }
  },
  data() {
    return {
      loading: false,
      autocompleteReseauxOptions: [],
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
          status: 'current',
        },
        {
          name: "Quelques mots sur l'organisation",
          status: 'upcoming',
        },
        this.form.statut_juridique === 'Collectivité'
          ? {
              name: 'Informations sur la collectivité territoriale',
              status: 'upcoming',
            }
          : {
              name: 'Votre organisation en images',
              status: 'upcoming',
            },
      ]
    },
    formSchema() {
      let schema = object({
        name: string().required('Un nom est requis'),
        statut_juridique: string().required('Un statut juridique est requis'),
        department: string().nullable().required('Un département est requis'),
        address: string().nullable(),
        zip: string().nullable().required('Le code postal est requis'),
        city: string().nullable().required('La ville est requise'),
        domaines: array().min(1, "Au moins 1 domaine d'action"),
        rna: string().when(['statut_juridique', 'is_alsace_moselle'], {
          is: (statutJuridique, isAlsaceMoselle) =>
            statutJuridique === 'Association' && !isAlsaceMoselle, // alternatively: (val) => val == true
          then: (schema) => schema.nullable().required('Un numéro RNA est requis'),
          otherwise: (schema) => schema.nullable(),
        }),
      })

      if (this.form.statut_juridique !== 'Collectivité') {
        schema = schema.concat(
          object({
            publics_beneficiaires: array().min(1, 'Au moins 1 public bénéficiaire'),
          })
        )
      }

      if (this.form.statut_juridique === 'Organisation privée') {
        schema = schema.concat(
          object({
            siret: string().required('Un SIRET est requis'),
          })
        )
      }

      return schema
    },
  },
  methods: {
    async onFetchReseauxSuggestions(value) {
      const reseaux = await apiFetch('/reseaux', {
        params: {
          'filter[is_published]': 1,
          'filter[search]': value,
          pagination: 6,
        },
      })
      this.autocompleteReseauxOptions = reseaux.data
    },
    handleSelectedReseau(item) {
      if (item) {
        const index = this.form.reseaux.findIndex((reseau) => reseau.id == item.id)
        if (index === -1) {
          this.form.reseaux = [...this.form.reseaux, item]
        }
      }
    },
    onRemovedReseau(item) {
      this.form.reseaux = this.form.reseaux.filter((reseau) => reseau.id !== item.id)
    },
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/structures/${this.form.id}`, {
            method: 'PUT',
            body: this.form,
          })
          this.$plausible.trackEvent(
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
    },
    async onFetchGeoSuggestions(payload) {
      this.autocompleteOptions = await useGeolocationFetch(payload, {
        context: 'input',
      })
    },
  },
})
</script>
