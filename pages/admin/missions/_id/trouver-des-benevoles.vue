<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Missions', link: '/admin/missions' },
        { label: mission.name, link: `/admin/missions/${mission.id}` },
        { label: 'Trouver des bénévoles' },
      ]"
    />
    <div class="my-6">
      <Heading :level="1">
        Trouver des bénévoles
      </Heading>
      <div class="text-gray-500">
        Proposez directement cette mission aux bénévoles
      </div>

      <Box class="mt-6" padding="sm" variant="flat">
        <div class="flex justify-between">
          <div class="text-xl font-extrabold mb-4">
            {{ mission.name }}
          </div>
          <div class="font-bold text-jva-green-500">
            {{ notifications.total | pluralize('notification envoyée', 'notifications envoyées') }}
          </div>
        </div>
        <div class="flex">
          <DescriptionList class="max-w-lg">
            <DescriptionListItem term="Bénévoles recherchés" :description="`${$options.filters.pluralize(mission.places_left, 'place disponible', 'places disponibles')}`" />
            <DescriptionListItem term="Type" :description="mission.type" />
            <DescriptionListItem term="Domaine" :description="mission.domaine && mission.domaine.name.fr" />
            <DescriptionListItem
              v-if="mission.publics_beneficiaires"
              term="Publics bénéf."
              :description="mission.publics_beneficiaires.map((item) => $options.filters.label(item, 'mission_publics_beneficiaires')).join(', ')"
            />
            <DescriptionListItem v-if="mission.department" term="Département" :description="`${mission.department} - ${$options.filters.label(mission.department, 'departments')}`" />
          </DescriptionList>
        </div>
      </Box>

      <div class="flex text-sm items-end gap-x-3 text-gray-500 mt-4">
        <div>
          <FormLabel>
            Engagement minimum
          </FormLabel>
          <SelectAdvanced
            class="w-52"
            name="duration"
            placeholder="Choisir une durée"
            :options="$labels.duration"
            variant="transparent"
            clearable
            :value="$route.query['filter[minimum_commitment]'] && $route.query['filter[minimum_commitment]'].split(',')[0]"
            @input="handleChangeCommitment('duration', $event)"
          />
        </div>
        <div class="mb-4">
          par
        </div>
        <SelectAdvanced
          name="timePeriod"
          placeholder="-"
          class="w-52"
          :options="$labels.time_period"
          variant="transparent"
          clearable
          :value="$route.query['filter[minimum_commitment]'] && $route.query['filter[minimum_commitment]'].split(',')[1]"
          @input="handleChangeCommitment('timePeriod', $event)"
        />
        <FormControl
          label="Code Postal"
          html-for="zip"
        >
          <Input
            name="zip"
            placeholder="Code Postal"
            variant="transparent"
            :value="$route.query['filter[zip]']"
            clearable
            @input="changeFilter('filter[zip]', $event)"
          />
        </FormControl>
        <FormControl
          label="Disponibilité"
          html-for="disponibilities"
        >
          <SelectAdvanced
            name="disponibilities"
            placeholder="-"
            class="w-52"
            :value="$route.query['filter[disponibilities]']"
            :options="$labels.disponibilities"
            variant="transparent"
            clearable
            @input="changeFilter('filter[disponibilities]', $event)"
          />
        </FormControl>
      </div>
      <div class="mt-6 mb-1 text-cool-gray-800 font-semibold text-lg">
        {{ queryResult.total }} bénévoles répondent à vos critères
      </div>

      <!-- @input="changeFilter('filter[minimum_commitment]', $event)" -->

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardProfileBenevole
          v-for="profile in queryResult.data"
          :key="profile.id"
          :profile="profile"
          :notifications="notifications.data.filter(
            (notification) => notification.profile_id == profile.id
          )"
          @click.native="drawerProfileId = profile.id"
          @clickedProposerMission="handleProposerMission($event)"
        />
      </div>

      <Pagination
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

export default {
  components: { CardProfileBenevole },
  mixins: [QueryBuilder],
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'admin',
        'referent',
        'referent_regional',
        'tete_de_reseau',
        'responsable'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    const { data: mission } = await $axios.get(`/missions/${params.id}`)
    if (!mission) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != mission.structure_id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      mission
    }
  },
  data () {
    return {
      endpoint: `/missions/${this.$route.params.id}/benevoles`,
      queryParams: {
        include: 'user,participationsValidatedCount'
      },
      drawerProfileId: null,
      notifications: []
    }
  },
  created () {
    this.fetchNotificationsBenevoles()
  },
  methods: {
    async fetchNotificationsBenevoles () {
      const { data: notifications } = await this.$axios.get('/notifications-benevoles', {
        params: {
          'filter[mission.id]': this.$route.params.id
        }
      })
      this.notifications = notifications
    },
    handleChangeCommitment (type, value) {
      const commitment = this.$route.query['filter[minimum_commitment]'] ? this.$route.query['filter[minimum_commitment]'].split(',') : []
      if (type == 'duration') {
        commitment[0] = value
      } else {
        commitment[1] = value
      }
      this.changeFilter('filter[minimum_commitment]', commitment.join(','))
    },
    async handleProposerMission (profile) {
      await this.$axios.post('/notifications-benevoles', {
        mission_id: this.mission.id,
        profile_id: profile.id
      })
      this.fetchNotificationsBenevoles()
      this.$toast.success(`Un e-mail a été envoyé à ${profile.first_name} ${profile.last_name[0]}.`)
    }
  }
}
</script>
