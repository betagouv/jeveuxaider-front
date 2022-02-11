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
          <nuxt-link
            v-if="$store.getters.contextRole === 'responsable'"
            :to="`/admin/organisations/${$store.getters.currentRole.contextable_id}/missions/add`"
          >
            <Button icon="PlusIcon" size="xl">
              Publier une mission
            </Button>
          </nuxt-link>
        </template>
      </Sectionheading>
    </template>
    <template #left>
      <Box :loading="loadingActions" loading-text="Récupération des actions en attente ...">
        <Heading as="h2" :level="3" class="mb-8">
          Vous avez {{ formattedActions.length | pluralize('action') }} en attente
        </Heading>
        <template v-if="formattedActions.length">
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
        </template>
        <template v-else>
          <StackedListItem
            icon="🎊"
            icon-variant="warning"
          >
            <div class="text-gray-900 font-semibold">
              Félicitations !
            </div>
            <div class="text-gray-500 text-sm">
              Vous n'avez plus aucune action en attente !
            </div>
          </StackedListItem>
        </template>
      </Box>
      <LePetitMot />
    </template>
    <template #right>
      <Box padding="sm" :loading="loadingStatistics" loading-text="Récupération de votre activité ...">
        <Heading as="h2" :level="3" class="mb-8">
          Votre activité en chiffres
        </Heading>
        <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
          <CardStatistic
            :value="statistics.places_left"
            :title="`${$options.filters.pluralize(statistics.places_left, 'Bénévole recherché', 'Bénévoles recherchés', false)}`"
          />
          <CardStatistic :value="`${statistics.places_occupation_rate}%`" title="Taux d'occupation" :gauge-percentage="statistics.places_occupation_rate" />
          <CardStatistic
            v-if="['admin', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :value="statistics.organisations_actives"
            :title="`${$options.filters.pluralize(statistics.organisations_actives, 'Organisation active', 'Organisations actives', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations)} ${$options.filters.pluralize(statistics.organisations, 'organisations', 'organisations', false)}`"
            link="/admin/organisations"
            link-label="Organisations"
          />
          <CardStatistic
            v-if="['admin', 'responsable', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :value="statistics.missions_actives"
            :title="`${$options.filters.pluralize(statistics.missions_actives, 'Mission en ligne', 'Missions en ligne', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.missions)} ${$options.filters.pluralize(statistics.missions, 'mission', 'missions', false)}`"
            link="/admin/missions"
            link-label="Missions"
          />
          <CardStatistic
            v-if="['admin', 'responsable', 'referent','referent_regional'].includes($store.getters.contextRole)"
            :value="statistics.participations_validated"
            :title="`${$options.filters.pluralize(statistics.participations_validated, 'Participation validée', 'Participations validées', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.participations)} ${$options.filters.pluralize(statistics.participations, 'candidature', 'candidatures', false)}`"
            link="/admin/participations"
            link-label="Participations"
          />
          <CardStatistic
            v-if="['admin'].includes($store.getters.contextRole)"
            :value="statistics.users_benevoles"
            title="Bénévoles"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.users)} utilisateurs`"
            link="/admin/utilisateurs"
            link-label="Utilisateurs"
          />
        </div>
      </Box>
      <MoreNumbers />
      <Box>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold">
          {{ $store.getters.contextRole === 'admin' ? 'Liens utiles' : 'Suivez le guide' }}
        </Heading>
        <StackedList class="border-t">
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
  layout: 'admin',
  data () {
    return {
      statistics: null,
      loadingActions: true,
      loadingStatistics: true
    }
  },
  computed: {
    links () {
      if (this.$store.getters.contextRole === 'admin') {
        return [
          { icon: '🏞', title: 'Territoires', link: '/admin/contenus/territoires' },
          { icon: '🗂', title: 'Modèles de missions', link: '/admin/contenus/modeles-mission' }
        ]
      }
      return [
        { icon: '🪧', title: 'Ressources', link: '/admin/ressources' }
      ]
    }
  },
  created () {
    this.$axios.get('/user/actions').then((response) => {
      this.loadingActions = false
      this.actions = response.data
    })
    this.$axios.get('/statistics').then((response) => {
      this.loadingStatistics = false
      this.statistics = response.data
    })
  }
}
</script>
