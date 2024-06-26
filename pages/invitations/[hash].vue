<template>
  <div class="h-screen flex flex-col justify-center">
    <div class="py-12 px-4 relative w-full lg:inset-y-0 text-center z-10">
      <div class="flex-shrink-0 flex justify-center mb-12">
        <NuxtLink no-prefetch to="/">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt=""
            class="h-10 lg:h-12"
            width="350"
            height="auto"
            data-not-lazy
          />
        </NuxtLink>
      </div>

      <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md text-left">
        <div class="bg-white py-8 px-4 shadow sm:px-10">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div class="relative flex justify-center text-xl">
              <span class="px-2 bg-white font-bold text-gray-900"> Invitation </span>
            </div>
          </div>
          <div class="text-center mt-4" v-html="descriptionInvitation" />
          <template v-if="invitation.is_registered">
            <FormInvitationAcceptLogin
              v-if="!$stores.auth.isLogged"
              :invitation="invitation"
              @submitted="handleAcceptInvitation()"
            />
            <DsfrButton
              v-else
              :is-submit="true"
              size="lg"
              class="mt-6 w-full"
              @click.native="handleAcceptInvitation()"
            >
              J'accepte l'invitation
            </DsfrButton>
          </template>
          <template v-else>
            <FormInvitationAcceptRegister
              :invitation="invitation"
              @submitted="handleAcceptInvitation()"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormInvitationAcceptLogin from '@/components/form/FormInvitationAcceptLogin.vue'
import FormInvitationAcceptRegister from '@/components/form/FormInvitationAcceptRegister.vue'

export default defineNuxtComponent({
  components: {
    FormInvitationAcceptLogin,
    FormInvitationAcceptRegister,
  },
  async setup() {
    definePageMeta({
      layout: 'empty',
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    const invitation = await apiFetch(`/invitations/${route.params.hash}`)

    if (!invitation) {
      return showError({
        statusCode: 404,
        message: "Cette invitation n'est plus disponible",
      })
    }

    if ($stores.auth.isLogged) {
      if ($stores.auth.profile.email !== invitation.email) {
        return showError({ statusCode: 403 })
      }
    }

    return {
      invitation,
    }
  },
  computed: {
    descriptionInvitation() {
      switch (this.invitation.role) {
        case 'benevole':
          return "Vous avez été invité(e) à rejoindre la plateforme d'engagement<strong>JeVeuxAider.gouv.fr</strong> de la Réserve Civique."
        case 'responsable_organisation':
          return `Vous avez été invité(e) à rejoindre l'organisation <strong>${this.invitation.invitable.name}</strong> en tant que responsable.`
        case 'responsable_antenne':
          return `Vous avez été invité(e) à créer l'antenne <strong>${this.invitation.properties.antenne_name}</strong> du réseau <strong>${this.invitation.invitable.name}</strong>.`
        case 'responsable_reseau':
          return `Vous avez été invité(e) à superviser le réseau <strong>${this.invitation.invitable.name}</strong>.`
        case 'responsable_territoire':
          return `Vous avez été invité(e) à rejoindre le territoire  <strong>${this.invitation.invitable.name}</strong> en tant que responsable.`
        case 'referent_departemental':
          return `Vous avez été invité(e) à rejoindre le département ${this.invitation.properties.referent_departemental} en tant que référent.`
        case 'referent_regional':
          return `Vous avez été invité(e) à rejoindre la région <strong>${this.invitation.properties.referent_regional}</strong> en tant que référent.`
      }
      return this.invitation.role
    },
  },
  methods: {
    async handleAcceptInvitation() {
      await apiFetch(`/invitations/${this.invitation.token}/accept`, {
        method: 'POST',
      })
      // Fetch User for new ContextRole
      await this.$stores.auth.fetchUser()
      if (this.invitation.role == 'benevole') {
        this.$router.push('/')
      } else if (this.invitation.role == 'responsable_antenne') {
        this.$router.push('/inscription/responsable/step/profile')
      } else {
        this.$router.push('/dashboard')
      }
    },
  },
})
</script>
