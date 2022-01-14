<template>
  <div v-if="queryActivities && queryActivities.total > 0" class="text-sm space-y-2">
    <Box v-for="activity in queryActivities.data" :key="activity.id" variant="flat" padding="xs">
      <div class="font-medium">
        {{ activity.data.full_name }}
      </div>
      <div class="text-gray-500 mb-4">
        {{ formatActionLabel(activity) }}
      </div>
      <div class="flex space-y-2 flex-col">
        <Disclosure v-for="change in changes(activity)" :key="change.property">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex-shrink-0 group-hover:text-gray-600">
                {{ change.property }}
              </div>
              <div class="w-full border-t mt-1 ml-2 -mr-1" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="mt-3 space-y-3">
            <div>
              <Badge color="gray-light" size="xs">
                Avant
              </Badge>
              <div class="text-gray-500 italic mt-2">
                {{ change.before || '-' }}
              </div>
            </div>
            <div>
              <Badge color="gray-light" size="xs">
                Après
              </Badge>
              <div class="text-gray-500 italic mt-2">
                {{ change.after || '-' }}
              </div>
            </div>
          </div>
        </Disclosure>
      </div>
    </Box>
  </div>
  <div v-else>
    <Box variant="flat" padding="xs" class="text-sm">
      Aucun historique disponible
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    modelId: {
      type: Number,
      required: true
    },
    modelType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      queryActivities: null
    }
  },
  async fetch () {
    const { data: queryActivities } = await this.$axios.get('/activities', {
      params: {
        'filter[subject_id]': this.modelId,
        'filter[subject_type]': this.modelType
      }
    })
    this.queryActivities = queryActivities
  },
  computed: {
    uselessProperties () {
      return ['user_id', 'latitude', 'longitude', 'country']
    }
  },
  methods: {
    formatActionLabel (activity) {
      let label = 'Crée le '
      if (activity.description == 'updated') {
        label = 'Modifiée le '
      }
      label = label + this.$dayjs(activity.created_at).format('D MMM YYYY')
      return label
    },
    formatPropertyLabel (property) {
      switch (property) {
        case 'state':
          return 'Statut'
        case 'responsable_id':
          return 'Responsable'
        case 'name':
          return 'Nom'
        case 'description':
          return 'Précisions'
        case 'objectif':
          return 'Présentation'
        case 'information':
          return 'Mots pour les bénévoles'
        case 'address':
          return 'Adresse'
        case 'zip':
          return 'Code postal'
        case 'department':
          return 'Département'
        case 'structure_id':
          return 'Organisation'
        case 'participations_max':
          return 'Nombre de bénévoles recherchés'
        case 'tuteur_id':
          return 'Tuteur'
        case 'publics_beneficiaires':
          return 'Publics Bénéficiaires'
        case 'template_id':
          return 'Template de mission'
        case 'city':
          return 'Ville'
        case 'dates_infos':
          return 'Information sur la date'
      }
      return property.charAt(0).toUpperCase() + property.slice(1)
    },
    changes (activity) {
      const changes = []
      for (const [key, value] of Object.entries(activity.properties.attributes)) {
        if (this.uselessProperties.includes(key)) {
          continue
        }
        if (!activity.properties.old && !value) { // Valeurs vides
          continue
        }
        changes.push({
          property: this.formatPropertyLabel(key),
          after: value,
          before: activity.properties.old && activity.properties.old[key]
        })
      }
      return changes
    }
  }

}
</script>
