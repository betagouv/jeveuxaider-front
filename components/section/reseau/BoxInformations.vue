<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">Informations</div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(reseau.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Modifié le"
          :description="$dayjs(reseau.updated_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem term="Couleur" :description="reseau.color" />
        <template v-if="['admin'].includes($stores.auth.contextRole)">
          <BaseDescriptionListItemGauge
            term="Tx. complétion"
            :percentage="reseau.completion_rate"
          />
          <BaseDescriptionListItem
            v-if="reseau.missing_fields.length"
            term="Champs manquants"
            :description="
              reseau.missing_fields
                .map((option) => $filters.label(option, 'reseau_fields'))
                .join(', ')
            "
          />
        </template>
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    reseau: {
      type: Object,
      required: true,
    },
  },
})
</script>
