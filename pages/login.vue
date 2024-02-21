<template>
  <div class="relative bg-[#081992]">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x"
      src="/images/bg-jva.jpg"
      data-not-lazy
    />
    <div class="py-12 px-4 relative w-full lg:inset-y-0 text-center z-10">
      <template v-if="$stores.settings.general?.france_connect_active">
        <div>
          <h2 class="mt-6 mb-4 md:mb-0 text-center text-3xl font-bold text-white leading-8 px-4">
            Utilisez FranceConnect pour vous connecter ou créer un compte
          </h2>
          <p class="text-center text-base text-[#c3ddfd]">
            FranceConnect, c'est la solution proposée par l'Etat pour sécuriser et simplifier la
            connexion à plus de 700 services en ligne.
          </p>
        </div>

        <div v-show="isLoadingFranceConnect" class="text-white font-medium text-center p-4">
          Connexion en cours avec FranceConnect...
        </div>
      </template>
      <template v-else>
        <div>
          <h2 class="mt-6 mb-6 md:mb-12 text-center text-3xl font-bold text-white leading-8 px-4">
            Connexion à votre compte
          </h2>
        </div>
      </template>
      <div v-show="!isLoadingFranceConnect">
        <div
          v-if="$stores.settings.general?.france_connect_active"
          class="mt-4 sm:mx-auto sm:w-full sm:max-w-md text-left"
        >
          <div class="py-4 px-4 sm:px-10 text-center">
            <div class="relative">
              <CustomFranceConnect @loading="isLoadingFranceConnect = $event" />
              <span class="block mt-4 text-[#c3ddfd]">OU</span>
            </div>
          </div>
        </div>

        <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md text-left">
          <div class="bg-white py-8 px-4 shadow sm:px-10">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-xl">
                <span class="px-2 bg-white font-bold text-gray-900"> J'ai déjà un compte </span>
              </div>
            </div>

            <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
              <BaseFormControl label="Email" html-for="email" required :error="errors.email">
                <BaseInput
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="Entrez votre email"
                  aria-required="true"
                  autocomplete="email"
                  @blur="validate('email')"
                />
              </BaseFormControl>
              <BaseFormControl
                label="Mot de passe"
                html-for="password"
                required
                :error="errors.password"
              >
                <BaseInput
                  v-model="form.password"
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  type="password"
                  aria-required="true"
                  autocomplete="current-password"
                  @blur="validate('password')"
                />
                <template #description>
                  <div class="mt-2">
                    <DsfrLink to="/password-reset" class="text-sm font-medium text-jva-blue-500">
                      Mot de passe perdu ?
                    </DsfrLink>
                  </div>
                </template>
              </BaseFormControl>
              <DsfrButton size="lg" :loading="loading" class="w-full" @click.prevent="onSubmit">
                Connexion
              </DsfrButton>
            </form>
            <div class="mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200" />
                </div>
                <div class="relative flex justify-center text-xl">
                  <span class="px-2 bg-white font-bold text-gray-900"> Première visite ? </span>
                </div>
              </div>

              <div class="mt-6">
                <DsfrButton
                  size="lg"
                  type="secondary"
                  class="w-full"
                  @click.native="$router.push('/inscription/benevole')"
                >
                  Créez votre espace bénévole
                </DsfrButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto">
        <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="border-[#1e429f] border overflow-hidden shadow">
            <div class="px-4 py-5 sm:p-6">
              <p class="text-base font-medium text-[#c3ddfd] truncate">
                Vous êtes une organisation ?
              </p>
              <nuxt-link
                no-prefetch
                to="/inscription/responsable"
                class="mt-4 w-full flex justify-center py-3 px-4 text-lg shadow-sm font-bold text-[#1f0391] bg-[#c3ddfd] hover:shadow-lg hover:text-gray-800 hover:border-transparent hover:bg-white transition"
              >
                Publiez vos missions
              </nuxt-link>
            </div>
          </div>

          <div class="border-[#1e429f] border overflow-hidden shadow">
            <div class="px-4 py-5 sm:p-6">
              <p class="text-base font-medium text-[#c3ddfd] truncate">
                Vous êtes une collectivité territoriale ?
              </p>
              <nuxt-link
                no-prefetch
                to="/inscription/responsable?orga_type=Collectivité"
                class="mt-4 w-full flex justify-center py-3 px-4 text-lg shadow-sm font-bold text-[#1f0391] bg-[#c3ddfd] hover:shadow-lg hover:text-gray-800 hover:border-transparent hover:bg-white transition"
              >
                Créez votre page
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalUserUnarchive
      v-if="showModalUnarchive"
      :is-open="showModalUnarchive"
      @cancel="showModalUnarchive = false"
      @create-new-account="() => $router.push('/inscription/benevole?email=' + form.email)"
      :email="form.email"
    />
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import ModalUserUnarchive from '@/components/modal/ModalUserUnarchive.vue'

export default defineNuxtComponent({
  components: {
    ModalUserUnarchive,
  },
  mixins: [FormErrors],
  setup() {
    definePageMeta({
      middleware: ['guest'],
    })

    useHead({
      title: 'Connectez-vous à votre espace personnel | JeVeuxAider.gouv.fr',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/login',
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Connectez-vous à votre espace personnel et gérez vos missions de bénévolat en quelques clics. ',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
      ],
    })
  },
  data() {
    return {
      loading: false,
      isLoadingFranceConnect: false,
      form: {
        email: this.$route.query?.email ?? '',
        password: '',
      },
      formSchema: object({
        email: string().required('Le champs email est requis').email(),
        password: string().required('Le champs mot de passe est requis'),
      }),
      showModalUnarchive: false,
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
          const response = await apiFetch(`/user/archive/exist`, {
            method: 'POST',
            body: { email: this.form.email },
          })
          console.log('userArchiveExist', response)
          if (response.exist === true) {
            this.showModalUnarchive = true
          } else {
            this.login()
          }
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async login() {
      const errorLogin = await this.$stores.auth.login(this.form)
      if (!errorLogin) {
        navigateTo(this.$route.query?.redirect ?? '/')
      }
    },
    onCancelUnarchive() {
      this.showModalUnarchive = false
      this.$router.push('/inscription/benevole')
    },
  },
})
</script>
