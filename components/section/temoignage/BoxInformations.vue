<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(temoignage.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(temoignage.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Note" :description="temoignage.grade" />
        <div class="bg-gray-50 p-6 text-sm rounded-lg mt-4 text-gray-500">
          “{{ temoignage.testimony }}“
        </div>
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    temoignage: {
      type: Object,
      required: true
    }
  }
}
</script>
