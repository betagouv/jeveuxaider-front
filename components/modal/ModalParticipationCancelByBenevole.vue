<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiErrorWarningLine"
        title="Annulez votre participation"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="space-y-4">
          <div>
            Vous êtes sur le point d'annuler votre participation à la mission
            <span class="font-semibold">{{ participation.mission.name }}</span
            >. Le responsable en sera notifié par email.
          </div>

          <BaseFormControl html-for="reason" label="Raison" required>
            <BaseRadioGroup
              v-model="form.reason"
              :options="$labels.participation_canceled_by_benevole_reasons"
            />
          </BaseFormControl>

          <BaseFormControl html-for="content" label="Précisions">
            <BaseTextarea
              v-model="form.content"
              name="content"
              placeholder="Plus d'explications si nécéssaire"
            />
          </BaseFormControl>
        </div>

        <template #footer>
          <BaseButton class="mr-3" variant="white" @click.native="$emit('cancel')">
            Retour
          </BaseButton>
          <BaseButton @click.native="handleSubmit"> Confirmer </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  emits: ['confirm', 'cancel'],
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    participation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {},
      formSchema: object({
        reason: string().nullable().required('La raison est requise'),
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
        .then(() => {
          this.$emit('confirm', this.form)
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
