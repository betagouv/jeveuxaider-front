<!-- <template>
  <div>
    <DsfrHeading :id="`newsletter-headline-${uuid}`" as="h2" size="sm" class="mb-4">
      Un email par mois pour plus d'engagement
    </DsfrHeading>

    <form
      :aria-labelledby="`newsletter-headline-${uuid}`"
      class="relative flex flex-col lg:flex-row w-full"
    >
      <BaseFormControl :error="error" :success="success" html-for="email">
        <div class="flex w-full">
          <DsfrInput
            v-model="form.email"
            :error="!!error"
            :success="!!success"
            type="email"
            aria-label="Adresse email"
            input-class="!rounded-none !rounded-tl"
            placeholder="Votre adresse électronique (ex. : nom@domaine.fr)"
          />
          <DsfrButton
            :disabled="loading"
            class="flex-none !rounded-none !rounded-tr"
            @click.native.prevent="onSubmit()"
          >
            S'abonner
          </DsfrButton>
        </div>
      </BaseFormControl>
    </form>

    <p class="text-xs text mt-4 text-[#666666]">
      Chaque mois, nous vous proposons de nouvelles missions de bénévolat à distance ou près de chez
      vous. En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par
      courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou
      en nous contactant.
    </p>
  </div>
</template>

<script>
import uuid from '@/mixins/uuid'

export default defineNuxtComponent({
  mixins: [uuid],
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
            console.log(error)
            this.error = 'Erreur !'
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.error = "L'email renseigné n'est pas valide"
      }
    },
  },
})
</script> -->
