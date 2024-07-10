<template>
  <BaseBox>
    <BaseHeading as="h2" :level="3" class="text-black"> Complétez votre profil </BaseHeading>
    <div class="text-[#666666] mt-2">
      Trouvez des bénévoles plus facilement en créant des missions en lien avec nos thématiques.
    </div>
    <div class="mt-8">
      <div class="flex items-center gap-4">
        <div class="text-[22px] text-[#161616] font-bold">{{ percentage }}%</div>
        <BaseGauge :percentage="percentage" color="gradient" />
      </div>
      <div class="flex flex-col gap-4 mt-8">
        <InlineComponent :isCompleted="isContactInformationsCompleted">
          Remplissez vos informations de contact
        </InlineComponent>
        <hr class="border-[#DDDDDD]" />
        <InlineComponent :isCompleted="isDisponibilitiesCompleted">
          Définissez votre disponibilité
        </InlineComponent>
        <hr class="border-[#DDDDDD]" />
        <InlineComponent :isCompleted="isPreferencesCompleted">
          Définissez vos préférences de mission
        </InlineComponent>
        <hr class="border-[#DDDDDD]" />
        <InlineComponent :isCompleted="isMotMotivationCompleted">
          Écrivez un petit mot de motivation
        </InlineComponent>
        <hr class="border-[#DDDDDD]" />
        <InlineComponent :isCompleted="isProfilePictureCompleted">
          Ajoutez une photo
        </InlineComponent>
        <hr class="border-[#DDDDDD]" />
        <InlineComponent :isCompleted="isSkillsAndCertificationsCompleted">
          Indiquez vos compétences et certifications
        </InlineComponent>
      </div>
      <div class="mt-8">
        <nuxt-link to="/profile/edit" no-prefetch>
          <DsfrButton type="secondary">Complétez mon profil</DsfrButton>
        </nuxt-link>
      </div>
    </div>
  </BaseBox>
</template>

<script>
function createInlineComponent() {
  return {
    props: {
      isCompleted: {
        type: Boolean,
        required: true,
      },
    },
    template: `
      <div class="flex gap-4 items-center">
        <RiCheckboxCircleFill v-if="isCompleted" class="h-8 w-8 text-[#00A95F] fill-current" />
        <RiCheckboxBlankCircleLine v-else class="h-8 w-8 text-[#000091] fill-current" />
        <div :class="['flex gap-4 items-center', {'text-[#666666] line-through': isCompleted }, {'text-[#000091]': !isCompleted }]">
          <slot></slot>
        </div>
      </div>
    `,
  }
}

export default defineNuxtComponent({
  components: {
    InlineComponent: createInlineComponent(),
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    percentage() {
      return 33
    },
    isContactInformationsCompleted() {
      return !!this.profile?.email && !!this.profile?.mobile
    },
    isDisponibilitiesCompleted() {
      return !!this.profile?.commitment__duration && this.profile?.disponibilities?.length > 0
    },
    isPreferencesCompleted() {
      return this.profile?.activities?.length > 0
    },
    isMotMotivationCompleted() {
      return !!this.profile?.description
    },
    isProfilePictureCompleted() {
      return !!this.profile?.avatar
    },
    isSkillsAndCertificationsCompleted() {
      return this.profile?.skills?.length > 0
    },
  },
  methods: {},
})
</script>
