<template>
  <TwoCols>
    <template #header>
      <Header title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`">
        <template #action>
          <Button size="xl" icon="SearchIcon" @click.native="$store.commit('toggleSearchOverlay')">
            Trouver une mission
          </Button>
        </template>
      </Header>
    </template>
    <template #left>
      <Box>Actions en attente</Box>
      <LePetitMot />
      <Box>Mes missions</Box>
    </template>
    <template #right>
      <Box>Mes infos ?</Box>
      <Box>MarketPlace UserCard teaser ?</Box>
      <BoxLinks :links="links" />
      <HelpCenter />
    </template>
  </TwoCols>
</template>

<script>
import TwoCols from '@/components/dashboard/layouts/TwoCols'
import Header from '@/components/dashboard/Header'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import BoxLinks from '@/components/advanced/BoxLinks'

export default {
  components: {
    TwoCols,
    Header,
    HelpCenter,
    LePetitMot,
    BoxLinks
  },
  data () {
    return {
      links: [
        { icon: '🔎', title: 'Lorem ipsum', to: '#' },
        { icon: '📇', title: 'Lorem ipsum', to: '#' },
        { icon: '📇', title: 'Lorem ipsum', to: '#' }
      ]
    }
  }
}
</script>

<style>

</style>
