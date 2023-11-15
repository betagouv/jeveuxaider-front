<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl
              html-for="name"
              label="Nom du domaine d'action"
              required
              :error="errors.name"
            >
              <BaseInput v-model="form.name" name="name" placeholder="Nom du domaine d'action" />
            </BaseFormControl>
            <BaseFormControl
              html-for="title"
              label="Titre de la page de ce domaine d'action"
              required
              :error="errors.title"
            >
              <BaseInput v-model="form.title" name="title" placeholder="Titre de la page" />
            </BaseFormControl>
            <BaseFormControl
              label="Description"
              html-for="description"
              :error="errors.description"
              required
            >
              <BaseTextarea
                v-model="form.description"
                name="description"
                placeholder="Décrivez le domaine d'action en quelques mots..."
              />
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Images pour les organisations </BaseHeading>
          <div class="space-y-12">
            <BaseImageCropMultiple
              class="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
              :medias="form.illustrations_organisation"
              :ratio="945 / 450"
              :min-width="945"
              :preview-width="235"
              variant="compact"
              upload-variant="compact"
              :upload-max-size="2000000"
              disable-delete
              @add="
                addFiles({
                  files: [$event],
                  collection: 'domaine__illustrations_organisation',
                })
              "
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </div>
        </BaseBox>
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Images pour les missions </BaseHeading>
          <div class="space-y-12">
            <BaseImageCropMultiple
              class="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
              :medias="form.illustrations_mission"
              :ratio="300 / 143"
              :min-width="300"
              :preview-width="235"
              variant="compact"
              upload-variant="compact"
              disable-delete
              @add="
                addFiles({
                  files: [$event],
                  collection: 'domaine__illustrations_mission',
                })
              "
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </div>
        </BaseBox>
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> FAQ </BaseHeading>
          <BaseFormControl label="Eléments de la FAQ" html-for="faq">
            <BaseParagraph
              :schema="[
                { key: 'question', label: 'Question', type: 'text' },
                {
                  key: 'tab',
                  label: 'Onglet',
                  type: 'select',
                  placeholder: 'Choisissez une option',
                  options: [
                    { key: 'benevole', label: 'Pour les bénévoles' },
                    { key: 'organisation', label: 'Pour les organisations' },
                  ],
                },
                { key: 'weight', label: 'Poids', type: 'number' },
                {
                  key: 'description',
                  label: 'Description',
                  type: 'richtext',
                },
              ]"
              :items="form.faq"
              @add="onParagraphAddItem('faq', $event)"
              @update="onParagraphUpdateItem('faq', $event)"
              @remove="onParagraphRemoveItem('faq', $event)"
            />
          </BaseFormControl>
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Paramètres </BaseHeading>
          <div class="space-y-12">
            <BaseToggle v-model="form.published" label="Mettre la page en ligne" />
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Metadonnées </BaseHeading>
          <Metatags
            :metas="form.metatags"
            :placeholders="{
              title: form.title || '[Titre de la page]',
              description: form.description || '[Description du domaine]',
            }"
          />
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Organisations partenaires </BaseHeading>
          <div class="space-y-12">
            <BaseFormControl html-for="logos_partenaires">
              <BaseImageCropMultiple
                class="grid sm:grid-cols-3 lg:grid-cols-2 gap-4"
                :medias="form.logos_partenaires"
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
                    collection: 'domaine__logos_partenaires',
                  })
                "
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Organisations actives </BaseHeading>
          <div class="space-y-12">
            <BaseFormControl html-for="logos_partenaires_actifs">
              <BaseImageCropMultiple
                class="grid sm:grid-cols-3 lg:grid-cols-2 gap-4"
                :medias="form.logos_partenaires_actifs"
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
                    collection: 'domaine__logos_partenaires_actifs',
                  })
                "
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Images pour la page publique </BaseHeading>
          <div class="space-y-12">
            <BaseFormControl label="Bannière" html-for="banner">
              <!-- <div class="text-gray-500 text-sm !mb-2">
              Résolution minimale: 1600 par 600 pixels
            </div> -->
              <BaseImageCrop
                :default-value="form.banner"
                :ratio="1680 / 1400"
                :min-width="1680"
                :preview-width="270"
                :upload-max-size="2000000"
                @add="addFiles({ files: [$event], collection: 'domaine__banner' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>

            <BaseFormControl label="Illustrations" html-for="illustrations">
              <BaseImageCropMultiple
                class="grid sm:grid-cols-3 gap-4"
                :limit="6"
                :medias="form.illustrations"
                :ratio="1 / 1"
                :min-width="430"
                :preview-width="200"
                variant="compact"
                upload-variant="compact"
                @add="
                  addFiles({
                    files: [$event],
                    collection: 'domaine__illustrations',
                  })
                "
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </BaseFormControl>
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
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import FormParagraphs from '@/mixins/form/paragraphs'
import FormMetatags from '@/mixins/form/metatags'
import Metatags from '@/components/custom/Metatags.vue'

export default defineNuxtComponent({
  components: {
    Metatags,
  },
  mixins: [FormErrors, FormUploads, FormParagraphs, FormMetatags],
  middleware: 'admin',
  props: {
    domaine: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: { ...this.domaine },
      formSchema: object({
        name: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        title: string().required("L'objectif est requis"),
        description: string().required('La description est requise'),
      }),
      loading: false,
    }
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
          if (this.form.id) {
            await apiFetch(`/domaines/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            const domaine = await apiFetch('/domaines', {
              method: 'POST',
              body: this.form,
            })
            this.form.id = domaine.id
          }

          await Promise.all([
            this.uploadFiles('domaine', this.form.id),
            this.handleMetatags('domaine', this.form.id),
          ])

          this.$router.push('/admin/contenus/domaines')
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
