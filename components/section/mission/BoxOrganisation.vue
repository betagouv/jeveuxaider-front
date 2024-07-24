<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Organisation</div>
      <BaseLink :to="`/admin/organisations/${organisation.id}`" icon="RiArrowRightSLine">
        Consulter
      </BaseLink>
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
</template>

<script>
export default defineNuxtComponent({
  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
})
</script>
