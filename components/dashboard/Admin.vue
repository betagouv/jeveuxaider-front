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

    <div class="grid grid-cols-5 gap-12">
      <div class="col-span-3 space-y-12">
        <Box>Actions en attente</Box>
        <LePetitMot />
        <Box>Retour d'expérience des bénévoles</Box>
      </div>
      <div class="col-span-2 space-y-12">
        <Box>Votre activité en chiffres</Box>
        <MoreNumbers />
        <Box>Liens utiles</Box>
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

export default {
  components: {
    Header,
    HelpCenter,
    MoreNumbers,
    LePetitMot
  }
}
</script>

<style>

</style>
