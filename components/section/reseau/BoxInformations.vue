<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(reseau.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(reseau.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Couleur" :description="reseau.color" />
        <DescriptionListItem term="Tx. complétion" :description="`${reseau.completion_rate}%`" />
        <DescriptionListItem
          v-if="reseau.missing_fields.length"
          term="Champs"
          :description="reseau.missing_fields.map((option) => $options.filters.label(option, 'reseau_fields')).join(', ')"
        />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    reseau: {
      type: Object,
      required: true
    }
  }
}
</script>
