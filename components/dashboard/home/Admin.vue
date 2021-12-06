<template>
  <TwoCols>
    <template #header>
      <SectionHeading title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    </template>
    <template #left>
      <Box :loading="$fetchState.pending" loading-text="Récupération des actions en attente ...">
        <Heading as="h2" :level="3" class="mb-8">
          Vous avez {{ formattedActions.length }} action(s) en attente
        </Heading>
        <StackedList>
          <StackedListItem
            v-for="action, i in formattedActions"
            :key="i"
            :icon="action.icon"
            :title="action.title"
            :subtitle="action.subtitle"
          />
        </StackedList>
      </Box>
      <LePetitMot />
      <Box>Bloc "Déploiement" avec lien vers Réseaux / Territoires</Box>
      <Box>Retour d'expérience des bénévoles</Box>
    </template>
    <template #right>
      <ActivityFigures />
      <MoreNumbers />
      <BoxLinks :links="links" />
      <HelpCenter />
    </template>
  </TwoCols>
</template>

<script>
import TwoCols from '@/components/dashboard/layouts/TwoCols'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import ActivityFigures from '@/components/advanced/ActivityFigures'
import BoxLinks from '@/components/advanced/BoxLinks'
import MixinActions from '@/mixins/action'

export default {
  components: {
    TwoCols,
    HelpCenter,
    MoreNumbers,
    LePetitMot,
    ActivityFigures,
    BoxLinks
  },
  mixins: [MixinActions],
  data () {
    return {
      links: [
        { icon: '🔎', title: 'Gérer les contenus', to: '#' },
        { icon: '📇', title: 'Détecter les organisations en double', to: '#' },
        { icon: '📇', title: 'Gérer le RNA des organisations', to: '#' }
      ]
    }
  },
  async fetch () {
    const response = await this.$axios.get('/user/actions')
    if (response.data) {
      this.actions = response.data
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
