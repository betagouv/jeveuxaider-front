<template>
  <div class="relative bg-[#070191] overflow-hidden">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      src="/images/bg-jva.jpg"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x"
      data-not-lazy
    />

    <div class="pb-12 mt-12 px-4 relative w-full lg:inset-y-0 text-center z-10">
      <div>
        <h2 class="mt-6 mb-4 md:mb-0 text-center text-3xl font-bold text-white leading-8 px-4">
          Réinitialisation de votre mot de passe
        </h2>
        <p class="text-center text-base text-[#c3ddfd]">
          Pour réinitialiser votre mot de passe, entrez l'adresse mail que vous avez utilisée pour
          vous connecter à la plateforme.
        </p>
      </div>
      <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md text-left">
        <div class="bg-white py-8 px-4 shadow sm:px-10">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#d2d6dc]" />
            </div>
            <div class="relative flex justify-center text-xl">
              <span class="px-2 bg-white font-bold text-gray-900">
                J'ai oublié mon mot de passe
              </span>
            </div>
          </div>
          <template v-if="!submitted">
            <form id="form" class="space-y-8 mt-8" @submit.prevent="onSubmit">
              <BaseFormControl label="Email" html-for="email" required :error="errors.email">
                <BaseInput
                  v-model="form.email"
                  name="email"
                  type="email"
                  placeholder="Entrez votre email"
                  @blur="onBlurEmailCheckIfUserArchiveDatasExists"
                />
                <template #description>
                  <p class="text-sm text-gray-600 mt-2">
                    Vous allez recevoir un email qui vous permettra de créer un nouveau mot de
                    passe.
                  </p>
                </template>
              </BaseFormControl>

              <DsfrButton
                size="lg"
                :loading="loading"
                class="w-full"
                @click.native.prevent="onSubmit"
              >
                Réinitialiser mon mot de passe
              </DsfrButton>
            </form>
          </template>
          <template v-else>
            <div class="text-gray-500 mt-4 space-y-4">
              <p>
                Une email contenant les instructions pour réinitialiser votre mot de passe vient de
                vous être envoyé.
              </p>
              <p>
                Si vous ne vous souvenez plus de votre email de connexion, écrivez-nous à
                contact@reserve-civique.beta.gouv.fr.
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import DetectUserArchiveDatas from '@/mixins/detect-user-archive-datas'

export default defineNuxtComponent({
  mixins: [FormErrors, DetectUserArchiveDatas],
  setup() {
    definePageMeta({
      middleware: ['guest'],
    })
  },
  data() {
    return {
      loading: false,
      submitted: false,
      form: {
        email: this.$route.query.email ? this.$route.query.email : '',
      },
      formSchema: object({
        email: string().required().email(),
      }),
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch('/password/forgot', {
            body: this.form,
            method: 'POST',
          })
          this.submitted = true
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
