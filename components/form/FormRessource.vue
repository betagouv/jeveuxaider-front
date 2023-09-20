<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl html-for="title" label="Titre" required :error="errors.title">
              <BaseInput v-model="form.title" name="name" placeholder="Entrez un titre" />
            </BaseFormControl>
            <BaseFormControl html-for="type" label="Type" required :error="errors.type">
              <BaseSelectAdvanced
                v-model="form.type"
                name="type"
                placeholder="Type"
                :options="[
                  {
                    key: 'link',
                    label: 'Lien',
                  },
                  {
                    key: 'file',
                    label: 'Fichier',
                  },
                ]"
              />
            </BaseFormControl>
            <BaseFormControl
              v-if="form.type === 'link'"
              html-for="link"
              label="Lien de la ressource"
              required
              :error="errors.link"
            >
              <BaseInput v-model="form.link" name="link" placeholder="Entrez le lien" />
            </BaseFormControl>

            <BaseFormControl
              v-if="form.type === 'file'"
              html-for="file"
              label="Fichier"
              required
              :error="errors.file"
            >
              <BaseUpload
                :default-value="[ressource.file]"
                :max-size="5000000"
                @add="addFiles({ files: $event, collection: 'document__file' })"
                @delete="deleteFile($event)"
              />
            </BaseFormControl>

            <BaseFormControl label="Description" html-for="description">
              <BaseTextarea
                v-model="form.description"
                name="description"
                placeholder="Entrez une description..."
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
              description="Pour le rendre accessible"
            />
            <BaseFormControl html-for="roles" label="Visibilité" required :error="errors.roles">
              <BaseCheckboxGroup
                v-model="form.roles"
                name="roles"
                variant="button"
                :options="[
                  {
                    key: 'referent',
                    label: 'Référents',
                  },
                  {
                    key: 'responsable',
                    label: 'Responsables',
                  },
                ]"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Notification </BaseHeading>
          <div class="space-y-12">
            <BaseToggle
              v-model="notifyReferents"
              :label="notifyReferents ? 'Oui, je les notifie' : 'Non, je ne les notifie pas'"
              :description="
                form.id
                  ? 'Notifier les référents de la mise à jour de cette ressource'
                  : 'Notifier les référents de l\'ajout de cette ressource'
              "
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

export default defineNuxtComponent({
  emits: ['submitted'],
  mixins: [FormErrors, FormUploads],
  middleware: 'admin',
  props: {
    ressource: {
      type: Object,
      default: () => {
        return {
          is_published: true,
          type: 'link',
        }
      },
    },
  },
  data() {
    return {
      loading: false,
      notifyReferents: false,
      form: { ...this.ressource },
      formSchema: object({
        title: string().min(2, 'Le nom est trop court').required('Le nom est requis'),
        type: string().required('Le type est requis'),
        roles: array()
          .required('La visibilité est requise')
          .min(1, 'Merci de sélectionner au moins 1 élement'),
        link: string().url("L'url n'est pas valide").nullable(),
        // file: object().nullable().when('type', {
        //   is: 'file',
        //   then: schema => schema.required('Le fichier est requis'),
        //   otherwise: schema => schema.nullable()
        // })
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
            await apiFetch(`/documents/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
            this.sendNotification(this.form)
          } else {
            const ressource = await apiFetch('/documents', {
              method: 'POST',
              body: this.form,
            })
            this.form.id = ressource.id
            this.sendNotification(ressource)
          }
          await this.uploadFiles('document', this.form.id)

          this.$router.push('/admin/contenus/ressources')
          this.$toast.success('La ressource a bien été enregistrée !')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async sendNotification(ressource) {
      if (this.notifyReferents) {
        await apiFetch(`/documents/${ressource.id}/notify`, {
          method: 'POST',
        })
      }
    },
  },
})
</script>
