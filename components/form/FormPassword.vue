<template>
  <form
    id="form"
    class="gap-8 grid grid-cols-1"
    @submit.prevent="handleSubmit"
  >
    <FormControl
      label="Mot de passe actuel"
      html-for="current_password"
      required
      :error="errors.current_password"
    >
      <Input
        v-model="form.current_password"
        name="current_password"
        placeholder="Saisissez votre mot de passe actuel"
        type="password"
        @blur="validate('current_password')"
      />
    </FormControl>
    <FormControl
      label="Nouveau mot de passe"
      html-for="password"
      required
      :error="errors.password"
    >
      <Input
        v-model="form.password"
        name="password"
        placeholder="Saisissez votre nouveau mot de passe"
        type="password"
        @blur="validate('password')"
      />
    </FormControl>
    <FormControl
      label="Confirmation de votre nouveau mot de passe"
      html-for="password_confirmation"
      required
      :error="errors.password_confirmation"
    >
      <Input
        v-model="form.password_confirmation"
        name="password_confirmation"
        placeholder="Saisissez votre nouveau mot de passe à nouveau"
        type="password"
        @blur="validate('password_confirmation')"
      />
    </FormControl>
    <div class="hidden sm:block pt-8 lg:pt-14">
      <div class="text-center">
        <Button
          size="lg"
          variant="primary"
          :loading="loading"
          :disabled="!formIsValid"
          @click.native="handleSubmit()"
        >
          Mettre à jour
        </Button>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="formIsValid"
        :class="[
          'sm:hidden fixed bottom-0 p-3 bg-white z-50 w-full left-0 right-0',
        ]"
        style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%);"
      >
        <Button
          size="lg"
          class="w-full"
          variant="primary"
          :loading="loading"
          :disabled="!formIsValid"
          @click.native="handleSubmit()"
        >
          Mettre à jour
        </Button>
      </div>
    </transition>
  </form>
</template>
<script>
import { isEqual } from 'lodash'
import { string, object, ref } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      form: { current_password: '', password: '', password_confirmation: '' },
      formSchema: object({
        current_password: string().required('Merci de saisir votre mot de passe'),
        password: string().min(8).required('Un nouveau mot de passe est requis'),
        password_confirmation: string().required('Une confirmation de mot de passe est requise').oneOf([ref('password'), null], 'Le mot de passe n\'est pas identique')
      }),
      formIsDirty: false,
      formIsValid: false
    }
  },
  watch: {
    form: {
      deep: true,
      async handler (newForm) {
        this.formIsValid = await this.formSchema.isValid(newForm)
        this.formIsDirty = !isEqual(newForm, { current_password: '', password: '', password_confirmation: '' })
      }
    },
    formIsDirty (newVal, oldVal) {
      this.$emit('change', { isDirty: this.formIsDirty, isValid: this.formIsValid })
    },
    formIsValid (newVal, oldVal) {
      this.$emit('change', { isDirty: this.formIsDirty, isValid: this.formIsValid })
    }
  },
  methods: {
    handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          await this.$axios.post('/user/password', this.form)
          this.$toast.success('Votre mot de passe a bien été modifié !')
          this.formIsDirty = false
          this.formIsValid = false
          this.$emit('submited', this.form)
          // reset
          this.form = { current_password: '', password: '', password_confirmation: '' }
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
