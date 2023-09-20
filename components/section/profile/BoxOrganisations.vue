<template>
  <div>
    <div v-for="organisation in structures" :key="organisation.id" class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">Organisation</div>
        <DsfrLink :to="`/admin/organisations/${organisation.id}`" class="text-jva-blue-500">
          Consulter
        </DsfrLink>
      </div>
      <BaseBox variant="flat" padding="xs">
        <BaseDescriptionList>
          <BaseDescriptionListItem term="Nom" :description="organisation.name" />
          <BaseDescriptionListItem term="Statut" :description="organisation.state" />
          <BaseDescriptionListItem
            term="Type"
            :description="$filters.label(organisation.statut_juridique, 'structure_legal_status')"
          />
        </BaseDescriptionList>
      </BaseBox>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    structures: {
      type: Array,
      required: true,
    },
  },
})
</script>
