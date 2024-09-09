<template>
  <div v-if="dispositifsAvailable.length > 0">
    <div v-if="showHeader" class="mb-8">
      <hr />
      <DsfrHeading size="lg" class="mt-8">
        {{ headerTitle }}
      </DsfrHeading>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <div
        v-if="dispositifsAvailable.includes('service_civique')"
        class="px-4 lg:px-6 py-4 flex items-center gap-4 border rounded-lg w-full"
      >
        <div class="hidden lg:block">
          <img
            src="/images/logo-service-civique.png"
            srcset="/images/logo-service-civique.png, /images/logo-service-civique@2x.png 2x"
            alt="Service Civique"
            title="Service Civique"
            class="flex-none w-[65px] h-auto object-contain object-left"
            data-not-lazy
          />
        </div>
        <div class="flex-1">
          <div class="text-balance font-bold">Volontaire en Service Civique ?</div>
          <div class="italic text-[#666666] text-sm">
            <template v-if="hasServiceCiviqueFilled">
              <div
                @click="showModalSC = true"
                class="group flex items-center gap-2 hover:cursor-pointer"
              >
                <span class="italic text-[#666666] text-sm"
                  >À partir du
                  {{ $dayjs(form.service_civique_completion_date).format('DD/MM/YYYY') }}</span
                >
                <RiPencilLine class="lg:hidden group-hover:inline w-4 h-auto" />
              </div>
            </template>
            <template v-else> Permet le suivi de votre parcours </template>
          </div>
        </div>
        <div>
          <BaseToggle
            :modelValue="form.service_civique"
            button-label-class="text-right"
            button-wrapper-class="items-end mt-1 sm:mt-0"
            :button-labels="{ on: 'Oui', off: 'Non' }"
            @update:modelValue="onToggleSC"
          />
        </div>
      </div>

      <div
        v-if="dispositifsAvailable.includes('cej')"
        class="px-4 lg:px-6 py-4 flex items-center gap-4 border rounded-lg w-full"
      >
        <div class="hidden lg:block">
          <img
            src="/images/logo-cej.png"
            srcset="/images/logo-cej.png, /images/logo-cej@2x.png 2x"
            alt="Contrat d'Engagement Jeune"
            title="Contrat d'Engagement Jeune"
            class="flex-none w-[65px] h-auto object-contain object-left"
            data-not-lazy
          />
        </div>
        <div class="flex-1">
          <div class="text-balance font-bold">Contrat d’Engagement Jeune ?</div>
          <div class="italic text-[#666666] text-sm">
            <template v-if="hasCejFilled">
              <div
                @click="showModalCEJ = true"
                class="group flex items-center gap-2 hover:cursor-pointer"
              >
                <div class="italic text-[#666666] text-sm">
                  <span class="hidden lg:inline">Conseiller :</span>
                  {{ form.cej_email_adviser }}
                </div>
                <RiPencilLine class="lg:hidden group-hover:inline w-4 h-auto" />
              </div>
            </template>
            <template v-else> Permet le suivi de votre parcours avec votre conseiller </template>
          </div>
        </div>
        <div>
          <BaseToggle
            :modelValue="form.cej"
            button-label-class="text-right"
            button-wrapper-class="items-end mt-1 sm:mt-0"
            :button-labels="{ on: 'Oui', off: 'Non' }"
            @update:modelValue="onToggleCEJ"
          />
        </div>
      </div>

      <div
        v-if="dispositifsAvailable.includes('ft')"
        class="px-4 lg:px-6 py-4 flex items-center gap-4 border rounded-lg w-full"
      >
        <div class="hidden lg:block">
          <img
            src="/images/logo-france-travail.svg"
            alt="France Travail"
            title="France Travail"
            class="hidden lg:block flex-none w-[65px] h-auto object-contain object-left"
            data-not-lazy
          />
        </div>
        <div class="flex-1">
          <div class="text-balance font-bold">Accompagné dans le cadre du RSA ?</div>
          <div class="italic text-[#666666] text-sm">
            <template v-if="hasFtFilled">
              <div
                @click="showModalFT = true"
                class="group flex items-center gap-2 hover:cursor-pointer"
              >
                <div class="italic text-[#666666] text-sm">
                  <span class="hidden lg:inline">Conseiller :</span> {{ form.ft_email_adviser }}
                </div>
                <RiPencilLine class="lg:hidden group-hover:inline w-4 h-auto" />
              </div>
            </template>
            <template v-else> Permet le suivi de votre parcours avec votre conseiller </template>
          </div>
        </div>
        <div>
          <BaseToggle
            :modelValue="form.ft"
            button-label-class="text-right"
            button-wrapper-class="items-end mt-1 sm:mt-0"
            :button-labels="{ on: 'Oui', off: 'Non' }"
            @update:modelValue="onToggleFT"
          />
        </div>
      </div>
    </div>
    <ModalUserDispositifsSC
      :is-open="showModalSC"
      :initial-form="form"
      @close="
        () => {
          if (!form.service_civique_completion_date) {
            $emit('update', { service_civique: false })
          }
          showModalSC = false
        }
      "
      @continue="onContinueSC"
    />
    <ModalUserDispositifsCEJ
      :is-open="showModalCEJ"
      :initial-form="form"
      @close="
        () => {
          if (!form.cej_email_adviser) {
            $emit('update', { cej: false })
          }
          showModalCEJ = false
        }
      "
      @continue="onContinueCEJ"
    />
    <ModalUserDispositifsFT
      :is-open="showModalFT"
      :initial-form="form"
      @close="
        () => {
          if (!form.ft_email_adviser) {
            $emit('update', { ft: false })
          }
          showModalFT = false
        }
      "
      @continue="onContinueFT"
    />
  </div>
</template>

<script>
import ModalUserDispositifsSC from '@/components/modal/ModalUserDispositifsSC'
import ModalUserDispositifsCEJ from '@/components/modal/ModalUserDispositifsCEJ'
import ModalUserDispositifsFT from '@/components/modal/ModalUserDispositifsFT'

export default defineNuxtComponent({
  emits: ['update'],
  components: {
    ModalUserDispositifsSC,
    ModalUserDispositifsCEJ,
    ModalUserDispositifsFT,
  },
  props: {
    form: { type: Object, required: true },
    showHeader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      showModalSC: false,
      showModalCEJ: false,
      showModalFT: false,
    }
  },
  computed: {
    headerTitle() {
      return this.dispositifsAvailable.length > 1 ? 'Autres dispositifs' : 'Autre dispositif'
    },
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
    onContinueSC(payload) {
      this.$emit('update', payload)
      this.showModalSC = false
    },
    onContinueCEJ(payload) {
      this.$emit('update', payload)
      this.showModalCEJ = false
    },
    onContinueFT(payload) {
      this.$emit('update', payload)
      this.showModalFT = false
    },
    onToggleSC(value) {
      this.$emit('update', {
        service_civique: value,
        service_civique_completion_date: null,
      })
      if (value) {
        this.showModalSC = true
      }
    },
    onToggleCEJ(value) {
      this.$emit('update', { cej: value, cej_email_adviser: null })
      if (value) {
        this.showModalCEJ = true
      }
    },
    onToggleFT(value) {
      this.$emit('update', { ft: value, ft_email_adviser: null })
      if (value) {
        this.showModalFT = true
      }
    },
  },
})
</script>
