<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2 mt-6">
      Visites
    </div>
    <Box variant="flat" padding="xs" :loading="!plausibleStats">
      <div v-if="plausibleStats" class="flex items-center">
        <div class="text-4xl font-semibold mr-6">
          {{ plausibleStats.results.pageviews.value | formatNumber }}
        </div>
        <div>
          <div class="font-semibold">
            {{ plausibleStats.results.pageviews.value | pluralize('consultation de la mission', 'consultations de la mission', false) }}
          </div>
          <div class="text-gray-500 text-sm">
            depuis sa mise en ligne
          </div>
        </div>
      </div>
      <div v-if="apiEngagementStats && apiEngagementStats.clicks.length > 0" class="text-sm text-gray-500 mt-4">
        <span class="text-gray-900 font-medium">Grâce à <a href="https://api-engagement.beta.gouv.fr/" target="_blank" class="underline">l’API Engagement</a></span>, les missions sont diffusées sur nos plateformes partenaires pour plus de visibilité.
      </div>
      <div v-if="apiEngagementStats" class="mt-4 grid sm:grid-cols-2 gap-4">
        <div v-for="(stat, index) in apiEngagementStats.clicks" :key="index" class="flex items-center text-sm">
          <div class="w-16">
            <img
              :src="stat.logo"
              :class="[
                stat.name == 'Linkedin' ? 'h-6 w-6' : 'h-12 w-12',
                {'-m-2': stat.name == 'API engagement'},
                {'ml-[-2px]': stat.name == 'Bouygues Telecom'},
                {'ml-[-3px]': stat.name == 'oneheart'},
              ]"
              class="object-contain"
            >
          </div>
          <div>
            <div class="font-semibold">
              {{ stat.doc_count }} visites
            </div>
            <div class="text-gray-500 text-xs">
              Via {{ stat.name }}
            </div>
          </div>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      plausibleStats: null,
      apiEngagementStats: null
    }
  },
  async fetch () {
    const { data: plausibleStats } = await this.$axios.get(
      'https://plausible.io/api/v1/stats/aggregate',
      {
        excludeContextRole: true,
        headers: {
          Authorization: `Bearer ${this.$config.plausible.token}`
        },
        params: {
          site_id: this.$config.plausible.site_id,
          metrics: 'pageviews',
          filters: `event:page==/missions-benevolat/${this.mission.id}/benevolat-*`,
          period: 'custom',
          date: `2018-01-01,${this.$dayjs().format('YYYY-MM-DD')}`
        }
      }
    )
    this.plausibleStats = plausibleStats

    const { data: apiEngagementStats } = await this.$axios.get(`/apiengagement/mymission/${this.mission.id}`)
    this.apiEngagementStats = apiEngagementStats.stats
  }
}
</script>
