<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl html-for="name" label="Nom du réseau" required :error="errors.name">
              <BaseInput v-model="form.name" name="name" />
            </BaseFormControl>
            <BaseFormControl
              label="À propos de votre réseau"
              html-for="description"
              required
              :error="errors.description"
            >
              <BaseTextarea
                v-model="form.description"
                name="name"
                placeholder="Dites-nous tout à propos de votre réseau..."
                :rows="10"
                @blur="validate('description')"
              />
            </BaseFormControl>
            <BaseFormControl
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
          </div>
        </BaseBox>
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Votre réseau sur Internet </BaseHeading>
          <div class="grid grid-cols-2 gap-10">
            <BaseFormControl label="Email public" html-for="email" :error="errors.email">
              <BaseInput
                v-model="form.email"
                type="email"
                name="email"
                placeholder="contact@mon-organisation.fr"
                @blur="validate('email')"
              />
            </BaseFormControl>
            <BaseFormControl label="Téléphone public" html-for="phone" :error="errors.phone">
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
            <BaseFormControl label="Page Instagram" html-for="instagram" :error="errors.instagram">
              <BaseInput
                v-model="form.instagram"
                name="instagram"
                placeholder="https://instagram.com/votrepage"
                @blur="validate('instagram')"
              />
            </BaseFormControl>
            <BaseFormControl
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
        </BaseBox>

        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Images à destination de vos antennes </BaseHeading>

          <BaseFormControl html-for="illustrations_antennes">
            <BaseImageCropMultiple
              class="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
              :medias="form.illustrations_antennes"
              :limit="6"
              :upload-max-size="2000000"
              :min-width="1400"
              :min-height="900"
              :preview-width="200"
              :ratio="null"
              warning-title="Ajouter une image"
              :warning="`Vous êtes tenu responsable des visuels proposés pour le réseau ${form.name}. Vous vous engagez ainsi à proposer des visuels libres de droit, qui ne présentent pas de contenus offensants ou inappropriés.<br><br>Les administrateurs de JeVeuxAider.gouv.fr se réservent le droit de supprimer et de modérer sans préavis un visuel si les présentes règles ne sont pas respectées.`"
              variant="compact"
              upload-variant="compact"
              preview-conversion="large"
              :disable-delete="$stores.auth.contextRole !== 'admin'"
              @add="
                addFiles({
                  files: [$event],
                  collection: 'reseau__illustrations_antennes',
                })
              "
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </BaseFormControl>
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Paramètres </BaseHeading>
          <div class="space-y-12">
            <BaseToggle
              v-model="form.is_published"
              :label="form.is_published ? 'En ligne' : 'Hors ligne'"
              description="Pour rendre la page accessible"
            />
            <BaseFormControl
              v-if="['admin'].includes($stores.auth.contextRole)"
              html-for="color"
              label="Couleur"
            >
              <BaseFormHelperText
                >La valeur doit être comprise par le CSS. Code hexadecimal
                accepté.</BaseFormHelperText
              >
              <BaseInput v-model="form.color" placeholder="#B91C1C" name="color" />
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Adresse du réseau </BaseHeading>
          <div class="space-y-6">
            <BaseFormControl
              label="Département de votre réseau"
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
              label="Saisissez l'adresse de votre réseau"
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
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Images </BaseHeading>
          <div class="space-y-12">
            <BaseFormControl label="Logo" html-for="logo">
              <BaseImageCrop
                :default-value="form.logo"
                :ratio="null"
                :min-height="112"
                :preview-width="235"
                :preview-height="56"
                preview-fit="contain"
                preview-classes="p-2"
                @add="addFiles({ files: [$event], collection: 'reseau__logo' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>

            <BaseFormControl label="Visuels d'illustration" html-for="illustrations">
              <BaseMediaPickerDomaine
                v-if="
                  $stores.auth.contextRole === 'admin' ||
                  (!form.override_image1 && !form.override_image2)
                "
                collection="domaine__illustrations_organisation"
                :domaine-ids="mediaPickerIds"
                :defaults="form.illustrations"
                :limit="2"
                preview-conversion="large"
                preview-sizes="200px"
                class="grid sm:grid-cols-2 gap-4"
                @change="onMediaPickerChange($event, 'illustrations')"
              />

              <div v-else class="text-gray-600 text-sm">
                Les images ont été surchargées par un administrateur et ne sont pas modifiables.
              </div>
            </BaseFormControl>

            <div v-if="$stores.auth.contextRole === 'admin'" class="grid grid-cols-2 gap-4">
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
                      collection: 'reseau__override_image_1',
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
                  preview-conversion="large"
                  :preview-width="200"
                  :ratio="null"
                  :upload-max-size="2000000"
                  @add="
                    addFiles({
                      files: [$event],
                      collection: 'reseau__override_image_2',
                    })
                  "
                  @delete="deleteFile($event)"
                  @crop="onManipulationsChange($event)"
                />
              </BaseFormControl>
            </div>
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
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import MixinInputGeo from '@/mixins/input-geo'

export default defineNuxtComponent({
  mixins: [FormErrors, FormUploads, MixinInputGeo],
  props: {
    reseau: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.reseau },
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis'),
        department: string().nullable().required('Un département est requis'),
        address: string().nullable(),
        zip: string().nullable().required('Le code postal est requis'),
        city: string().nullable().required('La ville est requise'),
        domaines: array().min(1, "Au moins 1 domaine d'action"),
        publics_beneficiaires: array().min(1, 'Au moins 1 public bénéficiaire'),
        description: string()
          .nullable()
          .min(200, 'La description doit contenir au moins 200 caractères')
          .required('Une description est requise'),
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
      }),
    }
  },
  computed: {
    mediaPickerIds() {
      return this.form.domaines?.map((domaine) => domaine.id)
    },
  },
  methods: {
    async handleSubmit(attributes) {
      if (this.loading) {
        return
      }
      this.loading = true

      if (attributes) {
        this.form = {
          ...this.form,
          ...attributes,
        }
      }

      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.id) {
            await apiFetch(`/reseaux/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            const newReseau = await apiFetch('/reseaux', {
              method: 'POST',
              body: this.form,
            })
            this.form.id = newReseau.id
          }
          await this.uploadFiles('reseau', this.form.id)
          this.$router.push(`/admin/contenus/reseaux/${this.form.id}`)
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onMediaPickerChange(payload, field) {
      if (!this.form[field]) {
        this.form[field] = [null, null]
      }
      this.form[field].splice(payload.index, 1, payload.media)
    },
    async onFetchGeoSuggestions(payload) {
      this.autocompleteOptions = await useGeolocationFetch(payload, {
        context: 'input',
      })
    },
  },
})
</script>
