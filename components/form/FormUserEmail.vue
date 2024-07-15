<template>
  <div>
    <div class="flex justify-between items-end gap-8">
      <div>
        <div>E-mail</div>
        <div class="font-bold">{{ $stores.auth.user.email }}</div>
      </div>
      <div><DsfrLink class="text-jva-blue-500" @click="showModal = true">Modifier</DsfrLink></div>
    </div>
    <BaseModal
      :is-open="showModal"
      title="Modifier votre email"
      :prevent-click-outside="true"
      @close="showModal = false"
    >
      <form id="form" @submit.prevent="handleSubmit" class="lg:pt-2">
        <DsfrFormControl label="E-mail" html-for="name" :error="errors.email" required>
          <DsfrInput
            v-model="form.email"
            type="email"
            name="email"
            placeholder="Entrez votre e-mail"
            @blur="validate('email')"
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
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  data() {
    return {
      loading: false,
      showModal: false,
      form: { email: this.$stores.auth?.user?.email },
      formSchema: object({
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
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
          await apiFetch('/user/email', {
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
