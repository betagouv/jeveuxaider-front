<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Responsable
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList v-if="profile">
        <DescriptionListItem term="Nom" :description="profile.full_name" />
        <DescriptionListItem term="E-mail" :description="profile.email" />
        <DescriptionListItem term="Mobile" :description="profile.mobile" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
}
</script>
