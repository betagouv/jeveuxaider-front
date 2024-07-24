<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">Informations</div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <BaseDescriptionListItem term="ID" :description="term.id" />
        <BaseDescriptionListItem term="Nom" :description="term.name" />
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(term.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Modifié le"
          :description="$dayjs(term.updated_at).format('D MMMM YYYY à HH:mm')"
        />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    term: {
      type: Object,
      required: true,
    },
  },
})
</script>
