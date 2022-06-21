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
        <div class="px-4 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8 pb-10">
          <div class="lg:col-span-6">
            <h1
              class="mt-10 lg:mt-24 text-4xl tracking-tight leading-10 font-bold text-white sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl"
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
              class="pt-10 pb-16 lg:pb-0 leading-10 text-4xl font-medium text-white sm:mt-5 tracking-tight"
            >
              Plus de <b class="font-bold">300 000 bénévoles</b> <br>sont
              déjà inscrits.
            </p>
          </div>
          <div class="lg:col-span-6">
            <div
              class="max-w-2xl mx-auto lg:col-span-6 lg:px-0 lg:w-full"
            >
              <div class="rounded-lg shadow-xl">
                <div
                  class="bg-white px-6"
                  :class="
                    isLoadingFranceConnect ? 'rounded-lg' : 'rounded-t-lg'
                  "
                >
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
                  class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-2 px-4 sm:px-12 bg-gray-50"
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
                          <Button
                            size="xl"
                            variant="green"
                            full
                          >
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
                      </formcontrol>
                    </form>

                    <Button
                      type="submit"
                      size="xl"
                      form="inscription"
                      variant="green"
                      full
                      :loading="loading"
                      @click="onSubmit"
                    >
                      Je m'inscris en tant que bénévole
                    </Button>

                    <div class="mt-6 mb-3 bg-gray-50">
                      <p class="text-xs leading-5 text-gray-500 text-center">
                        <span>En m'inscrivant j'accepte la</span>
                        <nuxt-link
                          to="/politique-de-confidentialite"
                          target="_blank"
                          class="font-medium text-gray-900 hover:underline"
                        >
                          politique de confidentialité
                        </nuxt-link>
                        <br>
                        <span>et la</span>
                        <nuxt-link
                          to="/charte-reserve-civique"
                          target="_blank"
                          class="font-medium text-gray-900 hover:underline"
                        >
                          charte de JeVeuxAider.gouv.fr
                        </nuxt-link>
                        <br>
                        <span>Déjà inscrit ? </span>
                        <nuxt-link to="/login">
                          <span
                            class="text-xs leading-5 text-center font-medium text-gray-900 hover:underline"
                          >
                            Je me connecte
                          </span>
                        </nuxt-link>
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
    <div class="bg-gray-100">
      <div class="max-w-[1280px] mx-auto pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        <h3
          class="text-center leading-8 pb-8 text-gray-900 font-medium text-3xl tracking-tight px-4"
        >
          Plus de <b class="font-bold">8000 organisations</b> ont déjà rejoint
          JeVeuxAider.gouv.fr
        </h3>
        <div class="overflow-hidden">
          <div class="flex flex-wrap items-center justify-center -m-4 sm:-m-8">
            <img
              alt="Article1"
              class="min-w-0 m-4 sm:m-8 object-contain"
              src="/images/inscription/logo_article1.png"
              style="max-height: 3rem"
            >

            <img
              alt="APHP"
              class="min-w-0 m-4 sm:m-8 object-contain max-h-[5rem]"
              src="/images/inscription/logo_aphp.png"
            >
            <img
              alt="Emmaus"
              class="min-w-0 m-4 sm:m-8 object-contain max-h-[5rem]"
              src="/images/inscription/logo_emmaus.png"
            >
            <img
              alt="Banque Alimentaire"
              class="min-w-0 m-4 sm:m-8 object-contain max-h-[5rem]"
              src="/images/inscription/logo_banquealimentaire.png"
              style="max-width: 11rem"
            >
            <img
              alt="J'agis pour la nature"
              class="min-w-0 m-4 sm:m-8 object-contain"
              src="/images/inscription/logo-jagis-pour-la-nature.svg"
              style="max-height: 3rem"
            >
          </div>
        </div>
      </div>
    </div>

    <section class="bg-gray-100 pb-16">
      <div
        class="max-w-[1280px] mx-auto grid gap-6 lg:grid-cols-2 px-4 lg:px-6 lg:px-8"
      >
        <div
          class="p-8 sm:p-12 sm:px-24 lg:px-12 lg:flex lg:flex-col bg-white rounded-lg shadow-lg"
        >
          <blockquote class="lg:flex-grow lg:flex lg:flex-col">
            <div
              class="relative text-lg leading-7 font-medium text-gray-800 lg:flex-grow"
            >
              <svg
                class="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 h-8 w-8 text-gray-300 opacity-50"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path
                  d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                />
              </svg>
              <p class="relative">
                J’ai eu la chance de pouvoir me rendre utile en faisant une
                distribution de repas pour les SDF de Nancy. Une expérience qui
                ne laisse pas indifférent … J'ai des souvenirs plein la tête.
                Maintenant je continue mon chemin avec JeVeuxAider.gouv.fr. Je
                me sens utile et citoyenne.
              </p>
            </div>
            <footer class="mt-6">
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 inline-flex rounded-full border-2 border-gray-200"
                >
                  <img
                    alt="photo bénévole"
                    class="h-12 w-12 rounded-full"
                    src="/images/inscription/bene2.png"
                  >
                </div>
                <div class="ml-4">
                  <div class="text-base leading-6 font-medium text-gray-900">
                    Catherine
                  </div>
                  <div class="text-base leading-6 font-medium text-gray-400">
                    Bénévole à Nancy (54)
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
        <div
          class="p-8 sm:p-12 sm:px-24 lg:px-12 lg:flex lg:flex-col bg-white rounded-lg shadow-lg"
        >
          <blockquote class="lg:flex-grow lg:flex lg:flex-col">
            <div
              class="relative text-lg leading-7 font-medium text-gray-800 lg:flex-grow"
            >
              <svg
                class="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 h-8 w-8 text-gray-300 opacity-50"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path
                  d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                />
              </svg>
              <p class="relative">
                Pendant la crise de Covid-19, je ressentais le besoin de
                m’engager et d’aider. Je me suis inscrite sur
                JeVeuxAider.gouv.fr et j’ai participé au dispositif Covidom, aux
                côtés des professionnels de l'APHP et d'une équipe de bénévoles
                très motivés. Notre mission : nous assurer que tous les patients
                puissent bénéficier d’un suivi médical à distance. Covidom
                montre que le partenariat entre public, privé et société civile
                est non seulement possible mais surtout incroyablement efficace
                en situation d’urgence.
              </p>
            </div>
            <footer class="mt-6">
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 inline-flex rounded-full border-2 border-gray-200"
                >
                  <img
                    class="h-12 w-12 rounded-full"
                    src="/images/inscription/bene.png"
                    alt="photo bénévole"
                  >
                </div>
                <div class="ml-4">
                  <div class="text-base leading-6 font-medium text-gray-900">
                    Marion
                  </div>
                  <div class="text-base leading-6 font-medium text-gray-400">
                    Bénévole à Paris (75)
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
      <div class="mt-16">
        <div class="px-4">
          <img
            class="h-10 mx-auto opacity-75 mb-4"
            src="/images/inscription/logo-gray.svg"
            alt=""
          >
          <img
            class="w-full sm:h-24 sm:w-auto mx-auto opacity-50"
            src="/images/inscription/chacunpourtous.png"
            style="max-width: 420px"
            alt=""
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { string, object, ref, date } from 'yup'
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
        zip: this.$route.query.zip ? this.$route.query.zip : '',
        password: '',
        utm_source: this.$cookies.get('utm_source')
      },
      formSchema: object({
        first_name: string().min(3).required('Un prénom est requis'),
        last_name: string().min(2).required('Un nom est requis'),
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
          await this.$store.dispatch('auth/registerVolontaire', this.form)
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
