<template>
  <div>
    <div v-for="organisation in structures" :key="organisation.id" class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">
          Organisation
        </div>
        <Link :to="`/admin/organisations/${organisation.id}`" icon="ChevronRightIcon">
          Consulter
        </Link>
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Nom" :description="organisation.name" />
          <DescriptionListItem term="Statut" :description="organisation.state" />
          <DescriptionListItem term="Type" :description="organisation.statut_juridique | label('structure_legal_status')" />
        </DescriptionList>
      </Box>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    structures: {
      type: Array,
      required: true
    }
  }
}
</script>
