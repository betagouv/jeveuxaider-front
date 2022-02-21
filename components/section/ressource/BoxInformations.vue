<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(ressource.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(ressource.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Titre" :description="ressource.title" />
        <DescriptionListItem term="Type" :description="ressource.type" />
        <DescriptionListItem term="Roles" :description="ressource.roles.join(', ')" />
        <DescriptionListItem v-if="ressource.type ==='link'" term="Lien" :description="ressource.link" />
        <DescriptionListItem v-if="ressource.type ==='file'" term="Fichier" :description="ressource.file.urls && ressource.file.urls.original" />
        <DescriptionListItem term="Description" :description="ressource.description" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    ressource: {
      type: Object,
      required: true
    }
  }
}
</script>
