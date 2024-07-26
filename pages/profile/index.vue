<template>
  <BaseContainer2Cols
    grid-class="grid gap-6 xl:gap-8 grid-cols-1 lg:grid-cols-18"
    class-left="lg:col-span-11 flex flex-col gap-6 xl:gap-8"
    class-right="lg:col-span-7 flex flex-col gap-6 xl:gap-8"
  >
    <template #breadcrumb>
      <DsfrBreadcrumb :links="[{ text: 'Mon espace' }]" />
    </template>
    <template #header>
      <BaseSectionHeading
        title="Ravi de vous retrouver 👋"
        :secondary-title="`Bonjour ${$stores.auth.user?.profile?.first_name}`"
      >
        <template #action>
          <DsfrButton
            size="lg"
            icon="RiSearchLine"
            @click.native="$router.push('/missions-benevolat')"
          >
            Trouver une mission
          </DsfrButton>
        </template>
      </BaseSectionHeading>
    </template>
    <template #left>
      <BaseBox :loading="loadingActions" loading-text="Récupération des actions en attente ...">
        <BaseHeading as="h2" :level="3" class="mb-8">
          Vous avez
          {{ $filters.pluralize(formattedActions.length, 'action') }} en attente
        </BaseHeading>
        <BaseStackedList :divided="false">
          <BaseStackedListItem
            v-for="(action, i) in formattedActions"
            :key="i"
            :icon="action.icon"
            :link="action.link"
            :icon-variant="action.iconVariant"
            :arrow="action.arrow"
            @click="onClick(action)"
            class="cursor-pointer"
            icon-wrapper-class="self-start mt-0.5"
          >
            <div class="text-gray-900 font-semibold" v-html="action.title" />
            <div
              v-if="action.subtitle"
              class="text-[#666666] text-sm mt-2"
              v-html="action.subtitle"
            />
          </BaseStackedListItem>
        </BaseStackedList>
      </BaseBox>
      <BoxUserWaitingParticipations v-if="hasWaitingParticipations" />
      <LePetitMot />
    </template>
    <template #right>
      <BoxCompleteProfile title="Complétez votre profil">
        <template #subtitle>
          <div class="text-[#666666] mt-2">
            En remplissant votre profil, vous augmentez vos chances de trouver une mission.
          </div>
        </template>
        <template #footer>
          <div class="mt-8 pt-8 border-t">
            <nuxt-link to="/profile/edit" no-prefetch @click="onCompleteProfileClick">
              <DsfrButton type="secondary" tabindex="-1">Compléter mon profil</DsfrButton>
            </nuxt-link>
          </div>
        </template>
      </BoxCompleteProfile>
      <BoxUserProfileBenevole :profile="$stores.auth?.user?.profile" />

      <HelpCenter />
    </template>
  </BaseContainer2Cols>

  <LazyModalIsMinor
    :is-open="showModalIsMinor"
    @confirm="showModalIsMinor = false"
    @cancel="showModalIsMinor = false"
  />
</template>

<script>
import MixinAction from '@/mixins/action'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import LePetitMot from '@/components/section/dashboard/LePetitMot.vue'
import BoxUserProfileBenevole from '@/components/section/profile/BoxUserProfileBenevole.vue'
import BoxUserWaitingParticipations from '@/components/section/profile/BoxUserWaitingParticipations.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    LePetitMot,
    BoxUserProfileBenevole,
    BoxUserWaitingParticipations,
    BoxCompleteProfile,
  },
  mixins: [MixinAction],
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      loadingActions: true,
      showModalIsMinor: false,
    }
  },
  async created() {
    this.actions = await apiFetch('/user/actions/benevole')
    this.loadingActions = false
  },
  computed: {
    hasWaitingParticipations() {
      return this.$stores.auth.user.statistics?.participations_waiting_count > 0
    },
  },
  methods: {
    onClick(action) {
      if (action.type === 'is_minor') {
        this.showModalIsMinor = true
      }
    },
    onCompleteProfileClick() {
      this.$plausible.trackEvent('Click completion profil - espace')
    },
  },
})
</script>
