<template>
  <div>
    <Heading :id="`newsletter-headline`" as="h2" size="sm" class="mb-4">
      Recevez nos suggestions de missions de bénévolat
    </Heading>

    <form
      :aria-labelledby="`newsletter-headline`"
      class="relative flex flex-col lg:flex-row w-full"
    >
      <FormControl
        :error="error"
        :success="success"
        html-for="email"
      >
        <div class="w-full gap-4 lg:gap-0 flex flex-col lg:flex-row">
          <Input
            v-model="form.email"
            :error="!!error"
            :success="!!success"
            type="email"
            aria-label="Adresse email"
            placeholder="Votre adresse électronique"
            input-class="lg:!rounded-none lg:!rounded-tl"
          />
          <Button
            :disabled="loading"
            class="w-full lg:w-auto lg:flex-none lg:!rounded-none lg:!rounded-tr"
            @click.native.prevent="onSubmit()"
          >
            S'abonner
          </Button>
        </div>
      </FormControl>
    </form>

    <p class="text-xs text mt-4 text-[#666666]">
      Chaque mois, nous vous proposons de nouvelles missions de bénévolat à distance ou près de chez vous.
      En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou en nous contactant.
    </p>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'
import Input from '@/components/dsfr/Input.vue'

export default {
  components: {
    Heading,
    Button,
    Input
  },
  data () {
    return {
      loading: false,
      error: '',
      success: '',
      form: {
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }

      this.error = ''
      this.success = ''

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(this.form.email).toLowerCase())) {
        this.loading = true
        this.$axios
          .post('/sendinblue/contact', { email: this.form.email })
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
    }
  }
}
</script>
