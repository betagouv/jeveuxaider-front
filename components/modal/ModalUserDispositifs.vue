<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal :is-open="isOpen" :title="title" :prevent-click-outside="true" @close="onClose">
        <template v-if="selectedItem === 'service_civique'">
          <DsfrFormControl
            label="Date de début de votre Service Civique"
            html-for="service_civique_completion_date"
            :error="errors.service_civique_completion_date"
            required
          >
            <DsfrInput
              v-model="form.service_civique_completion_date"
              required
              type="date"
              name="service_civique_completion_date"
              @blur="validate('service_civique_completion_date')"
            />
          </DsfrFormControl>
        </template>
        <template v-if="selectedItem === 'cej'">
          <DsfrFormControl
            label="Email de votre conseiller"
            html-for="cej_email_adviser"
            :error="errors.cej_email_adviser"
            required
          >
            <BaseFormHelperText>
              En renseignant l’adresse de votre conseiller, celui-ci sera automatiquement tenu au
              courant des missions sur lesquelles vous proposez votre aide.
            </BaseFormHelperText>
            <DsfrInput
              v-model="form.cej_email_adviser"
              required
              type="email"
              name="cej_email_adviser"
              placeholder="…@…"
              @blur="validate('cej_email_adviser')"
            />
          </DsfrFormControl>
        </template>
        <template v-if="selectedItem === 'ft'">
          <DsfrFormControl
            label="Email de votre conseiller"
            html-for="ft_email_adviser"
            :error="errors.ft_email_adviser"
            required
          >
            <BaseFormHelperText>
              En renseignant l’adresse de votre conseiller, celui-ci sera automatiquement tenu au
              courant des missions sur lesquelles vous proposez votre aide.
            </BaseFormHelperText>
            <DsfrInput
              v-model="form.ft_email_adviser"
              required
              type="email"
              name="ft_email_adviser"
              placeholder="…@…"
              @blur="validate('ft_email_adviser')"
            />
          </DsfrFormControl>
        </template>
        <template #footer>
          <DsfrButton v-if="selectedItem" @click="onSave"> Enregistrer </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { string, object, date } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  emits: ['fill', 'save', 'cancel'],
  components: {},
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
    selectedItem: {
      type: String,
      default: 'service_civique',
    },
  },
  data() {
    return {
      formSchema: object({
        ft_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .when('ft', {
            is: true,
            then: (schema) =>
              schema
                .required("L'email de votre conseiller France Travail est obligatoire")
                .test(
                  'email-extension',
                  'Le mail doit être celui de votre conseiller. Il ne doit pas être une adresse personnelle.',
                  (value) => {
                    if (!value) {
                      return true
                    }
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
        cej_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .when('cej', {
            is: true,
            then: (schema) =>
              schema
                .required("L'email de votre conseiller CEJ est obligatoire")
                .test(
                  'email-extension',
                  'Le mail doit être celui de votre conseiller. Il ne doit pas être une adresse personnelle.',
                  (value) => {
                    if (!value) {
                      return true
                    }
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
        service_civique_completion_date: date()
          .typeError('La date indiquée est invalide')
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .when('service_civique', {
            is: true,
            then: (schema) => schema.required('La date de début de service civique est incorrecte'),
          }),
      }),
    }
  },
  computed: {
    title() {
      if (this.selectedItem === 'service_civique') {
        return 'Service Civique'
      } else if (this.selectedItem === 'cej') {
        return 'Contrat d’Engagement Jeune'
      } else if (this.selectedItem === 'ft') {
        return 'France Travail'
      }
      return 'Choisissez votre dispositif'
    },
  },
  methods: {
    async onSave() {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.selectedItem === 'service_civique') {
            this.$emit('fill', {
              service_civique: this.form.service_civique,
              service_civique_completion_date: this.form.service_civique_completion_date,
            })
          } else if (this.selectedItem === 'cej') {
            this.$emit('fill', {
              cej: this.form.cej,
              cej_email_adviser: this.form.cej_email_adviser,
            })
          } else if (this.selectedItem === 'ft') {
            this.$emit('fill', {
              ft: this.form.ft,
              ft_email_adviser: this.form.ft_email_adviser,
            })
          }
          this.onClose()
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
    },
    onClose() {
      if (this.selectedItem === 'service_civique') {
        if (!this.form.service_civique_completion_date) {
          this.$emit('fill', {
            service_civique: false,
          })
        }
      } else if (this.selectedItem === 'cej') {
        if (!this.form.cej_email_adviser) {
          this.$emit('fill', {
            cej: false,
          })
        }
      } else if (this.selectedItem === 'ft') {
        if (!this.form.ft_email_adviser) {
          this.$emit('fill', {
            ft: false,
          })
        }
      }
      this.$emit('cancel')
    },
  },
})
</script>
