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
              label="Nom du territoire"
              required
              :error="errors.name"
            >
              <Input
                v-model="form.name"
                name="name"
              />
            </FormControl>
            <FormControl
              html-for="suffix_title"
              label="Devenez bénévole ..."
              required
              :error="errors.suffix_title"
            >
              <Input
                v-model="form.suffix_title"
                name="suffix_title"
              />
            </FormControl>
            <FormControl
              label="Type"
              html-for="type"
              :error="errors.type"
              required
            >
              <SelectAdvanced
                v-model="form.type"
                name="type"
                placeholder="Sélectionner un type"
                :options="$labels.territoire_types"
              />
            </FormControl>
            <FormControl
              label="Département"
              html-for="department"
              :error="errors.department"
              required
            >
              <SelectAdvanced
                v-model="form.department"
                name="department"
                placeholder="Sélectionner un département"
                :options="$labels.departments"
              />
            </FormControl>

            <FormControl v-if="form.type == 'city'" label="Ajouter les codes postaux" html-for="autocomplete" required :error="errors.zips">
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
          </div>
        </Box>
        <Box>
          <Heading :level="3" class="mb-8">
            SEO
          </Heading>
          <div class="space-y-10">
            <FormControl
              label="Titre de recrutement"
              html-for="seo_recruit_title"
            >
              <Input
                v-model="form.seo_recruit_title"
                name="seo_recruit_title"
                placeholder=""
              />
            </FormControl>
            <FormControl
              label="Description pour le recrutement"
              html-for="seo_recruit_description"
            >
              <RichEditor
                v-model="form.seo_recruit_description"
              />
            </FormControl>
            <FormControl
              label="Titre pour l'engagement"
              html-for="seo_engage_title"
            >
              <Input
                v-model="form.seo_engage_title"
                name="seo_engage_title"
                placeholder=""
              />
            </FormControl>
            <FormControl
              label="Description pour le recrutement"
              html-for="seo_engage_paragraphs"
            >
              <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
                @TODO: Paragraphe comme https://www.jeveuxaider.gouv.fr/dashboard/territoire/1376/edit
              </div>
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
          </div>
        </Box>
        <Box padding="sm">
          <Heading :level="3" class="mb-8">
            Image
          </Heading>
          <div class="space-y-12">
            <FormControl label="Bannière" html-for="banner">
              <ImageCrop
                :default-value="form.banner"
                :ratio="300/143"
                :min-width="300"
                :preview-width="235"
                :upload-max-size="2000000"
                @add="addFiles({ files: [$event], collection: 'territoire__banner' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </FormControl>

            <FormControl label="Logo" html-for="logo">
              <ImageCrop
                :default-value="form.logo"
                :ratio="null"
                :min-height="112"
                :preview-width="235"
                :preview-height="56"
                preview-fit="contain"
                preview-classes="p-2"
                :upload-max-size="2000000"
                @add="addFiles({ files: [$event], collection: 'territoire__logo' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </FormControl>
          </div>
        </Box>
        <Box padding="sm">
          <Heading :level="3" class="mb-8">
            Assocations partenaires
          </Heading>
          <div class="space-y-12">
            <ImageCropMultiple
              class="grid sm:grid-cols-3 lg:grid-cols-2 gap-4"
              :medias="form.promoted_organisations"
              :ratio="null"
              :min-height="112"
              :preview-width="null"
              :preview-height="56"
              preview-fit="contain"
              preview-classes="p-2"
              :upload-max-size="500000"
              variant="compact"
              upload-variant="compact"
              @add="addFiles({ files: [$event], collection: 'territoire__promoted_organisations' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
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
    territoire: {
      type: Object,
      default: () => {
        return {
          type: 'city',
          zips: []
        }
      }
    }
  },
  data () {
    return {
      form: { ...this.territoire },
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis'),
        suffix_title: string().min(3, 'Le titre court est trop court').required('Le titre court est requis'),
        zips: array().when('type', {
          is: 'city',
          then: schema => schema.min(1, 'Merci de renseigner au moins 1 code postal'),
          otherwise: schema => schema.nullable()
        })
      }),
      inputGeoType: 'municipality'
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
          this.loading = true
          if (this.form.id) {
            await this.$axios.put(`/territoires/${this.form.id}`, this.form)
          } else {
            const { data: territoire } = await this.$axios.post('/territoires', this.form)
            this.form.id = territoire.id
          }
          await this.uploadFiles('territoire', this.form.id)

          this.$router.push('/admin/contenus/territoires')
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
