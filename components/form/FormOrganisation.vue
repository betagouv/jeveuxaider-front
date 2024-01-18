<template>
  <div>
    <ModalUnregisterOrganisation
      :structure="structure"
      :is-open="showAlert"
      @cancel="showAlert = false"
      @close="showAlert = false"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
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
                :options="statutJuridiqueOptions"
                @blur="validate('statut_juridique')"
              />
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
              label="Domaines d'action"
              html-for="domaines"
              required
              :error="errors.domaines"
            >
              <BaseCheckboxGroup
                v-model="form.domaines"
                name="domaines"
                variant="button"
                :options="$labels.domaines"
                is-model
              />
            </BaseFormControl>
            <BaseFormControl
              v-if="form.statut_juridique !== 'Collectivité'"
              label="Publics bénéficiaires"
              html-for="publics_beneficiaires"
              required
              :error="errors.publics_beneficiaires"
            >
              <BaseCheckboxGroup
                v-model="form.publics_beneficiaires"
                name="publics_beneficiaires"
                variant="button"
                :options="$labels.mission_publics_beneficiaires"
              />
            </BaseFormControl>

            <template
              v-if="!['Collectivité', 'Organisation publique'].includes(form.statut_juridique)"
            >
              <BaseHeading :level="3" class="mb-8">
                Votre organisation en quelques mots
              </BaseHeading>
              <BaseFormControl
                label="À propos de votre organisation"
                label-suffix="(200 caractères min)"
                html-for="description"
                required
                :error="errors.description"
              >
                <BaseFormHelperText class="pb-4">
                  Cette description doit expliquer votre raison d'être et susciter le désir
                  d'engagement des milliers de bénévoles découvrant votre organisation sur la
                  plateforme JeVeuxAider.gouv.fr. Cette description apparaîtra sur votre future page
                  vitrine et sur l'ensemble de vos missions de bénévolat publiées sur la plateforme.
                </BaseFormHelperText>
                <BaseTextarea
                  v-model="form.description"
                  name="name"
                  placeholder="Dites-nous tout à propos de votre organisation..."
                  :rows="10"
                  @blur="validate('description')"
                />
              </BaseFormControl>
            </template>

            <BaseHeading :level="3" class="mb-8"> Votre organisation sur Internet </BaseHeading>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <BaseFormControl label="Email public" html-for="email" :error="errors.email">
                <BaseInput
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="contact@mon-organisation.fr"
                  @blur="validate('email')"
                />
              </BaseFormControl>
              <BaseFormControl
                label="Téléphone public"
                html-for="phone"
                :error="errors.phone"
                required
              >
                <BaseInput
                  v-model="form.phone"
                  name="phone"
                  type="tel"
                  maxlength="14"
                  placeholder="0123456789"
                  @blur="validate('phone')"
                />
              </BaseFormControl>
              <BaseFormControl label="Site internet" html-for="website" :error="errors.website">
                <BaseInput
                  v-model="form.website"
                  name="website"
                  placeholder="https://www.votresite.fr"
                  @blur="validate('website')"
                />
              </BaseFormControl>
              <BaseFormControl label="Page Facebook" html-for="facebook" :error="errors.facebook">
                <BaseInput
                  v-model="form.facebook"
                  name="facebook"
                  placeholder="https://facebook.com/votrepage"
                  @blur="validate('facebook')"
                />
              </BaseFormControl>
              <BaseFormControl label="Page Twitter" html-for="twitter" :error="errors.twitter">
                <BaseInput
                  v-model="form.twitter"
                  name="twitter"
                  placeholder="https://twitter.com/votrepage"
                  @blur="validate('twitter')"
                />
              </BaseFormControl>
              <BaseFormControl
                label="Page Instagram"
                html-for="instagram"
                :error="errors.instagram"
              >
                <BaseInput
                  v-model="form.instagram"
                  name="instagram"
                  placeholder="https://instagram.com/votrepage"
                  @blur="validate('instagram')"
                />
              </BaseFormControl>
              <BaseFormControl
                v-if="
                  !['Organisation publique', 'Organisation privée'].includes(form.statut_juridique)
                "
                label="URL vers la plateforme de dons"
                html-for="donation"
                :error="errors.donation"
              >
                <BaseInput
                  v-model="form.donation"
                  name="donation"
                  placeholder="URL de votre page Helloasso, Microdon, Ulule, etc..."
                  @blur="validate('donation')"
                />
              </BaseFormControl>
            </div>
          </div>
        </BaseBox>
        <BaseBox v-if="!['Collectivité'].includes(form.statut_juridique)">
          <BaseHeading :level="3" class="mb-8"> Réseau national ou territorial </BaseHeading>
          <BaseFormHelperText class="mb-6">
            Si votre organisation est membre d'un réseau national ou territorial qui figure dans le
            menu déroulant du champ ci-dessous, sélectionnez-le. Vous permettrez à la tête de réseau
            de visualiser les missions et bénévoles rattachés à votre organisation. Vous faciliterez
            également la validation de votre organisation par les autorités territoriales lors de
            votre inscription.
          </BaseFormHelperText>
          <BaseFormControl label="Faites-vous partie d'un réseau national ?" html-for="reseau_id">
            <BaseInputAutocomplete
              name="autocomplete"
              label="Autocomplete"
              placeholder="Choisissez un réseau"
              :options="autocompleteReseauxOptions"
              clear-after-selected
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
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Adresse de l'organisation </BaseHeading>
          <div class="space-y-8">
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
                    return {
                      key: item.key,
                      label: `${item.key} - ${item.label}`,
                    }
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
            <BaseFormControl label="Adresse" html-for="address">
              <BaseInput
                v-model="form.address"
                name="address"
                :disabled="!['admin'].includes($stores.auth.contextRole)"
                placeholder="..."
              />
            </BaseFormControl>
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
              <BaseFormControl label="Code postal" html-for="zip" required :error="errors.zip">
                <BaseInput
                  v-model="form.zip"
                  name="zip"
                  placeholder="..."
                  :disabled="!['admin'].includes($stores.auth.contextRole)"
                />
              </BaseFormControl>
              <BaseFormControl label="Ville" html-for="city" required :error="errors.city">
                <BaseInput
                  v-model="form.city"
                  name="city"
                  :disabled="!['admin'].includes($stores.auth.contextRole)"
                  placeholder="..."
                />
              </BaseFormControl>
              <template v-if="['admin'].includes($stores.auth.contextRole)">
                <BaseFormControl label="Latitude" html-for="latitude">
                  <BaseInput v-model="form.latitude" name="latitude" placeholder="..." />
                </BaseFormControl>
                <BaseFormControl label="Longitude" html-for="longitude">
                  <BaseInput v-model="form.longitude" name="longitude" placeholder="..." />
                </BaseFormControl>
              </template>
            </div>
          </div>
        </BaseBox>

        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8">
            Visuels d'illustration de l'organisation
          </BaseHeading>
          <div class="space-y-8">
            <BaseFormControl label="Logo" html-for="logo">
              <BaseImageCrop
                :default-value="form.logo"
                :ratio="null"
                :min-height="112"
                :preview-width="235"
                :preview-height="56"
                preview-fit="contain"
                preview-classes="p-2"
                @add="addFiles({ files: [$event], collection: 'structure__logo' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>

            <BaseFormControl label="Visuels d'illustration" html-for="illustrations">
              <component
                :is="mediaPickerComponent"
                v-if="
                  $stores.auth.contextRole === 'admin' ||
                  (!form.override_image1 && !form.override_image2)
                "
                :reseaux="form.reseaux"
                :domaine-ids="mediaPickerDomaineIds"
                :defaults="form.illustrations"
                :limit="2"
                collection="domaine__illustrations_organisation"
                preview-conversion="large"
                preview-sizes="200px"
                class="grid grid-cols-1 lg:grid-cols-2 gap-4"
                @change="onMediaPickerChange($event, 'illustrations')"
              />

              <div v-else class="text-gray-600 text-sm">
                Les images ont été surchargées par un administrateur et ne sont pas modifiables.
              </div>
            </BaseFormControl>

            <div
              v-if="$stores.auth.contextRole === 'admin'"
              class="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              <BaseFormControl label="Surcharger visuel 1" html-for="avatar">
                <BaseImageCrop
                  :default-value="form.override_image1"
                  :min-width="1400"
                  :min-height="900"
                  preview-conversion="large"
                  :preview-width="200"
                  :ratio="null"
                  :upload-max-size="2000000"
                  @add="
                    addFiles({
                      files: [$event],
                      collection: 'structure__override_image_1',
                    })
                  "
                  @delete="deleteFile($event)"
                  @crop="onManipulationsChange($event)"
                />
              </BaseFormControl>

              <BaseFormControl label="Surcharger visuel 2" html-for="avatar">
                <BaseImageCrop
                  :default-value="form.override_image2"
                  :min-width="1400"
                  :min-height="900"
                  :preview-width="200"
                  :preview-height="95"
                  :ratio="null"
                  :upload-max-size="2000000"
                  @add="
                    addFiles({
                      files: [$event],
                      collection: 'structure__override_image_2',
                    })
                  "
                  @delete="deleteFile($event)"
                  @crop="onManipulationsChange($event)"
                />
              </BaseFormControl>
            </div>
          </div>
        </BaseBox>

        <BaseBox v-if="$stores.auth.contextRole === 'admin'" padding="sm">
          <BaseHeading :level="3" class="mb-4"> Personnalisation </BaseHeading>
          <BaseFormControl label="Couleur" html-for="color">
            <BaseInput v-model="form.color" name="color" placeholder="Code hexadécimal (#FF0000)" />
          </BaseFormControl>
        </BaseBox>

        <BaseBox padding="sm">
          <BaseHeading as="h3" :level="3" class="mb-4"> Administratif </BaseHeading>
          <div class="grid col-span-1 gap-8">
            <BaseFormControl label="SIRET" html-for="siret">
              <BaseInput v-model="form.siret" name="siret" placeholder="Ex: 784 671 695 00087" />
            </BaseFormControl>
            <BaseFormControl label="Numéro RNA" html-for="rna">
              <BaseFormHelperText>
                Consultez le
                <a
                  class="font-medium underline"
                  href="https://www.journal-officiel.gouv.fr/pages/associations-recherche/?reinitrefine=1&sort=cronosort&disjunctive.source"
                  target="blank"
                  >répertoire national des associations</a
                >
                <RiExternalLinkLine class="h-3 w-3 inline" /> sur la plateforme ouverte des données
                publiques data.gouv.fr pour retrouver votre numéro RNA.
              </BaseFormHelperText>
              <BaseInput v-model="form.rna" name="rna" placeholder="W123456789" />
              <BaseCheckboxBoolean
                v-model="form.is_alsace_moselle"
                name="is_alsace_moselle"
                size="xs"
              >
                Je n’ai pas de numéro RNA car je suis une association de droit local
                (Alsace-Moselle)
              </BaseCheckboxBoolean>
            </BaseFormControl>

            <BaseFormControl
              v-if="['admin'].includes($stores.auth.contextRole)"
              label="# API Engagement"
              html-for="api_id"
            >
              <BaseInput
                v-model="form.api_id"
                name="api_id"
                placeholder="Identifiant pour l'API Engagement"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox v-if="['admin', 'responsable'].includes($stores.auth.contextRole)" padding="sm">
          <BaseHeading as="h3" :level="3" class="mb-4"> Désinscription </BaseHeading>
          <BaseFormHelperText class="mb-6">
            En vous désinscrivant de JeVeuxAider.gouv.fr vous ne serez plus en mesure de publier de
            nouvelles missions de bénévolat ni de communiquer avec les bénévoles souhaitant
            s’investir au sein de votre organisation.
          </BaseFormHelperText>

          <div class="ml-auto">
            <BaseButton
              variant="white"
              size="md"
              type="submit"
              @click.native="() => (showAlert = true)"
            >
              Désinscrire l'organisation
            </BaseButton>
          </div>
        </BaseBox>
      </div>
    </div>
    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import inputGeo from '@/mixins/input-geo'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import ModalUnregisterOrganisation from '@/components/modal/ModalUnregisterOrganisation.vue'

