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
        <Button size="xl" icon="SearchIcon" @click.native="$store.commit('toggleSearchOverlay')">
          Trouver une mission
        </Button>
      </template>
    </Header>

    <div class="grid grid-cols-12 gap-12">
      <div class="col-span-7 space-y-12">
        <Box>Actions en attente</Box>
        <LePetitMot />
        <Box>Mes missions</Box>
      </div>
      <div class="col-span-5 space-y-12">
        <Box>Mes infos ?</Box>
        <Box>MarketPlace UserCard teaser ?</Box>
        <Box>Guide (X questions principales)</Box>
        <HelpCenter />
      </div>
    </div>

    <!-- Search Overlay -->
    <client-only>
      <portal to="body-end">
        <transition name="fade">
          <LazySearchOverlay v-if="$store.state.showSearchOverlay" />
        </transition>
      </portal>
    </client-only>
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import LazySearchOverlay from '@/components/section/SearchOverlay'

export default {
  components: {
    Header,
    HelpCenter,
    LePetitMot,
    LazySearchOverlay
  }
}
</script>

<style>

</style>
