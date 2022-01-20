<template>
  <div class="relative bg-[#081992]">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
      data-not-lazy
    >
    <div class="py-12 px-4 relative w-full lg:inset-y-0 text-center z-10">
      <template v-if="isFranceConnectActive">
        <div class="">
          <h2
            class="mt-6 mb-4 md:mb-0 text-center text-3xl font-bold text-white leading-8 px-4"
          >
            Utilisez FranceConnect pour vous connecter ou créer un compte
          </h2>
          <p class="text-center text-base text-[#c3ddfd]">
            FranceConnect, c'est la solution proposée par l'Etat pour sécuriser
            et simplifier la connexion à plus de 700 services en ligne.
          </p>
        </div>

        <div
          v-show="isLoadingFranceConnect"
          class="text-white font-medium text-center p-4"
        >
          Connexion en cours avec FranceConnect...
        </div>
      </template>
      <template v-else>
        <div class="">
          <h2
            class="mt-6 mb-6 md:mb-12 text-center text-3xl font-bold text-white leading-8 px-4"
          >
            Connexion à votre compte
          </h2>
        </div>
      </template>
      <div v-show="!isLoadingFranceConnect">
        <div
          v-if="isFranceConnectActive"
          class="mt-4 sm:mx-auto sm:w-full sm:max-w-md text-left"
        >
          <div class="py-4 px-4 sm:px-10 text-center">
            <div class="relative">
              <FranceConnect @loading="isLoadingFranceConnect = $event" />
              <span class="block mt-4 text-[#c3ddfd]">OU</span>
            </div>
          </div>
        </div>

        <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md text-left">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-xl">
                <span class="px-2 bg-white font-bold text-gray-900">
                  J'ai déjà un compte
                </span>
              </div>
            </div>

            <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
              <FormControl label="Email" html-for="email" required :error="errors.email">
                <Input
                  v-model="form.email"
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
                  <Link
                    to="/password-reset"
                    class="text-sm font-medium mt-2"
                  >
                    Mot de passe perdu ?
                  </Link>
                </template>
              </FormControl>
              <Button
                type="submit"
                size="xl"
                variant="green"
                full
                :loading="loading"
                @click="onSubmit"
              >
                Connexion
              </Button>
            </form>
            <div class="mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200" />
                </div>
                <div class="relative flex justify-center text-xl">
                  <span class="px-2 bg-white font-bold text-gray-900">
                    Première visite ?
                  </span>
                </div>
              </div>

              <div class="mt-6">
                <Button size="xl" variant="white" full @click.native="$router.push('/inscription/benevole')">
                  Créez votre espace bénévole
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-2xl mx-auto">
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div
            class="border-[#1e429f] border overflow-hidden shadow rounded-lg"
          >
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-medium text-[#c3ddfd] truncate">
                Vous êtes une organisation ?
              </dt>
              <nuxt-link
                to="/inscription/responsable"
                class="mt-4 w-full flex justify-center py-3 px-4 rounded-lg text-lg shadow-sm font-bold text-[#1f0391] bg-[#c3ddfd] hover:shadow-lg hover:text-gray-800 hover:border-transparent hover:bg-white hover:scale-105 transform transition"
              >
                Publiez vos missions
              </nuxt-link>
            </div>
          </div>

          <div
            class="border-[#1e429f] border overflow-hidden shadow rounded-lg"
          >
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-base font-medium text-[#c3ddfd] truncate">
                Vous êtes une collectivité ?
              </dt>
              <nuxt-link
                to="/inscription/responsable?orga_type=Collectivité"
                class="mt-4 w-full flex justify-center py-3 px-4 rounded-lg text-lg shadow-sm font-bold text-[#1f0391] bg-[#c3ddfd] hover:shadow-lg hover:text-gray-800 hover:border-transparent hover:bg-white hover:scale-105 transform transition"
              >
                Créez votre page
              </nuxt-link>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FranceConnect from '@/components/custom/FranceConnect'

export default {
  components: {
    FranceConnect
  },
  mixins: [FormErrors],
  middleware: 'guest',
  data () {
    return {
      loading: false,
      isLoadingFranceConnect: false,
      form: {
        email: this.$route.query.email ? this.$route.query.email : '',
        password: ''
      },
      formSchema: object({
        email: string().required().email(),
        password: string().required()
      })
    }
  },
  head () {
    return {
      title: 'Connectez-vous à votre espace personnel | JeVeuxAider.gouv.fr',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/login'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Connectez-vous à votre espace personnel et gérez vos missions de bénévolat en quelques clics. '
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        }
      ]
    }
  },
  computed: {
    isFranceConnectActive () {
      return !!this.$config.franceConnect
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          await this.$store.dispatch('auth/login', this.form)
          this.$router.push(
            this.$router.history.current.query.redirect || '/profile'
          )
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
