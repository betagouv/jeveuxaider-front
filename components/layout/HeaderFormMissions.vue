<template>
  <div class="flex w-full bg-white border-b justify-between items-center px-4 py-3 lg:px-6 lg:py-4">
    <div class="flex w-full items-center gap-4 lg:gap-8">
      <div class="hidden lg:block lg:border-r pr-4 lg:pr-8 py-2 group">
        <div class="lg:flex items-center gap-2">
          <img
            src="@/assets/images/jeveuxaider-logo-short.svg"
            alt="Logo de JeVeuxAider"
            width="59"
            height="44"
          />
        </div>
      </div>
      <div class="flex-1 max-w-full">
        <div class="flex">
          <h1 class="text-lg lg:text-[22px] font-bold">
            <template v-if="$stores.formMission.mission">
              Mission <span class="text-[#666666]">#{{ $stores.formMission.mission.id }}</span>
            </template>
            <template v-else>{{ title }}</template>
          </h1>
        </div>

        <div v-dragscroll.x class="overflow-hidden flex mt-1" v-if="$stores.formMission.mission">
          <Badges :mission="$stores.formMission.mission" />
        </div>
      </div>
      <div class="hidden ml-auto lg:flex gap-2">
        <template v-if="$stores.formMission.mission">
          <DsfrButton
            v-if="$stores.formMission.canBePublished"
            @click="$stores.formMission.showPublishModal = true"
          >
            <template
              v-if="
                $stores.formMission.mission.structure.state !== 'Validée' ||
                !$stores.formMission.mission.template_id
              "
            >
              Soumettre à validation
            </template>
            <template v-else> Publier la mission</template>
          </DsfrButton>

          <DsfrButton type="tertiary" @click="showModalPreview = true" icon="RiEyeLine"
            >Aperçu
          </DsfrButton>
          <SectionFormMissionOverlay
            :mission="$stores.formMission.mission"
            :is-open="showModalPreview"
            @close="showModalPreview = false"
          />
          <ModalMissionPublish :mission="$stores.formMission.mission" />
        </template>
      </div>
      <button :aria-label="labelButtonClose" class="py-2 group" @click="onClose">
        <div class="flex items-center gap-2 group-hover:cursor-pointer">
          <RiCloseLine
            aria-hidden="true"
            class="block flex-none h-6 w-6 lg:h-8 lg:w-8 text-[#929292] fill-current group-hover:text-jva-blue-500 transition-colors"
          />
          <span class="sr-only">{{ labelButtonClose }}</span>
        </div>
      </button>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'
import Badges from '@/components/section/mission/Badges.vue'
import ModalMissionPublish from '@/components/modal/ModalMissionPublish.vue'
import { dragscroll } from 'vue-dragscroll'

export default defineNuxtComponent({
  directives: {
    dragscroll,
  },
  mixins: [MixinMission],
  props: {
    title: {
      type: String,
      default: 'Publier une mission',
    },
  },
  components: { Badges, ModalMissionPublish },
  data() {
    return {
      mission: null,
      buttonLoading: false,
      showModalPreview: false,
    }
  },
  watch: {
    '$stores.formMission.mission': {
      handler(newVal) {
        if (!newVal) {
          this.mission = null
        } else {
          this.mission = { ...newVal }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    labelButtonClose() {
      return this.$stores.formMission.mission
        ? "Quitter l'édition de la mission"
        : 'Quitter la création de la mission'
    },
  },
  methods: {
    onClose() {
      if (this.mission) {
        this.$router.push(`/admin/missions/${this.mission.id}`)
      } else {
        this.$router.push('/admin/missions')
      }
    },
  },
})
</script>
