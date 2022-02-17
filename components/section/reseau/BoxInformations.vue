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
