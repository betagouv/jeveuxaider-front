<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Allocation RSA"
        :prevent-click-outside="true"
        @close="onClose"
      >
        <p class="mb-4">
          Votre conseiller sera informé dès lors que vous proposez votre aide sur une mission de
          bénévolat. Les missions de bénévolat réalisées pourront être comptabilisées dans les 15
          heures d’activité hebdomadaire prévues à ce titre.
        </p>
        <DsfrFormControl
          label="Email de votre conseiller"
          html-for="ft_email_adviser"
          :error="errors.ft_email_adviser"
          required
        >
          <DsfrInput
            v-model="form.ft_email_adviser"
            required
            type="email"
            name="ft_email_adviser"
            placeholder="exemple@francetravail.fr"
            @blur="validate('ft_email_adviser')"
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
        ft_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .required("L'email de votre conseiller France Travail est obligatoire")
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
            "Vous devez saisir l'email de votre conseiller France Travail et non le vôtre",
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
            ft: true,
            ft_email_adviser: this.form.ft_email_adviser,
          })
          this.onClose()
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
    },
    onClose() {
      if (!this.form.ft_email_adviser) {
        this.$emit('continue', {
          ...this.form,
          ft: false,
        })
      }
      this.$emit('cancel')
    },
  },
})
</script>
