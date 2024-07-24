<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
      <slot name="action" />
    </div>

    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(mission.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Modifié le"
          :description="$dayjs(mission.updated_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem term="Type" :description="mission.type" />
        <BaseDescriptionListItem
          term="Domaine"
          :description="mission.domaine && mission.domaine.name"
        />
        <template v-if="mission.template && mission.template.domaine_secondary">
          <BaseDescriptionListItem
            term="Domaine secondaire"
            :description="mission.template.domaine_secondary.name"
          />
        </template>
        <template v-if="!mission.template && mission.domaine_secondary">
          <BaseDescriptionListItem
            term="Domaine secondaire"
            :description="mission.domaine_secondary.name"
          />
        </template>
        <BaseDescriptionListItem
          v-if="mission.publics_beneficiaires"
          term="Publics bénéf."
          :description="
            mission.publics_beneficiaires
              .map((item) => $filters.label(item, 'mission_publics_beneficiaires'))
              .join(', ')
          "
        />
        <BaseDescriptionListItem
          term="Adresses"
          :description="mission?.addresses?.map((item) => item.label).join(', ')"
        />
        <BaseDescriptionListItem
          v-if="mission.department"
          term="Département"
          :description="`${mission.department} - ${$filters.label(
            mission.department,
            'departments'
          )}`"
        />
        <!-- <BaseDescriptionListItem
          v-if="autonomyCities"
          term="Villes"
          :description="autonomyCities"
        /> -->
        <BaseDescriptionListItem
          v-if="['admin'].includes($stores.auth.contextRole) && mission.tags"
          term="Tags"
          :description="mission.tags.map((item) => item.name).join(', ')"
        />
      </BaseDescriptionList>
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
    title: {
      type: String,
      default: 'Informations',
    },
  },
  computed: {
    missionType() {
      return this.mission.type
      // return this.mission.is_autonomy ? 'Mission en autonomie' : this.mission.type
    },
    // autonomyCities() {
    //   const { formatAutonomyCities } = autonomyCitiesHelper()
    //   return formatAutonomyCities(this.mission.autonomy_zips)
    // },
  },
})
</script>
