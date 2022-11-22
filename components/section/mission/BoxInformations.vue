<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
      <slot name="action" />
    </div>

    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(mission.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(mission.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Type" :description="missionType" />
        <DescriptionListItem term="Domaine" :description="mission.domaine && mission.domaine.name" />
        <template v-if="mission.template && mission.template.domaine_secondary">
          <DescriptionListItem term="Domaine secondaire" :description="mission.template.domaine_secondary.name" />
        </template>
        <template v-if="!mission.template && mission.domaine_secondary">
          <DescriptionListItem term="Domaine secondaire" :description="mission.domaine_secondary.name" />
        </template>
        <DescriptionListItem
          v-if="mission.publics_beneficiaires"
          term="Publics bénéf."
          :description="mission.publics_beneficiaires.map((item) => $options.filters.label(item, 'mission_publics_beneficiaires')).join(', ')"
        />
        <DescriptionListItem v-if="!mission.is_autonomy && mission.full_address.trim()" term="Adresse" :description="mission.full_address" />
        <DescriptionListItem v-if="mission.department" term="Département" :description="`${mission.department} - ${$options.filters.label(mission.department, 'departments')}`" />
        <DescriptionListItem v-if="autonomyCities" term="Villes" :description="autonomyCities" />
        <DescriptionListItem
          v-if="['admin'].includes($store.getters.contextRole) && mission.tags"
          term="Tags"
          :description="mission.tags.map((item) => item.name).join(', ')"
        />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'Informations'
    }
  },
  computed: {
    missionType () {
      return this.mission.is_autonomy ? 'Mission en autonomie' : this.mission.type
    },
    autonomyCities () {
      if (this.mission.is_autonomy && this.mission.autonomy_zips?.length) {
        return this.mission.autonomy_zips.map(item => `${item.city} (${item.zip})`).join(', ')
      }
      return null
    }
  }
}
</script>
