<template>
  <BaseContainer2Cols>
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
          >
            <div class="text-gray-900 font-semibold" v-html="action.title" />
            <div v-if="action.subtitle" class="text-[#666666] text-sm" v-html="action.subtitle" />
          </BaseStackedListItem>
        </BaseStackedList>
      </BaseBox>
      <LePetitMot />
    </template>
    <template #right>
      <BoxCompleteProfile :profile="$stores.auth.user.profile" />
      <BoxUserProfileBenevole :profile="$stores.auth.user.profile" />

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
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    LePetitMot,
    BoxUserProfileBenevole,
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
  methods: {
    onClick(action) {
      if (action.type === 'is_minor') {
        this.showModalIsMinor = true
      }
    },
  },
})
</script>
