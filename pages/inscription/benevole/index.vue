<template>
  <div>
    <div class="relative bg-[#081992]">
      <img
        class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
        alt="JeVeuxAider.gouv.fr"
        srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
        data-not-lazy
      >
      <div class="max-w-[1280px] mx-auto py-12 relative w-full lg:inset-y-0 z-10">
        <div class="px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-8 pb-10">
          <div class="lg:col-span-6">
            <h1
              class="mt-10 lg:mt-32 text-3xl sm:text-4xl leading-10 font-bold text-white sm:leading-none md:text-6xl lg:text-4xl xl:text-5xl"
            >
              Devenez bénévole avec JeVeuxAider.gouv.fr
            </h1>
            <ul class="pt-6 lg:pt-14">
              <li class="flex items-start">
                <div class="flex-shrink-0">
                  <svg
                    class="h-6 w-6 text-jva-green-500"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="ml-3 text-xl lg:text-2xl leading-6 text-white">
                  Trouvez des missions en quelques clics
                </p>
              </li>
              <li class="mt-6 flex items-start">
                <div class="flex-shrink-0">
                  <svg
                    class="h-6 w-6 text-jva-green-500"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="ml-3 text-xl lg:text-2xl leading-6 text-white">
                  Devenez bénévole près de chez vous ou à distance
                </p>
              </li>
              <li class="mt-6 flex items-start">
                <div class="flex-shrink-0">
                  <svg
                    class="h-6 w-6 text-jva-green-500"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="ml-3 text-xl lg:text-2xl leading-6 text-white">
                  Faites vivre l'engagement de chacun pour tous&nbsp;!
                </p>
              </li>
            </ul>

            <p
              class="pt-10 pb-16 lg:pb-0 leading-10 text-3xl sm:text-4xl font-medium text-white sm:mt-5"
            >
              Plus de <b class="font-bold">400 000 bénévoles</b> <br class="hidden sm:block">sont
              déjà inscrits.
            </p>
          </div>
          <div class="lg:col-span-6">
            <div
              class="max-w-2xl mx-auto lg:col-span-6 lg:px-0 lg:w-full"
            >
              <div class="rounded-lg shadow-xl">
                <div class="bg-white px-6">
                  <template v-if="$store.state.settings.general.france_connect_active">
                    <div class="pt-8">
                      <h2
                        class="mt-2 text-center text-3xl font-bold text-gray-900 leading-8 px-4"
                      >
                        Utilisez FranceConnect pour créer votre espace bénévole
                      </h2>

                      <div
                        v-show="isLoadingFranceConnect"
                        class="font-medium text-center p-4"
                      >
                        Inscription en cours avec FranceConnect...
                      </div>

                      <div v-show="!isLoadingFranceConnect">
                        <div
                          class="mt-4 sm:mx-auto sm:w-full sm:max-w-md text-left"
                        >
                          <div class="py-4 px-4 sm:px-10 text-center">
                            <div class="relative text-gray-500">
                              <FranceConnect
                                is-dark
                                @loading="isLoadingFranceConnect = $event"
                              />
                              <span class="block mt-4">OU</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="py-6">
                      <h2
                        class="text-center text-3xl font-bold text-gray-900 leading-8 px-4"
                      >
                        Création de votre compte
                      </h2>
                    </div>
                  </template>
                </div>
                <div
                  v-show="!isLoadingFranceConnect"
                  class="border-t-2 border-gray-100 pt-10 pb-2 px-4 sm:px-12 bg-gray-50"
                >
                  <template v-if="$store.state.settings.general.light_mode_active">
                    <div class="text-center space-y-6 pb-12">
                      <p class="font-medium">
                        Quel élan de solidarité&nbsp;!
                      </p>
                      <p>
                        Vous êtes actuellement très nombreux·ses à vouloir vous
                        engager et notre plateforme rencontre des difficultés.
                      </p>
                      <p>
                        Revenez dans quelques minutes pour vous inscrire. Nous
                        avons plus que jamais besoin de vous&nbsp;!
                      </p>
                      <div>
                        <nuxt-link to="/missions-benevolat">
                          <Button size="lg" class="w-full">
                            Décrouvrir les missions
                          </Button>
                        </nuxt-link>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <form id="inscription" class="gap-8 mb-8 grid grid-cols-1 lg:grid-cols-2" @submit.prevent="onSubmit">
                      <FormControl
                        label="Prénom"
                        html-for="first_name"
                        required
                        :error="errors.first_name"
                      >
                        <Input
                          v-model="form.first_name"
                          name="first_name"
                          placeholder="Jean"
                          @blur="validate('first_name')"
                        />
                      </FormControl>
                      <FormControl
                        label="Nom"
                        html-for="last_name"
                        required
                        :error="errors.last_name"
                      >
                        <Input
                          v-model="form.last_name"
                          name="last_name"
                          placeholder="Dupont"
                          @blur="validate('last_name')"
                        />
                      </FormControl>
                      <FormControl
                        label="Email"
                        html-for="email"
                        required
                        :error="errors.email"
                      >
                        <Input
                          v-model="form.email"
                          type="email"
                          name="email"
                          placeholder="jean.dupont@gmail.com"
                          @blur="validate('email')"
                        />
                      </FormControl>
                      <FormControl
                        label="Code postal"
                        html-for="zip"
                        required
                        :error="errors.zip"
                      >
                        <Input
                          v-model="form.zip"
                          name="zip"
                          type="tel"
                          placeholder="56000"
                          maxlength="5"
                          @blur="validate('zip')"
                        />
                      </FormControl>
                      <FormControl
                        label="Téléphone mobile"
                        html-for="mobile"
                        required
                        :error="errors.mobile"
                      >
                        <Input
                          v-model="form.mobile"
                          name="mobile"
                          type="tel"
                          maxlength="14"
                          placeholder="0612345678"
                          @blur="validate('mobile')"
                        />
                      </FormControl>
                      <FormControl
                        label="Date de naissance"
                        html-for="birthday"
                        required
                        :error="errors.birthday"
                      >
                        <InputDate v-model="form.birthday" required name="birthday" />
                      </FormControl>
                      <FormControl
                        label="Mot de passe"
                        html-for="password"
                        required
                        :error="errors.password"
                      >
                        <Input
                          v-model="form.password"
                          name="password"
                          placeholder="Votre mot de passe"
                          type="password"
                          @blur="validate('password')"
                        />
                      </FormControl>
                      <FormControl
                        label="Confirmation"
                        html-for="password_confirmation"
                        required
                        :error="errors.password_confirmation"
                      >
                        <Input
                          v-model="form.password_confirmation"
                          name="password_confirmation"
                          placeholder="Votre mot de passe"
                          type="password"
                          @blur="validate('password_confirmation')"
                        />
                      </FormControl>
                    </form>

                    <Button
                      size="lg"
                      form="inscription"
                      :loading="loading"
                      class="w-full"
                      @click.prevent.native="onSubmit"
                    >
                      Je m'inscris en tant que bénévole
                    </Button>

                    <div class="mt-6 mb-3 bg-gray-50">
                      <p class="text-xs text-gray-600 text-center">
                        En m'inscrivant j'accepte la
                        <Link
                          to="/politique-de-confidentialite"
                          class="font-medium text-gray-900"
                        >
                          politique de confidentialité
                        </Link>
                        <br>
                        et la
                        <Link
                          to="/charte-reserve-civique"
                          class="font-medium text-gray-900"
                        >
                          <span>charte</span>
                        </Link>
                        de JeVeuxAider.gouv.fr.
                        <br><br>
                        Déjà inscrit ?
                        <Link to="/login" class="font-medium text-gray-900">
                          Je me connecte
                        </Link>
                      </p>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white overflow-hidden">
      <div class="mx-auto max-w-6xl pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        <h3
          id="label-carousel-logos-inscription-benevoles"
          class="text-center leading-8 pb-8 text-gray-900 font-medium text-3xl px-4"
        >
          Plus de <b class="font-bold">10 000 organisations</b> ont déjà rejoint
          JeVeuxAider.gouv.fr
        </h3>
        <CarouselLogos />
      </div>
    </div>

    <Temoignages />

    <div class="my-16">
      <div class="px-4">
        <img
          class="w-auto sm:h-10 mx-auto opacity-75 mb-4"
          src="/images/inscription/logo_jva_gris.png"
          alt=""
        >
        <img
          class="w-auto sm:h-12 mx-auto opacity-50"
          src="/images/inscription/logo_cpt_gris.png"
          style=""
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, ref, date } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Emailable from '@/mixins/emailable.client'
import FranceConnect from '@/components/custom/FranceConnect'
import Temoignages from '@/components/section/homepage/Temoignages'
import CarouselLogos from '@/components/section/inscription/CarouselLogos'
import Link from '@/components/dsfr/Link.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    FranceConnect,
    Temoignages,
    CarouselLogos,
    Link,
    Button
  },
  mixins: [FormErrors, Emailable],
  middleware: 'guest',
  data () {
    return {
      loading: false,
      isLoadingFranceConnect: false,
      form: {
        email: this.$route.query.email ? this.$route.query.email : '',
        zip: this.$route.query.zip ? this.$route.query.zip : '',
        password: '',
        utm_source: this.$cookies.get('utm_source'),
        utm_campaign: this.$cookies.get('utm_campaign'),
        utm_medium: this.$cookies.get('utm_medium')
      },
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        mobile: string().min(10).matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect').required('Un téléphone mobile est requis'),
        zip: string().min(5).required('Un code postal est requis'),
        birthday: date().required("Une date d'anniversaire est requise").nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        password: string().min(8).required('Un mot de passe est requis'),
        password_confirmation: string().required('Une confirmation de mot de passe est requise').oneOf([ref('password'), null], 'Le mot de passe n\'est pas identique')
      })
    }
  },
  head () {
    return {
      title: 'Devenez bénévole avec JeVeuxAider.gouv.fr, la plateforme publique du bénévolat par la Réserve Civique',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/inscription/benevole'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Créez votre page dédiée et centralisez les missions de vos associations et organisations publiques afin de promouvoir le bénévolat de proximité.'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          const isEmailValid = await this.emailableValidation()
          if (!isEmailValid) {
            this.errors.email = 'Votre adresse mail comporte une erreur'
            this.$toast.error('Votre adresse mail comporte une erreur')
            return
          }
          await this.$store.dispatch('auth/registerVolontaire', this.form)
          window.plausible && window.plausible('Inscription bénévole - Étape 1 - Création de compte')
          this.$router.push('/inscription/benevole/step/profile')
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
