<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">Informations</div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(territoire.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Modifié le"
          :description="$dayjs(territoire.updated_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem term="Nom" :description="territoire.name" />
        <BaseDescriptionListItem
          term="Type"
          :description="$filters.label(territoire.type, 'territoire_types')"
        />
        <BaseDescriptionListItem
          v-if="territoire.department"
          term="Département"
          :description="`${territoire.department} - ${$filters.label(
            territoire.department,
            'departments'
          )}`"
        />
        <BaseDescriptionListItem
          v-if="territoire.type === 'city'"
          term="Zips"
          :description="territoire.zips.join(', ')"
        />
        <template v-if="['admin'].includes($stores.auth.contextRole)">
          <BaseDescriptionListItemGauge
            term="Tx. complétion"
            :percentage="territoire.completion_rate"
          />
          <BaseDescriptionListItem
            v-if="territoire.missing_fields.length"
            term="Champs manquants"
            :description="
              territoire.missing_fields
                .map((option) => $filters.label(option, 'territoire_fields'))
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
    territoire: {
      type: Object,
      required: true,
    },
  },
})
</script>
