<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <Box>
          <Heading :level="3" class="mb-8">
            Informations générales
          </Heading>
          <div class="space-y-10">
            <FormControl
              html-for="name"
              label="Nom du réseau"
              required
              :error="errors.name"
            >
              <Input
                v-model="form.name"
                name="name"
              />
            </FormControl>
            <FormControl
              label="À propos de votre réseau"
              html-for="description"
              required
              :error="errors.description"
            >
              <Textarea
                v-model="form.description"
                name="name"
                placeholder="Dites-nous tout à propos de votre réseau..."
                :rows="10"
                @blur="validate('description')"
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
          </div>
        </Box>
        <Box>
          <Heading :level="3" class="mb-8">
            Votre réseau sur Internet
          </Heading>
          <div class="grid grid-cols-2 gap-10">
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
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <Box padding="sm">
          <Heading :level="3" class="mb-8">
            Paramètres
          </Heading>
          <div class="space-y-12">
            <Toggle
              v-model="form.is_published"
              :label="form.is_published ? 'En ligne' : 'Hors ligne'"
              description="Pour rendre la page accessible"
            />
            <FormControl
              html-for="color"
              label="Couleur"
            >
              <Input
                v-model="form.color"
                name="color"
              />
            </FormControl>
          </div>
        </Box>
        <Box padding="sm">
          <Heading :level="3" class="mb-8">
            Adresse du réseau
          </Heading>
          <div class="space-y-6">
            <FormControl label="Département de votre réseau" html-for="department" required :error="errors.department">
              <SelectAdvanced
                key="department"
                v-model="form.department"
                name="department"
                placeholder="Sélectionnez votre département"
                :options="$labels.departments.map((item) => { return {key: item.key, label: `${item.key} - ${item.label}`}})"
                @blur="validate('department')"
              />
            </FormControl>
            <FormControl label="Saisissez l'adresse de votre réseau" html-for="autocomplete" required :error="errors.address">
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
        <Box padding="sm">
          <Heading :level="3" class="mb-8">
            Image
          </Heading>
          <div class="space-y-12">
            <FormControl label="Logo" html-for="logo">
              <ImageCrop
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
            </FormControl>

            <FormControl
              label="Visuels d'illustration"
              html-for="illustrations"
            >
              <MediaPickerDomaine
                v-if="$store.getters.contextRole === 'admin' || (!form.override_image1 && !form.override_image2)"
                class="grid sm:grid-cols-2 gap-4"
                collection="domaine__illustrations_organisation"
                preview-conversion="large"
                preview-sizes="200px"
                :domaine-ids="form.domaines.map(domaine => domaine.id)"
                :defaults="form.illustrations"
                :limit="2"
                @change="onMediaPickerChange($event, 'illustrations')"
              />

              <div v-else class="text-gray-600 text-sm">
                Les images ont été surchargées par un administrateur et ne sont pas modifiables.
              </div>
            </FormControl>

            <div v-if="$store.getters.contextRole === 'admin'" class="grid grid-cols-2 gap-4">
              <FormControl label="Surcharger visuel 1" html-for="avatar">
                <ImageCrop
                  :default-value="form.override_image1"
                  :min-width="1400"
                  :min-height="900"
                  preview-conversion="large"
                  :preview-width="200"
                  :ratio="null"
                  :upload-max-size="2000000"
                  @add="addFiles({ files: [$event], collection: 'reseau__override_image_1' })"
                  @delete="deleteFile($event)"
                  @crop="onManipulationsChange($event)"
                />
              </FormControl>

              <FormControl label="Surcharger visuel 2" html-for="avatar">
                <ImageCrop
                  :default-value="form.override_image2"
                  :min-width="1400"
                  :min-height="900"
                  preview-conversion="large"
                  :preview-width="200"
                  :ratio="null"
                  :upload-max-size="2000000"
                  @add="addFiles({ files: [$event], collection: 'reseau__override_image_2' })"
                  @delete="deleteFile($event)"
                  @crop="onManipulationsChange($event)"
                />
              </FormControl>
            </div>
          </div>
        </Box>
      </div>
    </div>

    <div class="flex lg:hidden flex-col gap-2 flex-shrink-0 items-center justify-center">
      <Button size="xl" variant="green" @click.native="$refs.form.handleSubmit()">
        Enregistrer
      </Button>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import MixinInputGeo from '@/mixins/input-geo'

export default {
  mixins: [FormErrors, FormUploads, MixinInputGeo],
  layout: 'admin',
  middleware: 'admin',
  props: {
    reseau: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  data () {
    return {
      form: { ...this.reseau },
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis'),
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
        phone: string().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').nullable()
      })
    }
  },
  methods: {
    handleSubmit (attributes) {
      if (attributes) {
        this.form = {
          ...this.form,
          ...attributes
        }
      }
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          if (this.form.id) {
            await this.$axios.put(`/reseaux/${this.form.id}`, this.form)
          } else {
            const { data: newReseau } = await this.$axios.post('/reseaux', this.form)
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
    onMediaPickerChange (payload, field) {
      this.form[field].splice(payload.index, 1, payload.media)
    }
  }
}
</script>
