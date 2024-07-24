<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">Informations</div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(ressource.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Modifié le"
          :description="$dayjs(ressource.updated_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem term="Titre" :description="ressource.title" />
        <BaseDescriptionListItem term="Type" :description="ressource.type" />
        <BaseDescriptionListItem term="Roles" :description="ressource.roles.join(', ')" />
        <BaseDescriptionListItem term="Description" :description="ressource.description" />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    ressource: {
      type: Object,
      required: true,
    },
  },
})
</script>
