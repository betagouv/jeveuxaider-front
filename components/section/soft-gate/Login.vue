<template>
  <div>
    <div class="text-center mb-8">
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
        {{ form.first_name }}, ravi de vous retrouver !
      </DsfrHeading>
      <div class="text-cool-gray-500 text-lg lg:text-xl">Renseignez votre mot de passe</div>
    </div>
    <div class="mx-auto">
      <form id="form" class="space-y-8" @submit.prevent="onSubmit">
        <BaseFormControl label="Email" html-for="email" required :error="errors.email">
          <BaseInput
            v-model="form.email"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            @blur="validate('email')"
          />
        </BaseFormControl>
        <BaseFormControl label="Mot de passe" html-for="password" required :error="errors.password">
          <BaseInput
            v-model="form.password"
            name="password"
            placeholder="Entrez votre mot de passe"
            type="password"
            @blur="validate('password')"
          />
          <template #description>
            <div class="mt-2">
              <DsfrLink
                to="/password-reset"
                class="text-sm text-jva-blue-500"
                @click.native="onPaswordResetClick"
              >
                Mot de passe perdu ?
              </DsfrLink>
            </div>
          </template>
        </BaseFormControl>
        <DsfrButton :loading="loading" size="lg" class="w-full" @click.native.prevent="onSubmit">
          Connexion
        </DsfrButton>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  name: 'SoftGateLogin',
  mixins: [FormErrors],
  props: {
    datas: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.datas },
      formSchema: object({
        email: string().required().email(),
        password: string().required(),
      }),
    }
  },
  created() {},
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$stores.auth.login(this.form)
          if (this.$stores.auth.user.statistics.new_participations_today >= 3) {
            this.$emit('anti-flood')
          } else {
            this.$emit('next')
          }
          this.$plausible.trackEvent('Soft Gate - Étape 2 - Login')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onPaswordResetClick() {
      this.$emit('close')
    },
  },
})
</script>