export default defineNuxtComponent({
  components: {
    ModalUnregisterOrganisation,
  },
  mixins: [inputGeo, FormErrors, FormUploads],
  props: {
    structure: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        ...this.structure,
      },
      showAlert: false,
      autocompleteReseauxOptions: [],
    }
  },
  computed: {
    formSchema() {
      let schema = object({
        name: string().required('Un nom est requis'),
        statut_juridique: string().required('Un statut juridique est requis'),
        department: string().nullable().required('Un département est requis'),
        address: string().nullable(),
        zip: string().nullable().required('Le code postal est requis'),
        city: string().nullable().required('La ville est requise'),
        email: string().nullable().email("Le format de l'email public est incorrect"),
        website: string().nullable().url(),
        facebook: string().nullable().url(),
        twitter: string().nullable().url(),
        instagram: string().nullable().url(),
        donation: string().nullable().url(),
        phone: string()
          .min(10)
          .matches(/^[+|\s|\d]*$/, 'Ce format est incorrect')
          .nullable(),
      })

      if (this.form.statut_juridique !== 'Collectivité') {
        schema = schema.concat(
          object({
            publics_beneficiaires: array().min(1, 'Au moins 1 public bénéficiaire'),
            domaines: array().min(1, "Au moins 1 domaine d'action"),
          })
        )
      }

      if (!['Collectivité', 'Organisation publique'].includes(this.form.statut_juridique)) {
        schema = schema.concat(
          object({
            description: string()
              .nullable()
              .min(200, 'La description doit contenir au moins 200 caractères')
              .required('Une description est requise'),
          })
        )
      }

      return schema
    },
    mediaPickerDomaineIds() {
      return this.form.domaines.map((domaine) => domaine.id)
    },
    mediaPickerComponent() {
      return this.form.reseaux.length
        ? resolveComponent('BaseMediaPickerReseau')
        : resolveComponent('BaseMediaPickerDomaine')
    },
    statutJuridiqueOptions() {
      const options = this.$labels.structure_legal_status

      if (this.structure.statut_juridique == 'Autre') {
        const optionAutre = options.find((item) => item.key === 'Autre')
        Object.assign(optionAutre, { ...optionAutre, disabled: true })
        return options
      }

      return options.filter((item) => item.key != 'Autre')
    },
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          const structure = await apiFetch(`/structures/${this.structure.id}`, {
            method: 'PUT',
            body: this.form,
          })
          await this.uploadFiles('structure', structure.id)
          this.$router.push(`/admin/organisations/${structure.id}`)
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async onFetchReseauxSuggestions(value) {
      const res = await apiFetch('/reseaux', {
        params: {
          'filter[is_published]': 1,
          'filter[search]': value,
          pagination: 6,
        },
      })
      this.autocompleteReseauxOptions = res.data
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
    onMediaPickerChange(payload, field) {
      this.form[field].splice(payload.index, 1, payload.media)
    },
    async onFetchGeoSuggestions(payload) {
      this.autocompleteOptions = await useGeolocationFetch(payload)
    },
  },
})
</script>
