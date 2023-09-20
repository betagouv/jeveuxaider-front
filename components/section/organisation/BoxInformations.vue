<template>
  <div>
    <div v-if="showTitle" class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Informations
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding">
      <BaseDescriptionList>
        <BaseDescriptionListItem
          term="Adresse"
          :description="organisation.city ? `${organisation.city} - ${organisation.zip}` : '-'"
        />
        <BaseDescriptionListItem
          term="Département"
          :description="
            organisation.department
              ? `${organisation.department} - ${$filters.label(
                  organisation.department,
                  'departments'
                )}`
              : '-'
          "
        />
        <BaseDescriptionListItem term="SIRET" :description="organisation.siret" />
        <BaseDescriptionListItem term="RNA" :description="organisation.rna" />
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(organisation.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Modifié le"
          :description="$dayjs(organisation.updated_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          term="Statut juridique"
          :description="$filters.label(organisation.statut_juridique, 'structure_legal_status')"
        />
        <BaseDescriptionListItem
          v-if="organisation.association_types"
          term="Agréements"
          :description="organisation.association_types.join(', ')"
        />
        <template
          v-if="['admin', 'referent', 'referent_regional'].includes($stores.auth.contextRole)"
        >
          <BaseDescriptionListItemGauge
            term="Tx. complétion"
            v-if="organisation.completion_rate"
            :percentage="organisation.completion_rate"
          />

          <template v-if="organisation.missing_fields">
            <BaseDescriptionListItem
              v-if="organisation.missing_fields.length"
              term="Champs manquants"
              :description="
                organisation.missing_fields
                  .map((option) => $filters.label(option, 'structure_fields'))
                  .join(', ')
              "
            />
          </template>
        </template>
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
    showTitle: {
      type: Boolean,
      default: false,
    },
    boxVariant: {
      type: String,
      default: 'flat',
    },
    boxPadding: {
      type: String,
      default: 'xs',
    },
  },
})
</script>
