<template>
  <div class="relative bg-[#081992]">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      src="/images/bg-jva.jpg"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x"
      data-not-lazy
    />
    <div class="relative p-6 py-12 lg:p-12 lg:py-16">
      <div class="mb-6 lg:mb-12 text-center text-white">
        <h1 class="text-4xl lg:text-5xl font-medium mb-8 max-w-4xl mx-auto">
          Félicitations
          <span class="font-bold">{{ $stores.auth.profile.first_name }}</span>
          !<br />
          Votre organisation est prête <br class="hidden lg:block" />pour la suite
        </h1>
      </div>
      <div class="max-w-5xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-8">
          <div class="text-black text-3xl font-bold leading-9 text-center">Suivez le guide</div>
          <div class="text-center text-gray-500 my-6">
            Découvrez la plateforme et sa gestion simplifiée des candidatures de bénévoles
          </div>
          <a
            target="_blank"
            href="https://app.livestorm.co/jeveuxaider/session-daccueil-associations"
          >
            <DsfrButton
              size="lg"
              class="w-full"
              type="secondary"
              tabindex="-1"
              icon="RiExternalLinkLine"
              icon-position="right"
            >
              <span class="hidden lg:inline">Participer à la session d'accueil </span>
              <span class="inline lg:hidden">Session d'accueil</span>
            </DsfrButton>
          </a>
        </div>
        <div class="bg-white p-8">
          <div class="text-black text-3xl font-bold leading-9 text-center">
            Publiez votre 1ère mission
          </div>
          <div class="text-center text-gray-500 my-6">
            Proposez dès maintenant vos missions sur la plateforme et recrutez vos premiers
            bénévoles
          </div>
          <DsfrButton size="lg" class="w-full" @click="$router.push('/dashboard')">
            C'est parti !
          </DsfrButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()

    if (!$stores.auth.currentRole || $stores.auth.currentRole.contextable_type !== 'structure') {
      return showError({ statusCode: 403 })
    }
    const organisation = await apiFetch(`/structures/${$stores.auth.currentRole.contextable_id}`)
    return {
      form: organisation,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      this.$router.push('/dashboard')
    },
  },
})
</script>
