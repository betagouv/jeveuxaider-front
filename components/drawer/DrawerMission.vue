<template>
  <div v-if="mission">
    <nuxt-link class="flex items-center space-x-2 mt-2" target="_blank" :to="`/missions-benevolat/${mission.id}/${mission.slug}`">
      <div
        :class="['h-3 w-3 rounded-full', hasPageOnline ? 'bg-jva-green-500' : 'bg-jva-red-500']"
      />
      <div class="underline text-sm">
        {{ hasPageOnline ? 'En ligne' : 'Hors ligne' }}
      </div>
      <ExternalLinkIcon class="h-4 w-4" />
    </nuxt-link>
    <div class="mt-4 space-x-2 opacity-25">
      <Button variant="white" size="sm" icon="PencilIcon">
        Modifier
      </Button>
      <Button variant="white" size="sm" icon="DuplicateIcon">
        Dupliquer
      </Button>
    </div>
    <div class="border-t -mx-6 my-6" />
    <div class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">
          Places
        </div>
        <Link to="/admin/participations" icon="ChevronRightIcon" class="opacity-25">
          Participations
        </Link>
      </div>
      <Box variant="flat" padding="xs">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ mission.places_left }}
          </div>
          <div>
            <div class="font-semibold">
              {{ mission.places_left | pluralize('place restante', 'places restantes', false) }}
            </div>
            <div class="text-gray-500 -mt-1">
              {{ mission.participations_max - mission.places_left }} sur {{ mission.participations_max }}
            </div>
          </div>
        </div>
        <div class="border-t -mx-6 mt-6 mb-4" />
        <div class="flex justify-center text-sm opacity-25">
          <Link>
            Trouver des bénévoles
          </Link>
        </div>
      </Box>
    </div>
    <div class="mb-8">
      <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
        Mission
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Crée le" :description="$dayjs(mission.created_at).format('D MMMM YYYY à HH:mm')" />
          <DescriptionListItem term="Modifié le" :description="$dayjs(mission.updated_at).format('D MMMM YYYY à HH:mm')" />
          <DescriptionListItem term="Type" :description="mission.type" />
          <DescriptionListItem term="Domaine" :description="mission.domaine && mission.domaine.name.fr" />
          <DescriptionListItem
            term="Publics bénéf."
            :description="mission.publics_beneficiaires.map((item) => $options.filters.label(item, 'mission_publics_beneficiaires')).join(', ')"
          />
          <DescriptionListItem term="Adresse" :description="mission.full_address" />
          <DescriptionListItem term="Département" :description="`${mission.department} - ${$options.filters.label(mission.department, 'departments')}`" />
        </DescriptionList>
      </Box>
    </div>
    <div class="mb-8">
      <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
        Responsable
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList v-if="mission.responsable">
          <DescriptionListItem term="Nom" :description="mission.responsable.full_name" />
          <DescriptionListItem term="E-mail" :description="mission.responsable.email" />
          <DescriptionListItem term="Mobile" :description="mission.responsable.mobile" />
        </DescriptionList>
      </Box>
    </div>
    <div class="flex justify-center mb-10">
      <Link class="uppercase font-semibold text-sm opacity-25">
        Consulter l'historique
      </Link>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    missionId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      mission: null
    }
  },
  async fetch () {
    if (!this.missionId) {
      return null
    }
    const { data } = await this.$axios.get(`/mission/${this.missionId}`)
    this.mission = data
    this.$emit('loaded', data)
  },
  computed: {
    hasPageOnline () {
      return this.mission.structure.state === 'Validée' && ['Validée', 'Terminée'].includes(this.mission.state)
    }
  },
  watch: {
    missionId: '$fetch'
  }
}
</script>
