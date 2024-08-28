<template>
  <div class="relative">
    <ClientOnly>
      <Teleport to="#teleport-sidebar">
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <BaseSteps :steps="steps" />
      </Teleport>
    </ClientOnly>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        Dites-nous en plus<br />
        sur vous
        <span class="font-bold">{{ $stores.auth.profile?.first_name }}</span>
      </h1>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Renseignez vos dispositifs {{ selectedItem }}
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <div class="mb-8 text-md text-gray-500">
          Renseignez votre profil avec les dispositifs auxquelles vous appartenez. (Service Civique,
          CEJ, France Travail, ...)
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div
            v-if="hasServiceCiviqueChecked"
            class="group px-6 py-4 flex items-center gap-4 border rounded-lg w-full cursor-pointer"
            @click="openServiceCiviqueModal"
          >
            <div>
              <img
                src="/images/logo-service-civique.png"
                srcset="/images/logo-service-civique.png, /images/logo-service-civique@2x.png 2x"
                alt="Service Civique"
                title="Service Civique"
                class="hidden lg:block flex-none w-[65px] h-auto object-contain object-left"
                data-not-lazy
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Volontaire en Service Civique</div>
              <div class="italic text-[#666666] text-sm">
                À partir du
                {{ $dayjs(form.service_civique_completion_date).format('DD/MM/YYYY') }}
              </div>
            </div>
            <RiPencilLine class="h-5 w-5 fill-[#666666] transition group-hover:scale-110" />
          </div>

          <div
            v-if="hasCejChecked"
            class="group px-6 py-4 flex items-center gap-4 border rounded-lg w-full cursor-pointer"
            @click="openCejModal"
          >
            <div>
              <img
                src="/images/logo-cej.png"
                srcset="/images/logo-cej.png, /images/logo-cej@2x.png 2x"
                alt="Contrat d'Engagement Jeune"
                title="Contrat d'Engagement Jeune"
                class="hidden lg:block flex-none w-[65px] h-auto object-contain object-left"
                data-not-lazy
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Engagé en Contrat d'Engagement Jeune</div>
              <div class="italic text-[#666666] text-sm">
                Conseiller CEJ :
                {{ form.cej_email_adviser }}
              </div>
            </div>
            <RiPencilLine class="h-5 w-5 fill-[#666666] transition group-hover:scale-110" />
          </div>

          <div
            v-if="hasFtChecked"
            class="group px-6 py-4 flex items-center gap-4 border rounded-lg w-full cursor-pointer"
            @click="openFtModal"
          >
            <div>
              <img
                src="/images/logo-france-travail.svg"
                alt="France Travail"
                title="France Travail"
                class="hidden lg:block flex-none w-[65px] h-auto object-contain object-left"
                data-not-lazy
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Bénéficiaire d'une allocation RSA</div>
              <div class="italic text-[#666666] text-sm">
                Conseiller France Travail :
                {{ form.ft_email_adviser }}
              </div>
            </div>
            <RiPencilLine class="h-5 w-5 fill-[#666666] transition group-hover:scale-110" />
          </div>

          <button
            class="px-6 py-4 flex items-center justify-center gap-2 border rounded-lg border-dashed w-full cursor-pointer"
            @click="openModal"
          >
            <RiAddFill class="h-5 w-5" /> <span>Ajouter un dispositif</span>
          </button>
        </div>

        <DsfrButton
          size="lg"
          :loading="loading"
          class="w-full mt-8"
          @click.native.prevent="onSubmit"
        >
          Enregistrer
        </DsfrButton>
      </div>
    </div>
    <ModalUserDispositifs
      :is-open="showModal"
      :profile="form"
      v-model:selectedItem="selectedItem"
      @save="onDispositifSave"
      @confirm="showModal = false"
      @cancel="showModal = false"
    />
  </div>
</template>

<script>
import FormErrors from '@/mixins/form/errors'
import ModalUserDispositifs from '@/components/modal/ModalUserDispositifs'

export default defineNuxtComponent({
  components: { ModalUserDispositifs },
  mixins: [FormErrors],
  setup() {
    definePageMeta({
      layout: 'register-steps',
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      loading: false,
      showModal: false,
      selectedItem: null,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/benevole/step/profile',
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/benevole/step/profile',
        },
        {
          name: 'Vos dispositifs',
          status: 'current',
          href: '/inscription/benevole/step/profile',
        },
        {
          name: 'Vos préférences',
          status: 'upcoming',
          href: '/inscription/benevole/step/preferences',
        },
        {
          name: 'Vos disponibilités',
          status: 'upcoming',
          href: '/inscription/benevole/step/disponibilites',
        },
        {
          name: 'Vos compétences',
          status: 'upcoming',
        },
      ],
      form: _cloneDeep(this.$stores.auth.user.profile),
    }
  },
  computed: {
    profile() {
      return this.$stores.auth.profile
    },
    hasServiceCiviqueChecked() {
      return this.form.service_civique
    },
    hasCejChecked() {
      return this.form.cej
    },
    hasFtChecked() {
      return this.form.ft
    },
  },
  methods: {
    openServiceCiviqueModal() {
      this.selectedItem = 'service_civique'
      this.showModal = true
    },
    openCejModal() {
      this.selectedItem = 'cej'
      this.showModal = true
    },
    openFtModal() {
      this.selectedItem = 'ft'
      this.showModal = true
    },
    openModal() {
      this.selectedItem = null
      this.showModal = true
    },
    onDispositifSave(data) {
      this.form = { ...this.form, ...data }
    },
    async onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$stores.auth.updateProfile({
        id: this.$stores.auth.profile?.id,
        ...this.form,
      })
      this.loading = false
      this.$plausible.trackEvent('Inscription bénévole - Étape - Dispositifs')
    },
  },
})
</script>
