<template>
  <TwoCols>
    <template #header>
      <Header title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`">
        <template #action>
          <Box padding="xs" class="cursor-pointer" @click.native="$router.push(`/dashboard/organisations/${$store.getters.currentRole.contextable_id}`)">
            <div class="text-gray-400 uppercase text-xs">
              Responsable
            </div>
            <div class="text-gray-900 font-bold">
              {{ $store.getters.currentRole.label }}
            </div>
          </Box>
        </template>
      </Header>
    </template>
    <template #left>
      <WaitingActions />
      <LePetitMot />
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
import BoxLinks from '@/components/advanced/BoxLinks'
import WaitingActions from '@/components/advanced/WaitingActions'
import ActivityFigures from '@/components/advanced/ActivityFigures'

export default {
  components: {
    TwoCols,
    Header,
    HelpCenter,
    MoreNumbers,
    LePetitMot,
    BoxLinks,
    WaitingActions,
    ActivityFigures
  },
  data () {
    return {
      links: [
        { icon: '🏅', title: 'Comment améliorer la qualité des candidatures de vos missions', to: '#' },
        { icon: '🔎', title: 'Comment augmenter la visibilité de mes missions sur la plateforme ?', to: '#' },
        { icon: '📇', title: 'Pourquoi compléter la page de mon organisation ?', to: '#' }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
