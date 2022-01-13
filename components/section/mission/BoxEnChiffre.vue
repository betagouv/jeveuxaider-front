<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2 mt-6">
      En chiffre
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
            ces 30 derniers jours
          </div>
        </div>
      </div>
      <div class="text-sm text-gray-500 mt-4">
        <span class="text-gray-900 font-medium">Grâce à <a href="https://api-engagement.beta.gouv.fr/" target="_blank" class="underline">l’API Engagement</a></span>, les missions sont diffusées sur nos plateformes partenaires pour vous amener plus de visibilité.
      </div>
      <div v-if="apiEngagementStats" class="mt-4 grid grid-cols-2 gap-4">
        <div v-for="(stat, index) in apiEngagementStats.clicks" :key="index" class="grid-cols-1">
          <div class="flex items-center text-sm">
            <div class="w-16">
              <div class="h-12 w-12  flex items-center justify-center" :class="[stat.name == 'Linkedin' ? 'h-6 w-6' : 'h-12 w-12']">
                <img :src="stat.logo">
              </div>
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
      `https://plausible.io/api/v1/stats/aggregate?site_id=${this.$config.plausible.site_id}&period=30d&metrics=pageviews&filters=event:page==${this.mission.full_url}`,
      {
        excludeContextRole: true,
        headers: {
          Authorization: `Bearer ${this.$config.plausible.token}`
        }
      }
    )
    this.plausibleStats = plausibleStats

    const { data: apiEngagementStats } = await this.$axios.get(`/apiengagement/mymission/${this.mission.id}`)
    this.apiEngagementStats = apiEngagementStats.stats
    console.log(this.apiEngagementStats.stats)
  }

}
</script>
