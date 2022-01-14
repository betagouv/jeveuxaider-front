<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Responsable
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList v-if="mission.responsable">
        <DescriptionListItem term="Nom" :description="mission.responsable.full_name" />
        <DescriptionListItem term="E-mail" :description="mission.responsable.email" />
        <DescriptionListItem term="Mobile" :description="mission.responsable.mobile" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      required: true
    }
  }
}
</script>
