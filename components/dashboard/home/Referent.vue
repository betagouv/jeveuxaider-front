<template>
  <TwoCols>
    <template #header>
      <SectionHeading title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`">
        <template #action>
          <Box padding="xs">
            <div class="text-gray-400 uppercase text-xs">
              Département
            </div>
            <div class="text-gray-900 font-bold">
              {{ $options.filters.label($store.getters.currentRole.label, 'departments',) }}
            </div>
          </Box>
        </template>
      </SectionHeading>
    </template>
    <template #left>
      <LePetitMot />
      <Box>Autre blocs ?</Box>
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

export default {
  components: {
    TwoCols,
    HelpCenter,
    MoreNumbers,
    LePetitMot,
    BoxLinks,
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
