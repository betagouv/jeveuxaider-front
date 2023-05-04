<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="ID" :description="term.id" />
        <DescriptionListItem term="Nom" :description="term.name" />
        <DescriptionListItem term="Crée le" :description="$dayjs(term.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(term.updated_at).format('D MMMM YYYY à HH:mm')" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    term: {
      type: Object,
      required: true
    }
  }
}
</script>
