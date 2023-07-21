<template>
  <div>
    <div class="text-center mb-6">
      <Heading as="div" size="lg" class="mb-2 lg:mb-3">
        {{ form.first_name }}, ravi de vous retrouver !
      </Heading>
      <div class="text-cool-gray-500 text-lg lg:text-xl">
        Renseignez votre mot de passe
      </div>
    </div>
    <div class="mx-auto max-w-sm">
      <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
        <FormControl label="Email" html-for="email" required :error="errors.email">
          <Input
            v-model="form.email"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            @blur="validate('email')"
          />
        </FormControl>
        <FormControl label="Mot de passe" html-for="password" required :error="errors.password">
          <Input
            v-model="form.password"
            name="password"
            placeholder="Entrez votre mot de passe"
            type="password"
            @blur="validate('password')"
          />
          <template #description>
            <div class="mt-2">
              <Link
                to="/password-reset"
                class="text-sm text-jva-blue-500"
                @click.native="onPaswordResetClick"
              >
                Mot de passe perdu ?
              </Link>
            </div>
          </template>
        </FormControl>
        <Button
          :loading="loading"
          size="lg"
          class="w-full"
          @click.native.prevent="onSubmit"
        >
          Connexion
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'
import Link from '@/components/dsfr/Link.vue'

export default {
  name: 'SoftGateLogin',
  components: {
    Heading,
    Button,
    Link
  },
  mixins: [FormErrors],
  props: {
    datas: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.datas },
      formSchema: object({
        email: string().required().email(),
        password: string().required()
      })
    }
  },
  created () {},
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$store.dispatch('auth/login', this.form)
          if (this.$store.state.auth.user.statistics.new_participations_today >= 3) {
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
    onPaswordResetClick () {
      this.$emit('close')
    }
  }
}
</script>
