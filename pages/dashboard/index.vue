<template>
  <BaseContainer2Cols>
    <template #breadcrumb>
      <DsfrBreadcrumb :links="[{ text: 'Tableau de bord' }]" />
    </template>
    <template #header>
      <BaseSectionHeading
        title="Ravi de vous retrouver 👋"
        :secondary-title="`Bonjour ${$stores.auth.user?.profile?.first_name}`"
      >
        <template #action>
          <ButtonCreateMission v-if="$stores.auth.contextRole === 'responsable'" />
        </template>
      </BaseSectionHeading>
    </template>
    <template #left>
      <BaseBox v-if="$stores.auth.user.statistics?.missions_offline_count">
        <BaseHeading as="h2" :level="3" class="mb-8">
          <span aria-hidden="true" class="font-emoji text-2xl mr-2">⚠️</span>
          Vous avez
          {{
            $filters.pluralize(
              $stores.auth.user.statistics?.missions_offline_count,
              'mission hors ligne',
              'missions hors ligne'
            )
          }}
          <RiInformationLine
            v-tooltip="{
              content:
                'La mission n’est plus accessible publiquement, et les bénévoles ne peuvent plus proposer leur aide. Cette désactivation est temporaire, pour vous permettre de mettre à jour les participations (validées ou refusées).',
            }"
            class="w-5 h-5 inline mb-[1px] cursor-help"
          />
        </BaseHeading>
        <div class="formatted-text">
          <p>
            Pour
            {{
              $filters.pluralize(
                $stores.auth.user.statistics?.missions_offline_count,
                'la',
                'les',
                false
              )
            }}
            réactiver, mettez à jour le statut des participations.<br />
            <DsfrLink
              icon="RiArrowRightLine"
              :to="`/admin/participations?filter[state]=En+cours+de+traitement,En+attente+de+validation&filter[ofResponsable]=${$stores.auth.profile.id}`"
            >
              Traiter les participations
            </DsfrLink>
          </p>
          <p>
            Pour toute information, veuillez contacter le support à l’adresse suivante :
            <DsfrLink href="\'mailto:support@jeveuxaider.beta.gouv.fr\'">
              support@jeveuxaider.beta.gouv.fr
            </DsfrLink>
          </p>
        </div>
      </BaseBox>
      <BaseBox :loading="loadingActions" loading-text="Récupération des actions en attente ...">
        <BaseHeading as="h2" :level="3" class="mb-4 sm:mb-8">
          Vous avez
          {{ $filters.pluralize(formattedActions.length, 'action') }} en attente
        </BaseHeading>
        <template v-if="formattedActions.length">
          <BaseStackedList :divided="false">
            <BaseStackedListItem
              v-for="(action, i) in formattedActions"
              :key="i"
              :icon="action.icon"
              :link="action.link"
              :href="action.href"
              :icon-variant="action.iconVariant"
            >
              <div class="text-gray-900 lg:font-semibold" v-html="action.title" />
              <div
                v-if="action.subtitle"
                class="hidden sm:block text-[#666666] text-sm mt-2"
                v-html="action.subtitle"
              />
            </BaseStackedListItem>
          </BaseStackedList>
        </template>
        <template v-else>
          <BaseStackedListItem icon="🎊" icon-variant="warning">
            <div class="text-gray-900 font-semibold">Félicitations !</div>
            <div class="text-[#666666] text-sm mt-2">
              Vous n'avez plus aucune action en attente !
            </div>
          </BaseStackedListItem>
        </template>
      </BaseBox>

      <BoxOperations v-if="['admin'].includes($stores.auth.contextRole)" />
      <LePetitMot />

      <BaseBox
        v-if="testimonials.length && !['responsable_territoire'].includes($stores.auth.contextRole)"
        :loading="loadingTestimonials"
        loading-text="Récupération des témoignages ..."
      >
        <BaseHeading as="h2" :level="3"> Retour d'expériences des bénévoles </BaseHeading>
        <div class="mt-8">
          <div class="grid grid-cols-1 gap-6">
            <CardTemoignage
              v-for="temoignage in testimonials"
              :key="temoignage.id"
              :temoignage="temoignage"
            />
          </div>
          <div class="mt-8">
            <nuxt-link to="/admin/temoignages" no-prefetch>
              <DsfrButton type="secondary">Tous les retours d'expériences</DsfrButton>
            </nuxt-link>
          </div>
        </div>
      </BaseBox>
    </template>
    <template #right>
      <BaseBox :loading="loadingStatistics" loading-text="Récupération de votre activité ...">
        <BaseHeading as="h2" :level="3" class="mb-8"> Votre activité en chiffres </BaseHeading>
        <div v-if="statistics" class="grid grid-cols-1 lg:grid-cols-2 border bg-gray-200 gap-[1px]">
          <CardStatistic
            :value="statistics.places_left"
            :title="`${$filters.pluralize(
              statistics.places_left,
              'Bénévole recherché',
              'Bénévoles recherchés',
              false
            )}`"
            :subtitle="
              statistics.places_left_waiting
                ? `+${$numeral(statistics.places_left_waiting)} places à venir`
                : null
            "
          />
          <CardStatistic
            :value="`${statistics.places_occupation_rate}%`"
            title="Taux de remplissage"
            :gauge-percentage="statistics.places_occupation_rate"
          />
          <CardStatistic
            v-if="
              [
                'admin',
                'referent',
                'referent_regional',
                'tete_de_reseau',
                'responsable_territoire',
              ].includes($stores.auth.contextRole)
            "
            :value="statistics.organisations_actives"
            :title="`${$filters.pluralize(
              statistics.organisations_actives,
              'Organisation active',
              'Organisations actives',
              false
            )}`"
            :subtitle="`sur ${$numeral(statistics.organisations)} ${$filters.pluralize(
              statistics.organisations,
              'organisations',
              'organisations',
              false
            )}`"
            link="/admin/organisations"
            link-label="Organisations"
            :link-hidden="['responsable_territoire'].includes($stores.auth.contextRole)"
          />
          <CardStatistic
            v-if="
              [
                'admin',
                'responsable',
                'referent',
                'referent_regional',
                'tete_de_reseau',
                'responsable_territoire',
              ].includes($stores.auth.contextRole)
            "
            :value="statistics.missions_actives"
            :title="`${$filters.pluralize(
              statistics.missions_actives,
              'Mission en ligne',
              'Missions en ligne',
              false
            )}`"
            :subtitle="`sur ${$numeral(statistics.missions)} ${$filters.pluralize(
              statistics.missions,
              'mission',
              'missions',
              false
            )}`"
            link="/admin/missions"
            link-label="Missions"
            :link-hidden="['responsable_territoire'].includes($stores.auth.contextRole)"
          />
          <CardStatistic
            v-if="
              [
                'admin',
                'responsable',
                'referent',
                'referent_regional',
                'tete_de_reseau',
                'responsable_territoire',
              ].includes($stores.auth.contextRole)
            "
            :value="statistics.participations_validated"
            :title="`${$filters.pluralize(
              statistics.participations_validated,
              'Participation validée',
              'Participations validées',
              false
            )}`"
            :subtitle="`sur ${$numeral(statistics.participations)} ${$filters.pluralize(
              statistics.participations,
              'candidature',
              'candidatures',
              false
            )}`"
            link="/admin/participations"
            link-label="Participations"
            :link-hidden="['responsable_territoire'].includes($stores.auth.contextRole)"
          />
          <CardStatistic
            v-if="['admin'].includes($stores.auth.contextRole)"
            :value="statistics.users_benevoles"
            title="Bénévoles"
            :subtitle="`sur ${$numeral(statistics.users)} utilisateurs`"
            link="/admin/utilisateurs"
            link-label="Utilisateurs"
          />
        </div>
      </BaseBox>
      <MoreNumbers />

      <BoxScore
        v-if="['responsable'].includes($stores.auth.contextRole)"
        padding="sm"
        :structure-id="$stores.auth.currentRole.contextable_id"
      >
        <template #top>
          <BaseHeading as="h2" :level="3" class="mb-8"> Votre visibilité </BaseHeading>
        </template>
        <template #bottom>
          <div class="mt-8 text-center">
            <nuxt-link no-prefetch to="/admin/participations">
              <DsfrButton type="secondary"> Traiter les participations </DsfrButton>
            </nuxt-link>
          </div>
        </template>
      </BoxScore>
      <GuideLinks />
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import MixinAction from '@/mixins/action'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers.vue'
import GuideLinks from '@/components/section/dashboard/GuideLinks.vue'
import LePetitMot from '@/components/section/dashboard/LePetitMot.vue'
import BoxOperations from '@/components/section/dashboard/BoxOperations.vue'
import CardStatistic from '@/components/card/CardStatistic.vue'
import CardTemoignage from '@/components/card/CardTemoignage.vue'
import ButtonCreateMission from '@/components/custom/ButtonCreateMission.vue'
import BoxScore from '@/components/section/organisation/BoxScore.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    LePetitMot,
    CardStatistic,
    MoreNumbers,
    CardTemoignage,
    ButtonCreateMission,
    GuideLinks,
    BoxScore,
    BoxOperations,
  },
  mixins: [MixinAction],
  setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()

    if (
      ![
        'admin',
        'referent',
        'referent_regional',
        'tete_de_reseau',
        'responsable',
        'responsable_territoire',
      ].includes($stores.auth.contextRole)
    ) {
      return showError({ statusCode: 403 })
    }
  },
  data() {
    return {
      statistics: null,
      score: null,
      testimonials: [],
      loadingActions: true,
      loadingSnuActions: true,
      loadingStatistics: true,
      loadingTestimonials: true,
    }
  },
  computed: {},
  async created() {
    const promises = [this.getActions(), this.getStatistics(), this.getTemoignages()]
    if (this.$stores.auth.contextRole === 'responsable') {
      promises.push(this.getSnuActions())
    }

    await Promise.all(promises)
  },
  methods: {
    getActions() {
      apiFetch('/user/actions').then((response) => {
        this.loadingActions = false
        this.actions = response
      })
    },
    getSnuActions() {
      apiFetch('/user/snu-actions').then((response) => {
        this.loadingSnuActions = false
        this.snuActions = response
      })
    },
    getStatistics() {
      apiFetch('/statistics').then((response) => {
        this.loadingStatistics = false
        this.statistics = response
      })
    },
    getTemoignages() {
      if (!['responsable_territoire'].includes(this.$stores.auth.contextRole)) {
        apiFetch('/temoignages?pagination=3').then((response) => {
          this.loadingTestimonials = false
          this.testimonials = response.data
        })
      }
    },
  },
})
</script>
