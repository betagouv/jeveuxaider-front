<template>
  <div>
    <div v-for="territoire in territoires" :key="territoire.id" class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">
          Territoire
        </div>
        <Link :to="`/admin/contenus/territoires/${territoire.id}`" icon="ChevronRightIcon">
          Consulter
        </Link>
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Nom" :description="territoire.name" />
          <DescriptionListItem term="Statut" :description="territoire.state | label('territoire_workflow_states')" />
          <DescriptionListItem term="Type" :description="territoire.type | label('territoire_types')" />
          <DescriptionListItem term="Département" :description="territoire.department | label('departments')" />
          <DescriptionListItem term="Zips" :description="territoire.zips.join(', ')" />
        </DescriptionList>
      </Box>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    territoires: {
      type: Array,
      required: true
    }
  }
}
</script>
