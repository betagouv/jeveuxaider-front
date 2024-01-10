<template>
  <div>
    <DsfrHeading :id="`newsletter-headline`" as="h2" size="sm" class="mb-4">
      Recevez nos suggestions de missions de bénévolat
    </DsfrHeading>

    <form
      :aria-labelledby="`newsletter-headline`"
      class="relative flex flex-col lg:flex-row w-full"
    >
      <BaseFormControl :error="error" :success="success" html-for="email">
        <div class="w-full gap-4 lg:gap-0 flex flex-col lg:flex-row">
          <DsfrInput
            v-model.trim="form.email"
            :error="!!error"
            :success="!!success"
            type="email"
            aria-label="Adresse email"
            placeholder="Votre adresse électronique"
            input-class="lg:!rounded-none lg:!rounded-tl"
            variant="white"
          />
          <DsfrButton
            :disabled="loading"
            class="w-full lg:w-auto lg:flex-none lg:!rounded-none lg:!rounded-tr"
            @click.native.prevent="onSubmit()"
          >
            S'abonner
          </DsfrButton>
        </div>
      </BaseFormControl>
    </form>

    <p class="text-xs text mt-4 text-[#666666]">
      En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par
      courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou
      en nous contactant.
    </p>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      loading: false,
      error: '',
      success: '',
      form: {
        email: '',
      },
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }

      this.error = ''
      this.success = ''

      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (re.test(String(this.form.email).toLowerCase())) {
        this.loading = true
        apiFetch('/sendinblue/contact', { method: 'POST', body: { email: this.form.email } })
          .then(() => {
            this.success = 'Merci ! Vous êtes désormais inscrit(e) à notre newsletter 😉'
          })
          .catch((error) => {
            this.error = 'Erreur !'
          })
          .finally(() => {
            this.loading = false
            this.$plausible.trackEvent('Homepage - CTA - Email', {
              props: { isLogged: this.$stores.auth.isLogged },
            })
          })
      } else {
        this.error = "L'email renseigné n'est pas valide"
      }
    },
  },
})
</script>
