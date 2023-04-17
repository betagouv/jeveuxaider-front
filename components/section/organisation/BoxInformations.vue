<template>
  <div>
    <div v-if="showTitle" class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <Box :variant="boxVariant" :padding="boxPadding">
      <DescriptionList>
        <DescriptionListItem term="SIRET" :description="organisation.siret" />
        <DescriptionListItem term="Adresse" :description="organisation.city ? `${organisation.city} - ${organisation.zip}` : '-'" />
        <DescriptionListItem term="Département" :description="organisation.department ? `${organisation.department} - ${$options.filters.label(organisation.department, 'departments')}` : '-'" />
        <DescriptionListItem term="RNA" :description="organisation.rna" />
        <DescriptionListItem term="Crée le" :description="$dayjs(organisation.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Modifié le" :description="$dayjs(organisation.updated_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Statut juridique" :description="organisation.statut_juridique | label('structure_legal_status')" />
        <DescriptionListItem v-if="organisation.association_types" term="Agréements" :description="organisation.association_types.join(', ')" />
        <template v-if="['admin','referent','referent_regional'].includes($store.getters.contextRole)">
          <DescriptionListItemGauge
            term="Tx. complétion"
            :percentage="organisation.completion_rate"
          />
          <DescriptionListItem
            v-if="organisation.missing_fields.length"
            term="Champs manquants"
            :description="organisation.missing_fields.map((option) => $options.filters.label(option, 'structure_fields')).join(', ')"
          />
        </template>
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    organisation: {
      type: Object,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    boxVariant: {
      type: String,
      default: 'flat'
    },
    boxPadding: {
      type: String,
      default: 'xs'
    }
  }
}
</script>
