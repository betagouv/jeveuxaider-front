<template>
  <div class="">
    <Header class="mb-12">
      <div class="text-xl text-gray-600">
        Bonjour {{ $store.state.auth.user.profile.first_name }},
      </div>
      <Heading as="h1" :level="1">
        Ravi de vous retrouver 👋
      </Heading>
      <template #action>
        <Box padding="xs">
          <div class="text-gray-400 uppercase text-xs">
            Région
          </div>
          <div class="text-gray-900 font-bold">
            {{ $store.getters.currentRole.label }}
          </div>
        </Box>
      </template>
    </Header>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div class="lg:col-span-3 space-y-12">
        <WaitingActions />
        <LePetitMot />
        <Box>Autre blocs ?</Box>
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
import BoxLinks from '@/components/advanced/BoxLinks'
import WaitingActions from '@/components/advanced/WaitingActions'
import ActivityFigures from '@/components/advanced/ActivityFigures'

export default {
  components: {
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
        { icon: '🔎', title: 'Lien 1', to: '#' },
        { icon: '📇', title: 'Lien 2', to: '#' },
        { icon: '📇', title: 'Lien 3', to: '#' }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
