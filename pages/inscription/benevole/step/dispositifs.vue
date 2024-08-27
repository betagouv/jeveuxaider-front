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
        Renseignez vos dispositifs
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <div class="mb-8 text-md text-gray-500">
          Renseignez votre profil avec les dispositifs auxquelles vous appartenez.
        </div>

        <div>
          <button class="h-12 w-12 border-dashed" @click="showModal = true">
            <RiAddFill class="h-5 w-5" />
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
  methods: {
    handleSelectItems(item) {
      this.form.skills = [...this.form.skills, item]
    },
    onRemovedTagItem(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
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
