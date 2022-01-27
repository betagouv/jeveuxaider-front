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
        <DescriptionListItem term="Type" :description="mission.type" />
        <DescriptionListItem term="Domaine" :description="mission.domaine && mission.domaine.name.fr" />
        <DescriptionListItem
          v-if="mission.publics_beneficiaires"
          term="Publics bénéf."
          :description="mission.publics_beneficiaires.map((item) => $options.filters.label(item, 'mission_publics_beneficiaires')).join(', ')"
        />
        <DescriptionListItem v-if="mission.full_address.trim()" term="Adresse" :description="mission.full_address" />
        <DescriptionListItem v-if="mission.department" term="Département" :description="`${mission.department} - ${$options.filters.label(mission.department, 'departments')}`" />
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
  }
}
</script>
