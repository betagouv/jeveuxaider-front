<template>
  <BaseContainer2Cols
    grid-class="grid gap-6 xl:gap-8 grid-cols-1 lg:grid-cols-18"
    class-left="lg:col-span-11 flex flex-col gap-6 xl:gap-8"
    class-right="lg:col-span-7 flex flex-col gap-6 xl:gap-8 lg:pt-32"
  >
    <template #breadcrumb>
      <DsfrBreadcrumb :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes missions' }]" />
    </template>
    <template #header>
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'mission',
          'missions',
          false
        )}`"
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
      <div>
        <DsfrInput
          type="search"
          size="lg"
          placeholder="Recherche par mots clés..."
          icon="RiSearchLine"
          :modelValue="$route.query['filter[search]']"
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <div class="hidden lg:flex gap-x-4 gap-y-4 mt-4 text-sm flex-wrap">
          <DsfrTag
            :key="`toutes-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="!hasActiveFilters"
            @click.native="deleteAllFilters"
          >
            Toutes
          </DsfrTag>

          <DsfrTag
            :key="`state-validee-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="$route.query['filter[state]'] == 'Validée'"
            @click.native="changeFilter('filter[state]', 'Validée')"
          >
            Validées
          </DsfrTag>
        </div>
        <div class="my-8 space-y-8">
          <CardParticipation
            v-for="participation in queryResult.data"
            :key="participation.id"
            :participation="participation"
            display="responsable"
            @click.native="handleClickParticipation(participation)"
            @refetch="fetch()"
          />
        </div>

        <DsfrPagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </div>
    </template>
    <template #right>
      <BoxCompleteProfile title="🫣 Psssst ! Votre profil est incomplet" :show-steps="false">
        <template #subtitle>
          <div class="text-[#666666] mt-2">
            En remplissant votre profil, vous augmentez vos chances de trouver une mission.
          </div>
        </template>
        <template #footer="{ setIsOverlayOpen }">
          <div class="mt-8">
            <DsfrButton type="secondary" @click="onCompleteProfileClick(setIsOverlayOpen)"
              >Compléter mon profil</DsfrButton
            >
          </div>
        </template>
      </BoxCompleteProfile>

      <BaseBox class="@container">
        <SectionProfileCommunicationPreferences :profile="$stores.auth.user?.profile" />
      </BaseBox>

      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import CardParticipation from '@/components/card/CardParticipation.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    CardParticipation,
    BoxCompleteProfile,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      loading: false,
      endpoint: '/user/participations',
    }
  },
  methods: {
    handleClickParticipation(participation) {
      if (participation.conversation) {
        this.$router.push(`/messages/${participation.conversation.id}`)
      } else {
        this.$router.push(`${participation.mission.full_url}`)
      }
    },
    onCompleteProfileClick(setIsOverlayOpen) {
      this.$plausible.trackEvent('Click completion profil - missions')
      setIsOverlayOpen(true)
    },
  },
})
</script>
