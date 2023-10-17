<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2 mt-6">Visites</div>
    <BaseBox variant="flat" padding="xs" :loading="!plausibleStats">
      <div v-if="plausibleStats" class="flex items-center">
        <div class="text-4xl font-semibold mr-6">
          {{ $numeral(plausibleStats.results.pageviews.value) }}
        </div>
        <div>
          <div class="font-semibold">
            {{
              $filters.pluralize(
                plausibleStats.results.pageviews.value,
                'consultation de la mission',
                'consultations de la mission',
                false
              )
            }}
          </div>
          <div class="text-gray-500 text-sm">depuis sa mise en ligne</div>
        </div>
      </div>
      <div
        v-if="apiEngagementStats && apiEngagementStats.clicks.length > 0"
        class="text-sm text-gray-500 mt-4"
      >
        <span class="text-gray-900 font-medium"
          >Grâce à
          <a href="https://api-engagement.beta.gouv.fr/" target="_blank" class="underline"
            >l’API Engagement</a
          ></span
        >, les missions sont diffusées sur nos plateformes partenaires pour plus de visibilité.
      </div>
      <div v-if="apiEngagementStats" class="mt-4 grid sm:grid-cols-2 gap-4">
        <div
          v-for="(stat, index) in apiEngagementStats.clicks"
          :key="index"
          class="flex items-center text-sm"
        >
          <div class="w-16">
            <img
              :src="stat.logo ?? '/images/logo-api-engagement.png'"
              :class="[
                stat.name == 'Linkedin' ? 'h-6 w-6' : 'h-12 w-12',
                { '-m-2': stat.name == 'API engagement' },
                { 'ml-[-2px]': stat.name == 'Bouygues Telecom' },
                { 'ml-[-3px]': stat.name == 'oneheart' },
                { '!h-8 !w-8': !stat.logo },
              ]"
              class="object-contain"
            />
          </div>
          <div>
            <div class="font-semibold">{{ $filters.pluralize(stat.doc_count, 'visite') }}</div>
            <div class="text-gray-500 text-xs">Via {{ stat.name }}</div>
          </div>
        </div>
      </div>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      plausibleStats: null,
      apiEngagementStats: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const runtimeConfig = useRuntimeConfig()
      const plausibleStats = await $fetch('https://plausible.io/api/v1/stats/aggregate', {
        headers: {
          Authorization: `Bearer ${runtimeConfig.public.plausible.token}`,
        },
        params: {
          site_id: runtimeConfig.public.plausible.site_id,
          metrics: 'pageviews',
          filters: `event:page==/missions-benevolat/${this.mission.id}/benevolat-*`,
          period: 'custom',
          date: `2018-01-01,${this.$dayjs().format('YYYY-MM-DD')}`,
        },
      })
      this.plausibleStats = plausibleStats

      const apiEngagementStats = await apiFetch(`/apiengagement/mymission/${this.mission.id}`)
      this.apiEngagementStats = apiEngagementStats.mission?.stats
    },
  },
})
</script>
