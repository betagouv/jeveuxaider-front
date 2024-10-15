<template>
  <div class="container">
    <DsfrBreadcrumb :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes favoris' }]" />

    <div class="space-y-8 mb-12">
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'favoris',
          'favoris',
          false
        )}`"
        :loading="queryLoading"
      />

      <div v-if="queryResult.total > 0">
        <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <nuxt-link
            no-prefetch
            v-for="favoris in queryResult.data"
            :key="favoris.id"
            class="flex min-w-0 transition"
            :to="`/missions-benevolat/${favoris.mission.id}/${favoris.mission.slug}`"
          >
            <CardMission :key="favoris.id" :mission="favoris.mission" />
          </nuxt-link>
        </div>

        <DsfrPagination
          class="mt-8"
          v-if="queryResult.total > queryResult.per_page"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />

        <div class="bg-white p-6 lg:py-12 lg:px-14 shadow-xl mt-12">
          <div class="flex items-center justify-between gap-6">
            <div class="flex gap-6 items-center">
              <img src="/images/icons/dsfr/no-result.svg" alt="" data-not-lazy class="" />
              <div>
                <div class="text-[28px] font-bold leading-9">Pas encore convaincu ?</div>
                <div class="text-lg leading-7 text-[#DDDDDD] mt-2">
                  Effectuez une nouvelle recherche et trouvez une mission faite pour vous.
                </div>
                <DsfrButton
                  to="/missions-benevolat"
                  icon="RiSearchLine"
                  size="lg"
                  class="mt-4 lg:hidden"
                >
                  Trouver une mission
                </DsfrButton>
              </div>
            </div>
            <div class="md:hidden lg:block">
              <DsfrButton to="/missions-benevolat" icon="RiSearchLine" size="lg">
                Trouver une mission
              </DsfrButton>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!queryLoading">
        <div class="bg-white border p-6 lg:p-10 text-center">
          <div class="max-w-[508px] mx-auto space-y-6">
            <img src="/images/icons/dsfr/no-result.svg" alt="" data-not-lazy class="mx-auto" />
            <div class="text-[28px] font-bold leading-9">
              Ajoutez les missions qui vous intéressent en favoris
            </div>
            <div class="text-lg leading-7 text-[#DDDDDD]">
              Cliquez sur l’icône
              <RiHeartFill class="h-6 inline-block text-[#6F6F6F] stroke-white" /> de n’importe
              quelle mission pour l’ajouter à vos favoris et la retrouver plus tard.
            </div>
            <DsfrButton to="/missions-benevolat" icon="RiSearchLine" size="lg">
              Découvrir les missions
            </DsfrButton>
          </div>
        </div>
      </div>
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
