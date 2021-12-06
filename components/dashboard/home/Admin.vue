<template>
  <TwoCols>
    <template #header>
      <Header title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    </template>
    <template #left>
      <WaitingActions />
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
import Header from '@/components/dashboard/Header'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import WaitingActions from '@/components/advanced/WaitingActions'
import ActivityFigures from '@/components/advanced/ActivityFigures'
import BoxLinks from '@/components/advanced/BoxLinks'

export default {
  components: {
    TwoCols,
    Header,
    HelpCenter,
    MoreNumbers,
    LePetitMot,
    WaitingActions,
    ActivityFigures,
    BoxLinks
  },
  data () {
    return {
      links: [
        { icon: '🔎', title: 'Gérer les contenus', to: '#' },
        { icon: '📇', title: 'Détecter les organisations en double', to: '#' },
        { icon: '📇', title: 'Gérer le RNA des organisations', to: '#' }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
