<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Contrat d'engagement jeune"
        :prevent-click-outside="true"
        @close="onClose"
      >
        <p class="mb-4">
          Votre conseiller sera informé dès lors que vous proposez votre aide sur une mission de
          bénévolat.
        </p>
        <DsfrFormControl
          label="Email de votre conseiller"
          html-for="cej_email_adviser"
          :error="errors.cej_email_adviser"
          required
        >
          <DsfrInput
            v-model="form.cej_email_adviser"
            required
            type="email"
            name="cej_email_adviser"
            placeholder="exemple@cej.fr"
            @blur="validate('cej_email_adviser')"
          />
        </DsfrFormControl>
        <template #footer>
          <DsfrButton @click="onContinue"> Continuer </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { string, object, date } from 'yup'
import FormErrors from '@/mixins/form/errors'

const forbiddenExtensions = [
  'gmail.com',
  'icloud.com',
  'outlook.com',
  'orange.fr',
  'wanadoo.fr',
  'hotmail.com',
  'hotmail.fr',
  'free.fr',
  'sfr.fr',
  'laposte.net',
]

export default defineNuxtComponent({
  emits: ['cancel', 'continue'],
  components: {},
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    initialForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: { ...this.initialForm },
      formSchema: object({
        cej_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .required("L'email de votre conseiller CEJ est obligatoire")
          .test(
            'email-extension',
            'Le mail doit être celui de votre conseiller. Il ne doit pas être une adresse personnelle.',
            (value) => {
              if (!value) {
                return true
              }

              const emailParts = value.split('@')
              const emailExtension = emailParts[1]
              return !forbiddenExtensions.includes(emailExtension)
            }
          )
          .test(
            'no-current-user-email',
            "Vous devez saisir l'email de votre conseiller CEJ et non le vôtre",
            (value) => {
              if (!value || !this.$stores.auth.isLogged) {
                return true
              }
              return value !== this.$stores.auth.profile?.email
            }
          ),
      }),
    }
  },
  methods: {
    async onContinue() {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.$emit('continue', {
            cej: true,
            cej_email_adviser: this.form.cej_email_adviser,
          })
          this.onClose()
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
    },
    onClose() {
      if (!this.form.cej_email_adviser) {
        this.$emit('continue', {
          ...this.form,
          cej: false,
        })
      }
      this.$emit('cancel')
    },
  },
})
</script>
