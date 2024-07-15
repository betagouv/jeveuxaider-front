<template>
  <div class="container">
    <DrawerBenevole :profile="drawerProfile" @close="drawerProfile = null" />

    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Missions', to: '/admin/missions' },
        { text: mission.name, to: `/admin/missions/${mission.id}` },
        { text: 'Trouver des bénévoles' },
      ]"
    />
    <div class="mb-6">
      <BaseHeading :level="1"> Trouver des bénévoles </BaseHeading>
      <div class="text-gray-500">Proposez directement cette mission aux bénévoles</div>

      <BaseBox class="mt-6" padding="sm" variant="flat">
        <div class="flex justify-between">
          <div class="text-xl font-extrabold mb-4">
            {{ mission.name ?? 'Titre à définir' }}
          </div>
          <div class="font-bold text-jva-green-500">
            {{
              $filters.pluralize(
                notifications.total,
                'notification envoyée',
                'notifications envoyées'
              )
            }}
          </div>
        </div>
        <div class="flex">
          <BaseDescriptionList class="max-w-xl">
            <BaseDescriptionListItem
              :term-size="160"
              term="Bénévoles recherchés"
              :description="`${$filters.pluralize(
                mission.places_left,
                'place disponible',
                'places disponibles'
              )}`"
            />
            <BaseDescriptionListItem :term-size="160" term="Type" :description="mission.type" />
            <BaseDescriptionListItem
              :term-size="160"
              term="Domaine"
              :description="domaine && domaine.name"
            />
            <BaseDescriptionListItem
              v-if="mission.publics_beneficiaires"
              :term-size="160"
              term="Publics bénéf."
              :description="
                mission.publics_beneficiaires
                  .map((item) => $filters.label(item, 'mission_publics_beneficiaires'))
                  .join(', ')
              "
            />
            <BaseDescriptionListItem
              v-if="mission.department"
              :term-size="160"
              term="Département"
              :description="`${mission.department} - ${$filters.label(
                mission.department,
                'departments'
              )}`"
            />
            <BaseDescriptionListItem
              v-if="uniqueCities"
              :term-size="160"
              term="Villes"
              :description="uniqueCities.join(',')"
            />
          </BaseDescriptionList>
        </div>
      </BaseBox>

      <div class="flex text-sm items-end gap-x-3 text-gray-500 mt-4">
        <div>
          <BaseFormLabel> Engagement minimum </BaseFormLabel>
          <BaseSelectAdvanced
            class="w-52"
            name="duration"
            placeholder="Choisir une durée"
            :options="$labels.duration"
            variant="transparent"
            clearable
            :modelValue="
              $route.query['filter[minimum_commitment]'] &&
              $route.query['filter[minimum_commitment]'].split(',')[0]
            "
            @update:modelValue="handleChangeCommitment('duration', $event)"
          />
        </div>
        <div class="mb-4">par</div>
        <BaseSelectAdvanced
          name="timePeriod"
          placeholder="-"
          class="w-52"
          :options="$labels.time_period"
          variant="transparent"
          clearable
          :modelValue="
            $route.query['filter[minimum_commitment]'] &&
            $route.query['filter[minimum_commitment]'].split(',')[1]
          "
          @update:modelValue="handleChangeCommitment('timePeriod', $event)"
        />
        <BaseFormControl label="Code Postal" html-for="zip">
          <BaseInput
            name="zip"
            placeholder="Code Postal"
            variant="transparent"
            :modelValue="$route.query['filter[zip]']"
            clearable
            @update:modelValue="changeFilter('filter[zip]', $event)"
          />
        </BaseFormControl>
        <BaseFormControl label="Disponibilité" html-for="disponibilities">
          <BaseSelectAdvanced
            name="disponibilities"
            placeholder="-"
            class="w-52"
            :modelValue="$route.query['filter[disponibilities]']"
            :options="$labels.disponibilities"
            variant="transparent"
            clearable
            @update:modelValue="changeFilter('filter[disponibilities]', $event)"
          />
        </BaseFormControl>
      </div>
      <div class="mt-6 mb-1 text-cool-gray-800 font-semibold text-lg">
        {{ queryResult.total }} bénévoles répondent à vos critères
      </div>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardProfileBenevole
          v-for="profile in queryResult.data"
          :key="profile.id"
          class="cursor-pointer hover:shadow-xl"
          :profile="profile"
          :mission-id="mission.id"
          @click.native="drawerProfile = profile"
          @clickedProposerMission="handleProposerMission($event)"
        />
      </div>

      <Pagination
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardProfileBenevole from '@/components/card/CardProfileBenevole.vue'
import DrawerBenevole from '@/components/drawer/DrawerBenevole.vue'
import MixinMission from '@/mixins/mission'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import mission from '@/mixins/mission'

export default defineNuxtComponent({
  components: { CardProfileBenevole, DrawerBenevole, Pagination, Breadcrumb },
  mixins: [QueryBuilder, MixinMission],
  async setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    const mission = await apiFetch(`/missions/${route.params.id}`)
    if (!mission) {
      return showError({ statusCode: 404 })
    }

    if ($stores.auth.contextRole == 'responsable') {
      if ($stores.auth.contextableId != mission.structure_id) {
        return showError({ statusCode: 403 })
      }
    }

    if (!mission.is_online) {
      return showError({ statusCode: 403 })
    }

    return {
      mission,
    }
  },
  data() {
    return {
      endpoint: `/missions/${this.$route.params.id}/benevoles`,
      queryParams: {
        include: 'participationsValidatedCount,avatar,notificationsBenevoles',
      },
      drawerProfileId: null,
      notifications: [],
      drawerProfile: null,
    }
  },
  computed: {
    // missionType() {
    //   return this.mission.is_autonomy ? 'Mission en autonomie' : this.mission.type
    // },
    // autonomyCities() {
    //   const { formatAutonomyCities } = autonomyCitiesHelper()
    //   return formatAutonomyCities(this.mission.autonomy_zips)
    // },
  },
  created() {
    this.fetchNotificationsBenevoles()
  },
  methods: {
    async fetchNotificationsBenevoles() {
      const notifications = await apiFetch('/notifications-benevoles', {
        params: {
          'filter[mission.id]': this.$route.params.id,
        },
      })
      this.notifications = notifications
    },
    handleChangeCommitment(type, value) {
      const commitment = this.$route.query['filter[minimum_commitment]']
        ? this.$route.query['filter[minimum_commitment]'].split(',')
        : []
      if (type == 'duration') {
        commitment[0] = value
      } else {
        commitment[1] = value
      }
      this.changeFilter('filter[minimum_commitment]', commitment.join(','))
    },
    async handleProposerMission(profile) {
      await apiFetch('/notifications-benevoles', {
        method: 'POST',
        body: {
          mission_id: this.mission.id,
          profile_id: profile.id,
        },
      })
        .then(() => {
          this.$toast.success(`Un e-mail a été envoyé à ${profile.secret_name}.`)
          this.fetchNotificationsBenevoles()
          this.fetch()
        })
        .catch(() => {})
    },
  },
})
</script>
