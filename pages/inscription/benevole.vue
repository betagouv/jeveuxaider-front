<template>
  <div>
    <div class="relative bg-jva-blue-500 overflow-hidden">
      <img
        class="z-1 object-cover absolute h-screen lg:h-auto"
        alt="JeVeuxAider"
        srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
        data-not-lazy
      >
      <div class="pb-12 mt-12 px-4 relative w-full lg:inset-y-0 text-center z-10">
        TODO
      </div>
    </div>
    <div class="bg-gray-100">
      <div class="max-w-[1280px] mx-auto pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        <h3
          class="text-center leading-8 pb-8 text-gray-900 text-sm font-medium text-3xl tracking-tight px-4"
        >
          Plus de <b class="font-bold">7000 organisations</b> ont déjà rejoint
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
import { string, object } from 'yup'
import MixinForm from '@/mixins/form'
// import FranceConnect from '@/components/custom/FranceConnect'

export default {
  components: {
    // FranceConnect
  },
  mixins: [MixinForm],
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
      title: 'Devenez bénévole avec JeVeuxAider.gouv.fr, la plateforme publique du bénévolat par la Réserve Civique',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/register/volontaire'
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
  computed: {
    isFranceConnectActive () {
      return !!this.$config.franceConnect
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.loading = true
          this.$store.dispatch('auth/login', this.form)
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
