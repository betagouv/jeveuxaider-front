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

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div class="lg:col-span-3 space-y-12">
        <WaitingActions />
        <LePetitMot />
        <Box>Retour d'expérience des bénévoles</Box>
      </div>
      <div class="lg:col-span-2 space-y-12">
        <Box v-if="statistics" padding="sm">
          <Heading as="h2" :level="3" class="mb-8">
            Votre activité en chiffres
          </Heading>
          <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
            <CardStatistic :value="statistics.places_left" title="Bénévoles recherchés" />
            <CardStatistic :value="`${statistics.places_occupation_rate}%`" title="Taux d'occupation" :gauge-percentage="statistics.places_occupation_rate" />
            <CardStatistic
              :value="statistics.missions_actives"
              title="Missions actives"
              :subtitle="`sur ${statistics.missions} missions`"
              link="/dashboard/missions"
              link-label="Missions"
            />
            <CardStatistic
              :value="statistics.participations_validated"
              title="Participations validées"
              :subtitle="`sur ${statistics.participations} candidatures`"
              link="/dashboard/participations"
              link-label="Participations"
            />
          </div>
        </Box>
        <MoreNumbers />
        <Box>
          <Heading as="h2" :level="2" class="mb-8 font-extrabold">
            Suivez le guide
          </Heading>
          <div class="divide-y border-t">
            <LinkItem v-for="link,index in links" :key="index" :icon="link.icon" :to="link.to">
              {{ link.title }}
            </LinkItem>
          </div>
        </Box>
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
import CardStatistic from '@/components/card/CardStatistic'
import LinkItem from '@/components/advanced/LinkItem'
import WaitingActions from '@/components/dashboard/WaitingActions'

export default {
  components: {
    Header,
    HelpCenter,
    MoreNumbers,
    LePetitMot,
    CardStatistic,
    LinkItem,
    WaitingActions
  },
  data () {
    return {
      statistics: null,
      links: [
        { icon: '🏅', title: 'Comment améliorer la qualité des candidatures de vos missions', to: '#' },
        { icon: '🔎', title: 'Comment augmenter la visibilité de mes missions sur la plateforme ?', to: '#' },
        { icon: '📇', title: 'Pourquoi compléter la page de mon organisation ?', to: '#' }
      ]
    }
  },
  async created () {
    const response = await this.$axios.get('/statistics')
    if (response.data) {
      this.statistics = response.data
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
