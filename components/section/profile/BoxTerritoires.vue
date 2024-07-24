<template>
  <div>
    <div v-for="territoire in territoires" :key="territoire.id" class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">Territoire</div>
        <DsfrLink :to="`/admin/contenus/territoires/${territoire.id}`" class="text-jva-blue-500">
          Consulter
        </DsfrLink>
      </div>
      <BaseBox variant="flat" padding="xs">
        <BaseDescriptionList>
          <BaseDescriptionListItem term="Nom" :description="territoire.name" />
          <BaseDescriptionListItem
            term="Statut"
            :description="$filters.label(territoire.state, 'territoire_workflow_states')"
          />
          <BaseDescriptionListItem
            term="Type"
            :description="$filters.label(territoire.type, 'territoire_types')"
          />
          <BaseDescriptionListItem
            term="Département"
            :description="$filters.label(territoire.department, 'departments')"
          />
          <BaseDescriptionListItem term="Zips" :description="territoire.zips.join(', ')" />
        </BaseDescriptionList>
      </BaseBox>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    territoires: {
      type: Array,
      required: true,
    },
  },
})
</script>
