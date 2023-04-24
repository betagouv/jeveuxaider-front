<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Places
      </div>
      <Link :to="`/admin/participations?filter[mission.id]=${mission.id}&context_name=${mission.name}`" icon="ChevronRightIcon">
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
      <template v-if="mission.places_left > 0">
        <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
        <div class="flex justify-center text-sm">
          <Link :to="`/admin/missions/${mission.id}/trouver-des-benevoles`">
            Trouver des bénévoles
          </Link>
        </div>
      </template>
      <template v-if="mission.places_left > 0">
        <div class="border-t -mx-4 xl:-mx-6 mt-4 mb-4" />
        <div class="flex justify-center text-sm">
          <Link v-if="mission.is_registration_open" @click.native="handleChangeIsRegistrationOpen(false)">
            Fermer les inscriptions
          </Link>
          <Link v-else @click.native="handleChangeIsRegistrationOpen(true)">
            Ouvrir les inscriptions
          </Link>
        </div>
      </template>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleChangeIsRegistrationOpen (value) {
      const { data: mission } = await this.$axios.put(`/missions/${this.mission.id}`, { ...this.mission, is_registration_open: value }).catch(() => {})
      this.$toast.success(value ? 'Les bénévoles peuvent s\'inscrire à cette mission' : 'Les bénévoles ne peuvent plus s\'inscrire à cette mission')
      this.$emit('updated', mission)
    }
  }
}
</script>
