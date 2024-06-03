<template>
  <div class="flex w-full bg-white border-b justify-between items-center px-4 py-2 lg:px-6 lg:py-4">
    <div class="flex w-full items-center gap-4 lg:gap-8">
      <div class="lg:border-r pr-4 lg:pr-8 py-2">
        <img src="@/assets/images/jeveuxaider-logo-short.svg" alt="" width="59" height="44" />
      </div>
      <div class="flex-1">
        <div class="flex">
          <h1 class="text-lg lg:text-[22px] font-bold">
            <template v-if="mission">
              Mission <span class="text-[#666666]">#{{ mission.id }}</span>
            </template>
            <template v-else>{{ title }}</template>
          </h1>
        </div>

        <div class="flex mt-1" v-if="mission">
          <Badges :mission="$stores.formMission.mission" />
        </div>
      </div>
      <div class="hidden ml-auto lg:flex gap-2">
        <template v-if="mission">
          <DsfrButton
            v-if="$stores.formMission.canBePublished"
            @click="$stores.formMission.showPublishModal = true"
            >Publier la mission
          </DsfrButton>

          <DsfrButton type="tertiary" @click="showModalPreview = true" icon="RiEyeLine"
            >Aperçu
          </DsfrButton>
          <SectionFormMissionOverlay
            :mission="mission"
            :is-open="showModalPreview"
            @close="showModalPreview = false"
          />
          <!-- <BaseAlertDialog
            icon="RiErrorWarningLine"
            title="Publier cette mission"
            :is-open="$stores.formMission.showPublishModal"
            @confirm="onPublishConfirm"
            @cancel="$stores.formMission.showPublishModal = false"
            :button-loading="buttonLoading"
          >
            <template v-if="mission.template_id">
              <p class="mb-4">
                Vous êtes sur le point de publier la mission <strong> {{ mission.name }}</strong
                >.
              </p>
              <p v-if="mission.structure.state !== 'Validée'">
                Votre organisation devra être préalablement validée pour que la mission soit
                accessible.
              </p>
            </template>
            <template v-else>
              <p class="mb-4">
                Vous êtes sur le point de demander la publication de la mission
                <strong> {{ mission.name }}</strong
                >.
              </p>
              <p>La validation prend en moyenne 7 à 10 jours.</p>
            </template>
          </BaseAlertDialog> -->
        </template>

        <DsfrButton type="tertiary" @click="onClose" icon="RiCloseLine">Fermer </DsfrButton>
      </div>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'
import Badges from '@/components/section/mission/Badges.vue'
import Actions from '@/components/section/mission/Actions.vue'
import confetti from 'canvas-confetti'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {
    title: {
      type: String,
      default: 'Publier une mission',
    },
  },
  components: { Badges },
  data() {
    return {
      buttonLoading: false,
      showModalPreview: false,
    }
  },
  computed: {
    mission() {
      return _cloneDeep(this.$stores.formMission.mission)
    },
  },
  methods: {
    // async onPublishConfirm() {
    //   this.buttonLoading = true
    //   await apiFetch(`/missions/${this.mission.id}/publish`, {
    //     method: 'PUT',
    //   })
    //     .then(async (mission) => {
    //       this.triggerConfettis()
    //       this.$stores.formMission.updateFields(mission, ['state', 'is_online'])
    //       this.$stores.formMission.showPublishModal = false
    //       this.$router.push(`/admin/missions`)
    //     })
    //     .catch(() => {})
    //     .finally(() => {
    //       this.buttonLoading = false
    //     })
    // },
    triggerConfettis() {
      confetti({
        particleCount: 500,
        spread: 360,
        // origin: { y: 0.6 },
      })
    },
    handleDeleted() {
      this.$router.push('/admin/missions')
    },
    afterChangeIsActive(mission) {
      this.$stores.formMission.updateFields(mission, ['is_online'])
      this.showModalSwitchIsOnline = false
    },
    onClose() {
      this.$router.push('/admin/missions')
    },
  },
})
</script>
