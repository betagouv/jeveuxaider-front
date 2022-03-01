<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(missionTemplate.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(missionTemplate.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Titre" :description="missionTemplate.title" />
        <DescriptionListItem term="Sous titre" :description="missionTemplate.subtitle" />
        <DescriptionListItem term="Domaine" :description="missionTemplate.domaine.name" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    missionTemplate: {
      type: Object,
      required: true
    }
  }
}
</script>
