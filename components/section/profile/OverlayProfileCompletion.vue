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
        <BaseModal
          :is-open="isOpen"
          :prevent-click-outside="true"
          :sticky-header="true"
          :sticky-footer="true"
          container-class="sm:max-h-[calc(100svh_-_8rem)]"
          @close="$emit('close')"
        >
          <template #overlay>
            <div class="fixed inset-0 bg-jva-blue-500/95" aria-hidden="true">
              <!-- OVERLAY CLOSE - DESKTOP -->
              <button
                class="hidden sm:flex items-center absolute right-8 top-6 pl-2 pr-1 py-1 transition ease-out hover:bg-jva-blue-300/50"
                @click="$emit('close')"
              >
                <span class="text-white mr-1">Fermer</span>
                <RiCloseFill
                  class="text-white h-6 w-6 fill-current relative top-[1px] right-[0px]"
                />
              </button>
            </div>
          </template>

          <template #header>
            <div class="shadow-[0px_3px_10px_0px_#00000014] bg-white">
              <!-- HEADER - MOBILE -->
              <div class="sm:hidden p-2 flex items-center justify-between">
                <DsfrHeading class="text-[#666666]" size="xs">{{ totalPoints }}%</DsfrHeading>
                <DsfrButton
                  type="tertiary"
                  :icon-only="true"
                  icon="RiCloseFill"
                  size="lg"
                  class="size-12"
                  @click="$emit('close')"
                />
              </div>

              <!-- HEADER - DESKTOP -->
              <div class="hidden sm:block p-6 relative">
                <DsfrHeading class="text-center" size="xs">Complétez votre profil</DsfrHeading>
                <DsfrHeading class="text-[#666666] absolute right-6 top-6" size="xs"
                  >{{ totalPoints }}%</DsfrHeading
                >
              </div>

              <!-- GAUGE -->
              <BaseGauge :percentage="totalPoints" color="gradient" size="lg" />
            </div>
          </template>

          <template #footer>
            <DsfrButton type="secondary" class="flex-grow">Précédent</DsfrButton>
            <DsfrButton type="primary" class="flex-grow">Suivant</DsfrButton>
          </template>

          <!-- CONTENT -->
          <div class="px-4 py-8">
            <div class="@container max-w-[585px] mx-auto h-[1500px]">todo</div>
          </div>
        </BaseModal>
      </transition>
    </Teleport>
  </ClientOnly>
</template>
