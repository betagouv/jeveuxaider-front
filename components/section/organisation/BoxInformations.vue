<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Adresse" :description="`${organisation.city} - ${organisation.zip}`" />
        <DescriptionListItem term="Département" :description="`${organisation.department} - ${$options.filters.label(organisation.department, 'departments')}`" />
        <DescriptionListItem term="RNA" :description="organisation.rna" />
        <DescriptionListItem term="Crée le" :description="$dayjs(organisation.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(organisation.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Statut" :description="organisation.statut_juridique | label('structure_legal_status')" />
        <DescriptionListItem term="Agréements" :description="organisation.association_types.join(', ')" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    organisation: {
      type: Object,
      required: true
    }
  }
}
</script>
