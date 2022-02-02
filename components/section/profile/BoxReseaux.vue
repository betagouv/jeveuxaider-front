<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Réseau
      </div>
      <Link to="/admin/organisations/" icon="ChevronRightIcon" class="opacity-25">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Nom" :description="reseau.name" />
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
