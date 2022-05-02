<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <Heading as="h2" :level="3" class="mb-4">
      Par domaines
    </Heading>
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount color="covid" label="Mobilisation Covid19" :count="88" />
      <ListItemCount color="sante" label="Santé pour tous" :count="88" />
      <ListItemCount color="nature" label="Protection de la nature" :count="88" />
      <ListItemCount color="solidarite" label="Solidarité & Insertion" :count="88" />
      <ListItemCount color="sport" label="Sport pour tous" :count="88" />
      <ListItemCount color="prevention" label="Prévention et protection" :count="88" />
      <ListItemCount color="memoire" label="Mémoire et citoyenneté" :count="88" />
      <ListItemCount color="cooperation" label="Coopération internationale" :count="88" />
      <ListItemCount color="art" label="Art & Culture pour tous" :count="88" />
    </div>
  </Box>
</template>

<script>

// { key: 5, label: 'Mobilisation Covid19', icon: '/images/icons/domaine-covid.svg', color: 'text-domaine-covid', bg: 'bg-domaine-covid', emoji: '😷' },
//     { key: 9, label: 'Éducation pour tous', icon: '/images/icons/domaine-education-pour-tous.svg', color: 'text-domaine-education', bg: 'bg-domaine-education', emoji: '📚' },
//     { key: 1, label: 'Santé pour tous', icon: '/images/icons/domaine-sante-pour-tous.svg', color: 'text-domaine-sante', bg: 'bg-domaine-sante', emoji: '💊' },
//     { key: 10, label: 'Protection de la nature', icon: '/images/icons/domaine-protection-nature.svg', color: 'text-domaine-nature', bg: 'bg-domaine-nature', emoji: '🌿' },
//     { key: 7, label: 'Solidarité & Insertion', icon: '/images/icons/domaine-solidarite-insertion.svg', color: 'text-domaine-solidarite', bg: 'bg-domaine-solidarite', emoji: '🍲' },
//     { key: 4, label: 'Sport pour tous', icon: '/images/icons/domaine-sport-pour-tous.svg', color: 'text-domaine-sport', bg: 'bg-domaine-sport', emoji: '🏀' },
//     { key: 2, label: 'Prévention et protection', icon: '/images/icons/domaine-prevention-protection.svg', color: 'text-domaine-prevention', bg: 'bg-domaine-prevention', emoji: '🚨' },
//     { key: 8, label: 'Mémoire et citoyenneté', icon: '/images/icons/domaine-memoire-citoyennete.svg', color: 'text-domaine-memoire', bg: 'bg-domaine-memoire', emoji: '📯' },
//     { key: 6, label: 'Coopération internationale', icon: '/images/icons/domaine-cooperation-internationale.svg', color: 'text-domaine-cooperation', bg: 'bg-domaine-cooperation', emoji: '🌍' },
//     { key: 3, label: 'Art & Culture pour tous',

import ListItemCount from '@/components/custom/ListItemCount.vue'
export default {
  components: {
    ListItemCount
  },
  data () {
    return {
      loading: true,
      statistics: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/numbers/missions-by-states', {
      params: this.$store.state.numbers.params
    }).then((response) => {
      this.loading = false
      this.statistics = response.data
    })
  }
}
</script>
