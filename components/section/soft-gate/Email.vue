<template>
  <div class="mx-auto max-w-sm">
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Avant toute chose
      </div>
      <div class="text-gray-500 font-semibold text-lg lg:text-xl">
        Renseignez votre e-mail
      </div>
    </div>
    <div class="mx-auto max-w-sm">
      <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
        <FormControl label="Email" html-for="email" required :error="errors.email">
          <Input
            v-model="form.email"
            name="email"
            placeholder="Entrez votre email"
            @blur="validate('email')"
          />
        </FormControl>

        <Button
          type="submit"
          size="xl"
          variant="green"
          rounded
          full
          :loading="loading"
          @click="onSubmit"
        >
          Connexion
        </Button>
      </form>
      <!-- <el-form
        ref="emailForm"
        :model="form"
        :rules="rules"
        label-position="top"
        class="mb-0 form-register-steps"
        :hide-required-asterisk="true"
        @submit.prevent.native="onSubmit"
      >
        <el-form-item label="Email" prop="email" class="mb-5">
          <el-input
            v-model.trim="form.email"
            placeholder="prenom.nom@email.fr"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          class="!font-bold !max-w-sm !mx-auto !w-full !flex !items-center !justify-center !px-5 !py-3 !border !border-transparent !text-xl !leading-6 !rounded-full !text-white !bg-jva-green hover:!bg-[#0e9f6e] focus:!outline-none focus:!ring !transition !mt-8"
          @click.prevent="onSubmit"
        >
          Continuer
        </el-button>
      </el-form> -->
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  name: 'SoftGateEmail',
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      form: {},
      formSchema: object({
        email: string().required().email()
      })
    }
  },
  methods: {
    onSubmit () {
      console.log('onSubmit')
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          console.log('ok validate', this.loading)
          if (this.loading) {
            return
          }
          this.loading = true
          const { data: profile } = await this.$axios.post('firstname', this.form)

          if (profile) {
            console.log('login', profile)
            this.$emit('login', profile)
          } else {
            console.log('register', profile)

            this.$axios.post('/sendinblue/contact', {
              email: this.form.email,
              id_liste: 383,
              url_mission: window.location.href
            })
            this.$emit('register', this.form)
          }
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
