<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl
              html-for="name"
              label="Nom de l'activité"
              required
              :error="errors.name"
            >
              <BaseInput v-model="form.name" name="name" />
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
          </div>
        </BaseBox>
        <BaseBox>
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
                @add="addFiles({ files: [$event], collection: 'activity__banner' })"
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
                  collection: 'activity__promoted_organisations',
                })
              "
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </div>
        </BaseBox>

        <BaseBox v-if="$stores.auth.contextRole === 'admin'" padding="sm">
          <BaseHeading :level="3" class="mb-8"> Metadonnées </BaseHeading>
          <Metatags
            :metas="form.metatags"
            :placeholders="{
              title: `Bénévolat ${form.name || '[Nom de l\'activité]'} | JeVeuxAider.gouv.fr`,
              description: `Trouvez une mission de bénévolat ${
                form.name || '[Nom de l\'activité]'
              } parmi les missions actuellement disponibles et faites vivre l'engagement de chacun pour tous`,
            }"
          />
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
import FormMetatags from '@/mixins/form/metatags'
import Metatags from '@/components/custom/Metatags.vue'

export default defineNuxtComponent({
  components: {
    Metatags,
  },
  mixins: [FormErrors, FormUploads, FormParagraphs, FormMetatags],
  middleware: 'admin',
  props: {
    activity: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.activity },
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis'),
        domaines: array().min(1, "Au moins 1 domaine d'action"),
      }),
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
            await apiFetch(`/activities/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            const activity = await apiFetch('/activities', {
              method: 'POST',
              body: this.form,
            })
            this.form.id = activity.id
          }

          await Promise.all([
            this.uploadFiles('activity', this.form.id),
            this.handleMetatags('activity', this.form.id),
          ])

          this.$router.push(`/admin/contenus/activites/${this.form.id}`)
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
