<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord' }]"
      />
    </template>
    <template #header>
      <SectionHeading title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`">
        <template #action>
          <template v-if="['referent','referent_regional','responsable'].includes($store.getters.contextRole)">
            <Box padding="xs">
              <div class="text-gray-400 uppercase text-xs">
                {{ $options.filters.label($store.getters.contextRole, 'role') }}
              </div>
              <div class="text-gray-900 font-bold">
                <template v-if="$store.getters.contextRole == 'referent'">
                  {{ $options.filters.label($store.getters.currentRole.label, 'departments') }}
                </template>
                <template v-else>
                  {{ $store.getters.currentRole.label }}
                </template>
              </div>
            </Box>
          </template>
        </template>
      </Sectionheading>
    </template>
    <template #left>
      <Box :loading="$fetchState.pending" loading-text="Récupération des actions en attente ...">
        <Heading as="h2" :level="3" class="mb-8">
          Vous avez {{ formattedActions.length }} action(s) en attente
        </Heading>
        <StackedList :divided="false">
          <StackedListItem
            v-for="action, i in formattedActions"
            :key="i"
            :icon="action.icon"
            :link="action.link"
            :icon-variant="action.iconVariant"
          >
            <div class="text-gray-900 font-semibold" v-html="action.title" />
            <div v-if="action.subtitle" class="text-gray-500 text-sm" v-html="action.subtitle" />
          </StackedListItem>
        </StackedList>
      </Box>
      <LePetitMot />
      <Box>Bloc "Déploiement" avec lien vers Réseaux / Territoires</Box>
      <Box>Retour d'expérience des bénévoles</Box>
    </template>
    <template #right>
      <Box padding="sm" :loading="$fetchState.pending" loading-text="Récupération de votre activité ...">
        <Heading as="h2" :level="3" class="mb-8">
          Votre activité en chiffres
        </Heading>
        <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
          <CardStatistic :value="statistics.places_left" title="Bénévoles recherchés" />
          <CardStatistic :value="`${statistics.places_occupation_rate}%`" title="Taux d'occupation" :gauge-percentage="statistics.places_occupation_rate" />
          <CardStatistic
            v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :value="statistics.organisations_actives"
            title="Organisations actives"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations)} organisations`"
            link="/dashboard/organisations"
            link-label="Organisations"
          />
          <CardStatistic
            v-if="['admin', 'responsable', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :value="statistics.missions_actives"
            title="Missions actives"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.missions)} missions`"
            link="/dashboard/missions"
            link-label="Missions"
          />
          <CardStatistic
            v-if="['admin', 'responsable', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :value="statistics.participations_validated"
            title="Participations validées"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.participations)} candidatures`"
            link="/dashboard/participations"
            link-label="Participations"
          />
          <CardStatistic
            v-if="['admin'].includes($store.getters.contextRole)"
            :value="statistics.users_benevoles"
            title="Bénévoles"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.users)} utilisateurs`"
            link="/dashboard/users"
            link-label="Utilisateurs"
          />
        </div>
      </Box>
      <MoreNumbers />
      <Box>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold">
          Suivez le guide
        </Heading>
        <StackedList>
          <StackedListItem
            v-for="link,i in links"
            :key="i"
            :icon="link.icon"
            :link="link.link"
          >
            <div class="group-hover:underline font-bold">
              {{ link.title }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import MixinAction from '@/mixins/action'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import CardStatistic from '@/components/card/CardStatistic'

export default {
  components: {
    HelpCenter,
    LePetitMot,
    CardStatistic,
    MoreNumbers
  },
  mixins: [MixinAction],
  layout: 'dashboard',
  middleware: 'authenticated',
  data () {
    return {
      statistics: null,
      links: [
        { icon: '🔎', title: 'Gérer les contenus', link: '#' },
        { icon: '📇', title: 'Détecter les organisations en double', link: '#' },
        { icon: '📇', title: 'Gérer le RNA des organisations', link: '#' }
      ]
    }
  },
  async fetch () {
    const response = await this.$axios.get('/user/actions')
    if (response.data) {
      this.actions = response.data
    }
    const response2 = await this.$axios.get('/statistics')
    if (response2.data) {
      this.statistics = response2.data
    }
  }
}
</script>

<style>

</style>
