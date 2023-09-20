<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Places</div>
      <BaseLink
        :to="`/admin/participations?filter[mission.id]=${mission.id}&context_name=${mission.name}`"
        icon="RiArrowRightSLine"
      >
        Participations
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs">
      <div class="flex items-center">
        <div class="text-4xl font-semibold pr-4">
          {{ mission.places_left }}
        </div>
        <div>
          <div class="font-semibold">
            {{
              $filters.pluralize(mission.places_left, 'place restante', 'places restantes', false)
            }}
          </div>
          <div class="text-gray-500 -mt-1">
            {{ mission.participations_max - mission.places_left }} sur
            {{ mission.participations_max }}
          </div>
        </div>
      </div>
      <template v-if="mission.places_left > 0 && mission.is_active">
        <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
        <div class="flex justify-center text-sm">
          <BaseLink :to="`/admin/missions/${mission.id}/trouver-des-benevoles`">
            Trouver des bénévoles
          </BaseLink>
        </div>
      </template>
      <template v-if="mission.places_left > 0 && mission.is_active">
        <div class="border-t -mx-4 xl:-mx-6 mt-4 mb-4" />
        <div class="flex justify-center text-sm">
          <BaseLink
            v-if="mission.is_registration_open"
            @click.native="handleChangeIsRegistrationOpen(false)"
          >
            Fermer les inscriptions
          </BaseLink>
          <BaseLink v-else @click.native="handleChangeIsRegistrationOpen(true)">
            Ouvrir les inscriptions
          </BaseLink>
        </div>
      </template>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handleChangeIsRegistrationOpen(value) {
      const mission = await apiFetch(`/missions/${this.mission.id}`, {
        method: 'PUT',
        body: {
          ...this.mission,
          is_registration_open: value,
        },
      }).catch(() => {})
      this.$toast.success(
        value
          ? "Les bénévoles peuvent s'inscrire à cette mission"
          : "Les bénévoles ne peuvent plus s'inscrire à cette mission"
      )
      this.$emit('updated', mission)
    },
  },
})
</script>
