<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl
              html-for="name"
              label="Nom du territoire"
              required
              :error="errors.name"
            >
              <BaseInput v-model="form.name" name="name" />
            </BaseFormControl>
            <BaseFormControl
              html-for="suffix_title"
              label="Devenez bénévole ..."
              required
              :error="errors.suffix_title"
            >
              <BaseInput v-model="form.suffix_title" name="suffix_title" />
            </BaseFormControl>
            <BaseFormControl
              v-if="$stores.auth.contextRole === 'admin'"
              label="Type"
              html-for="type"
              :error="errors.type"
              required
            >
              <BaseSelectAdvanced
                v-model="form.type"
                name="type"
                placeholder="Sélectionner un type"
                :options="$labels.territoire_types"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Département"
              html-for="department"
              :error="errors.department"
              required
            >
              <BaseCombobox
                v-model="form.department"
                name="department"
                placeholder="Sélectionner un département"
                :options="
                  $labels.departments.map((item) => {
                    return {
                      key: item.key,
                      label: `${item.key} - ${item.label}`,
                    }
                  })
                "
              />
            </BaseFormControl>

            <BaseFormControl
              v-if="form.type == 'city'"
              label="Ajouter les codes postaux"
              html-for="autocomplete"
              required
              :error="errors.zips"
            >
              <BaseInputAutocomplete
                icon="RiMapPinLine"
                name="autocomplete"
                label="Autocomplete"
                placeholder="Ex: Recherche par mots clés"
                :options="autocompleteOptions"
                attribute-key="id"
                attribute-label="label"
                attribute-right-label="typeLabel"
                :authorize-add="true"
                :min-value-length="3"
                @selected="handleSelectedGeo"
                @add="handleAdd"
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
          </div>
        </BaseBox>
        <BaseBox v-if="$stores.auth.contextRole === 'admin'">
          <BaseHeading :level="3" class="mb-8"> SEO </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl label="Titre de recrutement" html-for="seo_recruit_title">
              <BaseInput v-model="form.seo_recruit_title" name="seo_recruit_title" placeholder="" />
            </BaseFormControl>
            <BaseFormControl
              label="Description pour le recrutement"
              html-for="seo_recruit_description"
            >
              <BaseRichEditor v-model="form.seo_recruit_description" />
            </BaseFormControl>
            <BaseFormControl label="Titre pour l'engagement" html-for="seo_engage_title">
              <BaseInput v-model="form.seo_engage_title" name="seo_engage_title" placeholder="" />
            </BaseFormControl>
            <BaseFormControl label="Description pour l'engagement" html-for="seo_engage_paragraphs">
              <BaseParagraph
                :schema="[
                  { key: 'title', label: 'Titre', type: 'text' },
                  {
                    key: 'description',
                    label: 'Description',
                    type: 'richtext',
                  },
                ]"
                :items="form.seo_engage_paragraphs"
                @add="onParagraphAddItem('seo_engage_paragraphs', $event)"
                @update="onParagraphUpdateItem('seo_engage_paragraphs', $event)"
                @remove="onParagraphRemoveItem('seo_engage_paragraphs', $event)"
              />
            </BaseFormControl>
          </div>
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
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Image </BaseHeading>
          <div class="space-y-12">
            <BaseFormControl label="Bannière" html-for="banner">
              <BaseImageCrop
                :default-value="form.banner"
                :ratio="1600 / 600"
                :min-width="1600"
                :preview-width="235"
                preview-conversion="desktop"
                :upload-max-size="2000000"
                @add="
                  addFiles({
                    files: [$event],
                    collection: 'territoire__banner',
                  })
                "
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>

            <BaseFormControl label="Logo" html-for="logo">
              <BaseImageCrop
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
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox v-if="$stores.auth.contextRole === 'admin'" padding="sm">
          <BaseHeading :level="3" class="mb-8"> Assocations partenaires </BaseHeading>
          <div class="space-y-12">
            <BaseImageCropMultiple
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
              @add="
                addFiles({
                  files: [$event],
                  collection: 'territoire__promoted_organisations',
                })
              "
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
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
import FormParagraphs from '@/mixins/form/paragraphs'
import MixinInputGeo from '@/mixins/input-geo'

export default defineNuxtComponent({
  mixins: [FormErrors, FormUploads, FormParagraphs, MixinInputGeo],
  props: {
    territoire: {
      type: Object,
      default: () => {
        return {
          type: 'city',
          zips: [],
        }
      },
    },
  },
  async setup() {
    const { formatInputGeoSuggestions } = await formatGeoSuggestionsHelper()
    return {
      formatInputGeoSuggestions,
    }
  },
  data() {
    return {
      loading: false,
      form: { ...this.territoire },
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis'),
        suffix_title: string()
          .min(3, 'Le titre court est trop court')
          .required('Le titre court est requis'),
        zips: array().when('type', {
          is: 'city',
          then: (schema) => schema.min(1, 'Merci de renseigner au moins 1 code postal'),
          otherwise: (schema) => schema.nullable(),
        }),
      }),
      inputGeoType: 'municipality',
    }
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
    handleAdd(item) {
      if (item && !this.form.zips.includes(item)) {
        this.form.zips.push(item)
      }
    },
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.id) {
            await apiFetch(`/territoires/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            const territoire = await apiFetch('/territoires', {
              method: 'POST',
              body: this.form,
            })
            this.form.id = territoire.id
          }
          await this.uploadFiles('territoire', this.form.id)
          this.$router.push(`/admin/contenus/territoires/${this.form.id}`)
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
