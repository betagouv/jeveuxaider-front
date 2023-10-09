<template>
  <div class="">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="space-y-6">
        <BaseFormControl html-for="name" label="Nom du modèle" required :error="errors.name">
          <BaseInput v-model="form.name" name="name" placeholder="" />
          <BaseFormHelperText v-if="form.id" class="mt-1">
            Créé par {{ form.user.profile.full_name }} le {{ form.created_at }}
          </BaseFormHelperText>
        </BaseFormControl>
        <BaseToggle
          v-if="canShare"
          v-model="form.is_shared"
          position="right"
          label="Rendre le modèle collaboratif"
          description="Les co-gestionnaires de mon organisation pourront modifier le modèle"
        />
        <div v-if="form.id" class="flex-none flex flex-wrap gap-4">
          <DsfrButton @click="handleSubmitAndClose" type="tertiary" icon="RiSaveLine"
            >Enregistrer</DsfrButton
          >
          <BaseAlertDialog
            theme="warning"
            title="Dupliquer le modèle"
            :text="`Vous êtes sur le point de dupliquer le modèle <b>${form.name}</b>`"
            :is-open="showDuplicateAlert"
            @confirm="handleDuplicate"
            @cancel="showDuplicateAlert = false"
          />
          <DsfrButton @click="showDuplicateAlert = true" type="tertiary" icon="RiFileCopyLine"
            >Dupliquer</DsfrButton
          >
          <BaseAlertDialog
            theme="warning"
            title="Supprimer le modèle"
            :text="`Vous êtes sur le point de supprimer le modèle <b>${form.name}</b>`"
            :is-open="showDeleteAlert"
            @confirm="handleDelete"
            @cancel="showDeleteAlert = false"
          />
          <DsfrButton
            v-if="canDelete"
            @click="showDeleteAlert = true"
            type="tertiary"
            icon="RiDeleteBinLine"
            >Supprimer</DsfrButton
          >
        </div>
      </div>
      <div>
        <BaseFormControl
          html-for="message"
          label="Corps du message"
          required
          :error="errors.message"
        >
          <BaseTextarea v-model="form.message" name="message" />
          <BaseFormHelperText v-if="$stores.auth.contextRole === 'responsable'" class="mt-2">
            N’hésitez pas à utiliser les balises dynamiques suivantes :

            <span
              v-for="token in tokens"
              :key="token"
              @click.native="appendTokenToMessage(token)"
              class="text-jva-blue-500 hover:text-jva-blue-400 cursor-pointer mr-1"
              >{{ token }}</span
            >
          </BaseFormHelperText>
        </BaseFormControl>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  components: {},
  mixins: [FormErrors],
  emits: ['refetch'],
  props: {
    messageTemplate: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.messageTemplate },
      showDuplicateAlert: false,
      showDeleteAlert: false,
      tokens: [
        '[benevole_prenom]',
        '[benevole_nom]',
        '[mission_nom]',
        '[mission_ville]',
        '[mission_date_debut]',
        '[mission_date_fin]',
        '[organisation_nom]',
        '[responsable_prenom]',
        '[responsable_nom]',
      ],
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis'),
        message: string().min(3, 'Le message est trop court').required('Le message est requis'),
      }),
    }
  },
  computed: {
    canShare() {
      if (this.$stores.auth.contextRole !== 'responsable') {
        return false
      }

      if (!this.form.id) {
        return true
      }

      return this.messageTemplate.user_id === this.$stores.auth.user.id
    },
    canDelete() {
      return this.messageTemplate.user_id === this.$stores.auth.user.id
    },
  },
  methods: {
    appendTokenToMessage(token) {
      if (this.form.message) {
        this.form.message += ' ' + token
      } else {
        this.form.message = token
      }
    },
    async handleSubmitAndClose() {
      await this.handleSubmit(this.form)
      this.$emit('refetch')
    },
    async handleDuplicate() {
      await apiFetch(`/message-templates/${this.messageTemplate.id}/duplicate`, {
        method: 'POST',
      })
      this.$toast.success('Modèle dupliqué')
      this.$emit('refetch')
    },
    async handleDelete() {
      await apiFetch(`/message-templates/${this.messageTemplate.id}`, {
        method: 'DELETE',
      })
      this.$toast.success('Modèle supprimé')
      this.$emit('refetch')
    },
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
            await apiFetch(`/message-templates/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
            this.$toast.success('Modifications enregistrées')
          } else {
            const messageTemplate = await apiFetch('/message-templates', {
              method: 'POST',
              body: this.form,
            })
            this.$toast.success('Nouveau modèle créé')
            this.$router.push('/messages/modeles')
          }
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
