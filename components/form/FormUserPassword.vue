<template>
  <div>
    <div class="flex justify-between items-end gap-8">
      <div>
        <div>Mot de passe</div>
        <div class="font-bold">********</div>
      </div>
      <div><DsfrLink class="text-jva-blue-500" @click="showModal = true">Modifier</DsfrLink></div>
    </div>
    <BaseModal
      :is-open="showModal"
      title="Modifier votre mot de passe"
      :prevent-click-outside="true"
      @close="showModal = false"
    >
      <form id="form-email" @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <DsfrFormControl
          label="Mot de passe actuel"
          html-for="current_password"
          required
          :error="errors.current_password"
        >
          <DsfrInput
            v-model="form.current_password"
            name="current_password"
            placeholder="Saisissez votre mot de passe actuel"
            type="password"
            @blur="validate('current_password')"
          />
        </DsfrFormControl>
        <DsfrFormControl
          label="Nouveau mot de passe"
          html-for="password"
          required
          :error="errors.password"
        >
          <DsfrInput
            v-model="form.password"
            name="password"
            placeholder="Saisissez votre nouveau mot de passe"
            type="password"
            @blur="validate('password')"
          />
        </DsfrFormControl>
        <DsfrFormControl
          label="Confirmation de votre nouveau mot de passe"
          html-for="password_confirmation"
          required
          :error="errors.password_confirmation"
        >
          <DsfrInput
            v-model="form.password_confirmation"
            name="password_confirmation"
            placeholder="Saisissez votre nouveau mot de passe à nouveau"
            type="password"
            @blur="validate('password_confirmation')"
          />
        </DsfrFormControl>
      </form>
      <template #footer>
        <DsfrButton type="secondary" @click.native="showModal = false"> Retour </DsfrButton>
        <DsfrButton @click.native="handleSubmit"> Enregistrer </DsfrButton>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { string, object, ref } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  data() {
    return {
      loading: false,
      showModal: false,
      form: { current_password: '', password: '', password_confirmation: '' },
      formSchema: object({
        current_password: string().required('Merci de saisir votre mot de passe'),
        password: string().min(8).required('Un nouveau mot de passe est requis'),
        password_confirmation: string()
          .required('Une confirmation de mot de passe est requise')
          .oneOf([ref('password'), null], "Le mot de passe n'est pas identique"),
      }),
    }
  },
  methods: {
    handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          await apiFetch('/user/password', {
            method: 'POST',
            body: this.form,
          })
          this.$emit('submitted', this.form)
          this.showModal = false
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
