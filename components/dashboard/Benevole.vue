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
        <div class="p-4 bg-white rounded-xl shadow-lg">
          <span class="text-gray-400 text-sm">@TODO</span> {{ $options.filters.label($store.getters.contextRole, 'role', 'espace') }}
        </div>
      </template>
    </Header>

    <div class="grid grid-cols-12 gap-12">
      <div class="col-span-7 space-y-12">
        <Box>Actions en attente</Box>
        <Box>Mots de Giulietta</Box>
        <Box>Mes missions</Box>
      </div>
      <div class="col-span-5 space-y-12">
        <Box>Mes infos ?</Box>
        <Box>MarketPlace UserCard teaser ?</Box>
        <Box>Guide (X questions principales)</Box>
        <HelpCenter />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header'
import HelpCenter from '@/components/section/dashboard/HelpCenter'

export default {
  components: {
    Header,
    HelpCenter
  }
}
</script>

<style>

</style>
