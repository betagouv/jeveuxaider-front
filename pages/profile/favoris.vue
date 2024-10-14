<template>
  <div class="container">
    <DsfrBreadcrumb :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes favoris' }]" />

    <div class="space-y-8">
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'favoris',
          'favoris',
          false
        )}`"
        :loading="queryLoading"
      />

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CardMission
          class="cursor-pointer"
          v-for="favoris in queryResult.data"
          :key="favoris.id"
          :mission="favoris.mission"
          @click.native="handleClickMission(favoris.mission)"
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
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import CardMission from '@/components/card/CardMission.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    CardMission,
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
      endpoint: '/user/favoris',
    }
  },
  methods: {
    handleClickMission(mission) {
      console.log('handleClickMission', mission)
      this.$router.push(mission.full_url)
    },
    onCompleteProfileClick(setIsOverlayOpen) {
      this.$plausible.trackEvent('Click completion profil - missions')
      setIsOverlayOpen(true)
    },
  },
})
</script>
