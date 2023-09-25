<template>
  <div
    class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 md:gap-8 lg:gap-6 xl:gap-8 xl:max-w-5xl mx-auto"
  >
    <nuxt-link
      no-prefetch
      v-for="hit in hits"
      :key="hit.id"
      class="flex min-w-0 transition"
      :to="
        hit.provider == 'api_engagement'
          ? `/missions-benevolat/${hit.id}`
          : `/missions-benevolat/${hit.id}/${hit.slug}`
      "
      @click.native="handleClickCard(hit)"
    >
      <CardMission :mission="hit" />
    </nuxt-link>
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'

export default defineNuxtComponent({
  components: {
    CardMission,
  },
  props: {
    hits: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async handleClickCard(item) {
      this.$plausible.trackEvent('Click Card Missions - Liste résultat', {
        props: {
          isLogged: this.$stores.auth.isLogged,
          isFromApi: item.provider === 'api_engagement',
          isRegistrationOpen: item.is_registration_open,
          hasPlacesLeft: item.has_places_left,
          isOutdated: item.is_outdated,
        },
      })
      await this.$gtm.trackEvent({ event: 'benevole-clic-carte-mission' })
    },
  },
})
</script>
