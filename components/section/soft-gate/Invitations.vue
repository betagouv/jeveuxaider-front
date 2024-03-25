<template>
  <div>
    <div class="text-center mb-8">
      <div class="text-[48px]">❤️</div>
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
        Merci pour votre engagement
      </DsfrHeading>
      <div class="text-cool-gray-500 lg:text-lg max-w-md mx-auto">
        Votre candidature est bien enregistrée et les responsables vont en prendre connaissance
      </div>
    </div>

    <div class="">
      <BaseFormLabel>Invitez vos proches à participer avec vous</BaseFormLabel>
      <div class="space-y-4">
        <BaseFormControl
          v-for="(email, index) in form.emails"
          :name="`email-${index}`"
          :html-for="`email-${index}`"
          required
          :error="errors[`emails[${index}]`]"
        >
          <BaseInput
            :name="`email-${index}`"
            v-model="form.emails[index]"
            type="email"
            placeholder="jean.dupont@mail.com"
          />
        </BaseFormControl>

        <DsfrButton
          v-if="form.emails.length < 5"
          icon="RiAddLine"
          icon-position="left"
          @click="addEmailRow"
          type="transparent"
          class="border-0 text-jva-blue-500 hover:text-jva-blue-300 pl-0"
        >
          Ajouter un e-mail
        </DsfrButton>
      </div>
    </div>

    <div class="text-center mt-8">
      <div>
        <DsfrButton
          :loading="loading"
          class="w-full"
          size="lg"
          @click.native="onSubmit"
          icon="RiMailLine"
        >
          Inviter mes proches
        </DsfrButton>
        <div class="text-xs text-[#666666] mt-2">
          Nous leur enverrons un email pour leur proposer de candidater à votre mission, et c’est
          tout ! Garantie sans spam
        </div>
      </div>
      <div class="mt-8">
        <DsfrLink @click.native="$emit('next', [])" class="text-jva-blue-500">
          Passer l'étape
        </DsfrLink>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  name: 'SoftGateInvitations',
  mixins: [FormErrors],
  emits: ['next'],
  data() {
    return {
      loading: false,
      selectedMission: this.$stores.softGate.selectedMission,
      form: {
        emails: [''],
      },
      formSchema: object({
        emails: array()
          .min(1, 'Au moins 1 email')
          .of(string().required('Le champs email est requis').email()),
      }),
    }
  },
  methods: {
    addEmailRow() {
      this.form.emails.push('')
    },
    recomputeFormEmails() {
      if (this.form.emails.length === 0 || this.form.emails.every((email) => !email)) {
        this.form.emails = ['']
      } else {
        this.form.emails = this.form.emails.filter((email) => email)
      }
    },
    async onSubmit() {
      if (this.loading) {
        return
      }
      this.recomputeFormEmails()
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async (res) => {
          await apiFetch(`/missions/${this.selectedMission.id}/share`, {
            method: 'POST',
            body: this.form,
          })
          this.$plausible.trackEvent('Soft Gate - Étape 4 - Invitations', {
            props: {
              invitations: this.form.emails.length,
            },
          })
          await this.$gtm?.trackEvent({
            event: 'benevole-participation-soft-gate-invitations',
          })
          this.$emit('next', this.form.emails)
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
