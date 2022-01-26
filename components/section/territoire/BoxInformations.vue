<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(territoire.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(territoire.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Nom" :description="territoire.name" />
        <DescriptionListItem term="Type" :description="$options.filters.label(territoire.type,'territoire_types')" />
        <DescriptionListItem term="Département" :description="`${territoire.department} - ${$options.filters.label(territoire.department, 'departments')}`" />
        <DescriptionListItem v-if="territoire.type === 'city'" term="Zips" :description="territoire.zips.join(', ')" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    territoire: {
      type: Object,
      required: true
    }
  }
}
</script>
