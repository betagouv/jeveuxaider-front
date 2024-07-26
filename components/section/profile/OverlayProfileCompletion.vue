<script>
export default defineNuxtComponent({
  props: {
    isOpen: { type: Boolean, default: false },
  },
  setup() {
    const {
      profile,
      totalPoints,
      isContactInformationsCompleted,
      isDisponibilitiesCompleted,
      isPreferencesCompleted,
      isMotMotivationCompleted,
      isProfilePictureCompleted,
      isSkillsAndCertificationsCompleted,
    } = useProfileCompletion()

    return {
      profile,
      totalPoints,
      isContactInformationsCompleted,
      isDisponibilitiesCompleted,
      isPreferencesCompleted,
      isMotMotivationCompleted,
      isProfilePictureCompleted,
      isSkillsAndCertificationsCompleted,
    }
  },
  methods: {},
})
</script>

<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isOpen" class="fixed inset-0 w-full h-full z-[60] bg-jva-blue-500/95">
          <!-- CLOSE - DESKTOP -->
          <button
            class="hidden sm:flex items-center absolute right-8 top-6 pl-2 pr-1 py-1 hover:bg-jva-blue-300/50"
            @click="$emit('close')"
          >
            <span class="text-white mr-1">Fermer</span>
            <RiCloseFill class="text-white h-6 w-6 fill-current relative top-[1px] right-[0px]" />
          </button>

          <BaseModal
            :is-open="isOpen"
            :prevent-click-outside="true"
            :sticky-footer="true"
            class="pointer-events-none"
            header-class="sm:hidden"
            background-overlay="hidden"
            content-class="-mr-2"
            @close="$emit('cancel')"
          >
            <!-- <div></div> -->
          </BaseModal>
        </div>
      </transition>
    </Teleport>
  </ClientOnly>
</template>
