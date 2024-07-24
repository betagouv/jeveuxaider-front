<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">Informations</div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(missionTemplate.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Modifié le"
          :description="$dayjs(missionTemplate.updated_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem term="Titre" :description="missionTemplate.title" />
        <BaseDescriptionListItem term="Sous titre" :description="missionTemplate.subtitle" />
        <BaseDescriptionListItem term="Domaine" :description="missionTemplate.domaine.name" />
        <BaseDescriptionListItem
          v-if="missionTemplate.domaine_secondary"
          term="Domaine secondaire"
          :description="missionTemplate.domaine_secondary.name"
        />
        <BaseDescriptionListItem
          v-if="['admin'].includes($stores.auth.contextRole) && missionTemplate.tags"
          term="Tags"
          :description="missionTemplate.tags.map((item) => item.name).join(', ')"
        />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    missionTemplate: {
      type: Object,
      required: true,
    },
  },
})
</script>
