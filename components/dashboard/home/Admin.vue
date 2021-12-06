<template>
  <div class="">
    <Header class="mb-12">
      <div class="text-xl text-gray-600">
        Bonjour {{ $store.state.auth.user.profile.first_name }},
      </div>
      <Heading as="h1" :level="1">
        Ravi de vous retrouver 👋
      </Heading>
    </Header>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div class="lg:col-span-3 space-y-12">
        <WaitingActions />
        <LePetitMot />
        <Box>Bloc "Déploiement" avec lien vers Réseaux / Territoires</Box>
        <Box>Retour d'expérience des bénévoles</Box>
      </div>
      <div class="lg:col-span-2 space-y-12">
        <ActivityFigures />
        <MoreNumbers />
        <BoxLinks :links="links" />
        <HelpCenter />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import WaitingActions from '@/components/advanced/WaitingActions'
import ActivityFigures from '@/components/advanced/ActivityFigures'
import BoxLinks from '@/components/advanced/BoxLinks'

export default {
  components: {
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
