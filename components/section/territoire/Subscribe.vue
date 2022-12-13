<template>
  <div class="overflow-hidden">
    <hr class="opacity-25">

    <section class="section-subscribe bg-[#EEEDF8] relative">
      <div class="relative z-10 container mx-auto px-4 lg:px-12">
        <div class="pt-16 pb-8 lg:py-28">
          <h2 class="max-w-2xl mb-12">
            <p class="uppercase text-jva-red-500 font-extrabold text-sm mb-4">
              Chacun pour tous
            </p>

            <p
              class="text-4xl xl:text-5xl leading-none font-extrabold tracking-[-1px] lg:tracking-[-2px] text-jva-blue-500"
            >
              Suivez toute l'actualité du bénévolat
              {{ territoire.suffix_title }}
            </p>
          </h2>

          <p class="md:text-xl text-gray-700 sm:max-w-md md:max-w-lg mb-8">
            Trouvez des missions en quelques clics et devenez bénévole près de
            chez vous ou à distance
          </p>

          <div
            class="rounded-2xl py-4 px-6 sm:pr-4 sm:pl-8 bg-white shadow-lg lg:-mx-8"
            :class="[{ 'inline-block': submitted }]"
            style="max-width: 746px"
          >
            <form
              v-if="!submitted"
              ref="subscribeForm"
              class="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8"
              @submit.prevent="onSubmit"
            >
              <div class="w-full relative">
                <label for="email" class="text-gray-900 font-bold text-xs">E-MAIL</label>
                <input
                  id="email"
                  v-model.trim="form.email"
                  name="email"
                  type="email"
                  required
                  placeholder="Renseignez votre e-mail"
                  class="w-full p-0 border-none !outline-none placeholder-gray-400 focus:ring-0"
                  @keypress.space.prevent
                >
                <div v-if="errors" class="text-sm text-jva-red-500">
                  <div v-for="(error, key) in errors" :key="key">
                    {{ error }}
                  </div>
                </div>
              </div>

              <button
                :disabled="loading"
                type="submit"
                class="bg-jva-green-600 w-full sm:w-auto sm:flex-none flex items-center justify-center border border-transparent rounded-2xl text-white !outline-none focus:ring transition duration-150 hover:scale-105 transform will-change-transform ease-in-out font-bold text-xl px-5 py-4 sm:px-8 sm:py-4 sm:pb-5 leading-none"
                @click.prevent="onSubmit"
              >
                Je m'engage
              </button>
            </form>

            <div v-else class="flex flex-wrap items-center">
              <div class="font-bold tracking-[-1px] w-full sm:w-auto">
                Merci pour votre inscription&nbsp;!
              </div>
              <button
                ref="buttonBack"
                class="mt-4 sm:ml-4 sm:mt-0 px-4 py-2 text-sm cursor-pointer rounded-lg bg-green-100 text-jva-green-500 font-extrabold !outline-none focus:ring transition duration-150 hover:scale-105 transform will-change-transform ease-in-out"
                @click="onBack"
              >
                Retour
              </button>
            </div>
          </div>

          <p
            class="text-gray-600 text-sm mt-6 sm:max-w-md md:max-w-lg lg:max-w-full"
          >
            En m'inscrivant j'accepte la
            <Link to="/charte-reserve-civique">
              <strong>politique de confidentialité</strong>
            </Link>
            et la
            <Link to="/politique-de-confidentialite">
              <strong>charte</strong>
            </Link>
            de JeVeuxAider.gouv.fr
          </p>
        </div>
      </div>

      <div
        class="max-w-md ml-auto xl:max-w-full h-full relative sm:absolute right-0 bottom-0 sm:pt-36 lg:pt-8 z-0"
      >
        <img
          src="/images/territoires/subscribe-pattern.svg"
          class="ml-auto w-full h-full object-contain object-right-bottom absolute"
        >
        <img
          src="/images/territoires/subscribe-illustration.png"
          srcset="/images/territoires/subscribe-illustration@2x.png 2x"
          :alt="`Suivez toute l'actualité du bénévolat
              ${territoire.suffix_title}`"
          class="ml-auto w-full h-full object-contain object-right-bottom relative"
        >
      </div>
    </section>
  </div>
</template>

<script>
import * as yup from 'yup'
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Link
  },
  props: {
    territoire: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: {},
      submitted: false,
      errors: false
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true

      const schema = yup.object().shape({
        email: yup.string().required("Merci d'indiquer votre email").email("Le format de l'email n'est pas valide")
      })

      schema
        .validate(this.form)
        .then(async (valid) => {
          await this.$axios.post('/sendinblue/contact', {
            email: this.form.email,
            zipcode: this.territoire.zips ? this.territoire.zips[0] : null,
            department: this.territoire.department
          })
          this.submitted = true
        }).catch((err) => {
          this.errors = err.errors
        })
        .finally(() => {
          this.loading = false
        })
    },
    onBack () {
      this.form.email = ''
      this.submitted = false
      this.errors = false
    }
  }
}
</script>
