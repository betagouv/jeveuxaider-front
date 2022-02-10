<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(domaine.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(domaine.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Titre" :description="domaine.title" />
        <DescriptionListItem term="Description" :description="domaine.description" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    domaine: {
      type: Object,
      required: true
    }
  }
}
</script>
