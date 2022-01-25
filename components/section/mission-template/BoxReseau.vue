<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Réseau
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Nom" :description="missionTemplate.reseau.name" />
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
