<template>
  <div>
    <div class="grid grid-cols-1 gap-4">
      <div
        v-if="dispositifsAvailable.includes('service_civique')"
        class="px-6 py-4 flex items-center gap-4 border rounded-lg w-full"
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
          <div class="text-balance font-bold">Êtes-vous volontaire en Service Civique ?</div>
          <div class="italic text-[#666666] text-sm">
            <template v-if="hasServiceCiviqueFilled">
              <div
                @click="openServiceCiviqueModal"
                class="group flex items-center gap-2 hover:cursor-pointer"
              >
                <span class="italic text-[#666666] text-sm"
                  >À partir du
                  {{ $dayjs(form.service_civique_completion_date).format('DD/MM/YYYY') }}</span
                >
                <RiPencilLine class="lg:hidden group-hover:inline w-4 h-auto" />
              </div>
            </template>
            <template v-else> Pour le suivi de votre parcours </template>
          </div>
        </div>
        <div>
          <BaseToggle
            :modelValue="form.service_civique"
            button-label-class="text-right"
            button-wrapper-class="items-end mt-1 sm:mt-0"
            :button-labels="{ on: 'Oui', off: 'Non' }"
            @update:modelValue="onUpdateServiceCivique"
          />
        </div>
      </div>

      <div
        v-if="dispositifsAvailable.includes('cej')"
        class="px-6 py-4 flex items-center gap-4 border rounded-lg w-full"
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
          <div class="text-balance font-bold">Êtes-vous engagé Contrat d'Engagement Jeune ?</div>
          <div class="italic text-[#666666] text-sm">
            <template v-if="hasCejFilled">
              <div @click="openCejModal" class="group flex items-center gap-2 hover:cursor-pointer">
                <span class="italic text-[#666666] text-sm">
                  Conseiller : {{ form.cej_email_adviser }}</span
                >
                <RiPencilLine class="lg:hidden group-hover:inline w-4 h-auto" />
              </div>
            </template>
            <template v-else> Pour le suivi de votre parcours CEJ </template>
          </div>
        </div>
        <div>
          <BaseToggle
            :modelValue="form.cej"
            button-label-class="text-right"
            button-wrapper-class="items-end mt-1 sm:mt-0"
            :button-labels="{ on: 'Oui', off: 'Non' }"
            @update:modelValue="onUpdateCej"
          />
        </div>
      </div>

      <div
        v-if="dispositifsAvailable.includes('ft')"
        class="px-6 py-4 flex items-center gap-4 border rounded-lg w-full"
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
          <div class="text-balance font-bold">Êtes-vous bénéficiaire du RSA ?</div>
          <div class="italic text-[#666666] text-sm">
            <template v-if="hasFtFilled">
              <div @click="openFtModal" class="group flex items-center gap-2 hover:cursor-pointer">
                <span class="italic text-[#666666] text-sm"
                  >Conseiller : {{ form.ft_email_adviser }}</span
                >
                <RiPencilLine class="lg:hidden group-hover:inline w-4 h-auto" />
              </div>
            </template>
            <template v-else> Pour le suivi de votre parcours avec France Travail </template>
          </div>
        </div>
        <div>
          <BaseToggle
            :modelValue="form.ft"
            button-label-class="text-right"
            button-wrapper-class="items-end mt-1 sm:mt-0"
            :button-labels="{ on: 'Oui', off: 'Non' }"
            @update:modelValue="onUpdateFt"
          />
        </div>
      </div>
    </div>
    <ModalUserDispositifs
      :is-open="showModal"
      :form="form"
      v-model:selectedItem="selectedItem"
      @fill="fillForm"
      @cancel="showModal = false"
    />
  </div>
</template>

<script>
import ModalUserDispositifs from '@/components/modal/ModalUserDispositifs'

export default defineNuxtComponent({
  emits: ['update'],
  components: {
    ModalUserDispositifs,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      showModal: false,
      selectedItem: null,
    }
  },
  computed: {
    dispositifsAvailable() {
      const dispositifs = []
      if (this.form?.birthday) {
        const userAge = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
        if (userAge >= 16 && userAge <= 30) {
          dispositifs.push('service_civique')
          dispositifs.push('cej')
        }
      }
      if (this.form.department) {
        if (['03', '23', '27', '80'].includes(this.form.department)) {
          dispositifs.push('ft')
        }
      }
      return dispositifs
    },
    hasServiceCiviqueFilled() {
      return this.form.service_civique && this.form.service_civique_completion_date
    },
    hasCejFilled() {
      return this.form.cej && this.form.cej_email_adviser
    },
    hasFtFilled() {
      return this.form.ft && this.form.ft_email_adviser
    },
  },
  methods: {
    onUpdateServiceCivique(value) {
      this.form.service_civique = value
      if (!value) {
        this.form.service_civique_completion_date = null
        this.$emit('update', this.form)
      } else {
        this.openServiceCiviqueModal()
      }
    },
    onUpdateCej(value) {
      this.form.cej = value
      if (!value) {
        this.form.cej_email_adviser = null
        this.$emit('update', this.form)
      } else {
        this.openCejModal()
      }
    },
    onUpdateFt(value) {
      this.form.ft = value
      if (!value) {
        this.form.ft_email_adviser = null
        this.$emit('update', this.form)
      } else {
        this.openFtModal()
      }
    },
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
    fillForm(payload) {
      this.$emit('update', payload)
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
