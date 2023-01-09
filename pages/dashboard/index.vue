<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[{ text: 'Tableau de bord'}]"
      />
    </template>
    <template #header>
      <SectionHeading title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`">
        <template #action>
          <ButtonCreateMission v-if="$store.getters.contextRole === 'responsable'" />
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
              :href="action.href"
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

      <Box v-if="testimonials.length && !['responsable_territoire'].includes($store.getters.contextRole)" padding="sm" :loading="loadingTestimonials" loading-text="Récupération des témoignages ...">
        <Heading as="h2" :level="3">
          Retour d'expériences des bénévoles
        </Heading>
        <div class="mt-8">
          <div class="grid grid-cols-1 gap-6">
            <CardTemoignage
              v-for="temoignage in testimonials"
              :key="temoignage.id"
              :temoignage="temoignage"
            />
          </div>
          <div class="flex justify-center mt-8">
            <Link :to="`/admin/temoignages`" class="uppercase font-semibold text-sm hover:underline">
              Tous les retours
            </Link>
          </div>
        </div>
      </Box>
    </template>
    <template #right>
      <Box padding="sm" :loading="loadingStatistics" loading-text="Récupération de votre activité ...">
        <Heading as="h2" :level="3" class="mb-8">
          Votre activité en chiffres
        </Heading>
        <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-2 border bg-gray-200 gap-[1px]">
          <CardStatistic
            :value="statistics.places_left"
            :title="`${$options.filters.pluralize(statistics.places_left, 'Bénévole recherché', 'Bénévoles recherchés', false)}`"
            :subtitle="statistics.places_left_waiting ? `+${$options.filters.formatNumber(statistics.places_left_waiting)} places à venir` : null"
          />
          <CardStatistic :value="`${statistics.places_occupation_rate}%`" title="Taux de remplissage" :gauge-percentage="statistics.places_occupation_rate" />
          <CardStatistic
            v-if="['admin', 'referent','referent_regional','tete_de_reseau','responsable_territoire'].includes($store.getters.contextRole)"
            :value="statistics.organisations_actives"
            :title="`${$options.filters.pluralize(statistics.organisations_actives, 'Organisation active', 'Organisations actives', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.organisations)} ${$options.filters.pluralize(statistics.organisations, 'organisations', 'organisations', false)}`"
            link="/admin/organisations"
            link-label="Organisations"
            :link-hidden="['responsable_territoire'].includes($store.getters.contextRole)"
          />
          <CardStatistic
            v-if="['admin', 'responsable', 'referent','referent_regional','tete_de_reseau','responsable_territoire'].includes($store.getters.contextRole)"
            :value="statistics.missions_actives"
            :title="`${$options.filters.pluralize(statistics.missions_actives, 'Mission en ligne', 'Missions en ligne', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.missions)} ${$options.filters.pluralize(statistics.missions, 'mission', 'missions', false)}`"
            link="/admin/missions"
            link-label="Missions"
            :link-hidden="['responsable_territoire'].includes($store.getters.contextRole)"
          />
          <CardStatistic
            v-if="['admin', 'responsable', 'referent','referent_regional','tete_de_reseau','responsable_territoire'].includes($store.getters.contextRole)"
            :value="statistics.participations_validated"
            :title="`${$options.filters.pluralize(statistics.participations_validated, 'Participation validée', 'Participations validées', false)}`"
            :subtitle="`sur ${$options.filters.formatNumber(statistics.participations)} ${$options.filters.pluralize(statistics.participations, 'candidature', 'candidatures', false)}`"
            link="/admin/participations"
            link-label="Participations"
            :link-hidden="['responsable_territoire'].includes($store.getters.contextRole)"
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
      <MoreNumbers v-if="['admin','referent'].includes($store.getters.contextRole)" />
      <GuideLinks />
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import MixinAction from '@/mixins/action'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import GuideLinks from '@/components/section/dashboard/GuideLinks'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import CardStatistic from '@/components/card/CardStatistic'
import CardTemoignage from '@/components/card/CardTemoignage'
import ButtonCreateMission from '@/components/custom/ButtonCreateMission'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    HelpCenter,
    LePetitMot,
    CardStatistic,
    MoreNumbers,
    CardTemoignage,
    ButtonCreateMission,
    Breadcrumb,
    GuideLinks
  },
  mixins: [MixinAction],
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable', 'responsable_territoire'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      statistics: null,
      testimonials: [],
      loadingActions: true,
      loadingSnuActions: true,
      loadingStatistics: true,
      loadingTestimonials: true
    }
  },
  computed: {

  },
  async created () {
    await Promise.all([
      this.getActions(),
      this.getStatistics(),
      this.getTemoignages()
    ])

    if (this.$store.getters.contextRole === 'responsable') {
      await this.getSnuActions()
    }
  },
  methods: {
    getActions () {
      this.$axios.get('/user/actions').then((response) => {
        this.loadingActions = false
        this.actions = response.data
      })
    },
    getSnuActions () {
      this.$axios.get('/user/snu-actions').then((response) => {
        this.loadingSnuActions = false
        this.snuActions = response.data
      })
    },
    getStatistics () {
      this.$axios.get('/statistics').then((response) => {
        this.loadingStatistics = false
        this.statistics = response.data
      })
    },
    getTemoignages () {
      if (!['responsable_territoire'].includes(this.$store.getters.contextRole)) {
        this.$axios.get('/temoignages?pagination=3').then((response) => {
          this.loadingTestimonials = false
          this.testimonials = response.data.data
        })
      }
    }
  }
}
</script>
